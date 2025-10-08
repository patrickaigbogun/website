import { useDebounce, useIsClient, useWindowSize } from '@uidotdev/usehooks';

export function useIsMobile(breakpoint = 768) {
	const isClient = useIsClient();

	// Always call hooks in the same order to follow Rules of Hooks
	const { width } = useWindowSize();
	const debouncedWidth = useDebounce(width, 100);

	// Return false (desktop) as default during SSR/hydration to prevent layout shift
	if (!isClient) {
		return false;
	}

	return (debouncedWidth ?? 0) < breakpoint;
}
