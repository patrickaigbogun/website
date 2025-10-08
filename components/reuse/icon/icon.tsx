'use client';
import { cn } from '@lib/utils';
import { forwardRef } from 'react';

// Icon component that uses your theme variables
export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
	// variant?: 'classic' | 'solid' | 'soft' | 'surface' | 'outline' | 'ghost';
	size?: '1' | '2' | '3' | '4';
	radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
	loading?: boolean;
	disabled?: boolean;
}

const Icon = forwardRef<HTMLDivElement, IconProps>(
	(
		{
			children,
			className,
			// variant = 'soft',
			size = '2',
			radius = 'medium',
			loading = false,
			disabled = false,
			...props
		},
		ref
	) => {
		// Size mapping
		const sizeClasses = {
			'1': 'w-6 h-6 text-xs', // 24px
			'2': 'w-8 h-8 text-sm', // 32px
			'3': 'w-10 h-10 text-base', // 40px
			'4': 'w-12 h-12 text-lg', // 48px
		};

		// Radius mapping
		const radiusClasses = {
			none: 'rounded-none',
			small: 'rounded-sm',
			medium: 'rounded-md',
			large: 'rounded-lg',
			full: 'rounded-full',
		};

		// Variant styles using your theme variables
		// const variantClasses = {
		// 	classic: 'bg-secondary text-text hover:bg-secondary/80 shadow-sm',
		// 	solid: 'bg-primary text-bg-bg hover:bg-primary/90 shadow-sm',
		// 	soft: 'bg-primary/10 text-primary hover:bg-primary/20 border-0',
		// 	surface:
		// 		'bg-card text-card-foreground hover:bg-secondary hover:text-secondary-foreground border border-border shadow-sm',
		// 	outline:
		// 		'bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground border border-border',
		// 	ghost: 'bg-transparent text-foreground hover:bg-secondary hover:text-secondary-foreground border-0',
		// };

		return (
			<div
				ref={ref}
				className={cn(
					'inline-flex items-center justify-center transition-all duration-200',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
					sizeClasses[size],
					radiusClasses[radius],
					// variantClasses[variant],
					{
						'opacity-50 cursor-not-allowed pointer-events-none':
							disabled,
						'animate-pulse': loading,
					},
					className
				)}
				aria-disabled={disabled}
				{...props}
			>
				{loading ? (
					<div className='animate-spin rounded-full border-2 border-current border-t-transparent w-4 h-4' />
				) : (
					children
				)}
			</div>
		);
	}
);

Icon.displayName = 'Icon';

export { Icon };
