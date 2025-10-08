'use client';

import {
	CheckCircleIcon,
	InfoIcon,
	LinkBreakIcon,
	SpinnerIcon,
	WarningIcon,
} from '@phosphor-icons/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProviderProps {
	children: React.ReactNode;
}

// Define the type for the icon props
interface IconProps {
	type: string;
	isLoading?: boolean;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
	const CustomIcon = (props: IconProps) => {
		const { type, isLoading } = props;

		if (isLoading) return <SpinnerIcon />;

		switch (type) {
			case 'info':
				return <InfoIcon weight='duotone' size={28} />;
			case 'success':
				return <CheckCircleIcon weight='duotone' size={28} />;
			case 'error':
				return <LinkBreakIcon weight='duotone' size={28} />;
			case 'warning':
				return <WarningIcon weight='duotone' size={28} />;
			case 'default':
				return undefined;
			default:
				return undefined;
		}
	};

	return (
		<>
			{children}
			<ToastContainer icon={CustomIcon} />
		</>
	);
};

export default ToastProvider;
