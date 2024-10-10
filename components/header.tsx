// components/Header.tsx
'use client';

import Link from "next/link";
import { montserrat } from "@/fonts/fonts";
import { HeaderProps } from "@/types/components";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

function Header({ pages }: HeaderProps) {
	return (
		<div>
			<Disclosure as="nav" className="bg-green-800/30 backdrop-blur-lg border-t-green-500 rounded-2xl">
			{({ open }) => (
				<div
					className={clsx(
						"max-w-7xl px-4 sm:px-6 lg:px-8",
						montserrat.className
					)}
				>
					<div className="flex justify-between h-16">
						{/* Logo Section */}
						<div className="flex items-center flex-shrink-0">
							<Link href="/portfolio" aria-label="Go to homepage">
								<span className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text">
									Oti.
								</span>
							</Link>
						</div>

						{/* Desktop Menu */}
						<div className="hidden lg:flex lg:items-center lg:space-x-4">
							{pages.map((page) => (
								<Link
									key={page._id}
									href={`/portfolio/${page.slug}`}
									className="px-3 py-2 text-sm font-medium text-gray-300 transition duration-300 rounded-md hover:text-white hover:bg-green-400/10 hover:font-bold"
									aria-label={`Go to ${page.title}`}
								>
									{page.title}
								</Link>
							))}
						</div>

						{/* Mobile Menu Button */}
						<div className="flex lg:hidden">
							<DisclosureButton
								className="inline-flex items-center justify-center p-2 text-white rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
								aria-label="Toggle navigation menu"
							>
								{open ? (
									<XMarkIcon className="block w-10 h-6" aria-hidden="true" />
								) : (
									<Bars3Icon className="block w-10 h-6" aria-hidden="true" />
								)}
							</DisclosureButton>
						</div>
					</div>

					{/* Mobile Menu */}
					<DisclosurePanel className="lg:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{pages.map((page) => (
								<Link
									key={page._id}
									href={`/${page.slug}`}
									className="block px-3 py-2 text-base font-medium text-gray-300 transition duration-300 rounded-xl w-fit hover:text-white hover:bg-green-400/10 hover:font-bold"
									aria-label={`Go to ${page.title}`}
								>
									{page.title}
								</Link>
							))}
						</div>
					</DisclosurePanel>
				</div>
			)}
		</Disclosure>
		</div>
	);
}

export default Header;