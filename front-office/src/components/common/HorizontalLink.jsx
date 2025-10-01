"use client";
import React, { useRef } from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const HorizontalLink = ({ Catégorie, selectedCategory, onCategorySelect }) => {
    const menuRef = useRef();

    const scrollLeft = () => {
        menuRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    };

    const scrollRight = () => {
        menuRef.current?.scrollBy({ left: 200, behavior: "smooth" });
    };

    return (
        <div className="flex justify-center items-center gap-3 w-full px-4     ">
            {/* Left Arrow only on mobile */}
            <div className="md:hidden block mt-1">
                <button
                    onClick={scrollLeft}
                    className="texr-gray-100     cursor-pointer    hover:bg-gray-700"
                >
                    <IoIosArrowBack className="text-[30px] text-black/60 " />
                </button>
            </div>

            {/* Scrollable Menu */}
            <div
                ref={menuRef}
                className=" 
         flex gap-4 overflow-x-auto md:overflow-x-visible scroll-smooth no-scrollbar whitespace-nowrap   w-auto">
                {Catégorie.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => onCategorySelect(category)}
                        className={`group my-2 relative flex items-center font-semibold text-[14.5px]  justify-around rounded-full py-1 mx-2 whitespace-nowrap  transition-all duration-300 
      ${selectedCategory === category ? "text-[#FFBB00]" : "hover:text-[#FFBB00] text-black/70"}`}
                    >
                        {category}
                        <span
                            className={`absolute     left-1/2 -translate-x-1/2 -bottom-0.5 h-[1.3px] bg-[#FFBB00] w-10 transition-all duration-300`}
                        />
                        <span
                            className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-[1.5px] bg-[#FFBB00] transition-all duration-300
    ${selectedCategory === category ? 'w-full  ' : '    group-hover:w-full md:group-hover:w-full md:w-0 w-10'}`}
                        />
                    </button>
                ))}
            </div>

            {/* Right Arrow only on mobile */}
            <div className="md:hidden block mt-1">
                <button
                    onClick={scrollRight}
                    className="texr-gray-100     cursor-pointer    hover:bg-gray-700"
                >
                    <IoIosArrowForward className="text-[30px] text-black/60 " />
                </button>
            </div>
        </div>
    );
};

export default HorizontalLink;
