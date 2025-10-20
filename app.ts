// app.ts
import fastifycors from '@fastify/cors';
import formbody from '@fastify/formbody';
import fastify from 'fastify';
import next from 'next';
import { parse } from 'url';
import authPlugin from './plugins/session';
import webRequest from './plugins/web-request';
import registerRoutes from './routes/index';

const dev = process.env.NODE_ENV !== 'production';
const isProd = process.env.NODE_ENV === 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = fastify({
	logger: !dev
		? true
		: {
				level: 'info',
				transport: {
					target: 'pino-pretty',
					options: {
						colorize: true,
						translateTime: 'HH:MM:ss',
						ignore: 'pid,hostname,reqId,responseTime',
						messageFormat: '{msg}',
						levelFirst: true,
						singleLine: true,
					},
				},
			},
});

server.register(authPlugin);
server.register(webRequest);

async function main() {
	await server.register(fastifycors, {
		origin: 'http://localhost:7990',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	});

	await server.register(formbody);

	await app.prepare();

	// Register /api/v1 routes
	registerRoutes(server);

	// Handle Next.js pages and static files (exclude API routes)
	server.register(async function (fastify) {
		fastify.get(
			'/*',
			{
				preHandler: (request, reply, done) => {
					// Skip API routes - let them be handled by registerRoutes
					if (request.url?.startsWith('/api/')) {
						reply.callNotFound();
						return;
					}
					done();
				},
			},
			async (req, reply) => {
				const parsedUrl = parse(req.url!, true);
				await handle(req.raw, reply.raw, parsedUrl);
			}
		);

		// Handle Next.js form posts and other methods
		['POST', 'PUT', 'DELETE', 'PATCH'].forEach(method => {
			fastify.route({
				method: method as any,
				url: '/*',
				preHandler: (request, reply, done) => {
					if (request.url?.startsWith('/api/')) {
						reply.callNotFound();
						return;
					}
					done();
				},
				handler: async (req, reply) => {
					const parsedUrl = parse(req.url!, true);
					await handle(req.raw, reply.raw, parsedUrl);
				},
			});
		});
	});

	const port = Number(process.env.PORT || 7990);
	await server.listen({ port, host: '0.0.0.0' });
	console.log(`🚀 App running on http://0.0.0.0:${port}`);
}

main();
