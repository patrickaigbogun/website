import {
	Fetcher,
	SafeFetchOptions,
	SafeFetchResult,
} from '@/types/utils/fetcher';
// This file defines a safe fetch utility that handles API responses and errors gracefully.
// It provides a wrapper function `safeFetch` to standardize error handling and response validation for API calls.

/**
 * A utility function to safely fetch data from an API and handle errors gracefully.
 *
 * @template T - The type of the data expected in the API response.
 * @param {Fetcher<T>} fetchFn - A function that performs the fetch operation and returns a response.
 * @param {SafeFetchOptions} [options] - Optional configuration for filtering or coercing the response data.
 * @returns {Promise<SafeFetchResult<T>>} - A promise that resolves to the result of the fetch operation, including data or an error message.
 */
export async function safeFetch<T extends {}>(
	fetchFn: Fetcher<T>,
	options?: SafeFetchOptions
): Promise<SafeFetchResult<T>> {
	try {
		// Execute the fetch function and get the response
		const response = await fetchFn();

		// Check if the response indicates success and contains valid data
		if (response.success !== 'ok' || response.data === null) {
			return {
				data: null,
				error:
					response.message ||
					'Something went wrong and an error message was not provided.',
			};
		}

		let finalData = response.data;

		// Apply optional filtering to the data if it is an array
		if (Array.isArray(finalData) && options?.filter) {
			finalData = finalData.filter(Boolean) as typeof finalData;
		}

		// Coerce non-array data into an array if the `coerce` option is enabled
		if (!Array.isArray(finalData) && options?.coerce) {
			finalData = [finalData] as unknown as T;
		}

		// Return the processed data with a fallback to null
		return { data: finalData ?? null }; // ✅ Explicit fallback to null
	} catch (err: any) {
		// Log and return an error message if an exception occurs
		console.error('safeFetch error:', err);
		return {
			data: null,
			error:
				err.message ||
				'Unexpected error that was not handled and returned no response',
		};
	}
}
