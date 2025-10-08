import { auth } from '@config/auth/providers'; // your better-auth setup
import fp from 'fastify-plugin';

declare module 'fastify' {
	interface FastifyRequest {
		user?: any;
		session?: any;
	}
}

export default fp(async fastify => {
	fastify.addHook('preHandler', async (req, reply) => {
		const headers = new Headers();
		for (const [key, value] of Object.entries(req.headers)) {
			if (value) {
				headers.append(key, value.toString());
			}
		}
		try {
			// Better Auth helper: automatically looks at cookies or headers
			const session = await auth.api.getSession({ headers: headers });

			if (session) {
				req.user = session.user;
				req.session = session;
			}
		} catch (err) {
			// fail silently → routes can still decide to reject
			req.user = undefined;
			req.session = undefined;
		}
	});
});
