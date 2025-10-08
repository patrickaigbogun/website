'use client';

import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from '@headlessui/react';
import { cn } from '@lib/utils';
import { ArrowDownIcon, CheckIcon } from '@phosphor-icons/react';
import {
	Children,
	ComponentPropsWithoutRef,
	createContext,
	forwardRef,
	isValidElement,
	ReactElement,
	useContext,
	useMemo,
	useState,
} from 'react';

// Context for passing down combobox state
interface ComboboxContextType {
	value: any;
	onChange: (value: any) => void;
	disabled?: boolean;
	placeholder?: string;
	multiple?: boolean;
	query: string;
	setQuery: (query: string) => void;
	displayValue?: (item: any) => string;
}

const ComboboxContext = createContext<ComboboxContextType | null>(null);

const useComboboxContext = () => {
	const context = useContext(ComboboxContext);
	if (!context) {
		throw new Error('Combobox components must be used within MyCombobox');
	}
	return context;
};

// Option data interface
interface ComboboxOptionData {
	value: any;
	label: string;
	disabled?: boolean;
}

// Main Combobox component props
interface MyComboboxProps {
	name?: string;
	value?: any;
	onChange?: (value: any) => void;
	defaultValue?: any;
	disabled?: boolean;
	multiple?: boolean;
	placeholder?: string;
	className?: string;
	inputClassName?: string;
	buttonClassName?: string;
	optionsClassName?: string;
	size?: '1' | '2' | '3' | '4';
	variant?: 'default' | 'ghost' | 'outline';
	children: React.ReactNode;
	by?: string | ((a: any, b: any) => boolean);
	displayValue?: (item: any) => string;
	filterFunction?: (
		items: ComboboxOptionData[],
		query: string
	) => ComboboxOptionData[];
	nullable?: boolean;
}

// Main Combobox component
export const MyCombobox = forwardRef<HTMLDivElement, MyComboboxProps>(
	(
		{
			name,
			value,
			onChange,
			defaultValue,
			disabled = false,
			multiple = false,
			placeholder = 'Search or select...',
			className,
			inputClassName,
			buttonClassName,
			optionsClassName,
			size = '2',
			variant = 'default',
			children,
			by,
			displayValue = item => item?.toString() || '',
			filterFunction,
			nullable = true,
			...props
		},
		ref
	) => {
		const [query, setQuery] = useState('');

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

		const contextValue: ComboboxContextType = {
			value,
			onChange: onChange || (() => {}),
			disabled,
			placeholder,
			multiple,
			query,
			setQuery,
			displayValue,
		};

		// Extract options from children for filtering
		const options = useMemo(() => {
			const opts: ComboboxOptionData[] = [];
			const processChildren = (children: React.ReactNode) => {
				Children.forEach(children, child => {
					if (
						isValidElement(child) &&
						child.type === MyComboboxOption
					) {
						const optionChild =
							child as ReactElement<MyComboboxOptionProps>;
						opts.push({
							value: optionChild.props.value,
							label:
								typeof optionChild.props.children === 'string'
									? optionChild.props.children
									: optionChild.props.value?.toString() || '',
							disabled: optionChild.props.disabled,
						});
					}
				});
			};
			processChildren(children);
			return opts;
		}, [children]);

		// Filter options based on query
		const filteredOptions = useMemo(() => {
			if (query === '') return options;

			if (filterFunction) {
				return filterFunction(options, query);
			}

			return options.filter(option =>
				option.label.toLowerCase().includes(query.toLowerCase())
			);
		}, [options, query, filterFunction]);

		return (
			<ComboboxContext.Provider value={contextValue}>
				<div ref={ref} className={cn('relative', className)} {...props}>
					<Combobox
						value={value ?? defaultValue ?? null}
						onChange={onChange}
						disabled={disabled}
						multiple={multiple}
						by={by}
						name={name}
						nullable={nullable}
						onClose={() => setQuery('')}
					>
						<div className='relative'>
							<ComboboxInput
								className={cn(
									'w-full rounded-md transition-all duration-200 outline-none',
									'focus:outline-none',
									'disabled:opacity-50 disabled:cursor-not-allowed',
									'pr-8', // Space for the dropdown button
									sizeClasses[size],
									variantClasses[variant],
									inputClassName
								)}
								displayValue={item =>
									item ? displayValue(item) : ''
								}
								onChange={event => setQuery(event.target.value)}
								placeholder={placeholder}
							/>
							<ComboboxButton
								className={cn(
									'absolute inset-y-0 right-0 flex items-center pr-2',
									'transition-colors duration-200',
									disabled
										? 'cursor-not-allowed'
										: 'cursor-pointer',
									buttonClassName
								)}
							>
								<ArrowDownIcon
									className='h-4 w-4 text-textMuted'
									aria-hidden='true'
								/>
							</ComboboxButton>
						</div>

						<ComboboxOptions
							className={cn(
								'absolute z-50 mt-1 w-full overflow-auto rounded-md',
								'bg-bg border border-border shadow-lg',
								'max-h-60 py-1',
								'focus:outline-none',
								'empty:invisible',
								optionsClassName
							)}
						>
							{children}
						</ComboboxOptions>
					</Combobox>
				</div>
			</ComboboxContext.Provider>
		);
	}
);

MyCombobox.displayName = 'MyCombobox';

// Combobox Option component props
interface MyComboboxOptionProps extends ComponentPropsWithoutRef<'div'> {
	value: any;
	disabled?: boolean;
	className?: string;
	children: React.ReactNode;
}

// Combobox Option component
export const MyComboboxOption = forwardRef<
	HTMLDivElement,
	MyComboboxOptionProps
>(({ value, disabled = false, className, children, ...props }, ref) => {
	const { multiple } = useComboboxContext();

	return (
		<ComboboxOption
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
		</ComboboxOption>
	);
});

MyComboboxOption.displayName = 'MyComboboxOption';

// Compound component pattern
const MyComboboxRoot = Object.assign(MyCombobox, {
	Option: MyComboboxOption,
});

export { MyComboboxRoot };
