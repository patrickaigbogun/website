// delete-comment-docs.ts

import { createClient } from 'next-sanity';
const client = createClient({
	projectId: 'd8emt0pr',
	dataset: 'production',
	token: 'skhGEyxF8YC7YJGJij1yPbaqMqesBCQWRCaDnvJlM9aNjJ4C0egQ11Sehivu7WiMGe6R9Cz213G3QOAcbJ3ISIWfpvWCQ4HwxJ9UBImtVWLy0GBvAcdqNAc4nnpBAYbpNOZtKvgvgGmprpH8Jqjof5TXj5CwQf8Rw7IHHLwEFWIrTIQmlO82',
	apiVersion: '2025-07-24',
	useCdn: false,
});
const BATCH_SIZE = 500;

async function deleteAllOfType(type: string) {
	console.log(`🔍 Fetching all "${type}" document IDs...`);
	const ids: string[] = await client.fetch(`*[_type == "${type}"]._id`);
	console.log(`✅ Found ${ids.length} documents.`);

	for (let i = 0; i < ids.length; i += BATCH_SIZE) {
		const chunk = ids.slice(i, i + BATCH_SIZE);
		console.log(
			`🚮 Deleting batch ${i / BATCH_SIZE + 1} (${chunk.length} docs)...`
		);

		const tx = client.transaction();
		chunk.forEach(id => tx.delete(id));

		try {
			await tx.commit();
			console.log(`✅ Batch ${i / BATCH_SIZE + 1} deleted.`);
		} catch (err) {
			console.error(
				`❌ Error deleting batch ${i / BATCH_SIZE + 1}:`,
				err
			);
		}

		// Wait a bit to avoid hitting rate limits
		await new Promise(res => setTimeout(res, 200));
	}

	console.log('🎉 All documents deleted.');
}

deleteAllOfType('comment').catch(err => {
	console.error('❌ Failed to delete documents:', err);
});
