// scripts/test-mail.ts
import { redisClient } from '@config/workers';
import { Queueable } from '@core/queueable';

const q = new Queueable(redisClient);

async function main() {
	await q.enqueue('mail', 'mail', {
		to: 'test@example.com',
		subject: 'Hello from BullMQ',
		component: '<div>Test email</div>',
		from: 'noreply@levra.dev',
	});
	console.log('Enqueued test mail');
	process.exit(0);
}

main();
