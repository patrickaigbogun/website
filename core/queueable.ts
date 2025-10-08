// core/queueable.ts
import { Job, JobsOptions, Queue, Worker } from 'bullmq';
import type Redis from 'ioredis';

export type ProcFn<T = any> = (payload: T, job?: Job<T>) => Promise<any>;

export class Queueable {
	private producers = new Map<string, Queue<any>>();
	constructor(
		private connection: Redis | object,
		private defaultOpts: Partial<JobsOptions> = {}
	) {}

	getProducer<T = any>(queueName: string) {
		if (!this.producers.has(queueName)) {
			const q = new Queue<T>(queueName, {
				connection: this.connection,
				defaultJobOptions: {
					removeOnComplete: true,
					...this.defaultOpts,
				},
			});
			this.producers.set(queueName, q);
		}
		return this.producers.get(queueName)! as Queue<T>;
	}

	async enqueue<T = any>(
		queueName: string,
		name: string,
		payload: T,
		opts?: JobsOptions
	) {
		const q = this.getProducer<T>(queueName);
		return q.add(name as any, payload as any, opts);
	}

	// register a worker for a single queue (one worker per service)
	registerProcessor<T = any>(
		queueName: string,
		procName: string,
		proc: ProcFn<T>,
		concurrency = 5
	) {
		const w = new Worker<T>(
			queueName,
			async (job: Job<T>) => proc(job.data, job),
			{
				connection: this.connection,
				concurrency,
			}
		);

		w.on('completed', job =>
			console.debug(
				`[queueable] ${queueName}:${procName} completed ${job.id}`
			)
		);
		w.on('failed', (job, err) =>
			console.error(
				`[queueable] ${queueName}:${procName} failed ${job?.id}`,
				err
			)
		);
		w.on('error', err => console.error(`[queueable] worker error`, err));

		return w;
	}
}
