// // service/StorageService.ts
// import {
// 	PutObjectCommand,
// 	GetObjectCommand,
// 	DeleteObjectCommand,
// } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import {
// 	storageClient,
// 	storageBucket,
// 	storageAccountId,
// } from '@/config/storage/providers/client';

// export class StorageService {
// 	async uploadObject(
// 		key: string,
// 		buffer: Buffer,
// 		contentType: string
// 	): Promise<string> {
// 		await storageClient.send(
// 			new PutObjectCommand({
// 				Bucket: storageBucket,
// 				Key: key,
// 				Body: buffer,
// 				ContentType: contentType,
// 			})
// 		);
// 		return this.getPublicUrl(key);
// 	}

// 	async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
// 		const command = new GetObjectCommand({
// 			Bucket: storageBucket,
// 			Key: key,
// 		});
// 		return getSignedUrl(storageClient, command, { expiresIn });
// 	}

// 	async deleteObject(key: string): Promise<void> {
// 		await storageClient.send(
// 			new DeleteObjectCommand({
// 				Bucket: storageBucket,
// 				Key: key,
// 			})
// 		);
// 	}

// 	getPublicUrl(key: string): string {
// 		return `https://${storageBucket}.${storageAccountId}.r2.cloudflarestorage.com/${key}`;
// 	}
// }
