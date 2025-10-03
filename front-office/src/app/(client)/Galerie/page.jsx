'use client';

import { Navbar } from '@/components/common/Navbar';
import React from 'react';
 

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Header from '@/components/common/Header';
import Footer from "../../../components/common/Footer";
import HorizontalLink from "../../../components/common/HorizontalLink";

import { greatVibes, poppins } from '../../../Styles/fonts/fonts';
import ScrollAnimationWrapper from '@/layout/ScrollAnimationWrapper';

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
// Images avec catégorie
const images = [
  {alt:" photo_1", src: '/images/Gallerie/photo_1.webp', category: "Restaurant" },
  {alt:" photo_2", src: '/images/Gallerie/photo_2.webp', category: "Restaurant" },
  {alt:" photo_3", src: '/images/Gallerie/photo_3.webp', category: "Restaurant" },
  {alt:" photo_4", src: '/images/Gallerie/photo_4.webp', category: "Restaurant" },
  {alt:" photo_5", src: '/images/Gallerie/photo_5.webp', category: "Restaurant" },
  {alt:" photo_6", src: '/images/Gallerie/photo_6.webp', category: "Restaurant" },
  {alt:" photo_7", src: '/images/Gallerie/photo_7.webp', category: "Évènement" },
  {alt:" photo_8", src: '/images/Gallerie/photo_8.webp', category: "Évènement" },
  {alt:" photo_9", src: '/images/Gallerie/photo_9.webp', category: "Évènement" },
  { alt:"photo_10", src: '/images/Gallerie/photo_10.webp', category: "Évènement" },
  { alt:"photo_11", src: '/images/Gallerie/photo_11.webp', category: "Évènement" },
  { alt:"photo_12", src: '/images/Gallerie/photo_12.webp', category: "Évènement" },



];

const Catégory = ["Restaurant", "Évènement", "Formation", "Pâtisserie"];

export default function Galerie() {
  const [selectedCategory, setSelectedCategory] = React.useState("Restaurant");

  const filteredImages = selectedCategory
    ? images.filter(img => img.category === selectedCategory)
    : images;

  return (
    <div className="min-h-screen relative overflow-x-hidden  ">
      <Navbar />

      <Header
        backgroundImage="/images/Formations/Header_Background.webp"
        subtitle="Saveurs en Images"
        title={`[L’Art Culinaire] du Restaurant Enis `}

        greatVibes={greatVibes}
        accentColor={"white"}
        highlightColor={"#FFBB00"}
        path={"Galerie"}
        LinksNavigation={true}
        margin_top={"md:mt-70 mt-30"}
      />
      <div
        className=" min-h-screen w-full  "
        style={{
          backgroundImage: `url(/images/Formations/background_section.webp)`,
          backgroundSize: "cover",   // instead of "contain"
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

        }}
      >

        <div className="max-w-screen-2xl mx-auto mt-22    z-10 flex flex-col items-center justify-center text-white text-center h-full  "
        >
          {/* Partie gauche (Images) */}
          <motion.div
            className="items-center   text-center gap-4 md:gap-8 "
            variants={ScrollAnimationWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            <motion.p
              className={`${greatVibes.className}   text-[26px] lg:text-[29px] xl:text-[34px] green_color  `}
              variants={fadeUp}
            >
              Découvrez Notre Galerie
            </motion.p>


            <motion.p
              className={`${poppins.className} text-black/50 font-medium mt-3 px-4 sm:px-0 max-w-3xl md:text-[14px] text-[13px] mx-auto `}
              variants={fadeUp}
              transition={{ delay: 0.4 }}
            >
              Explorez nos photos et découvrez la créativité, la fraîcheur et la beauté de chaque plat préparé au Restaurant Enis.
              Laissez-vous inspirer par nos saveurs méditerranéennes mises en image.    </motion.p>

          </motion.div>


        </div>
        <section className="flex flex-col items-center mb-22">
          <motion.div
            className="flex justify-around mt-12 mb-8 items-center w-full"
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <HorizontalLink
              Catégorie={Catégory}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </motion.div>

       {/* Ici on entoure par AnimatePresence */}
{filteredImages.length > 0 ? (
  <AnimatePresence mode="wait">
    <div
      key={selectedCategory}
      className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 m-4"
    >
      {filteredImages.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-[250px]"
        >
          <Image
            src={img.src}
            alt={img.alt ?? `Image ${idx + 1}`}
            fill
            loading="lazy"
            className="object-cover transform group-hover:scale-105 transition duration-300"
          />
        </motion.div>
      ))}
    </div>
  </AnimatePresence>
) : (
  <div className="flex justify-center items-center my-22 mb-56">
    <p className="text-black/50 font-medium text-[20px] text-center">
      Les photos seront bientôt disponibles. Restez connectés !
    </p>
  </div>
)}

        </section>
      </div>
      <Footer />
    </div>
  );
}
