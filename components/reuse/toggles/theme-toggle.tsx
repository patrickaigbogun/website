'use client';
import { useAnimatedTheme } from '@hooks/useAnimatedTheme';
import { cn } from '@lib/utils';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useIsClient } from '@uidotdev/usehooks';
import { Switch } from 'radix-ui';
import { useEffect, useRef, useState } from 'react';

interface ThemeToggleProps {
	className?: string;
	showIcons?: boolean;
	size?: 'sm' | 'md' | 'lg';
}

// Size mapping: track, thumb, icon size, and checked translate amount
const SIZE_MAP: Record<
	NonNullable<ThemeToggleProps['size']>,
	{ track: string; thumb: string; icon: number; checkedTranslate: string }
> = {
	sm: {
		track: 'w-14 h-7',
		thumb: 'w-5 h-5',
		icon: 16,
		checkedTranslate: 'data-[state=checked]:translate-x-6',
	},
	md: {
		track: 'w-20 h-9',
		thumb: 'w-6 h-6',
		icon: 20,
		checkedTranslate: 'data-[state=checked]:translate-x-10',
	},
	lg: {
		track: 'w-24 h-11',
		thumb: 'w-8 h-8',
		icon: 22,
		checkedTranslate: 'data-[state=checked]:translate-x-14',
	},
};

const ICON_SIZES = {
	sm: SIZE_MAP.sm.icon,
	md: SIZE_MAP.md.icon,
	lg: SIZE_MAP.lg.icon,
} as const;

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
	className = '',
	showIcons = true,
	size = 'md',
}) => {
	const isClient = useIsClient();
	const lastPointRef = useRef<{ x: number; y: number } | null>(null);
	const {
		theme,
		toggleTheme,
		isAnimating,
		darkCircleProps,
		lightCircleProps,
	} = useAnimatedTheme({
		animationDuration: 700,
		circleOrigin: '50% 0%',
	});

	// Track sizes (more spacious)
	// Size helpers are defined at module scope (see below)
	const sizeClasses = SIZE_MAP[size].track;
	const thumbSizes = SIZE_MAP[size].thumb;
	const checkedTranslateClass = SIZE_MAP[size].checkedTranslate;

	const sunIconClasses = cn(
		'pointer-events-none absolute left-2 text-text transition-all duration-200',
		'hidden'
	);

	const moonIconClasses = cn(
		'hidden pointer-events-none absolute right-2 text-text transition-all duration-200'
	);

	const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
		lastPointRef.current = { x: e.clientX, y: e.clientY };
	};

	const onCheckedChange = () => {
		const origin = lastPointRef.current ?? undefined;
		toggleTheme(origin ? { origin } : undefined);
		lastPointRef.current = null;
	};

	if (!isClient) {
		return (
			<div className={cn('flex items-center', className)}>
				<div
					className={cn(
						'rounded-full bg-borderMuted animate-pulse',
						sizeClasses
					)}
				/>
			</div>
		);
	}

	return (
		<div>
			{/* Animation circles (behind content) */}
			<div {...darkCircleProps} />
			<div {...lightCircleProps} />

			<div className={cn('flex items-center', className)}>
				<Switch.Root
					checked={theme === 'dark'}
					onCheckedChange={onCheckedChange}
					disabled={isAnimating}
					onPointerDown={onPointerDown}
					className={cn(
						'relative inline-flex items-center rounded-full group outline-none',
						sizeClasses,
						'transition-colors duration-300 ease-in-out focus:outline-none',
						'bg-stone-500/30 hover:bg-bgDark data-[state=checked]:bg-borderMuted',
						'disabled:opacity-50'
					)}
					aria-label='Toggle theme'
				>
					{showIcons && (
						<div>
							<SunIcon
								size={ICON_SIZES[size]}
								weight={'duotone'}
								className={sunIconClasses}
							/>
							<MoonIcon
								size={ICON_SIZES[size]}
								weight={'duotone'}
								className={moonIconClasses}
							/>
						</div>
					)}
					<Switch.Thumb
						className={`
							block ${thumbSizes} rounded-full bg-primary shadow-sm
							transform transition-transform duration-300 ease-in-out translate-x-1
							${checkedTranslateClass}
						`}
					/>
				</Switch.Root>
			</div>
		</div>
	);
};

// Alternative minimal version without icons (icons inside track)
export const SimpleThemeToggle: React.FC<{ className?: string }> = ({
	className = '',
}) => {
	const [mounted, setMounted] = useState(false);
	const lastPointRef = useRef<{ x: number; y: number } | null>(null);
	const {
		theme,
		toggleTheme,
		isAnimating,
		darkCircleProps,
		lightCircleProps,
	} = useAnimatedTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
		lastPointRef.current = { x: e.clientX, y: e.clientY };
	};
	const onCheckedChange = () => {
		const origin = lastPointRef.current ?? undefined;
		toggleTheme(origin ? { origin } : undefined);
		lastPointRef.current = null;
	};

	if (!mounted) {
		return (
			<div
				className={cn(
					SIZE_MAP.md.track,
					'rounded-full bg-borderMuted animate-pulse',
					className
				)}
			/>
		);
	}

	return (
		<>
			<div {...darkCircleProps} />
			<div {...lightCircleProps} />

			<Switch.Root
				checked={theme === 'dark'}
				onCheckedChange={onCheckedChange}
				disabled={isAnimating}
				onPointerDown={onPointerDown}
				className={cn(
					SIZE_MAP.md.track,
					'rounded-full transition-colors duration-300 relative group',
					'bg-borderMuted data-[state=checked]:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:opacity-50',
					className
				)}
				aria-label='Toggle theme'
			>
				<SunIcon
					size={SIZE_MAP.md.icon}
					weight='bold'
					className={cn(
						'pointer-events-none absolute left-2 text-text drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] transition-opacity duration-200',
						'opacity-100 group-[data-state=checked]:opacity-40'
					)}
				/>
				<MoonIcon
					size={SIZE_MAP.md.icon}
					weight='bold'
					className={cn(
						'pointer-events-none absolute right-2 text-text drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)] transition-opacity duration-200',
						'opacity-40 group-[data-state=checked]:opacity-100'
					)}
				/>
				<Switch.Thumb
					className={cn(
						SIZE_MAP.md.thumb,
						'w-6 h-6 bg-text rounded-full ring-1 ring-border/50 shadow-sm transform transition-transform duration-300 translate-x-1',
						SIZE_MAP.md.checkedTranslate
					)}
				/>
			</Switch.Root>
		</>
	);
};
