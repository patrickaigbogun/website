'use client';
import { LinkProps } from '@/types/components';

export function LinkButton({ target, children, title }: LinkProps) {
	return (
		<div>
			<a
				href={target}
				title={title}
				aria-label={title}
				target='_blank'
				rel='noopener noreferrer'
				className='relative inline-block p-3 m-0 overflow-hidden font-bold text-text transition-all duration-300 ease-out bg-bg-dark border-4 border-border-muted rounded-xl hover:border-border group'
			>
				<span className='absolute top-0 left-0 w-0 transition-all duration-500 ease-out bg-bg-light group-hover:w-full group-hover:h-full'></span>
				<span className='relative group-hover:text-text-muted'>
					{children}
				</span>
			</a>
		</div>
	);
}
