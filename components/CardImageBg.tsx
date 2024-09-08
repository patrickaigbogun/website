'use client';

import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface CardImageBgProps {
  imageSrc: StaticImageData;
  alt:string;
  title?: string;
  tagline?: string;
  date?:string;
  excerpt?: string;
  reuse?: string;
}

export default function CardImageBg({ imageSrc,alt, title, tagline, excerpt, date, reuse }: CardImageBgProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={` ${reuse} relative overflow-hidden shadow-lg cursor-pointer rounded-3xl w-72 h-[22rem] max-w-72 group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className={`  object-cover transition-all ease-linear duration-500`}
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-4 bg-gradient-to-t from-black via-gray-950/30 to-transparent">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-sm text-gray-300">{tagline}</p>
        <p className="text-sm text-gray-300">{date}</p>

        {/* Excerpt, only visible on hover */}
        <p
          className={`mt-2 text-gray-100 text-sm  transition-all duration-300 ${
            isHovered ? 'flex ' : 'hidden'
          }`}
        >
          {excerpt}
        </p>
      </div>
    </div>
  );
}
