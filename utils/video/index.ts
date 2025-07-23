// /utils/video/index.ts
import { getFileExtension, generateSecureRandomString } from '@/utils/storage';
import {
	maxVideoSize,
	allowedVideoTypes,
	maxVideoLength,
} from '@/config/storage/env';

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

export const validateVideoFile = async (
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

export const generateSecureVideoFilename = (originalName: string): string => {
	const ext = getFileExtension(originalName);
	const random = generateSecureRandomString(24);
	return `videos/${random}.${ext}`;
};
