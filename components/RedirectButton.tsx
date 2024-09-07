import React from 'react'
import { LinkProps } from '@/types/components';
import Link from 'next/link';


export default function RedirectButton({ target, children, title }: LinkProps) {
	return (
		<div >
			<Link href={target} title={title} target="_blank" rel="noopener noreferrer" className="relative inline-block p-3 m-0 overflow-hidden font-bold text-black transition-all duration-300 ease-out bg-white border-4 border-black rounded-lg hover:border-white group">
				<span className="absolute top-0 left-0 w-0 transition-all duration-300 ease-out bg-black group-hover:w-full group-hover:h-full"></span>
				<span className="relative group-hover:text-white">{children}</span>
			</Link>
		</div>
	)
}
