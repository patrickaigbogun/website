import type { IconProps, IconWeight } from '@phosphor-icons/react';
import type { ButtonProps } from '@radix-ui/themes';

export type XButtonProps = {
	href?: string;
	colour: ButtonProps['color'];
	variant: ButtonProps['variant'];
	weight?: IconWeight;
	children?: React.ReactNode;
	icon: React.ComponentType<IconProps>;
	type?: ButtonProps['type'];
	iconSize?: IconProps['size'];
	size?: ButtonProps['size'];
	onClick?: ButtonProps['onClick'];
};
