'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Portal } from 'radix-ui';

export default function ControlCenterButton() {
	const [expanded, setExpanded] = useState(false);
	const isDragging = useRef(false);
	const startTime = useRef(0);

	return (
		<Portal.Root>
			<motion.button
				drag
				dragMomentum={false}
				dragElastic={0.2}
				whileTap={{ scale: 0.95 }}
				onPointerDown={() => {
					startTime.current = Date.now();
					isDragging.current = false;
				}}
				onDragStart={() => {
					isDragging.current = true;
				}}
				onPointerUp={() => {
					const elapsed = Date.now() - startTime.current;
					// if it wasn’t a drag and was a quick tap
					if (!isDragging.current && elapsed < 250) {
						setExpanded(!expanded);
					}
				}}
				className={`
          fixed z-50 bottom-6 right-6
          w-14 h-14 flex items-center justify-center
          rounded-full bg-blue-600 text-white shadow-lg
          active:scale-95 transition-transform
          touch-none
        `}
			>
				⚙️
			</motion.button>

			{/* Expand strip */}
			{expanded && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					transition={{ type: 'spring', stiffness: 300, damping: 24 }}
					className='
            fixed bottom-24 right-6 z-40 flex flex-col gap-2
          '
				>
					{['💬', '🔗', '⚙️'].map((icon, i) => (
						<motion.button
							key={i}
							whileTap={{ scale: 0.9 }}
							className='w-12 h-12 bg-white/80 backdrop-blur text-xl rounded-full shadow'
						>
							{icon}
						</motion.button>
					))}
				</motion.div>
			)}
		</Portal.Root>
	);
}
