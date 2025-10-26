import fastifyPlugin from 'fastify-plugin';
import { createDrizzleAdapter } from '@fuma-comment/server/adapters/drizzle';
import { createBetterAuthAdapter } from '@fuma-comment/server/adapters/better-auth';
import { CustomComment, type CustomRequest } from '@fuma-comment/server/custom';
import { db } from '@/config/db/orms/client';
import { auth as betterAuth } from '@/config/auth/providers';
import * as schema from '@/orm/schema';

export default fastifyPlugin(async fastify => {
	const auth = createBetterAuthAdapter(betterAuth);

	// Register content-type parser for text/plain to parse as JSON
	// (Fuma Comment client sends JSON with text/plain content-type)
	fastify.addContentTypeParser(
		'text/plain',
		{ parseAs: 'string' },
		async (req: any, body: any) => {
			try {
				return JSON.parse(body as string);
			} catch {
				return body;
			}
		}
	);

	// Shared plugins (session) are registered globally in app.ts
	// Create DB storage adapter
	const adapter = createDrizzleAdapter({
		schemas: schema,
		db,
		auth: 'better-auth',
	});

	// Build Fuma custom router (framework-agnostic)
	const { handleRequest } = CustomComment<CustomRequest>({
		storage: adapter,
		role: 'none',
		auth: auth,
	});

	// Fastify -> CustomComment handleRequest bridge using web-request plugin
	fastify.all('/comments/*', async (req: any, reply) => {
		const builder = req.toWebRequest?.();
		if (!builder)
			return reply
				.code(500)
				.send({ message: 'web-request plugin not available' });

		const [webReq, err] = builder.result();
		if (err || !webReq)
			return reply
				.code(400)
				.send({ message: err?.message ?? 'Bad Request' });

		if (req.user?.id) webReq.headers.set('x-user-id', String(req.user.id));

		const url = new URL(webReq.url);

		// Extract page ID from catch-all path segment
		const raw = (req.params?.['*'] as string) ?? '';
		const pageId = raw.replace(/^\/+|\/+$/g, ''); // strip leading/trailing slashes

		// handleRequest expects just the catch-all (e.g., 'pageId' or 'pageId/commentId')
		// NOT the full path with /comments prefix
		const catchAll = pageId;

		const queryParams = {
			get: (k: string) => url.searchParams.get(k) ?? undefined,
		};

		// DEBUG: log what we're sending
		console.log('🔍 handleRequest input:', {
			method: webReq.method,
			catchAll,
			rawCatchAll: raw,
			pageId,
			fullUrl: webReq.url,
			hasUserId: !!req.user?.id,
		});

		// Parse body once and cache it
		let cachedBody: any = null;
		let bodyParsed = false;
		const parseBody = async () => {
			if (bodyParsed) {
				console.log('🔍 Returning cached body:', cachedBody);
				return cachedBody;
			}
			bodyParsed = true;

			const m = webReq.method.toUpperCase();

			if (m === 'GET' || m === 'HEAD') {
				cachedBody = undefined;
				console.log('🔍 GET/HEAD method, body is undefined');
				return cachedBody;
			}

			// Use Fastify's already-parsed body instead of reading from webReq
			// because the stream may have already been consumed
			if (req.body && typeof req.body === 'object') {
				cachedBody = req.body;
				console.log('🔍 Using Fastify parsed body:', cachedBody);
				return cachedBody;
			}

			const ct = webReq.headers.get('content-type') || '';
			console.log('🔍 Parsing body from webReq:', {
				method: m,
				contentType: ct,
			});

			try {
				if (
					ct.includes('application/json') ||
					ct.includes('text/plain')
				) {
					cachedBody = await webReq.json();
					console.log('🔍 Parsed JSON body:', cachedBody);
				} else if (ct.includes('application/x-www-form-urlencoded')) {
					const text = await webReq.text();
					cachedBody = Object.fromEntries(new URLSearchParams(text));
					console.log('🔍 Parsed form body:', cachedBody);
				} else if (ct.includes('multipart/form-data')) {
					const form = await webReq.formData();
					cachedBody = Object.fromEntries(form.entries());
					console.log('🔍 Parsed multipart body:', cachedBody);
				} else {
					cachedBody = {};
					console.log('🔍 Unknown content type, using empty object');
				}
			} catch (e) {
				console.error('🔍 Body parse error:', e);
				cachedBody = undefined;
			}
			return cachedBody;
		};

		const result = await handleRequest(
			webReq.method,
			catchAll,
			paramsMap => {
				const params = {
					get: (k: string) => paramsMap.get(k) ?? undefined,
				};
				return {
					method: webReq.method,
					body: parseBody,
					queryParams,
					params,
					headers: webReq.headers as any,
				};
			}
		);

		console.log(
			'🔍 handleRequest result:',
			result
				? {
						type: result.type,
						status:
							result.type === 'error' ? result.status : undefined,
						data: result.data,
					}
				: 'null (404)'
		);

		if (!result) return reply.code(404).send({ message: 'Not Found' });
		return reply
			.code(result.type === 'success' ? 200 : result.status)
			.send(result.data);
	});
});
