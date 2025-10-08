import {
	WebRequestBodyBuilder,
	WebRequestBuilder,
	WebRequestResult,
} from '@/types/plugins/web-request';
import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

class WebRequestBuilderImpl
	implements WebRequestBuilder, WebRequestBodyBuilder
{
	private fastifyRequest: any;
	private selectedHeaders?: string[];
	private customUrl?: string;
	private useRawBody = false;
	private bodyBuilderActive = false;

	constructor(fastifyRequest: any) {
		this.fastifyRequest = fastifyRequest;
	}

	headers(...keys: string[]): WebRequestBuilder {
		this.selectedHeaders = keys;
		return this;
	}

	body(): WebRequestBodyBuilder {
		this.bodyBuilderActive = true;
		return this;
	}

	raw(): WebRequestBuilder {
		if (!this.bodyBuilderActive) {
			// Still allow it, but ideally should be called after body()
		}
		this.useRawBody = true;
		return this;
	}

	url(customUrl: string): WebRequestBuilder {
		this.customUrl = customUrl;
		return this;
	}

	result(): WebRequestResult {
		return this.build();
	}

	private build(): WebRequestResult {
		try {
			// Build URL
			let url: URL;
			try {
				if (this.customUrl) {
					url = new URL(this.customUrl);
				} else {
					url = new URL(
						this.fastifyRequest.url,
						`http://${this.fastifyRequest.headers.host}`
					);
				}
			} catch (error) {
				return [
					null,
					{
						type: 'urlError',
						message: `Failed to construct URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				];
			}

			// Build headers
			const headers = new Headers();
			try {
				const requestHeaders = this.fastifyRequest.headers;

				if (this.selectedHeaders) {
					// Only include specified headers
					for (const key of this.selectedHeaders) {
						const value = requestHeaders[key.toLowerCase()];
						if (value) {
							headers.append(
								key,
								Array.isArray(value)
									? value.join(', ')
									: value.toString()
							);
						}
					}
				} else {
					// Include all headers
					for (const [key, value] of Object.entries(requestHeaders)) {
						if (value) {
							const headerValue = Array.isArray(value)
								? value.join(', ')
								: value.toString();
							headers.append(key, headerValue);
						}
					}
				}
			} catch (error) {
				return [
					null,
					{
						type: 'headerError',
						message: `Failed to process headers: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				];
			}

			// Build body
			let body: string | undefined;
			try {
				const method = this.fastifyRequest.method;
				if (
					method === 'POST' ||
					method === 'PUT' ||
					method === 'PATCH'
				) {
					if (this.fastifyRequest.body) {
						if (this.useRawBody) {
							// Try to get raw body - this might not always be available in Fastify
							body =
								typeof this.fastifyRequest.body === 'string'
									? this.fastifyRequest.body
									: JSON.stringify(this.fastifyRequest.body);
						} else {
							// Default: stringify the parsed body
							body = JSON.stringify(this.fastifyRequest.body);
						}
					}
				}
			} catch (error) {
				return [
					null,
					{
						type: 'bodyError',
						message: `Failed to process body: ${error instanceof Error ? error.message : 'Unknown error'}`,
					},
				];
			}

			// Create Web Request
			const request = new Request(url.toString(), {
				method: this.fastifyRequest.method,
				headers,
				body,
			});

			return [request, null];
		} catch (error) {
			return [
				null,
				{
					type: 'urlError', // Default to urlError for general failures
					message: `Failed to create web request: ${error instanceof Error ? error.message : 'Unknown error'}`,
				},
			];
		}
	}
}

const webRequestPlugin: FastifyPluginCallback = (fastify, opts, next) => {
	fastify.decorateRequest('toWebRequest', function () {
		return new WebRequestBuilderImpl(this);
	});

	next();
};

export default fp(webRequestPlugin, {
	name: 'web-request',
	fastify: '5.x',
});
