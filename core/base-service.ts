// core/base-service.ts
import type { JobsOptions } from 'bullmq';
import { Queueable } from './queueable';

export type BaseServiceOpts = {
	queueable?: Queueable;
	queueName?: string;
	logger?: Console;
	defaultJobOpts?: JobsOptions;
};

export abstract class BaseService<Payload = any, Result = any> {
	protected queueable?: Queueable;
	protected queueName: string;
	protected logger: Console;

	constructor(
		public name: string,
		opts?: BaseServiceOpts
	) {
		this.queueable = opts?.queueable;
		this.queueName = opts?.queueName ?? name;
		this.logger = opts?.logger ?? console;
	}

	protected abstract handle(payload: Payload, job?: any): Promise<Result>;

	// enqueue via queueable (optional)
	enqueue(payload: Payload, jobOpts?: JobsOptions) {
		if (!this.queueable) throw new Error('Queueable not provided');
		this.logger.info?.(`[${this.name}] enqueue`);
		return this.queueable.enqueue(
			this.queueName,
			this.name,
			payload,
			jobOpts
		);
	}

	// run inline (blocking)
	run(payload: Payload) {
		return this.handle(payload);
	}

	// called by worker loader to attach a worker for this service
	attachToQueueable(q: Queueable, concurrency = 5) {
		q.registerProcessor(
			this.queueName,
			this.name,
			async (payload, job) => {
				return this.handle(payload, job);
			},
			concurrency
		);
	}
}
