import type { XButtonProps } from '@/types/components/x/buttons';
import { IconButton } from '@radix-ui/themes';

export function IconButtonX({
	colour,
	variant,
	weight,
	icon: Icon,
	type,
	size,
	iconSize,
	onClick,
}: XButtonProps) {
	return (
		<IconButton
			color={colour}
			variant={variant}
			type={type}
			size={size}
			onClick={onClick}
		>
			<Icon size={iconSize} weight={weight} />
		</IconButton>
	);
}
