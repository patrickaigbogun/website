'use client';

import { useState, useRef } from 'react';

interface DraggableWrapperProps {
	children: React.ReactNode;
	Top: number;
	Left: number;
}

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({
	children,
	Top,
	Left,
}) => {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [transform, setTransform] = useState({ x: Top, y: Left });
	const [startPos, setStartPos] = useState({ x: 0, y: 0 });

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation(); // Ensure pointer down doesn't prevent clicks
		setIsDragging(true);
		setStartPos({ x: e.clientX - transform.x, y: e.clientY - transform.y });

		// Set pointer capture to ensure the element receives pointer events even when the pointer moves outside
		elementRef.current?.setPointerCapture(e.pointerId);
	};

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (!isDragging) return;

		const newX = e.clientX - startPos.x;
		const newY = e.clientY - startPos.y;

		setTransform({ x: newX, y: newY });
	};

	const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
		setIsDragging(false);
		elementRef.current?.releasePointerCapture(e.pointerId);
	};

	return (
		<div
			ref={elementRef}
			style={{
				zIndex: 30,
				position: 'fixed',
				top: `${Top}px`,
				left: `${Left}px`,
				transform: `translate(${transform.x}px, ${transform.y}px)`,
				cursor: isDragging ? 'grabbing' : 'grab',
				touchAction: 'none', // Prevents scrolling while dragging
			}}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp} // Ensures drag stops if pointer is interrupted
		>
			{children}
		</div>
	);
};

export default DraggableWrapper;
