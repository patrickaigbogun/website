'use client';

import { hotToast as toast } from '@components/providers/toast';
import { useWizardSession } from '@hooks/useWizzardSession';
import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';
import { createContext, ReactNode, useContext, useState } from 'react';

// Create context for wizard data
interface WizardContextType<T> {
	data: T;
	update: (partial: Partial<T>) => void;
}

const WizardContext = createContext<WizardContextType<any> | null>(null);

// Hook to use wizard context
export function useWizardStepContext<T>() {
	const context = useContext(WizardContext);
	if (!context) {
		throw new Error(
			'useWizardStepContext must be used within a WizardStepper'
		);
	}
	return context as WizardContextType<T>;
}

interface WizardStepperProps<T extends Record<string, any>> {
	wizardId: string;
	initialData: T;
	orientation?: 'horizontal' | 'vertical';
	children: ReactNode[];
	onSubmit?: (data: T) => Promise<void> | void;
	submitLabel?: string;
	nextLabel?: string;
	prevLabel?: string;
	showStepIndicator?: boolean;
	className?: string;
	// Add validation support
	validateStep?: (step: number, data: T) => boolean | string;
	// NEW: control whether to reset (and thus jump to step 1) after submit
	resetOnSubmit?: boolean;
}

export function WizardStepper<T extends Record<string, any>>({
	wizardId,
	initialData,
	orientation = 'horizontal',
	children,
	onSubmit,
	submitLabel = 'Submit',
	nextLabel = 'Next',
	prevLabel = 'Back',
	showStepIndicator = true,
	className = '',
	validateStep,
	resetOnSubmit = false, // default: do NOT reset after submit
}: WizardStepperProps<T>) {
	const { data, update, reset, step, setStep, nextStep, prevStep } =
		useWizardSession(wizardId, initialData);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

	const totalSteps = children.length;
	const isFirstStep = step === 0;
	const isLastStep = step === totalSteps - 1;

	const handleNext = () => {
		if (!isLastStep) {
			// Run validation if provided
			if (validateStep) {
				const result = validateStep(step, data);
				if (result !== true) {
					// Validation failed - show toast error
					const errorMessage =
						typeof result === 'string'
							? result
							: 'Please complete all required fields';
					toast.error(errorMessage);
					return;
				}
			}

			setDirection(1);
			nextStep();
		}
	};

	const handlePrev = () => {
		if (!isFirstStep) {
			setDirection(-1);
			prevStep();
		}
	};

	const handleSubmit = async () => {
		if (onSubmit && isLastStep) {
			setIsSubmitting(true);
			try {
				await onSubmit(data);
				toast.success('Setup completed successfully!');
				// Only reset (which jumps to first step) if explicitly requested
				if (resetOnSubmit) {
					reset();
				}
			} catch (error) {
				console.error('Wizard submission failed:', error);
				toast.error('Something went wrong. Please try again.');
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	const handleStepClick = (stepIndex: number) => {
		if (stepIndex !== step) {
			setDirection(stepIndex > step ? 1 : -1);
			setStep(stepIndex);
		}
	};

	// Animation variants
	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction > 0 ? -300 : 300,
			opacity: 0,
		}),
	};

	const StepIndicator = () => {
		if (!showStepIndicator) return null;

		const indicatorClass =
			orientation === 'horizontal'
				? 'flex items-center justify-center space-x-4'
				: 'flex flex-col space-y-4';

		return (
			<div className={`mb-8 ${indicatorClass}`}>
				{Array.from({ length: totalSteps }, (_, index) => {
					const isActive = index === step;
					const isCompleted = index < step;
					const isClickable = true; // Allow clicking to any step

					return (
						<div
							key={index}
							className={`flex items-center ${orientation === 'vertical' ? 'w-full' : ''}`}
						>
							<button
								onClick={() => handleStepClick(index)}
								disabled={!isClickable}
								className={`
									relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold transition-all duration-200
									${
										isActive
											? 'bg-primary text-white shadow-lg'
											: isCompleted
												? 'bg-green-500 text-white'
												: 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
									}
									${isClickable ? 'hover:scale-105 cursor-pointer' : 'cursor-not-allowed'}
								`}
							>
								{isCompleted ? '✓' : index + 1}
							</button>

							{/* Connector line */}
							{index < totalSteps - 1 && (
								<div
									className={`
										${orientation === 'horizontal' ? 'w-12 h-0.5 mx-2' : 'w-0.5 h-8 mx-auto my-2'}
										${isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
									`}
								/>
							)}
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<div
			className={`w-full mx-auto h-full grid grid-rows-[auto,1fr,auto] overflow-hidden ${className}`}
		>
			<StepIndicator />

			{/* Step Content (scrollable area) */}
			<div className='relative min-h-0 overflow-hidden'>
				<AnimatePresence mode='wait' custom={direction}>
					<motion.div
						key={step}
						custom={direction}
						variants={slideVariants}
						initial='enter'
						animate='center'
						exit='exit'
						transition={{
							x: { type: 'spring', stiffness: 300, damping: 30 },
							opacity: { duration: 0.2 },
						}}
						className='w-full h-full'
					>
						<WizardContext.Provider value={{ data, update }}>
							<div className='w-full h-full overflow-y-auto overflow-x-auto scrollbar-hide'>
								{children[step]}
							</div>
						</WizardContext.Provider>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Navigation Buttons (fixed within component bottom) */}
			<div className='z-10 bg-bg/80 backdrop-blur supports-[backdrop-filter]:bg-bg/60 border-t border-border pt-4 flex items-center justify-between'>
				<button
					onClick={handlePrev}
					disabled={isFirstStep}
					className={`
							inline-flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
							${
								isFirstStep
									? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
							}
						`}
				>
					<ArrowLeftIcon className='w-4 h-4 mr-2' />
					{prevLabel}
				</button>

				<span className='text-sm text-gray-500 dark:text-gray-400'>
					Step {step + 1} of {totalSteps}
				</span>

				{isLastStep ? (
					<button
						onClick={handleSubmit}
						disabled={isSubmitting}
						className='inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						{isSubmitting ? 'Submitting...' : submitLabel}
					</button>
				) : (
					<button
						onClick={handleNext}
						className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:opacity-90 transition-all duration-200'
					>
						{nextLabel}
						<ArrowRightIcon className='w-4 h-4 ml-2' />
					</button>
				)}
			</div>
		</div>
	);
}

// Helper component to provide wizard context to children
interface WizardStepProps<T> {
	data: T;
	update: (partial: Partial<T>) => void;
	children: ReactNode;
}

export function WizardStep<T>({ children }: WizardStepProps<T>) {
	return <>{children}</>;
}
