'use client';
import { Icon } from '@components/reuse/icon';
import { cn } from '@lib/utils';
import { Toggle } from 'radix-ui';
import { ComponentProps, ReactNode } from 'react';

// Icon has a required `children` prop in its own type. For MenuToggle we
// want to inherit Icon's other props but allow callers to omit `children`.
type IconLikeProps = Omit<ComponentProps<typeof Icon>, 'children'>;

export interface MenuToggleProps extends IconLikeProps {
	/** Optional children override for the icon; if omitted, MenuToggle will render closed/open icons automatically. */
	children?: ReactNode;
	/**
	 * Controlled pressed state for the toggle; omit to use it uncontrolled.
	 */
	pressed?: boolean;
	/**
	 * Callback when pressed state changes.
	 */
	onPressedChange?: (pressed: boolean) => void;
	/**
	 * Accessible label for screen readers.
	 */
	label?: string;
	/**
	 * Icon shown when the menu is closed.
	 */
	/**
	 * Icon shown when the menu is open.
	 */

	asChild?: boolean;
}

const sizeClasses = {
	xs: 'w-5 h-8',
	sm: 'w-12 h-12',
	md: 'w-16 h-16',
	lg: 'w-20 h-20',
};

const roundedClasses = {
	s: 'rounded-sm',
	m: 'rounded-md',
	l: 'rounded-lg',
	xl: 'rounded-xl',
	xxl: 'rounded-2xl',
	xxxl: 'rounded-3xl',
	full: 'rounded-full',
};

export function MenuToggle({
	className,
	children,
	label = 'Toggle menu',
	pressed,
	onPressedChange,
	asChild = false,
	...iconProps
}: MenuToggleProps) {
	return (
		<Toggle.Root
			asChild={asChild}
			className={cn(
				'group inline-flex items-center justify-center outline-none',
				className
			)}
			aria-label={label}
			pressed={pressed}
			onPressedChange={onPressedChange}
		>
			<Icon {...iconProps} className={cn('transition-colors', className)}>
				{children}
			</Icon>
		</Toggle.Root>
	);
}
