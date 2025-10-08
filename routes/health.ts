// routes/health.ts
import { FastifyInstance } from 'fastify';

export default function healthRoutes(server: FastifyInstance) {
	// GET /ping
	server.get('/ping', async () => {
		return {
			message: 'pong',
			timestamp: new Date().toISOString(),
			status: 'healthy',
		};
	});

	// GET /status
	server.get('/status', async () => {
		return {
			status: 'ok',
			version: '1.0.0',
			uptime: process.uptime(),
			environment: process.env.NODE_ENV || 'development',
		};
	});
}
