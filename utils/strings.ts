export function capitaliseFirstLetter(str: string) {
	if (!str) return '';
	const newStr = str.charAt(0).toUpperCase() + str.substring(1);
	return newStr;
}
