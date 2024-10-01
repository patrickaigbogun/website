import { FormButtonProps, FormProps, FormLabelProps, FormTextAreaProps } from '@/types/components'



export function Form({ onSubmit, children, action, method, autoComplete }: FormProps) {
	return (
		<form className='space-y-3' onSubmit={onSubmit} action={action} method={method} autoComplete={autoComplete}>
			{children}
		</form>
	)
}

export function FormLabel({ htmlFor, className, children }: FormLabelProps) {
	return (
		<label htmlFor={htmlFor} className={className}>{children}</label>

	)
}


export function FormTextArea({ id, name, rows, className, placeholder, value, required, onChange }: FormTextAreaProps) {
	return (
		<>
			<textarea
				id={id}
				name={name}
				rows={rows}
				className={`${className}`}
				placeholder={placeholder}
				value={value}
				required={required}
				onChange={onChange}
			/>
		</>
	)
}



export function FormButton({ children, title, autoFocus, disabled, formAction, popovertargetaction, className, }: FormButtonProps) {
	return (
		<button
			autoFocus={autoFocus}
			disabled={disabled}
			formAction={formAction}
			// popoverTargetAction={popovertargetaction}
			type='submit'
			title={title}
			aria-label={title}
			className={`  ${className} relative inline-block p-2 m-0 overflow-hidden font-bold text-black transition-all duration-300 ease-out bg-white border-4 border-inherit hover:border-[#9f75ff]/60  group`}
		>
			<span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out bg-black group-hover:w-full"></span>
			<span className="relative group-hover:text-white">
				{children}
			</span>
		</button>
	)
}
