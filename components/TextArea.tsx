import { TextAreaLabelProps, TextAreaProps } from '@/types/components'
import React from 'react'



export function TextArea({ id, name, rows, reuse, placeholder, }: TextAreaProps) {
	return (
		<>
			<label htmlFor="message" className="text-white">Type your message here:</label>
			<textarea
				id={id}
				name={name}
				rows={rows}
				className={`${reuse}`}
				placeholder={placeholder}
				required
			></textarea>
		</>
	)
}

export function TextAreaLabel({ name, reuse, children }: TextAreaLabelProps) {
	return(
		<label htmlFor={name} className={reuse}>{children}</label>

	)
}

export function TextAreaNoRq({ id, name, rows, reuse, placeholder, }: TextAreaProps) {
	return (
		<>

			<textarea
				id={id}
				name={name}
				rows={rows}
				className={`${reuse}`}
				placeholder={placeholder}
			></textarea>
		</>
	)
}
