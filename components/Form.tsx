import { FormButtonProps, FormProps, TextAreaLabelProps, TextAreaProps } from '@/types/components'



export function Form({onSubmit, children, action, method, autoComplete }:FormProps) {
  return (
	<form className='p-2 border ' onSubmit={onSubmit} action={action} method={method} autoComplete={autoComplete}>
		{children}
	</form>
  )
}

export function TextAreaLabel({ name, className, children }: TextAreaLabelProps) {
	return(
		<label htmlFor={name} className={className}>{children}</label>

	)
}


export function TextArea({ id, name, rows, className, placeholder, value }: TextAreaProps) {
	return (
		<>
			<label htmlFor="message" className="text-white">Type your message here:</label>
			<textarea
				id={id}
				name={name}
				rows={rows}
				className={`${className}`}
				placeholder={placeholder}
				required
			></textarea>
		</>
	)
}



export function FormButton({children, title}:FormButtonProps) {


  return (
	<button
		type='submit'
		title={title}
		aria-label={title}
		className="relative inline-block p-3 m-0 overflow-hidden font-bold text-black transition-all duration-300 ease-out bg-white border-4 border-black rounded-xl hover:border-white group"
	>
		<span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out bg-black group-hover:w-full"></span>
		<span className="relative z-10 group-hover:text-white">
			{children}
		</span>
	</button>
  )
}
