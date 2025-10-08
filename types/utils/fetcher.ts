import { Response } from '@/types/lib/responses';

export type Fetcher<T> = () => Promise<Response<T> | Response<null>>;

export type SafeFetchOptions = {
	filter?: boolean;
	coerce?: boolean;
};

export type SafeFetchResult<T> = {
	data: T | null;
	error?: string;
};
