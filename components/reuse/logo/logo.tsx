import { cn } from '@lib/utils';
import { Flex, Text } from '@radix-ui/themes';

interface TextAndImageProps {
	classname?: string;
	children: React.ReactNode;
	src?: string;
	alt?: string;
	rounded?: 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'full';
	size?: 'xs' | 'sm' | 's' | 'md' | 'lg';
}

function TextAndImageLogo({
	classname,
	children,
	src,
	alt,
	rounded = 'xl',
	size = 'sm',
}: TextAndImageProps) {
	const sizeClasses = {
		xs: 'w-8 h-8',
		s: 'w-8 h-12',
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

	return (
		<Flex
			direction={'row'}
			align={'center'}
			className={cn('space-x-2', classname, roundedClasses[rounded])}
		>
			<img
				src={src}
				alt={alt}
				className={cn(
					' aspect-auto',
					roundedClasses[rounded],
					sizeClasses[size]
				)}
			/>
			<Text size={'6'} className='font-bold text-primary'>
				{children}
			</Text>
		</Flex>
	);
}

export { TextAndImageLogo };
