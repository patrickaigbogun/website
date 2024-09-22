

// const mutations = [{
// 	createOrReplace: {
// 		_id: '',
// 		_type: 'comment',
// 		_createdAt: '',
// 		content: '',
// 	}
// }]

// fetch(`https://${process.env.PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.DATASET}`, {
// 	method: 'post',
// 	headers: {
// 		'Content-type': 'application/json',
// 		Authorization: `Bearer ${process.env.COMMENT_TOKEN}`
// 	},
// 	body: JSON.stringify({ mutations })
// })
// 	.then(response => response.json())
// 	.then(result => console.log(result))
// 	.catch(error => console.error(error))

const submitComments = () => {
	const mutations = [{
		createOrReplace: {
			_id: '',
			_type: 'comment',
			_createdAt: '',
			content: '',
		}
	}]
	
	fetch(`https://${process.env.PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.DATASET}`, {
		method: 'post',
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${process.env.COMMENT_TOKEN}`
		},
		body: JSON.stringify({ mutations })
	})
		.then(response => response.json())
		.then(result => console.log(result))
		.catch(error => console.error(error))
}










export default submitComments;