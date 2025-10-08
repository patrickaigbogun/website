'use client';

import { RadioGroup } from '@headlessui/react';
import { cn } from '@lib/utils';
import { CheckIcon } from '@phosphor-icons/react';
import {
	cloneElement,
	ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	isValidElement,
	useContext,
} from 'react';

// Context for passing down radio group state
interface RadioGroupContextType {
	value: any;
	onChange: (value: any) => void;
	disabled?: boolean;
	name?: string;
	showIndicator: boolean;
	indicatorVariant: 'circle' | 'check' | 'tick';
	indicatorClassName?: string;
}

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

const useRadioGroupContext = () => {
	const context = useContext(RadioGroupContext);
	if (!context) {
		throw new Error('Radio components must be used within MyRadioGroup');
	}
	return context;
};

// Main RadioGroup component props
interface MyRadioGroupProps {
	name?: string;
	value?: any;
	onChange?: (value: any) => void;
	defaultValue?: any;
	disabled?: boolean;
	className?: string;
	orientation?: 'horizontal' | 'vertical';
	gap?: '1' | '2' | '3' | '4' | '6' | '8';
	children: React.ReactNode;
	showIndicator?: boolean;
	indicatorVariant?: 'circle' | 'check' | 'tick';
	indicatorClassName?: string;
	by?: string | ((a: any, b: any) => boolean);
}

// Main RadioGroup component
export const MyRadioGroup = forwardRef<HTMLDivElement, MyRadioGroupProps>(
	(
		{
			name,
			value,
			onChange,
			defaultValue,
			disabled = false,
			className,
			orientation = 'vertical',
			gap = '2',
			children,
			showIndicator = true,
			indicatorVariant = 'circle',
			indicatorClassName,
			by,
			...props
		},
		ref
	) => {
		// Gap mapping
		const gapClasses = {
			'1': 'gap-1',
			'2': 'gap-2',
			'3': 'gap-3',
			'4': 'gap-4',
			'6': 'gap-6',
			'8': 'gap-8',
		};

		// Orientation classes
		const orientationClasses = {
			horizontal: 'flex-row',
			vertical: 'flex-col',
		};

		const contextValue: RadioGroupContextType = {
			value,
			onChange: onChange || (() => {}),
			disabled,
			name,
			showIndicator,
			indicatorVariant,
			indicatorClassName,
		};

		return (
			<RadioGroupContext.Provider value={contextValue}>
				<div
					ref={ref}
					className={cn(
						'w-full',
						// Add padding and overflow handling for tick indicator
						indicatorVariant === 'tick' && 'pr-3 pt-3',
						className
					)}
					{...props}
				>
					<RadioGroup
						value={value ?? defaultValue ?? null}
						onChange={onChange}
						disabled={disabled}
						by={by}
						name={name}
					>
						<div
							className={cn(
								'flex',
								orientationClasses[orientation],
								gapClasses[gap]
							)}
						>
							{children}
						</div>
					</RadioGroup>
				</div>
			</RadioGroupContext.Provider>
		);
	}
);

MyRadioGroup.displayName = 'MyRadioGroup';

// RadioGroup Option component props
interface MyRadioOptionProps extends ComponentPropsWithoutRef<'div'> {
	value: any;
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
	showIndicator?: boolean;
	indicatorVariant?: 'circle' | 'check' | 'tick';
	indicatorClassName?: string;
}

// RadioGroup Option component
export const MyRadioOption = forwardRef<HTMLDivElement, MyRadioOptionProps>(
	(
		{
			value,
			disabled: optionDisabled = false,
			className,
			children,
			showIndicator: optionShowIndicator,
			indicatorVariant: optionIndicatorVariant,
			indicatorClassName: optionIndicatorClassName,
			...props
		},
		ref
	) => {
		const {
			disabled: groupDisabled,
			showIndicator: groupShowIndicator,
			indicatorVariant: groupIndicatorVariant,
			indicatorClassName: groupIndicatorClassName,
		} = useRadioGroupContext();

		const disabled = groupDisabled || optionDisabled;
		const showIndicator = optionShowIndicator ?? groupShowIndicator;
		const indicatorVariant =
			optionIndicatorVariant ?? groupIndicatorVariant;
		const indicatorClassName =
			optionIndicatorClassName ?? groupIndicatorClassName;

		const renderIndicator = (checked: boolean) => {
			if (!showIndicator) return null;

			const baseIndicatorClasses = 'absolute transition-all duration-200';

			switch (indicatorVariant) {
				case 'circle':
					return (
						<div
							className={cn(
								baseIndicatorClasses,
								'top-2 right-2 w-4 h-4 rounded-full border-2',
								checked
									? 'bg-primary border-primary'
									: 'bg-transparent border-border',
								disabled && 'opacity-50',
								indicatorClassName
							)}
						>
							{checked && (
								<div className='w-full h-full rounded-full bg-white scale-50' />
							)}
						</div>
					);

				case 'check':
					return (
						<div
							className={cn(
								baseIndicatorClasses,
								'top-2 right-2 w-5 h-5 rounded-md border flex items-center justify-center',
								checked
									? 'bg-primary border-primary text-white'
									: 'bg-transparent border-border',
								disabled && 'opacity-50',
								indicatorClassName
							)}
						>
							{checked && <CheckIcon className='w-3 h-3' />}
						</div>
					);

				case 'tick':
					return (
						<div
							className={cn(
								baseIndicatorClasses,
								'top-0 right-0 transform translate-x-1/2 -translate-y-1/2',
								disabled && 'opacity-50'
							)}
						>
							{checked && (
								<div
									className={cn(
										'w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg',
										'flex items-center justify-center',
										indicatorClassName
									)}
								>
									<CheckIcon className='w-3 h-3 text-white' />
								</div>
							)}
						</div>
					);

				default:
					return null;
			}
		};

		return (
			<RadioGroup.Option value={value} disabled={disabled}>
				{({ checked, focus }) => (
					<div
						ref={ref}
						className={cn(
							'relative cursor-pointer transition-all duration-200',
							'focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2',
							checked &&
								indicatorVariant === 'tick' &&
								'ring-2 ring-primary/30',
							disabled && 'opacity-50 cursor-not-allowed',
							focus && 'ring-2 ring-primary/60 ring-offset-2',
							// Add proper spacing for tick indicator to prevent clipping
							indicatorVariant === 'tick' && 'mr-3 mt-3',
							className
						)}
						{...props}
					>
						{/* Render the wrapped component */}
						{isValidElement(children)
							? cloneElement(
									children as React.ReactElement<
										React.HTMLAttributes<Element>
									>,
									{
										...(children.props || {}),
										className: cn(
											(children.props as any)?.className,
											checked && 'ring-2 ring-primary/20',
											focus && 'ring-2 ring-primary/40'
										),
									}
								)
							: children}

						{/* Render the indicator */}
						{renderIndicator(checked)}
					</div>
				)}
			</RadioGroup.Option>
		);
	}
);

MyRadioOption.displayName = 'MyRadioOption';

// Compound component pattern
const MyRadioGroupRoot = Object.assign(MyRadioGroup, {
	Option: MyRadioOption,
});

export { MyRadioGroupRoot };
