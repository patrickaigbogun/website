'use client';

import React, { useCallback, useRef, useState } from 'react';

export type ChipsInputProps = {
	value?: string[];
	defaultValue?: string[];
	onChange?: (items: string[]) => void;
	parseItemsAction?: (text: string) => string[]; // How to split text into items
	delimiterKeys?: string[]; // keys that commit input
	dedupe?: boolean;
	disabled?: boolean;
	placeholder?: string;
	// Class hooks for styling from the outside
	className?: string; // container
	inputClassName?: string;
	chipClassName?: string;
	chipRemoveClassName?: string;
	// Custom render for a chip
	renderChipAction?: (
		item: string,
		remove: () => void,
		index: number
	) => React.ReactNode;
	// Forward to input
	inputProps?: Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		| 'value'
		| 'onChange'
		| 'onPaste'
		| 'onDrop'
		| 'onKeyDown'
		| 'disabled'
		| 'placeholder'
	>;
};

function defaultParse(text: string): string[] {
	return text
		.split(/[\s,;\n\r]+/g)
		.map(s => s.trim())
		.filter(Boolean);
}

export function ChipsInput({
	value,
	defaultValue,
	onChange,
	parseItemsAction = defaultParse,
	delimiterKeys = ['Enter', ',', ' '],
	dedupe = true,
	disabled,
	placeholder,
	className,
	inputClassName,
	chipClassName,
	chipRemoveClassName,
	renderChipAction,
	inputProps,
}: ChipsInputProps) {
	const isControlled = value !== undefined;
	const [internalItems, setInternalItems] = useState<string[]>(
		defaultValue || []
	);
	const items = isControlled ? (value as string[]) : internalItems;
	const [input, setInput] = useState('');
	const inputRef = useRef<HTMLInputElement | null>(null);

	const setItems = useCallback(
		(next: string[]) => {
			if (isControlled) onChange?.(next);
			else setInternalItems(next);
		},
		[isControlled, onChange]
	);

	const commit = useCallback(
		(text: string) => {
			const parsed = parseItemsAction(text);
			if (!parsed.length) return;
			const next = dedupe
				? Array.from(new Set([...(items || []), ...parsed]))
				: [...(items || []), ...parsed];
			setItems(next);
			setInput('');
			// refocus to allow quick entry
			requestAnimationFrame(() => inputRef.current?.focus());
		},
		[items, parseItemsAction, dedupe, setItems]
	);

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (disabled) return;
		if (delimiterKeys.includes(e.key)) {
			e.preventDefault();
			if (input.trim()) commit(input);
		} else if (e.key === 'Backspace' && !input && items.length) {
			// remove last chip when input empty
			const next = items.slice(0, -1);
			setItems(next);
		}
	};

	const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		if (disabled) return;
		const text = e.clipboardData.getData('text');
		if (text) {
			e.preventDefault();
			commit(text);
		}
	};

	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		if (disabled) return;
		e.preventDefault();
		const text = e.dataTransfer.getData('text');
		if (text) commit(text);
	};

	const removeAt = (idx: number) => {
		const next = items.filter((_, i) => i !== idx);
		setItems(next);
	};

	return (
		<div
			className={className}
			onDragOver={e => e.preventDefault()}
			onDrop={onDrop}
		>
			<div>
				{items.map((item, i) =>
					renderChipAction ? (
						<React.Fragment key={`${item}-${i}`}>
							{renderChipAction(item, () => removeAt(i), i)}
						</React.Fragment>
					) : (
						<span key={`${item}-${i}`} className={chipClassName}>
							{item}
							<button
								type='button'
								aria-label={`Remove ${item}`}
								onClick={() => removeAt(i)}
								className={chipRemoveClassName}
							>
								×
							</button>
						</span>
					)
				)}
			</div>
			<input
				ref={inputRef}
				disabled={disabled}
				placeholder={placeholder}
				className={inputClassName}
				value={input}
				onChange={e => setInput(e.target.value)}
				onKeyDown={onKeyDown}
				onPaste={onPaste}
				{...inputProps}
			/>
		</div>
	);
}

export default ChipsInput;
