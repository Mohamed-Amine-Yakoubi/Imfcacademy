'use client';
import React, { useMemo, useState } from 'react';
import { Navbar } from "../../../components/common/Navbar";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import NavigationLinks from "../../../components/common/NavigationLinks";
import Image from "next/image";
import { motion } from "framer-motion";
import getScrollAnimation from "../../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../../layout/ScrollAnimationWrapper";

import Header_Background from "../../../../public/images/Formations/Header_Background.webp";
import Gateau from "../../../../public/images/Formations/Patisserie/Gateau.webp";
import Gateau_2 from "../../../../public/images/Formations/Patisserie/Gateau_2.webp";
import Macaran from "../../../../public/images/Formations/Patisserie/Macaran.webp";
import Petit_Four from "../../../../public/images/Formations/Patisserie/Petit_Four.webp";
import croissant from "../../../../public/images/Formations/Patisserie/croissant.webp";
import tomat from "../../../../public/images/Formations/Patisserie/tomat.webp";
import Background_section from "../../../../public/images/Formations/Cuisine/Background_section.webp";
import Epinard from "../../../../public/images/Formations/Cuisine/Epinard.webp";
import Gallery_1 from "../../../../public/images/Formations/Cuisine/Gallery_1.webp";
import Gallery_2 from "../../../../public/images/Formations/Cuisine/Gallery_2.webp";
import Gallery_3 from "../../../../public/images/Formations/Cuisine/Gallery_3.webp";
import Pizza from "../../../../public/images/Formations/Cuisine/Pizza.webp";
import Pasta from "../../../../public/images/Formations/Cuisine/Pasta.webp";

import { greatVibes, poppins } from '../../../Styles/fonts/fonts';
import { FaCalendarAlt, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
import { FaMapLocationDot } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ImUserPlus } from "react-icons/im";

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

