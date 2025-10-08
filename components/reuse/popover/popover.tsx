import { cn } from '@lib/utils';
import { Popover } from 'radix-ui';
// import React from 'react';

export function ThemedPopover({
	trigger,
	children,
	side = 'bottom',
	align = 'center',
	// className = '',
	icon,
	contentClassName = '',
	...props
}: {
	trigger: React.ReactNode;
	children: React.ReactNode;
	side?: 'top' | 'right' | 'bottom' | 'left';
	align?: 'start' | 'center' | 'end';
	// className?: string;
	icon?: React.ReactNode;
	contentClassName?: string;
}) {
	return (
		<Popover.Root {...props}>
			<Popover.Trigger>
				<span tabIndex={0}>{trigger}</span>
			</Popover.Trigger>
			<Popover.Content
				side={side}
				align={align}
				sideOffset={8}
				className={cn(
					'glassmorphic-popover shadow-lg border focus:ring-2 focus:ring-primary',
					'will-change-[transform,opacity]',
					side === 'bottom' ? 'animate-slideUpAndFade' : '',
					side === 'right' ? 'animate-slideLeftAndFade' : '',
					side === 'top' ? 'animate-slideDownAndFade' : '',
					side === 'left' ? 'animate-slideRightAndFade' : '',
					contentClassName
				)}
			>
				{children}
				{icon ? <Popover.Close>{icon}</Popover.Close> : ''}
			</Popover.Content>
		</Popover.Root>
	);
}
