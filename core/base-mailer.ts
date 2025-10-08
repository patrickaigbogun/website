// core/base-mailer.ts
import { emailConfig } from '@config/email/providers/client';
import { render } from '@react-email/components';
import { Queueable } from './queueable';

type MailPayload = {
	to: string;
	subject: string;
	component: React.ReactElement;
	from: string;
};

export class Mailer {
	private queueable: Queueable;

	constructor(queueable: Queueable) {
		this.queueable = queueable;
	}

	async send(payload: MailPayload, useQueue = true) {
		if (useQueue) {
			// enqueue as a background job
			await this.queueable.enqueue('mail', 'mail', payload);
			return;
		}

		// send immediately
		const { to, subject, component, from } = payload;
		const html = await render(component);

		return emailConfig.emails.send({
			from: from,
			to,
			subject,
			html,
		});
	}
}
