'use client';

import {
	CheckCircleIcon,
	InfoIcon,
	LinkBreakIcon,
	SpinnerIcon,
	WarningIcon,
} from '@phosphor-icons/react';

// ============================================================================
// GLASSMORPHIC CSS STYLES (Add to your global CSS)
// ============================================================================

// ============================================================================
// 1. SONNER PROVIDER (Recommended)
// ============================================================================

import { Toaster } from 'sonner';

interface SonnerToastProviderProps {
	children: React.ReactNode;
}

const SonnerToastProvider = ({ children }: SonnerToastProviderProps) => {
	return (
		<>
			{children}
			<Toaster
				position='top-right'
				expand={true}
				richColors
				closeButton
				toastOptions={{
					style: {
						background: 'rgba(255, 255, 255, 0.1)',
						backdropFilter: 'blur(20px)',
						WebkitBackdropFilter: 'blur(20px)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '16px',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
						color: 'hsl(var(--foreground))',
					},
					className: 'font-sans glassmorphic-toast',
				}}
				icons={{
					success: <CheckCircleIcon weight='duotone' size={20} />,
					info: <InfoIcon weight='duotone' size={20} />,
					warning: <WarningIcon weight='duotone' size={20} />,
					error: <LinkBreakIcon weight='duotone' size={20} />,
					loading: <SpinnerIcon className='animate-spin' size={20} />,
				}}
			/>
		</>
	);
};

// Usage:
// import { toast } from 'sonner';
// toast.success('Success message');
// toast.error('Error message');
// toast.loading('Loading...', { id: 'loading-toast' });

// ============================================================================
// 2. REACT HOT TOAST PROVIDER
// ============================================================================

import { Toaster as HotToaster, toast } from 'react-hot-toast';

interface HotToastProviderProps {
	children: React.ReactNode;
}

const HotToastProvider = ({ children }: HotToastProviderProps) => {
	return (
		<>
			{children}
			<HotToaster
				position='top-right'
				reverseOrder={false}
				gutter={8}
				containerClassName=''
				containerStyle={{}}
				toastOptions={{
					// Default options for all toasts
					className: 'glassmorphic-toast',
					duration: 4000,
					style: {
						background: 'rgba(255, 255, 255, 0.1)',
						backdropFilter: 'blur(20px)',
						WebkitBackdropFilter: 'blur(20px)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '16px',
						boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
						color: 'hsl(var(--foreground))',
						fontSize: '14px',
						fontFamily: 'inherit',
					},
					// Custom icons for different types
					success: {
						duration: 4000,
						icon: (
							<CheckCircleIcon
								weight='duotone'
								size={20}
								className='text-green-500'
							/>
						),
					},
					error: {
						duration: 5000,
						icon: (
							<LinkBreakIcon
								weight='duotone'
								size={20}
								className='text-red-500'
							/>
						),
					},
					loading: {
						icon: (
							<SpinnerIcon className='animate-spin' size={20} />
						),
					},
				}}
			/>
		</>
	);
};

// Custom toast functions with icons
export const hotToast = {
	dismiss: (id: string) => toast.dismiss(id),
	success: (message: string) => toast.success(message),
	error: (message: string) => toast.error(message),
	loading: (message: string) => toast.loading(message),
	info: (message: string) =>
		toast(message, {
			icon: (
				<InfoIcon
					weight='duotone'
					size={20}
					className='text-blue-500'
				/>
			),
		}),
	warning: (message: string) =>
		toast(message, {
			icon: (
				<WarningIcon
					weight='duotone'
					size={20}
					className='text-yellow-500'
				/>
			),
		}),
};

// ============================================================================
// 3. RADIX UI TOAST PROVIDER (Most Control)
// ============================================================================

// import * as Toast from '@radix-ui/react-toast';
// import React, { createContext, useCallback, useContext, useState } from 'react';

// interface ToastData {
// 	id: string;
// 	title?: string;
// 	description: string;
// 	type: 'success' | 'error' | 'warning' | 'info' | 'loading';
// 	duration?: number;
// }

// interface RadixToastContextType {
// 	addToast: (toast: Omit<ToastData, 'id'>) => void;
// 	removeToast: (id: string) => void;
// }

// const RadixToastContext = createContext<RadixToastContextType | undefined>(
// 	undefined
// );

// interface RadixToastProviderProps {
// 	children: React.ReactNode;
// }

// const RadixToastProvider = ({ children }: RadixToastProviderProps) => {
// 	const [toasts, setToasts] = useState<ToastData[]>([]);

// 	const addToast = useCallback((toastData: Omit<ToastData, 'id'>) => {
// 		const id = Math.random().toString(36).substr(2, 9);
// 		const newToast: ToastData = {
// 			...toastData,
// 			id,
// 			duration: toastData.duration || 5000,
// 		};
// 		setToasts(prev => [...prev, newToast]);
// 	}, []);

// 	const removeToast = useCallback((id: string) => {
// 		setToasts(prev => prev.filter(toast => toast.id !== id));
// 	}, []);

// 	const getToastIcon = (type: ToastData['type']) => {
// 		switch (type) {
// 			case 'success':
// 				return (
// 					<CheckCircleIcon
// 						weight='duotone'
// 						size={20}
// 						className='text-green-500'
// 					/>
// 				);
// 			case 'error':
// 				return (
// 					<LinkBreakIcon
// 						weight='duotone'
// 						size={20}
// 						className='text-red-500'
// 					/>
// 				);
// 			case 'warning':
// 				return (
// 					<WarningIcon
// 						weight='duotone'
// 						size={20}
// 						className='text-yellow-500'
// 					/>
// 				);
// 			case 'info':
// 				return (
// 					<InfoIcon
// 						weight='duotone'
// 						size={20}
// 						className='text-blue-500'
// 					/>
// 				);
// 			case 'loading':
// 				return <SpinnerIcon className='animate-spin' size={20} />;
// 			default:
// 				return null;
// 		}
// 	};

