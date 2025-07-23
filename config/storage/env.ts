// import { getServerEnv } from 'x-env-helpers';

// /**
//  * Media storage environment variables
//  * Configure your preferred video storage provider
//  */

// // Video storage provider selection
// export const mediaProvider = getServerEnv('MEDIA_PROVIDER'); // cloudflare, vercel, aws, supabase

// // // Vercel Blob Storage (Recommended for MVP)
// // export const VERCEL_BLOB_TOKEN = getServerEnv("BLOB_READ_WRITE_TOKEN");

// // // AWS S3 + CloudFront (Recommended for Production)
// // export const AWS_ACCESS_KEY_ID = getServerEnv("AWS_ACCESS_KEY_ID");
// // export const AWS_SECRET_ACCESS_KEY = getServerEnv("AWS_SECRET_ACCESS_KEY");
// // export const AWS_REGION = getServerEnv("AWS_REGION");
// // export const AWS_S3_BUCKET = getServerEnv("AWS_S3_BUCKET");
// // export const AWS_CLOUDFRONT_URL = getServerEnv("AWS_CLOUDFRONT_URL");

// // envs passed as constants ahead of time
// export const accountId = getServerEnv('S3_ACCOUNT_ID');
// export const accessKeyId = getServerEnv('S3_ACCESS_KEY_ID');
// export const secretAccessKey = getServerEnv('S3_SECRET_ACCESS_KEY');
// export const bucketName = getServerEnv('S3_BUCKET_NAME');
// export const region = getServerEnv('S3_REGION');

// // Video processing settings
// export const maxVideoSize = 2 * 1024 * 1024 * 1024; // 2GB
// export const allowedVideoTypes = [
// 	'video/mp4',
// 	'video/webm',
// 	'video/mov',
// 	'video/avi',
// ];
// export const videoUploadTimeout = 30 * 60 * 1000; // 30 minutes
// export const maxVideoLength = 10 * 60 * 1000; // 10 minutes
