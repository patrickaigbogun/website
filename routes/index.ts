// routes/index.ts
import { FastifyInstance } from 'fastify';
// import chapterRoutes from './chapters';
import authRoutes from './auth';
import commentsRoutes from './comments';
import healthRoutes from './health';

export default function registerRoutes(server: FastifyInstance) {
	// Register all routes with /api/v1 prefix
	server.register(
		async app => {
			// Health/Status routes
			app.register(healthRoutes);
			// app.register(authRoutes);

			// Upload routes
			// app.register(uploadRoutes);

			// Chapter routes
			// app.register(chapterRoutes);

			// Add more route groups here as needed
			// app.register(videoRoutes);
			// app.register(courseRoutes);
			// app.register(userRoutes);
			app.register(commentsRoutes);
		},
		{ prefix: '/api/v1' }
	);
	server.register(authRoutes);
}
