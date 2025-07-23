// // /config/storage/providers/client.ts
// import { S3Client } from '@aws-sdk/client-s3';
// import {
// 	accountId,
// 	accessKeyId,
// 	secretAccessKey,
// 	bucketName,
// } from '@/config/storage/env';

// export const storageClient = new S3Client({
// 	region: 'auto',
// 	endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
// 	credentials: {
// 		accessKeyId,
// 		secretAccessKey,
// 	},
// });

// export const storageBucket = bucketName;
// export const storageAccountId = accountId;
