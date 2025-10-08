export type WebRequestError = {
	type: 'bodyError' | 'urlError' | 'headerError';
	message: string;
};

export type WebRequestResult = [Request | null, WebRequestError | null];

export interface WebRequestBuilder {
	headers(...keys: string[]): WebRequestBuilder;
	body(): WebRequestBodyBuilder;
	url(customUrl: string): WebRequestBuilder;

	// Build and return result
	result(): WebRequestResult;
}

export interface WebRequestBodyBuilder extends WebRequestBuilder {
	raw(): WebRequestBuilder;
}

declare module 'fastify' {
	interface FastifyRequest {
		toWebRequest(): WebRequestBuilder;
	}
}
