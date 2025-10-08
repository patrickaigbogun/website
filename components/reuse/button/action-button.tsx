import { cn } from '@/lib/utils';

import { Flex } from '@radix-ui/themes';

interface ActionButtonProps {
	size?: keyof typeof sizeClasses;
	rounded?: keyof typeof roundedClasses;
	className?: string;
	children?: React.ReactNode;
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

export function ActionButton({
	size = 'sm',
	rounded = 'm',
	className,
	children,
}: ActionButtonProps) {
	return (
		<Flex
			direction='row'
			align='center'
			className={cn(
				'space-x-2 items-center p-2 min-w-fit',
				roundedClasses[rounded],
				sizeClasses[size],
				className
			)}
		>
			{children}
		</Flex>
	);
}
