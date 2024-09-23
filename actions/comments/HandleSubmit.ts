'use server';

export async function submitComments(Value: string) {
	const mutations = [{
		create: {
			_type: 'comment',
			_createdAt: new Date().toISOString(),
			content: Value, // Pass the actual comment content
		}
	}];

	try {
		const response = await fetch(`https://${process.env.NEXT_PUBLIC_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_DATASET}`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${process.env.COMMENT_TOKEN}` // Private key
			},
			body: JSON.stringify({ mutations })
		});

		const result = await response.json();
		console.log(result);
		return result;
	} catch (error) {
		console.error('Error submitting comment:', error);
	}
}