// 	const getToastStyles = (type: ToastData['type']) => {
// 		const baseStyles =
// 			'glassmorphic-toast flex items-start gap-3 max-w-sm p-4 rounded-2xl backdrop-blur-xl border shadow-2xl';

// 		// Glassmorphic base with type-specific accents
// 		const glassStyles =
// 			'bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10';

// 		switch (type) {
// 			case 'success':
// 				return `${baseStyles} ${glassStyles} shadow-green-500/20 border-l-4 border-l-green-400/60`;
// 			case 'error':
// 				return `${baseStyles} ${glassStyles} shadow-red-500/20 border-l-4 border-l-red-400/60`;
// 			case 'warning':
// 				return `${baseStyles} ${glassStyles} shadow-yellow-500/20 border-l-4 border-l-yellow-400/60`;
// 			case 'info':
// 				return `${baseStyles} ${glassStyles} shadow-blue-500/20 border-l-4 border-l-blue-400/60`;
// 			default:
// 				return `${baseStyles} ${glassStyles}`;
// 		}
// 	};

// 	return (
// 		<RadixToastContext.Provider value={{ addToast, removeToast }}>
// 			<Toast.Provider swipeDirection='right'>
// 				{children}
// 				{toasts.map(toast => (
// 					<Toast.Root
// 						key={toast.id}
// 						className={getToastStyles(toast.type)}
// 						duration={toast.duration}
// 						onOpenChange={open => {
// 							if (!open) {
// 								removeToast(toast.id);
// 							}
// 						}}
// 					>
// 						<div className='flex items-start gap-3 flex-1'>
// 							{getToastIcon(toast.type)}
// 							<div className='flex-1'>
// 								{toast.title && (
// 									<Toast.Title className='font-semibold text-sm mb-1'>
// 										{toast.title}
// 									</Toast.Title>
// 								)}
// 								<Toast.Description className='text-sm text-muted-foreground'>
// 									{toast.description}
// 								</Toast.Description>
// 							</div>
// 						</div>
// 						<Toast.Close className='text-muted-foreground hover:text-foreground'>
// 							<span className='sr-only'>Close</span>×
// 						</Toast.Close>
// 					</Toast.Root>
// 				))}
// 				<Toast.Viewport className='fixed top-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-[100vw] m-0 list-none z-50 outline-none' />
// 			</Toast.Provider>
// 		</RadixToastContext.Provider>
// 	);
// };

// // Hook to use the Radix toast context
// export const useRadixToast = () => {
// 	const context = useContext(RadixToastContext);
// 	if (context === undefined) {
// 		throw new Error(
// 			'useRadixToast must be used within a RadixToastProvider'
// 		);
// 	}
// 	return context;
// };

// // Convenience functions for Radix toasts
// export const radixToast = {
// 	success: (description: string, title?: string) => {
// 		// This would be used inside components that have access to the context
// 		// You'd need to call useRadixToast() hook inside your components
// 	},
// };

// ============================================================================
// EXPORTS
// ============================================================================

export {
	HotToastProvider,
	// RadixToastProvider,
	SonnerToastProvider,
};
export default SonnerToastProvider; // Default to Sonner

// ============================================================================
// USAGE EXAMPLES WITH GLASSMORPHIC VARIANTS
// ============================================================================

/*
// 1. Sonner Usage with Enhanced Glassmorphism
import { toast } from 'sonner';

const handleClick = () => {
	// Basic glassmorphic toasts
	toast.success('User created successfully!');
	toast.error('Failed to save data');

	// Custom glassmorphic with enhanced blur
	toast.success('Enhanced glass effect!', {
		className: 'glassmorphic-toast-enhanced',
		style: {
			background: 'rgba(34, 197, 94, 0.1)',
			borderColor: 'rgba(34, 197, 94, 0.3)',
		}
	});

	// Frosted glass loading toast
	const loadingId = toast.loading('Processing...', {
		className: 'glassmorphic-toast-frosted',
		style: {
			background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
			borderColor: 'rgba(59, 130, 246, 0.3)',
		}
	});

	setTimeout(() => {
		toast.success('Complete!', { id: loadingId });
	}, 2000);
};

// 2. React Hot Toast with Glassmorphic Variants
import { hotToast } from './toast-providers';

const handleClick = () => {
	// Custom glassmorphic success with gradient
	toast.success('Success!', {
		className: 'glassmorphic-toast-frosted',
		style: {
			background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.1))',
			borderColor: 'rgba(34, 197, 94, 0.4)',
			color: '#10b981',
		}
	});

	// Glassmorphic error with red accent
	toast.error('Error occurred', {
		className: 'glassmorphic-toast-enhanced',
		style: {
			background: 'rgba(239, 68, 68, 0.1)',
			borderColor: 'rgba(239, 68, 68, 0.3)',
			borderLeft: '4px solid rgba(239, 68, 68, 0.6)',
		}
	});
};

// 3. Advanced Glassmorphic Toast with Custom Component
const GlassmorphicToast = ({ children, variant = 'default' }) => {
	const variants = {
		default: 'glassmorphic-toast',
		enhanced: 'glassmorphic-toast-enhanced',
		frosted: 'glassmorphic-toast-frosted',
	};

	return (
		<div className={`${variants[variant]} animate-in slide-in-from-right-full duration-300`}>
			{children}
		</div>
	);
};

// Pro tip: For best glassmorphic effects, ensure your app has:
// 1. A background with some texture/gradient (not solid colors)
// 2. Content behind the toasts to show the blur effect
// 3. Proper contrast for text readability
*/
