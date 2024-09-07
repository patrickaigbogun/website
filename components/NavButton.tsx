import { ButtonProps } from '@/types/components'
import React from 'react'



export function BackBtn({ children }: ButtonProps) {
	return (
		<button
			onClick={() => window.history.back()}
			title="Go back"
			aria-label="Go back"
			className="relative inline-block p-3 m-0 overflow-hidden font-bold text-black transition-all duration-300 ease-out bg-white border-4 border-black rounded-xl hover:border-white group"
		>
			<span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out bg-black group-hover:w-full"></span>
			<span className="relative z-10 group-hover:text-white">
				{children}
			</span>
		</button>
	)
}



export function ForwardBtn({ children }: ButtonProps) {
	return (
		<button
			onClick={() => window.history.forward()}
			title="Go back"
			aria-label="Go back"
			className="relative inline-block p-3 m-0 overflow-hidden font-bold text-black transition-all duration-300 ease-out bg-white border-4 border-black rounded-xl hover:border-white group"
		>
			<span className="absolute top-0 left-0 w-0 h-full transition-all duration-300 ease-out bg-black group-hover:w-full"></span>
			<span className="relative z-10 group-hover:text-white">
				{children}
			</span>
		</button>
	)
}