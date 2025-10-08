// config/worker/provider/client.ts
import Redis from 'ioredis';

export const redisClient = new Redis({
	host: '127.0.0.1',
	port: 6379,
	maxRetriesPerRequest: null,
	// password, tls, etc, if needed
});

/**
 * Which services should have workers started.
 * Each entry is the *base name* that matches `NAME.service.ts`.
 */
export const workerConfig = {
	services: ['invite', 'mail'], // controlled here
	servicesRoot: 'services', // relative to project root
	concurrency: 5,
	attempts: 5,
	// any other defaults (backoff) you want to centralize
};

export default { redisClient, workerConfig };
