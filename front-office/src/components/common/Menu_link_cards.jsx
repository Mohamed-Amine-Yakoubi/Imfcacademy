'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { poppins } from '@/Styles/fonts/fonts';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export default function Menu_link_cards({ Menu_item, setActiveSpecialite, image }) {
  // Filtrer les catégories qui ont au moins un item dans Menu_item
  const itemsByCategory = (specialite) =>
    Menu_item.filter(
      item =>
        item.Specialite &&
        item.Specialite.toLowerCase() === specialite.toLowerCase()
    );

  const categoriesWithData = image
    .map(imgObj => imgObj.Specialite)
    .filter(cat => itemsByCategory(cat).length > 0);

  const [activeIndex, setActiveIndex] = useState(0);
  const total = categoriesWithData.length;
  const gap = 400;

  // Gérer le clic sur une carte pour changer la catégorie active
  const handleClick = (index) => {
    setActiveIndex(index);
    setActiveSpecialite(categoriesWithData[index]);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setActiveSpecialite(categoriesWithData[(activeIndex - 1 + total) % total]);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    setActiveSpecialite(categoriesWithData[(activeIndex + 1) % total]);
  };

  return (
    <div className="relative flex items-center justify-center w-full   h-[500px]     ">

        <button
        onClick={handlePrev}
        className="absolute left-0 z-100 p-2 bg-gray-200 shadow rounded-full hover:bg-gray-100 block md:hidden"
      >
        <IoIosArrowBack size={20} />
      </button>
      {/* Cartes pour chaque catégorie */}
      {categoriesWithData.map((cat, index) => {
        const itemsInSpecialite = itemsByCategory(cat);

        let offset = index - activeIndex;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        // Montrer seulement les cartes -1, 0, +1
        if (Math.abs(offset) > 1) return null;

        const scale = offset === 0 ? 1.1 : 0.8;
        const translateX = offset * gap;

        // Obtenir l'image de la catégorie
        const SpecialiteImage = image.find(
          imgObj => imgObj.Specialite.toLowerCase() === cat.toLowerCase()
        )?.img;

        return (
          <div
            key={`${cat}-${index}`}
            onClick={() => handleClick(index)}
            className="absolute cursor-pointer shadow-sm transition-all duration-500 p-6 rounded-2xl bg-gray-50 text-left "
            style={{
              transform: `translateX(${translateX}px) scale(${scale})`,
              zIndex: offset === 0 ? 50 : 40 - Math.abs(offset),
              opacity: Math.abs(offset) > 2 ? 0 : 1,
              width: '350px'
            }}
          >
            {SpecialiteImage && (
              <div className="relative flex justify-center">
                <Image
                  className="absolute -bottom-6 w-[100px] h-[100px] object-contain rounded-full"
                  width={100}
                  height={100}
                  src={SpecialiteImage}
                  alt={`photo ${cat}`}
                  loading="lazy"
                />
              </div>
            )}

            <h3 className="text-center font-semibold mb-4 pt-7">{cat}</h3>

            {/* Liste des items */}
            {itemsInSpecialite.map((item, i) => (
              <div className="flex-1 min-w-0 mb-3" key={`${cat}-${i}`}>
                <div className="flex items-center w-full">
                  <div
                    className={`${poppins.className} text-black/80 text-[13px] truncate pr-2 inline-block`}
                    style={{ maxWidth: '60%' }}
                  >
                    {item.Libelle_Menu || item.name}
                  </div>

                  <div className="flex-1 relative" style={{ minWidth: 0, height: 18 }}>
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        height: 1,
                        backgroundImage:
                          'repeating-linear-gradient(to right, rgba(156,163,175,0.95) 0 5px, transparent 2px 9px)',
                        backgroundRepeat: 'repeat-x',
                      }}
                    />
                  </div>

                  <div
                    className={`${poppins.className} text-green-500 text-[13px] flex-shrink-0 pl-2 inline-block whitespace-nowrap`}
                  >
                    {item.Prix_Menu || item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
      {/* Bouton droit */}
      <button
        onClick={handleNext}
        className="absolute right-0 z-100 p-2 bg-gray-200 shadow rounded-full hover:bg-gray-100 block md:hidden"
      >
        <IoIosArrowForward size={20} />
      </button>

      {/* Points de navigation */}
<div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-40 h-1 bg-gray-200 rounded-full">
  {/* Small moving bar */}
  <div
    className="bg-green-500 h-1 rounded-full transition-all duration-300 absolute top-0"
    style={{
      width: '25%', // width of the moving bar
      left: `${(activeIndex / (total - 1)) * 100}%`,
      transform: 'translateX(-50%)',
    }}
  />
</div>


    </div>
  );
}
