import { cn } from '@/lib/utils';
import { title } from 'process';
import { MouseEventHandler } from 'react';

interface LinkCard {
	children: React.ReactNode;
	target: string;
	title?: string;
	className?: string;
}

export function Wrapper({ children, target, title, className }: LinkCard) {
	return (
		<div>
			<a
				className={cn(className)}
				href={target}
				title={title}
				aria-label={title}
			>
				{children}
			</a>
		</div>
	);
}
