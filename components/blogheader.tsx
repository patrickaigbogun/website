'use client'

import { DotsThreeCircleVertical } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';
import { useEffect, useState } from 'react';


interface Props {
	image: string;
	name: string;
}

function DesktopHeader({ image, name }: Props) {
	return (
		<header className="border-4 shadow-2xl border-[#20102d] flex flex-row justify-between rounded-full my-9 mx-auto w-[70%] px-4 py-3 font-bold  bg-[#180c2a]" >
			<div className="flex items-center" >
				<Link href={'/blog'}>Patrick&apos;s Blog</Link>
			</div>
			<div className="flex flex-row items-center justify-center space-x-3" >
				<div className="justify-center p-2 font-bold transition-all duration-300 ease-linear rounded-full hover:font-extrabold hover:scale-105  bg-[#4b05ad]/30" >Technology</div>
				<div className="justify-center p-2 font-bold transition-all duration-300 ease-linear rounded-full hover:font-extrabold hover:scale-105  bg-[#4b05ad]/30" >Philosophy</div>
				<div className="justify-center p-2 font-bold transition-all duration-300 ease-linear rounded-full hover:font-extrabold hover:scale-105  bg-[#4b05ad]/30" >Poetry</div>
			</div>
			<div className="flex items-center" >
				<img src={image} alt={name} width={36} height={36} className="object-fill rounded-full hover:brightness-50 hover:scale-110" />
			</div>
		</header>
	);
}

function MobileHeader({ image, name }: Props) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="flex flex-col w-[90%] my-9 mx-auto p-4 font-bold  bg-[#180c2a] rounded-3xl">
			<div className="flex items-center justify-between">
				<div>Patrick&apos;s Blog</div>
				<div className='flex items-center space-x-1' >
					<div className="flex items-center">
						<img src={image} alt={`profile image of ${name}`} width={36} height={36} className="object-fill rounded-full hover:brightness-50 hover:box-shadow-lg hover:shadow-[#2c0076] hover:scale-110" />
					</div>
					<button
						className="p-1 transition-colors rounded-full hover:bg-[#4b05ad]/30"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{/* Menu Icon */}
						<DotsThreeCircleVertical size={40} />
					</button>
				</div>
			</div>

			<div
				className={`transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-40' : 'max-h-0'}`}
			>
				<ul className="flex flex-col mt-2 space-y-2 max-w-[90%] mx-auto">
					<li>
						<div className=" p-2 rounded-full hover:bg-[#4b05ad]/30 hover:scale-105 transition-all ease-linear ">Nav Item 1</div>
					</li>
					<li>
						<div className="p-2 rounded-full hover:bg-[#4b05ad]/30 hover:scale-105 transition-all ease-linear ">Nav Item 2</div>
					</li>
					<li>
						<div className="p-2 rounded-full hover:bg-[#4b05ad]/30 hover:scale-105 transition-all ease-# ">Nav Item 3</div>
					</li>
				</ul>
			</div>


		</header>
	);
}

export function BlogHeader({ image, name }: Props) {
	const [width, setWidth] = useState<number | null>(null);

	useEffect(() => {
		// This runs on the client only, after the component has mounted
		const handleResize = () => setWidth(window.innerWidth);

		// Set the initial width when component mounts
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (width === null) {
		// Optionally, return a loading state until width is available
		return null;
	}

	if (width > 700) {
		return <DesktopHeader name={name} image={image} />;
	}
	{
		return <MobileHeader name={name} image={image} />;
	}

}
