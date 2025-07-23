'use server';

import { dataset, mutateToken, projectId } from '@/constants/envs';

export async function submitComments(Value: string) {
	const mutations = [
		{
			create: {
				_type: 'comment',
				content: Value, // Pass the actual comment content
			},
		},
	];

	try {
		const response = await fetch(
			`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${mutateToken}`, // Private key
				},
				body: JSON.stringify({ mutations }),
			}
		);

		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error('Error submitting comment:', error);
	}
}
