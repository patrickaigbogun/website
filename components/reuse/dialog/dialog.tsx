// Dialog primitive wrapper with Tailwind styling and theme variable awareness
import { cn } from '@lib/utils';
import { XCircleIcon } from '@phosphor-icons/react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react';

interface DialogContentProps
	extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
	title?: string;
	description?: string;
}

export const DialogContent = forwardRef<
	ComponentRef<typeof DialogPrimitive.Content>,
	DialogContentProps
>(
	(
		{ children, title = 'Dialog', description, className = '', ...props },
		ref
	) => (
		<DialogPrimitive.Portal>
			<DialogPrimitive.Overlay className='fixed inset-0 backdrop:filter backdrop-blur-md bg-stone-500/30 z-[60]' />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70]',
					'p-4 w-[89%] max-h-[75vh] overflow-y-auto rounded-lg',
					'bg-bg text-text',
					'focus:outline-none',
					className
				)}
				{...props}
			>
				<DialogPrimitive.Title className='text-lg font-semibold'>
					{title}
				</DialogPrimitive.Title>

				<DialogPrimitive.Description className='text-textMuted text-base'>
					{description}
				</DialogPrimitive.Description>

				{children}
				<DialogPrimitive.Close
					aria-label='Close dialog'
					className='outline-none absolute right-2 top-2 inline-flex p-1 focus:outline-none'
				>
					<XCircleIcon size={24} weight='duotone' />
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	)
);
DialogContent.displayName = 'DialogContent';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
