'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from '@/components/ui/hero';
import Featured from '@/components/ui/featured';
import Promo from '@/components/ui/promo';
import Footer from '@/components/ui/footer';
import { useIsClient } from '@uidotdev/usehooks';
import { ScrollArea } from '@components/ui/scroll-area';

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
			<ScrollArea maskHeight={10}>
				<Hero />
				<Featured />
				<Promo />
				<Footer />
			</ScrollArea>
		</main>
	);
}
