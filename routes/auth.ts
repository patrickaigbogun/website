import { auth } from '@/config/auth/providers';
import { FastifyInstance } from 'fastify';

export default function authRoutes(server: FastifyInstance) {
	server.route({
		method: ['GET', 'POST'],
		url: '/api/auth/*',
		async handler(request, reply) {
			try {
				const [req, err] = request.toWebRequest().result();
				if (err || !req) {
					const errorMsg = err
						? `${err.type}: ${err.message}`
						: 'Unknown conversion error';
					server.log.error(errorMsg);
					return reply.status(500).send({
						error: 'Request conversion failed',
						details: err?.message || 'Unknown error',
					});
				}

				const res = await auth.handler(req);
				reply.status(res.status);
				res.headers.forEach((value: string, key: string) =>
					reply.header(key, value)
				);

				const responseBody = res.body ? await res.text() : null;
				reply.send(responseBody);
			} catch (err) {
				server.log.error(err);
				reply.status(500).send({ error: 'Internal auth error' });
			}
		},
	});
}