export default function Formations() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <Header backgroundImage={Header_Background.src}
        subtitle="Du goût, du plaisir et c'est servi"
        title={`Maîtrisez [L’art]\n de la [cuisine] et de la [pâtisserie]`}
        description="Chez nous, chaque plat raconte une histoire. Des ingrédients frais, des recettes authentiques, et un service chaleureux pour vous offrir une expérience culinaire inoubliable."
        greatVibes={greatVibes}
        poppins={poppins}
        highlightColor={"#FFBB00"}
        accentColor={"#00BF63"}
        LinksNavigation={true}
        ClassName_Links={"mt-4"}
        margin_top={"md:mt-40 mt-30"}
      />


      {/* Images décoratives animées */}
      <motion.div
        className="hidden md:block absolute top-180 left-0 z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeRight}
      >
        <Image src={tomat} alt="Tomate décorative" width={60} height={60} />
      </motion.div>

      <motion.div
        className="hidden md:block absolute top-150 right-0 w-[150px] h-[200px] overflow-hidden z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeLeft}
        transition={{ delay: 0.2 }}
      >
        <Image
          src={Macaran}
          alt="Macaron décoratif"
          width={200}
          height={200}
          className="object-cover object-left relative -right-[50px]"
        />
      </motion.div>

      <motion.div
        className={`hidden md:block absolute left-0 w-[280px] h-[400px] overflow-hidden z-20 transition-all duration-500 ${isExpanded ? "top-340" : "top-320"
          }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeRight}
        transition={{ delay: 0.4 }}
      >
        <Image
          src={Pizza}
          alt="Pizza décoratif"
          width={400}
          height={400}
          className="object-cover object-right relative -left-[130px]"
        />
      </motion.div>

      <motion.div
        className="hidden md:block absolute top-280 right-0 w-[300px] h-[300px] overflow-hidden z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeLeft}
        transition={{ delay: 0.6 }}
      >
        <Image
          src={Gateau_2}
          alt="Gateau 2 décoratif"
          width={400}
          height={400}
          className="object-cover object-left relative -right-[80px]"
        />
      </motion.div>

      <motion.div

        className={`hidden md:block absolute top-350   right-0   overflow-hidden z-20 transition-all duration-500 ${isExpanded ? "top-375" : "top-350"
          }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeLeft}
        transition={{ delay: 0.7 }}
      >
        <Image src={Pasta} alt="Pasta décorative" width={120} height={120} />
      </motion.div>

      <motion.div


        className={`  idden md:block absolute top-490 right-0 w-[280px] h-[400px] overflow-hidden z-20 hidden  transition-all duration-500 ${isExpanded ? "top-545" : "top-490"
          }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeLeft}
        transition={{ delay: 0.9 }}
      >
        <Image
          src={Epinard}
          alt="Epinard décoratif"
          width={170}
          height={170}
          className="object-cover object-left relative -right-[155px]"
        />
      </motion.div>

      {/* Section 2 - Contenu Pâtisserie */}
      <section className="text-black py-16 px-4 md:px-12 mt-15">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Partie gauche (Images) */}
          <motion.div
            className="w-full md:w-1/2 flex gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className="w-1/2">
              <Image
                src={croissant}
                alt="croissant"
                width={600}
                height={800}
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2.5 flex flex-col justify-between gap-4 pt-17">
              <Image
                src={Gateau}
                alt="Gateau"
                width={300}
                height={200}
                className="w-full h-[170px] object-cover rounded-lg"
              />
              <Image
                src={Petit_Four}
                alt="Petit_Four"
                width={300}
                height={200}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          </motion.div>

          {/* Partie droite (Texte et infos) */}
          <motion.div
            className="w-full md:w-1/2 md:mt-20 mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            <h3
              className={`${greatVibes.className} text-yellow-500 font-medium text-[25px] mb-2 flex items-center gap-2`}
            >
              Pâtisserie
              <span className="hidden sm:inline-block h-[2px] w-10 bg-yellow-500 mt-3"></span>
            </h3>
            <h2 className="text-[25px] md:text-[35px] font-bold mb-4 leading-snug">
              Formation Professionnelle <br />
              en Aide Patisser
            </h2>
            <p
              className={`text-gray-700 text-[13px] md:text-[15px] mb-2 transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"
                }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum...
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum
            </p>

            <button
              onClick={handleToggle}
              className="flex items-center gap-1 text-green-500 font-medium hover:underline"
            >
              {isExpanded ? (
                <>
                  <IoIosArrowUp />
                  Voir moins
                </>
              ) : (
                <>
                  <IoIosArrowDown />
                  Voir plus
                </>
              )}
            </button>
            <ul className="space-y-4 mb-6 text-sm text-gray-800 mt-8">
              <li className="flex items-center gap-2">
                <FaMapLocationDot className="text-green-500 text-[20px]" /> Lorem
                ipsum dolor sit amet
              </li>
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-500 text-[20px]" /> 20-08-2025
                / 20-10-2025
              </li>
              <li className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500 text-[20px]" /> 1800
                franc CFA
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center gap-2">
                <span>
                  <ImUserPlus />
                </span>
                S’inscrire
              </button>

              <button className="bg-[#282828] text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center gap-2">
                <span>
                  <FaFileAlt />
                </span>
                Brochure
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3 - Cuisine avec background */}
      <section
        className="text-white py-16 px-4 md:px-12 mt-15 bg-[#0e0e0e]"
        style={{
          backgroundImage: `url(${Background_section.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Partie gauche (Texte et infos) */}
          <motion.div
            className="w-full md:w-1/2 md:mt-20 mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3
              className={`${greatVibes.className} text-yellow-500 font-medium text-[25px] mb-2 flex items-center gap-2`}
            >
              Cuisine
              <span className="hidden sm:inline-block h-[2px] w-10 bg-yellow-500 mt-3"></span>
            </h3>
            <h2 className="text-[25px] md:text-[35px] font-bold mb-4 leading-snug">
              Formation Professionnelle <br />
              en Aide Cuisinier
            </h2>
            <p
              className={`text-white text-[13px] md:text-[15px] mb-2 transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"
                }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum...
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum
            </p>

            <button
              onClick={handleToggle}
              className="flex items-center gap-1 text-green-500 font-medium hover:underline"
            >
              {isExpanded ? (
                <>
                  <IoIosArrowUp />
                  Voir moins
                </>
              ) : (
                <>
                  <IoIosArrowDown />
                  Voir plus
                </>
              )}
            </button>
            <ul className="space-y-4 mb-6 text-sm text-white mt-8">
              <li className="flex items-center gap-2">
                <FaMapLocationDot className="text-green-500 text-[20px]" /> Lorem
                ipsum dolor sit amet
              </li>
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-500 text-[20px]" /> 20-08-2025
                / 20-10-2025
              </li>
              <li className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-500 text-[20px]" /> 1800
                franc CFA
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center gap-2">
                <span>
                  <ImUserPlus />
                </span>
                S’inscrire
              </button>

              <button className="bg-[#FFBB00] text-white px-6 py-2 rounded-md hover:bg-[#FFBB00] flex items-center gap-2">
                <span>
                  <FaFileAlt />
                </span>
                Brochure
              </button>
            </div>
          </motion.div>

          {/* Partie droite (Images) */}
          <motion.div
            className="w-full md:w-1/2 flex gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <div className="w-1/2">
              <Image
                src={Gallery_1}
                alt="Gallery 1"
                width={600}
                height={800}
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </div>
            <div className="w-1/2.5 flex flex-col justify-between gap-4 pt-17">
              <Image
                src={Gallery_2}
                alt="Gallery 2"
                width={300}
                height={200}
                className="w-full h-[170px] object-cover rounded-lg"
              />
              <Image
                src={Gallery_3}
                alt="Gallery 3"
                width={300}
                height={200}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
