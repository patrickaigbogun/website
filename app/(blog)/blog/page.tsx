'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Hero from '@/components/ui/hero';
import Featured from '@/components/ui/featured';
import Promo from '@/components/ui/promo';
import Footer from '@/components/ui/footer';
import { useIsClient } from '@uidotdev/usehooks';

export default function Home() {
	const isClient = useIsClient();

	useEffect(() => {
		if (!isClient) return;

		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenis.destroy();
		};
	}, [isClient]);

	if (!isClient) {
		return null;
	}

	return (
		<main>
			<Hero />
			<Featured />
			<Promo />
			<Footer />
		</main>
	);
}
