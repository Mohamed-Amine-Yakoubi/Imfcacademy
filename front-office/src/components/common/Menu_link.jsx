'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from '@/icons';
import { FaArrowLeft } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
  // <- icons

export default function Menu_link({ Menu_item, setActiveSpecialite }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = Menu_item.length;
  const gap = 270;

  const handleClick = (index) => {
    setActiveIndex(index);
    setActiveSpecialite(Menu_item[index].Specialite);
  };

  const handlePrev = () => {
    const newIndex = (activeIndex - 1 + total) % total;
    handleClick(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % total;
    handleClick(newIndex);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[250px]">
      {/* Left arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-0 z-100 p-2 bg-gray-200 shadow rounded-full hover:bg-gray-100 block md:hidden mx-5"
      >
        <IoIosArrowBack size={20} />      </button>

      {/* Items */}
      {Menu_item.map((item, index) => {
        let offset = index - activeIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        let scale = 0.5;
        if (offset === 0) scale = 0.8;
        else if (Math.abs(offset) === 1) scale = 0.6;
        else if (Math.abs(offset) === 2) scale = 0.3;

        const translateX = offset * gap;
        const dimmed = Math.abs(offset) === 2;

        return (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="absolute cursor-pointer transition-all duration-500 text-center"
            style={{
              transform: `translateX(${translateX}px) scale(${scale})`,
              zIndex: offset === 0 ? 50 : 40 - Math.abs(offset),
              opacity: Math.abs(offset) > 2 ? 0 : 1,
            }}
          >
            <Image
              src={item.src}
              alt={item.label}
              width={200}
              height={200}
              className={`w-[200px] h-[200px] mb-4 object-contain ${
                dimmed ? "opacity-50" : "opacity-100"
              }`}
            />
            {offset === 0 && (
              <span className="mt-10 text-center text-[18px] text-gray-400 font-medium">
                {item.label}
              </span>
            )}
          </div>
        );
      })}

      {/* Right arrow */}
      <button
        onClick={handleNext}
        className="absolute right-0 z-100 p-2 bg-gray-200 shadow rounded-full hover:bg-gray-100 block md:hidden mx-5"
 
    >
         <IoIosArrowForward size={20} />      </button>
    </div>
  );
}
