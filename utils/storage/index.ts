import { randomBytes } from 'crypto';

/**
 * Generate a secure random string
 */
export const generateSecureRandomString = (length: number = 32): string => {
	return randomBytes(length).toString('hex');
};

/**
 * Extract file extension from filename
 */
export const getFileExtension = (filename: string): string => {
	const parts = filename.split('.');
	return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
};
