// /utils/video/index.ts
import { getFileExtension, generateSecureRandomString } from '@/utils/storage';
/**
 * Get the duration of a video file in seconds
 * @param file - The video file
 * @returns A promise that resolves to an array containing an error (if any) and the duration in seconds
 */
export const getVideoDuration = (
	file: File
): Promise<[Error | null, number]> => {
	return new Promise(resolve => {
		const video = document.createElement('video');
		video.preload = 'metadata';

		video.onloadedmetadata = () => {
			window.URL.revokeObjectURL(video.src);
			resolve([null, video.duration]);
		};

		video.onerror = () => {
			resolve([new Error('Failed to load video metadata'), 0]);
		};

		video.src = URL.createObjectURL(file);
	});
};

/**
 * Validate a video file against allowed types, size, and duration
 * @param allowedVideoTypes - Array of allowed MIME types for the video
 * @param maxVideoSize - Maximum allowed size in bytes
 * @param maxVideoLength - Maximum allowed length in milliseconds
 * @param file - The video file to validate
 * @returns A promise that resolves to an array containing an error (if any) and null
 */
export const validateVideoFile = async (
	allowedVideoTypes: string[],
	maxVideoSize: number,
	maxVideoLength: number,
	file: File
): Promise<[Error | null, null]> => {
	if (!allowedVideoTypes.includes(file.type)) {
		return [new Error(`Invalid video type: ${file.type}`), null];
	}

	if (file.size > maxVideoSize) {
		return [new Error(`Video file too large: ${file.size} bytes`), null];
	}

	const [durationError, duration] = await getVideoDuration(file);
	if (durationError) {
		console.warn('Could not validate video duration:', durationError);
		return [null, null];
	}

	if (duration > maxVideoLength / 1000) {
		return [
			new Error(
				`Video too long: ${Math.round(duration)}s (max: ${
					maxVideoLength / 1000
				}s)`
			),
			null,
		];
	}

	return [null, null];
};

/**
 * Generate a unique filename for a video based on course and lesson IDs
 * @param courseId - The ID of the course
 * @param lessonId - The ID of the lesson
 * @param originalName - The original name of the video file
 * @returns A unique filename for the video
 */
export const generateVideoFilename = (
	courseId: string,
	lessonId: string,
	originalName: string
): string => {
	const ext = getFileExtension(originalName);
	const random = generateSecureRandomString(32);
	const timestamp = Date.now();
	return `courses/${courseId}/lessons/${lessonId}/${random}_${timestamp}.${ext}`;
};

/**
 * Generate a secure filename for a video upload
 * @param originalName - The original name of the video file
 * @returns A secure filename for the video
 */
export const generateSecureVideoFilename = (originalName: string): string => {
	const ext = getFileExtension(originalName);
	const random = generateSecureRandomString(24);
	return `videos/${random}.${ext}`;
};
