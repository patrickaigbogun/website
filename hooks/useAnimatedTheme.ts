'use client';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseAnimatedThemeOptions {
	animationDuration?: number;
	circleOrigin?: string;
	preferViewTransitions?: boolean;
	onAnimationStart?: () => void;
	onAnimationEnd?: () => void;
}

type ToggleThemeParams = {
	// Pointer coordinates or an element to derive the origin from
	origin?: { x: number; y: number } | HTMLElement | null;
	// Override hook-level preference per-call
	preferViewTransitions?: boolean;
};

export const useAnimatedTheme = (options: UseAnimatedThemeOptions = {}) => {
	const { theme, resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const {
		animationDuration = 700,
		circleOrigin = '50% 0%',
		preferViewTransitions = true,
		onAnimationStart,
		onAnimationEnd,
	} = options;

	const darkCircleRef = useRef<HTMLDivElement>(null);
	const lightCircleRef = useRef<HTMLDivElement>(null);
	const isAnimatingRef = useRef(false);
	const cleanupRef = useRef<(() => void) | null>(null);

	// Cache computed colors for both themes so we don't recompute every toggle
	const themeColorsRef = useRef<{
		light: { bg: string; bgDark: string };
		dark: { bg: string; bgDark: string };
	} | null>(null);

	// Read CSS variables for both themes by temporarily toggling the root `.dark` class.
	const computeThemeColors = useCallback(() => {
		if (typeof window === 'undefined') return;
		const root = document.documentElement;
		const hadTransition = root.style.transition;
		const hadDark = root.classList.contains('dark');

		const readVars = () => {
			const cs = getComputedStyle(root);
			const bg = cs.getPropertyValue('--bg').trim();
			const bgDark = cs.getPropertyValue('--bg-dark').trim();
			return { bg, bgDark };
		};

		try {
			// Prevent visual transitions while we sample values
			root.style.transition = 'none';

			// Read current (light or dark depending on current class)
			const current = readVars();

			// Toggle to the opposite to read the other theme values
			if (hadDark) {
				root.classList.remove('dark');
				const lightVals = readVars();
				root.classList.add('dark');
				const darkVals = current; // we started dark
				themeColorsRef.current = { light: lightVals, dark: darkVals };
			} else {
				root.classList.add('dark');
				const darkVals = readVars();
				root.classList.remove('dark');
				const lightVals = current; // we started light
				themeColorsRef.current = { light: lightVals, dark: darkVals };
			}
		} finally {
			// Restore inline transition style
			root.style.transition = hadTransition;
			// Ensure original dark class state is preserved
			const isDarkNow =
				document.documentElement.classList.contains('dark');
			if (hadDark !== isDarkNow) {
				// Flip back if changed by our sampling
				if (hadDark) root.classList.add('dark');
				else root.classList.remove('dark');
			}
		}
	}, []);

	// Handle client-side mounting and prime color cache
	useEffect(() => {
		setMounted(true);
		computeThemeColors();
		return () => {
			if (cleanupRef.current) {
				cleanupRef.current();
			}
			isAnimatingRef.current = false;
		};
	}, [computeThemeColors]);

	const getThemeColorsFor = useCallback((target: 'light' | 'dark') => {
		// Fallbacks if not yet computed
		const fallback =
			target === 'dark'
				? { bg: 'oklch(0.15 0.015 97)', bgDark: 'oklch(0.1 0.015 97)' }
				: {
						bg: 'oklch(0.96 0.015 97)',
						bgDark: 'oklch(0.92 0.015 97)',
					};
		return themeColorsRef.current?.[target] ?? fallback;
	}, []);

	// Helpers for view-transition origin and geometry
	const resolveOrigin = useCallback(
		(
			origin: ToggleThemeParams['origin']
		): { x: number; y: number; css: string } => {
			if (typeof window === 'undefined')
				return { x: 0, y: 0, css: circleOrigin };
			const vw = window.innerWidth;
			const vh = window.innerHeight;

			if (origin && 'x' in origin && 'y' in origin) {
				const x = Math.max(0, Math.min(vw, origin.x));
				const y = Math.max(0, Math.min(vh, origin.y));
				return { x, y, css: `${x}px ${y}px` };
			}
			if (origin instanceof HTMLElement) {
				const rect = origin.getBoundingClientRect();
				const x = rect.left + rect.width / 2;
				const y = rect.top + rect.height / 2;
				return { x, y, css: `${x}px ${y}px` };
			}
			// Default to provided circleOrigin string (percent-based)
			// For pixel values, choose center
			return { x: vw / 2, y: vh / 2, css: circleOrigin };
		},
		[circleOrigin]
	);

	const computeMaxRadius = useCallback((x: number, y: number) => {
		const vw = typeof window !== 'undefined' ? window.innerWidth : 0;
		const vh = typeof window !== 'undefined' ? window.innerHeight : 0;
		const maxX = Math.max(x, vw - x);
		const maxY = Math.max(y, vh - y);
		return Math.hypot(maxX, maxY);
	}, []);

	const canUseViewTransitions = useCallback(() => {
		if (typeof window === 'undefined') return false;
		const doc: any = document as any;
		if (!doc.startViewTransition) return false;
		const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');
		return !(reduce && reduce.matches);
	}, []);

	const toggleTheme = useCallback(
		(params?: ToggleThemeParams) => {
			if (isAnimatingRef.current || !mounted) return;

			const current =
				(resolvedTheme as 'light' | 'dark' | undefined) ?? 'light';
			const newTheme: 'light' | 'dark' =
				current === 'dark' ? 'light' : 'dark';

			const useVT =
				(params?.preferViewTransitions ?? preferViewTransitions) &&
				canUseViewTransitions();

			isAnimatingRef.current = true;
			setIsAnimating(true);
			onAnimationStart?.();

			if (useVT) {
				const { x, y } = resolveOrigin(params?.origin ?? null);
				const radius = computeMaxRadius(x, y);
				const doc: any = document as any;
				const vt = doc.startViewTransition(() => {
					setTheme(newTheme);
				});

				// Animate the snapshots with a circular reveal/conceal
				vt.ready
					.then(() => {
						document.documentElement.animate(
							[
								{
									clipPath: `circle(${radius}px at ${x}px ${y}px)`,
								},
								{ clipPath: `circle(0px at ${x}px ${y}px)` },
							],
							{
								duration: animationDuration,
								easing: 'ease-in-out',
								pseudoElement: '::view-transition-old(root)',
							}
						);
						document.documentElement.animate(
							[
								{ clipPath: `circle(0px at ${x}px ${y}px)` },
								{
									clipPath: `circle(${radius}px at ${x}px ${y}px)`,
								},
							],
							{
								duration: animationDuration,
								easing: 'ease-in-out',
								pseudoElement: '::view-transition-new(root)',
							}
						);
					})
					.finally(() => {
						vt.finished
							.catch(() => {})
							.finally(() => {
								isAnimatingRef.current = false;
								setIsAnimating(false);
								onAnimationEnd?.();
							});
					});

				cleanupRef.current = () => {
					// View transitions can't be programmatically canceled; just reset flags.
					isAnimatingRef.current = false;
					setIsAnimating(false);
				};
				return;
			}

			// Respect reduced motion for fallback path
			const reduce =
				typeof window !== 'undefined' &&
				window.matchMedia?.('(prefers-reduced-motion: reduce)');
			if (reduce && (reduce as MediaQueryList).matches) {
				setTheme(newTheme);
				computeThemeColors();
				isAnimatingRef.current = false;
				setIsAnimating(false);
				onAnimationEnd?.();
				return;
			}

			// Fallback: radial background overlay behind content
			const activeCircle =
				newTheme === 'dark'
					? darkCircleRef.current
					: lightCircleRef.current;

			if (!activeCircle) {
				setTheme(newTheme);
				isAnimatingRef.current = false;
				setIsAnimating(false);
				onAnimationEnd?.();
				return;
			}

			// Use target theme colors for the overlay
			const targetColors = getThemeColorsFor(newTheme);
			activeCircle.style.backgroundColor = targetColors.bg;

			// Prepare circle (always behind content)
			activeCircle.style.display = 'block';
			activeCircle.style.zIndex = '-1';
			const originResolved = resolveOrigin(params?.origin ?? null);
			activeCircle.style.clipPath = `circle(0% at ${originResolved.css})`;
			activeCircle.style.transition = `clip-path ${animationDuration}ms ease-in-out`;

			// Force reflow
			activeCircle.offsetHeight;

			// Expand the circle
			activeCircle.style.clipPath = `circle(150% at ${originResolved.css})`;

			// Swap theme near the end so the overlay shows target color throughout
			const themeTimeout = setTimeout(() => {
				setTheme(newTheme);
				computeThemeColors();
			}, animationDuration * 0.8);

			// Reset animation state after completion
			const resetTimeout = setTimeout(() => {
				if (activeCircle) {
					activeCircle.style.transition = 'none';
					activeCircle.style.clipPath = `circle(0% at ${originResolved.css})`;
					activeCircle.style.display = 'none';
					activeCircle.style.zIndex = '-1';
				}
				isAnimatingRef.current = false;
				setIsAnimating(false);
				onAnimationEnd?.();
			}, animationDuration + 100);

			cleanupRef.current = () => {
				clearTimeout(themeTimeout);
				clearTimeout(resetTimeout);
				if (activeCircle) {
					activeCircle.style.transition = 'none';
					activeCircle.style.clipPath = `circle(0% at ${originResolved.css})`;
					activeCircle.style.display = 'none';
					activeCircle.style.zIndex = '-1';
				}
				isAnimatingRef.current = false;
				setIsAnimating(false);
			};
		},
		[
			resolvedTheme,
			setTheme,
			animationDuration,
			circleOrigin,
			onAnimationStart,
			onAnimationEnd,
			computeThemeColors,
			mounted,
			getThemeColorsFor,
			preferViewTransitions,
			canUseViewTransitions,
			resolveOrigin,
			computeMaxRadius,
		]
	);

	// For external consumers who might want the current palette
	const getCurrentThemeColors = useCallback(() => {
		const current =
			(resolvedTheme as 'light' | 'dark' | undefined) ?? 'light';
		return getThemeColorsFor(current);
	}, [resolvedTheme, getThemeColorsFor]);

	const getCircleProps = useCallback(
		(circleType: 'dark' | 'light') => {
			if (!mounted) {
				return {
					ref: circleType === 'dark' ? darkCircleRef : lightCircleRef,
					style: { display: 'none' },
				};
			}

			const colors = getThemeColorsFor(circleType);
			return {
				ref: circleType === 'dark' ? darkCircleRef : lightCircleRef,
				style: {
					position: 'fixed' as const,
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					backgroundColor: colors.bg,
					clipPath: `circle(0% at ${circleOrigin})`,
					zIndex: -1,
					pointerEvents: 'none' as const,
					display: 'none',
				},
			};
		},
		[mounted, getThemeColorsFor, circleOrigin]
	);

	// Return safe values during SSR/hydration
	if (!mounted) {
		return {
			theme: undefined, // Let next-themes handle initial state
			toggleTheme: () => {}, // No-op during SSR
			isAnimating: false,
			darkCircleProps: getCircleProps('dark'),
			lightCircleProps: getCircleProps('light'),
			getCurrentThemeColors,
		};
	}

	return {
		theme: resolvedTheme,
		toggleTheme,
		isAnimating,
		darkCircleProps: getCircleProps('dark'),
		lightCircleProps: getCircleProps('light'),
		getCurrentThemeColors,
	};
};
