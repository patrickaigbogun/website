'use client';

import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
} from '@headlessui/react';
import { cn } from '@lib/utils';
import { ArrowDownIcon, CheckIcon } from '@phosphor-icons/react';
import {
	ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	useContext,
} from 'react';

// Context for passing down listbox state
interface ListboxContextType {
	value: any;
	onChange: (value: any) => void;
	disabled?: boolean;
	placeholder?: string;
	multiple?: boolean;
}

const ListboxContext = createContext<ListboxContextType | null>(null);

const useListboxContext = () => {
	const context = useContext(ListboxContext);
	if (!context) {
		throw new Error('Listbox components must be used within MyListbox');
	}
	return context;
};

// Main Listbox component props
interface MyListboxProps {
	name?: string;
	value?: any;
	onChange?: (value: any) => void;
	defaultValue?: any;
	disabled?: boolean;
	multiple?: boolean;
	placeholder?: string;
	className?: string;
	buttonClassName?: string;
	optionsClassName?: string;
	size?: '1' | '2' | '3' | '4';
	variant?: 'default' | 'ghost' | 'outline';
	children: React.ReactNode;
	by?: string | ((a: any, b: any) => boolean);
}

// Main Listbox component
export const MyListbox = forwardRef<HTMLDivElement, MyListboxProps>(
	(
		{
			name,
			value,
			onChange,
			defaultValue,
			disabled = false,
			multiple = false,
			placeholder = 'Select an option...',
			className,
			buttonClassName,
			optionsClassName,
			size = '2',
			variant = 'default',
			children,
			by,
			...props
		},
		ref
	) => {
		// Size mapping
		const sizeClasses = {
			'1': 'px-2 py-1 text-xs min-h-6', // 24px min height
			'2': 'px-3 py-1.5 text-sm min-h-8', // 32px min height
			'3': 'px-3 py-2 text-base min-h-10', // 40px min height
			'4': 'px-4 py-2.5 text-lg min-h-12', // 48px min height
		};

		// Variant styles using your theme variables
		const variantClasses = {
			default:
				'bg-bg border border-border text-text hover:bg-bgDark focus:ring-2 focus:ring-primary/60',
			ghost: 'bg-transparent border-0 text-text hover:bg-bgDark focus:ring-2 focus:ring-primary/60',
			outline:
				'bg-transparent border border-border text-text hover:bg-bgDark focus:ring-2 focus:ring-primary/60',
		};

		const contextValue: ListboxContextType = {
			value,
			onChange: onChange || (() => {}),
			disabled,
			placeholder,
			multiple,
		};

		// Get display value for button
		const getDisplayValue = (currentValue: any) => {
			if (!currentValue) return placeholder;
			if (multiple && Array.isArray(currentValue)) {
				if (currentValue.length === 0) return placeholder;
				if (currentValue.length === 1) return currentValue[0];
				return `${currentValue.length} selected`;
			}
			return currentValue;
		};

		return (
			<ListboxContext.Provider value={contextValue}>
				<div ref={ref} className={cn('relative', className)} {...props}>
					<Listbox
						value={value || defaultValue}
						onChange={onChange}
						disabled={disabled}
						multiple={multiple}
						by={by}
						name={name}
					>
						<ListboxButton
							className={cn(
								'relative w-full rounded-md transition-all duration-200',
								'flex items-center justify-between',
								'focus:outline-none focus:ring-offset-2',
								'disabled:opacity-50 disabled:cursor-not-allowed',
								sizeClasses[size],
								variantClasses[variant],
								buttonClassName
							)}
						>
							<span className='block truncate text-left'>
								{getDisplayValue(value)}
							</span>
							<ArrowDownIcon
								className='ml-2 h-4 w-4 text-textMuted flex-shrink-0'
								aria-hidden='true'
							/>
						</ListboxButton>

						<ListboxOptions
							className={cn(
								'absolute z-50 mt-1 w-full overflow-auto rounded-md',
								'bg-bg border border-border shadow-lg',
								'max-h-60 py-1',
								'focus:outline-none',
								optionsClassName
							)}
						>
							{children}
						</ListboxOptions>
					</Listbox>
				</div>
			</ListboxContext.Provider>
		);
	}
);

MyListbox.displayName = 'MyListbox';

// Listbox Option component props
interface MyListboxOptionProps extends ComponentPropsWithoutRef<'div'> {
	value: any;
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
}

// Listbox Option component
export const MyListboxOption = forwardRef<HTMLDivElement, MyListboxOptionProps>(
	({ value, disabled = false, className, children, ...props }, ref) => {
		const { multiple } = useListboxContext();

		return (
			<ListboxOption
				value={value}
				disabled={disabled}
				className={({ focus, selected }) =>
					cn(
						'relative cursor-default select-none py-2 pl-3 pr-9',
						'flex items-center justify-between',
						'transition-colors duration-150',
						focus && 'bg-primary/10 text-primary',
						selected && 'bg-primary/20 text-primary font-medium',
						disabled && 'opacity-50 cursor-not-allowed',
						!focus && !selected && 'text-text',
						className
					)
				}
				{...props}
			>
				{({ selected }) => (
					<>
						<span
							className={cn(
								'block truncate',
								selected ? 'font-medium' : 'font-normal'
							)}
						>
							{children}
						</span>

						{selected && (
							<span className='absolute inset-y-0 right-0 flex items-center pr-3'>
								<CheckIcon
									className='h-4 w-4 text-primary'
									aria-hidden='true'
								/>
							</span>
						)}
					</>
				)}
			</ListboxOption>
		);
	}
);

MyListboxOption.displayName = 'MyListboxOption';

// Compound component pattern
const MyListboxRoot = Object.assign(MyListbox, {
	Option: MyListboxOption,
});

export { MyListboxRoot };
