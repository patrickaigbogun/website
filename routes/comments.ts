import fastifyPlugin from 'fastify-plugin';
import Elysia from 'elysia';
import { commentPlugin } from '@fuma-comment/server/elysia';
import { createDrizzleAdapter } from '@fuma-comment/server/adapters/drizzle';
import { db } from '@/config/db/orms/client';
import * as schema from '@/orm/schema';

export default fastifyPlugin(async fastify => {
	// Shared plugins (session, web-request) are registered globally in app.ts
	const adapter = createDrizzleAdapter({
		schemas: schema,
		db,
		auth: {
			async getUserId(req: any) {
				const hdr = req?.headers;
				const value =
					typeof hdr?.get === 'function'
						? hdr.get('x-user-id')
						: hdr?.['x-user-id'];
				if (Array.isArray(value)) return value[0] ?? null;
				return value ?? null;
			},
		},
	} as any);

	// Elysia application for the Fuma comment plugin
	const elysia = new Elysia().use(
		commentPlugin({
			auth: {
				// Read user id from header injected by Fastify bridge
				async getSession(req: any) {
					let uid: any;
					if (typeof req?.headers?.get === 'function') {
						uid = req.headers.get('x-user-id');
					} else {
						uid = req?.headers?.['x-user-id'];
					}
					if (Array.isArray(uid)) uid = uid[0];
					if (!uid) return null;
					return { id: String(uid) };
				},
			},
			storage: adapter,
			role: 'none',
		})
	);

	// Bridge Fastify -> Fetch Request -> Elysia
	fastify.all('/comments/*', async (req: any, reply) => {
		const builder = req.toWebRequest?.();
		if (!builder) {
			reply.code(500).send({ error: 'web-request plugin not available' });
			return;
		}
		const [request, err] = builder.result();
		if (err || !request) {
			reply.code(400).send({ error: err?.message ?? 'Invalid request' });
			return;
		}

		// If session plugin populated req.user, forward it via header
		const headers = new Headers(request.headers);
		if (req.user?.id) headers.set('x-user-id', String(req.user.id));
		const bridged = new Request(request, { headers });

		const res = await elysia.handle(bridged);
		reply.code(res.status);
		res.headers.forEach((value, key) => reply.header(key, value));
		const bodyText = await res.text();
		reply.send(bodyText);
	});
});
