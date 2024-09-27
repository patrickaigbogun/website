import { FormButtonProps, FormProps, FormLabelProps, FormTextAreaProps } from '@/types/components'



export function Form({ onSubmit, children, action, method, autoComplete }: FormProps) {
	return (
		<form className='p-2 border className="w-full md:w-[75%] mx-auto space-y-3 flex" ' onSubmit={onSubmit} action={action} method={method} autoComplete={autoComplete}>
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



export function FormButton({ children, title, autoFocus, disabled, formAction, popoverTargetAction, className, }: FormButtonProps) {
	return (
		<button
			autoFocus={autoFocus}
			disabled={disabled}
			formAction={formAction}
			popoverTargetAction={popoverTargetAction}
			type='submit'
			title={title}
			aria-label={title}
			className={`  ${className} relative inline-block p-2 m-0 overflow-hidden font-bold text-black transition-all duration-300 ease-out bg-white border-4 border-black hover:border-white group`}
		>
			<span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out bg-black group-hover:w-full"></span>
			<span className="relative z-10 group-hover:text-white">
				{children}
			</span>
		</button>
	)
}
