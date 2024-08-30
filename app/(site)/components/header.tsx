"use client";

import { useState } from "react";
import Link from "next/link";
import { montserrat } from "@/fonts/fonts";

type Page = {
    _id: string;
    slug: string;
    title: string;
};

interface HeaderProps {
    pages: Page[];
}

export default function Header({ pages }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={`${montserrat.className} text-3xl flex items-center justify-between p-4`}>
            <Link
                href="/"
                className="font-bold text-transparent transition ease-linear bg-gradient-to-r from-green-900 via-green-700 to-green-300 bg-clip-text hover:scale-125"
                aria-label="Go to homepage"
            >
                Oti.
            </Link>
            {/* Menu button for smaller screens */}
            <button
                onClick={toggleMenu}
                className="block p-2 text-white bg-green-700 rounded lg:hidden"
                aria-label="Toggle navigation menu"
            >
                Menu
            </button>
            {/* Navigation Links */}
            <div className={`flex-col lg:flex-row gap-3 text-xl text-gray-200 lg:flex ${isMenuOpen ? "flex" : "hidden"} lg:block`}>
                {pages.map((page) => (
                    <Link
                        href={`/${page.slug}`}
                        key={page._id}
                        className="p-2 font-medium text-white transition ease-linear sm:font-medium hover:font-bold hover:underline hover:decoration-green-500 hover:scale-110"
                        aria-label={`Go to ${page.title}`}
                    >
                        {page.title}
                    </Link>
                ))}
            </div>
        </header>
    );
}
