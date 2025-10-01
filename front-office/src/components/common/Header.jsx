"use client";

import { motion } from "framer-motion";
import ScrollAnimationWrapper from "../../layout/ScrollAnimationWrapper";



import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import Link from "next/link";
import { useMemo, useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import getScrollAnimation from "@/utils/getScrollAnimation";
import Herbe from "../../../public/images/Herbe.webp";
import Herbe_2 from "../../../public/images/herbe_2.webp";
import Background_header from "../../../public/images/Background_header_4.webp";
import { RiFacebookCircleLine, RiInstagramFill } from "react-icons/ri";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

// Variants d’animation fade + slide up
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
// Variants fade + slide horizontal (gauche à droite)
const fadeRight = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};
// Variants fade + slide horizontal (droite à gauche)
const fadeLeft = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const listBloc = [
  { name: "Restaurant", description: "Découvrez nos plats variés et savoureux.", background: "/images/Acceuil/Restaurent.webp", icone: "/images/icone_restaurant.webp", path: "/Restaurant" },
  { name: "Pâtisserie", description: "Savourez nos douceurs artisanales.", background: "/images/Acceuil/Patisserie.webp", icone: "/images/icone_patisserie.webp", path: "/Patisserie" },
  { name: "Formations", description: "Apprenez avec nos ateliers pratiques.", background: "/images/Acceuil/Formation.webp", icone: "/images/icone_formation.webp", path: "/Formations" },
  { name: "Événement", description: "Découvrez les événements à venir et réservez votre place.", background: "/images/Acceuil/Evenement.webp", icone: "/images/icone_evenement.webp", path: "/Evenement" },
];

export default function Header({
  backgroundImage,
  overlayColor = "rgba(0, 0, 0, 0.7)",
  subtitle,
  title,
  description,
  highlightColor,
  accentColor,
  greatVibes,
  poppins,

  path,
  LinksNavigation,
  margin_top,
}) {
  const scrollRef = useRef(null);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const animatedImages = [

    "/images/Acceuil/Restaurent.webp",

    "/images/Acceuil/Patisserie.webp",

    "/images/Acceuil/Formation.webp",


  ];

  return (
    <div>
      <div
        className="w-full relative h-[550px] flex items-center justify-center z-0"
        style={{
          backgroundImage: `url(${Background_header.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center  ", // décale vers le haut de 50px
       
          backgroundRepeat: "no-repeat",

        }}
      >


        {/* Overlay sombre */}
        <div
          className="absolute inset-0 -z-10"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}

        />
       
        {/* Contenu centré */}
        <div className={`max-w-screen-2xl mx-auto px-4 z-10 flex flex-col items-center justify-center text-white text-center h-full  ${margin_top} `}>
          <ScrollAnimationWrapper>
            <motion.div
              className="items-center text-center gap-4 md:gap-8"
              variants={scrollAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {subtitle && (
                <motion.p
                  className={`${greatVibes?.className || ""} mt-4 text-2xl lg:text-3xl xl:text-4xl`}
                  style={{ color: accentColor }}
                  variants={
                    fadeUp
                }
                >
                  {subtitle}
                </motion.p>
              )}

              {title && (
                <motion.h1
                  className={`${poppins?.className || ""} leading-[57px] font-bold text-[40px] md:text-[41px] lg:text-[43px] xl:text-[45px] mt-2`}
                  variants={fadeUp}
                  transition={{ delay: 0.2 }}
                >
                  {title.split("\n").map((line, indexLine) => (
                    <div key={indexLine}>
                      {line.split(/\[(.*?)\]/).map((part, i) =>
                        i % 2 === 1 ? (
                          <span key={i} style={{ color: highlightColor }}>
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )}
                    </div>
                  ))}
                </motion.h1>
              )}

              {description && (
                <motion.p
                  className="mt-4 px-4 sm:px-0 max-w-xl   opacity-30 md:text-[15px] text-[13px] mx-auto"
                  variants={fadeUp}
                  transition={{ delay: 0.4 }}
                >
                  {description}
                </motion.p>
              )}
              {path && (
                <motion.p

                  className="mt-9 px-4 sm:px-0 max-w-xl md:text-[15px] yellow_color text-[13px] mx-auto justify-center flex items-center"

                  variants={fadeUp}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-white">Accueil</span>
                  <span className="mx-3 mt-0.5 text-[20px]">
                    <MdOutlineKeyboardDoubleArrowRight />
                  </span>
                  {path}        </motion.p>
              )}

           

            </motion.div>
          </ScrollAnimationWrapper>
        </div>


      </div>
      <div className="border-b-[1.5px]  relative w-full flex items-center justify-center   overflow-hidden sm:overflow-visible mt-0.5"
        style={{
          backgroundImage: `url(${Herbe.src}),url(${Herbe_2.src})`,
          backgroundSize: "10%,14% ",              // Herbe à 18%, AutreImage à 50%
          backgroundPosition: "left 100px top 8px, right -20px bottom -25px",// Herbe en haut à gauche, AutreImage au centre
          backgroundRepeat: "no-repeat ,no-repeat  ", 
          zIndex:"50"   ,    // ou "50%" ou "40%" selon la taille voulue


          backgroundOrigin: "content-box",  // le fond commence après le padding

        }}>
   
        <div className=" max-w-2xl   w-full">
          <button
            onClick={() => scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })}
            className="block lg:hidden absolute left-0 top-1/2 -translate-y-1/2  h-full color_dark p-2 z-[999]"
                >
            <IoIosArrowBack className="text-[30px] text-black/60 "/>
          </button>

          {/* Liste scrollable */}
          <ScrollAnimationWrapper
            ref={scrollRef}
            className="flex  overflow-x-auto  scroll-smooth no-scrollbar snap-x snap-mandatory     "
          >
            {listBloc.map((item, index) => (
              <motion.div
                key={index}
                custom={{ duration: 2 + index }}
                variants={scrollAnimation}

                className={`  group relative flex-shrink-0  h-16 w-full  sm:w-1/2 md:w-1/3 lg:w-1/4 gap-10    snap-center
                ${index === listBloc.length - 1 ? "" : "  "}
             ` }

              >
                <Link href={item.path}>

                  <div className="  relative z-50 px-1 w-full h-full gap-10  flex flex-col items-center justify-center   text-black/90 opacity-60  hover:opacity-100 ">
                    <div className="flex items-center gap-2   ">
                      <Image src={item.icone} alt="Icone" width={25} height={25} className="  " />  <p
                        className="  text-[14px]   font-medium   transition-transform duration-300 group-hover:-translate-y-0 pointer-events-none z-20
                    "
                      > {item.name}
                      </p>
                    </div>
                       </div>
                </Link>
              </motion.div>
            ))}
          </ScrollAnimationWrapper>

          {/* Bouton droit - visible uniquement sur mobile */}
          <button
            onClick={() => scrollRef.current.scrollBy({ left: 400, behavior: "smooth" })}
            className="block lg:hidden absolute right-0 top-1/2 -translate-y-1/2   h-full color_dark p-2 z-50"
         
          >
            <IoIosArrowForward className="text-[30px] text-black/60 " />

          </button>
        </div>
      </div>

    </div>
  );
}

