'use client';

import { useState } from 'react';
import { ChatTeardropText, HouseSimple, GearSix } from '@phosphor-icons/react/dist/ssr'; // Example SVG icons from Heroicons

const DraggableSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className={`fixed ${isExpanded ? 'w-64' : 'w-16'} h-16 md:h-auto md:w-16 bg-gray-800 text-white flex md:flex-col flex-row items-center justify-center md:top-4 md:left-4 bottom-4 left-1/2 transform -translate-x-1/2 md:translate-x-0`}
      style={{ top: position.y, left: position.x }}
      onMouseDown={(e) => e.target === e.currentTarget && e.preventDefault()}
      onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
    >
      <button
        className="p-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
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
