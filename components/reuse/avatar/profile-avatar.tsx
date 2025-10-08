import { cn } from '@lib/utils';
import type { IconProps } from '@phosphor-icons/react';
import { UserCircleDashedIcon } from '@phosphor-icons/react';
import { Avatar } from 'radix-ui';

interface ProfileAvatarProps {
	src: string;
	alt: string;
	size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
	radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
	classname?: string;
	iconcolor?: string;
	weight?: IconProps['weight'];
	iconsize?: IconProps['size'];
}

export function ProfileAvatar({
	src,
	alt,
	size = '4',
	radius = 'medium',
	classname,
	iconcolor,
	weight = 'duotone',
	iconsize = 28,
}: ProfileAvatarProps) {
	// Size mapping
	const sizeClasses = {
		'1': 'w-6 h-6 text-xs', // 24px
		'2': 'w-8 h-8 text-sm', // 32px
		'3': 'w-10 h-10 text-base', // 40px
		'4': 'w-12 h-12 text-lg', // 48px
		'5': 'w-14 h-14 text-xl', // 56px
		'6': 'w-16 h-16 text-2xl', // 64px
		'7': 'w-18 h-18 text-3xl', // 72px
		'8': 'w-20 h-20 text-4xl', // 80px
		'9': 'w-22 h-22 text-5xl', // 88px
	};

	// Radius mapping
	const radiusClasses = {
		none: 'rounded-none',
		small: 'rounded-sm',
		medium: 'rounded-md',
		large: 'rounded-lg',
		xlarge: 'rounded-xl',
		xxlarge: 'rounded-2xl',
		xxxlarge: 'rounded-3xl',
		full: 'rounded-full',
	};

	return (
		<Avatar.Root
			className={cn(
				'inline-flex select-none items-center justify-center overflow-hidden align-middle p-0',
				sizeClasses[size],
				radiusClasses[radius],
				classname
			)}
		>
			<Avatar.Image
				className='size-full rounded-[inherit] object-cover'
				src={src}
				alt={alt}
			/>
			<Avatar.Fallback>
				<UserCircleDashedIcon
					className={cn('min-w-full min-h-full', iconcolor)}
					weight={weight}
					size={iconsize}
				/>
			</Avatar.Fallback>
		</Avatar.Root>
	);
}
