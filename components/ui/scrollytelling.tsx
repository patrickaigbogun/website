'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type ScrollytellingStep = {
	id: string;
	scrollContent: React.ReactNode;
	pinnedContent: React.ReactNode;
};

export function Scrollytelling({ steps }: { steps: ScrollytellingStep[] }) {
	const [active, setActive] = useState(0);
	const prevActive = useRef(0);

	const direction = active > prevActive.current ? 1 : -1;
	prevActive.current = active;

	return (
		<div className='grid grid-cols-2 gap-8 max-w-6xl mx-auto'>
			{/* Scroll column */}
			<div className='relative space-y-48'>
				{steps.map((step, i) => {
					const { ref } = useInView({
						threshold: 0.5,
						onChange: inView => {
							if (inView) setActive(i);
						},
					});

					return (
						<div
							key={step.id}
							ref={ref}
							className='min-h-[80vh] flex items-center'
						>
							{step.scrollContent}
						</div>
					);
				})}
			</div>

			{/* Pinned column with animation */}
			<div className='sticky top-20 h-[80vh] flex items-center justify-center overflow-hidden'>
				<AnimatePresence
					mode='popLayout'
					initial={false}
					custom={direction}
				>
					<motion.div
						key={steps[active].id}
						custom={direction}
						variants={{
							enter: (dir: number) => ({
								x: dir > 0 ? 100 : -100,
								opacity: 0,
							}),
							center: { x: 0, opacity: 1 },
							exit: (dir: number) => ({
								x: dir > 0 ? -100 : 100,
								opacity: 0,
							}),
						}}
						initial='enter'
						animate='center'
						exit='exit'
						transition={{ duration: 0.5, ease: 'easeInOut' }}
						className='absolute w-full h-full flex items-center justify-center'
					>
						{steps[active].pinnedContent}
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
