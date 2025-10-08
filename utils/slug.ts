/**
 * Converts text to a URL-friendly slug
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters
 * - Removes consecutive hyphens
 * - Trims hyphens from start and end
 *
 * @param text - The text to convert to a slug
 * @returns A URL-friendly slug string
 */
export function generateSlug(text: string): string {
	return text
		.toLowerCase() // Convert to lowercase
		.trim() // Remove leading/trailing whitespace
		.replace(/[^\w\s-]/g, '') // Remove special characters (keep letters, numbers, spaces, hyphens)
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-') // Replace multiple consecutive hyphens with single hyphen
		.replace(/^-+|-+$/g, ''); // Remove hyphens from start and end
}

/**
 * Generates a unique slug by appending a number if the slug already exists
 *
 * @param text - The text to convert to a slug
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug string
 */
export function generateUniqueSlug(
	text: string,
	existingSlugs: string[]
): string {
	const baseSlug = generateSlug(text);

	if (!existingSlugs.includes(baseSlug)) {
		return baseSlug;
	}

	let counter = 1;
	let uniqueSlug = `${baseSlug}-${counter}`;

	while (existingSlugs.includes(uniqueSlug)) {
		counter++;
		uniqueSlug = `${baseSlug}-${counter}`;
	}

	return uniqueSlug;
}

/**
 * Validates if a string is a valid slug format
 *
 * @param slug - The slug to validate
 * @returns True if the slug is valid, false otherwise
 */
export function isValidSlug(slug: string): boolean {
	// Valid slug: lowercase letters, numbers, hyphens only
	// Cannot start or end with hyphen
	// Cannot have consecutive hyphens
	const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
	return slugRegex.test(slug);
}
