// scripts/worker.ts
import { redisClient, workerConfig } from '@config/workers';
import { Queueable } from '@core/queueable';
import fs from 'fs';
import path from 'path';

async function startAllWorkers() {
	// servicesRoot is relative to project root
	const root = process.cwd();
	const servicesDir = path.resolve(root, workerConfig.servicesRoot);

	// create queueable using redis client from config
	const queueable = new Queueable(redisClient, {
		attempts: workerConfig?.attempts ?? 5,
	});

	const files = fs.readdirSync(servicesDir);
	for (const svcName of workerConfig.services) {
		const match = files.find(
			f => f.startsWith(svcName) && f.endsWith('.service.ts')
		);
		if (!match) {
			console.warn(
				`no service file for ${svcName} found in ${servicesDir}`
			);
			continue;
		}

		const modulePath = path.join(servicesDir, match);
		// dynamic import — works with tsx/ts-node during dev
		const mod = await import(modulePath);
		const ServiceClass = mod.default ?? mod[Object.keys(mod)[0]];
		if (!ServiceClass) {
			console.warn(`service module ${match} has no default export`);
			continue;
		}

		const instance = new ServiceClass({ queueable, logger: console });
		// attach worker for this service -> spawns its own Worker
		instance.attachToQueueable(queueable, workerConfig.concurrency);

		console.log(`worker spawned for service "${svcName}" from ${match}`);
	}
}

startAllWorkers().catch(err => {
	console.error(err);
	process.exit(1);
});
