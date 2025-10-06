"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { usePathname } from "next/navigation";
import getScrollAnimation from "@/utils/getScrollAnimation";
import Background_header from "../../../public/images/Background_header_4.webp";

/* Variants d’animation */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const listBloc = [
  { name: "Restaurant", description: "Découvrez nos plats variés et savoureux.", background: "/images/Acceuil/Restaurent.webp", icone: "/images/icone_restaurant.webp", path: "/Restaurant" },
  { name: "Pâtisserie", description: "Savourez nos douceurs artisanales.", background: "/images/Acceuil/Patisserie.webp", icone: "/images/icone_patisserie.webp", path: "/Patisserie" },
  { name: "Formations", description: "Apprenez avec nos ateliers pratiques.", background: "/images/Acceuil/Formation.webp", icone: "/images/icone_formation.webp", path: "/Formations" },
  { name: "Événement", description: "Découvrez les événements à venir et réservez votre place.", background: "/images/Acceuil/Evenement.webp", icone: "/images/icone_evenement.webp", path: "/Evenement" },
];

export default function Header({
  overlayColor = "rgba(0, 0, 0, 0.7)",
  subtitle,
  title,
  description,
  highlightColor,
  accentColor,
  greatVibes,
  poppins,
  path,
  margin_top,
}) {
  const containerRef = useRef(null); // <-- référence DOM fiable pour le scroll
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const pathname = usePathname();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync selection with la route (si tu navigues vers /Patisserie => l'item correspondant devient actif)
  useEffect(() => {
    if (!pathname) return;
    const idx = listBloc.findIndex((it) => it.path.toLowerCase() === pathname.toLowerCase());
    if (idx !== -1) setSelectedIndex(idx);
  }, [pathname]);

  // Centrer l'item sélectionné à chaque changement d'index
  useEffect(() => {
    // timeout court pour laisser le render se faire
    const t = setTimeout(() => {
      const el = containerRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
      if (el && typeof el.scrollIntoView === "function") {
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }, 50);
    return () => clearTimeout(t);
  }, [selectedIndex]);

  const handleItemClick = (index) => {
    setSelectedIndex(index);
    // on centre immédiatement (utile si tu restes sur la même page)
    const el = containerRef.current?.querySelector(`[data-index="${index}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div>
      {/* HEADER PRINCIPAL */}
      <div
        className="w-full relative h-[550px] flex items-center justify-center z-0"
        style={{
          backgroundImage: `url(${Background_header.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: overlayColor }} />

        <div className={`max-w-screen-2xl mx-auto px-4 z-10 flex flex-col items-center justify-center text-white text-center h-full ${margin_top || ""}`}>
          <motion.div
            className="items-center text-center gap-4 md:gap-8"
            variants={scrollAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {subtitle && (
              <motion.p className={`${greatVibes?.className || ""} mt-4 text-2xl lg:text-3xl xl:text-4xl`} style={{ color: accentColor }} variants={fadeUp}>
                {subtitle}
              </motion.p>
            )}

            {title && (
              <motion.h1 className={`${poppins?.className || ""} leading-[57px] font-bold text-[40px] md:text-[41px] lg:text-[43px] xl:text-[45px] mt-2`} variants={fadeUp} transition={{ delay: 0.2 }}>
                {title.split("\n").map((line, iLine) => (
                  <div key={iLine}>
                    {line.split(/\[(.*?)\]/).map((part, i) => (i % 2 === 1 ? <span key={i} style={{ color: highlightColor }}>{part}</span> : part))}
                  </div>
                ))}
              </motion.h1>
            )}

            {description && (
              <motion.p className="mt-4 px-4 sm:px-0 max-w-xl opacity-70 md:text-[15px] text-[13px] mx-auto" variants={fadeUp} transition={{ delay: 0.4 }}>
                {description}
              </motion.p>
            )}

            {path && (
              <motion.p className="mt-9 px-4 sm:px-0 max-w-xl md:text-[15px] yellow_color text-[13px] mx-auto justify-center flex items-center" variants={fadeUp} transition={{ delay: 0.4 }}>
                <span className="text-white">Accueil</span>
                <span className="mx-3 mt-0.5 text-[20px]"><MdOutlineKeyboardDoubleArrowRight /></span>
                {path}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* BARRE DE SECTIONS (scrollable) */}
      <div
        className="border-b-[1.5px] relative w-full flex items-center justify-center overflow-hidden sm:overflow-visible mt-0.5"
        style={{
          backgroundImage: `url(/images/Herbe.webp),url(/images/herbe_2.webp)`,
          backgroundSize: "10%,14%",
          backgroundPosition: "left 100px top 8px, right -20px bottom -25px",
          backgroundRepeat: "no-repeat ,no-repeat",
          zIndex: "50",
          backgroundOrigin: "content-box",
        }}
      >
        <div className="max-w-2xl w-full relative">
          {/* bouton gauche (mobile) */}
          <button
            onClick={() => containerRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
            className="block lg:hidden absolute left-0 top-1/2 -translate-y-1/2 h-full color_dark p-2 z-[999]"
            aria-label="Précédent"
          >
            <IoIosArrowBack className="text-[30px] text-black/60" />
          </button>

          {/* container DOM pour le scroll (réf fiable) */}
          <div
            ref={containerRef}
            className="flex overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory"
            role="list"
          >
            {listBloc.map((item, index) => (
              <motion.div
                key={index}
                data-index={index}
                className={`group relative flex-shrink-0 h-16 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-center`}
                variants={scrollAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                onClick={() => handleItemClick(index)}
                style={{ cursor: "pointer" }}
                role="listitem"
              >
                <Link href={item.path} className="block w-full h-full">
                  <div
                    className={`relative z-50 px-1 w-full h-full gap-10 flex flex-col items-center justify-center transition-all duration-300 ${
                      selectedIndex === index ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Image src={item.icone} alt={`${item.name} icon`} width={25} height={25} />
                      <p className={`text-[14px] transition-transform duration-200 pointer-events-none z-20 ${selectedIndex === index ? "font-semibold text-black/70" : "font-medium text-black/60"}`}>
                        {item.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* bouton droit (mobile) */}
          <button
            onClick={() => containerRef.current?.scrollBy({ left: 400, behavior: "smooth" })}
            className="block lg:hidden absolute right-0 top-1/2 -translate-y-1/2 h-full color_dark p-2 z-50"
            aria-label="Suivant"
          >
            <IoIosArrowForward className="text-[30px] text-black/60" />
          </button>
        </div>
      </div>
    </div>
  );
}
