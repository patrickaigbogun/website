'use client';

import { useState, useRef } from 'react';
import { ChatTeardropText, HouseSimple, GearSix } from '@phosphor-icons/react/dist/ssr';

const DraggableSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Refs to track dragging and click handling
  const isDragging = useRef(false);
  const pointerMove = useRef(false);
  const handleClick = useRef(true);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Reset flags
    pointerMove.current = false;
    handleClick.current = true;
    isDragging.current = true;

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging.current) {
      // If movement is detected, it's no longer a click, and dragging starts
      pointerMove.current = true;
      handleClick.current = false;

      // Update the position of the sidebar during drag
      setPosition({
        x: e.clientX - e.currentTarget.offsetWidth / 2,
        y: e.clientY - e.currentTarget.offsetHeight / 2,
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    // If pointerMove is false, this means no drag occurred, so treat it as a click
    if (!pointerMove.current && handleClick.current) {
      toggleSidebar();
    }
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`fixed ${isExpanded ? 'w-64' : 'w-16'} h-16 md:h-auto md:w-16 bg-gray-800 text-white flex md:flex-col flex-row items-center justify-center md:top-4 md:left-4 bottom-4 left-1/2 transform -translate-x-1/2 md:translate-x-0`}
      style={{ top: position.y, left: position.x }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <button className="p-2">
        <HouseSimple className="w-6 h-6" />
      </button>
      {isExpanded && (
        <div className="flex flex-row md:flex-col">
          <button className="p-2">
            <ChatTeardropText className="w-6 h-6" />
          </button>
          <button className="p-2">
            <GearSix className="w-6 h-6" />
          </button>
          {/* Add more buttons as needed */}
        </div>
      )}
    </div>
  );
};

export default DraggableSidebar;
