
'use client';
import React, { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Background_header from "../../../public/images/Réservation_background.webp";

import getScrollAnimation from "../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../layout/ScrollAnimationWrapper";
import Header_Background from "../../../public/images/Background_header_4.webp";
import Assiets_header from "../../../public/images/Acceuil/Assiets_header.webp";
import Background_Assiets_header from "../../../public/images/Acceuil/Background_Assiets_header.webp";
import { Navbar } from "../../components/common/Navbar";

import { greatVibes, poppins } from '../../Styles/fonts/fonts';

import Link from "next/link";
import { TbBrandWhatsappFilled } from 'react-icons/tb';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import FormReservation from "@/components/form/FormReservation";



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
const Accueil = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const toggleReservation = () => setIsReservationOpen((prev) => !prev);

  const listBloc = [
    { name: "Restaurant", description: "Découvrez nos plats variés et savoureux.", background: "/images/Acceuil/Restaurent.webp", icone: "/images/icone_restaurant", path: "/Restaurant" },
    { name: "Pâtisserie", description: "Savourez nos douceurs artisanales.", background: "/images/Acceuil/Patisserie.webp", icone: "/images/icone_patisserie", path: "/Patisserie" },
    { name: "Formations", description: "Apprenez avec nos ateliers pratiques.", background: "/images/Acceuil/Formation.webp", icone: "/images/icone_formations", path: "/Formations" },
    { name: "Événement", description: "Découvrez les événements à venir et réservez votre place.", background: "/images/Acceuil/Evenement.webp", icone: "/images/icone_evenement", path: "/Evenement" },
  ];

  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [formData, setFormData] = useState({
    Nom_Prenom_Reservation: "",
    NumTel_Reservation: "",
    Nbr_personne_Reservation: "",
    Date_Reservation: "",
    Horraire_Reservation: "",

  });
  const handleSave = async () => {
    try {
      const response = await fetch(`${url}/api/ReservationsTable/Create_Reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // ✅ JSON.stringify
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la réservation");
      }

      const data = await response.json();
      console.log("Réponse backend :", data);

      setFormData({
        Nom_Prenom_Reservation: "",
        NumTel_Reservation: "",
        Nbr_personne_Reservation: "",
        Date_Reservation: "",
        Horraire_Reservation: "",
      });

      alert("Félicitations ! Votre réservation a été créée avec succès !");
    } catch (error) {
      console.error("Erreur front :", error);
      alert("Une erreur est survenue lors de la création.");
    }
  };



  return (
    <div className="min-h-screen relative">
      {/* Background div */}
      <div
        className="absolute inset-0 -z-50 bg-cover bg-center"
        style={{ backgroundImage: `url(${Header_Background.src})` }}
      ></div>
      <div
        className="absolute inset-0 -z-40"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      />
      <Navbar />

      {/* Section 1 - Header Content */}
      <div className="max-w-screen-2xl pt-20 mx-auto md:mx-8 px-4  overflow-hidden  ">
        <ScrollAnimationWrapper>
          <motion.div
            className="   grid grid-flow-row md:grid-flow-col grid-rows-2 md:grid-rows-1 py-6 md:py-10 items-center justify-items-center text-center md:text-left grid-cols-1 md:grid-cols-[40px_1fr_1fr] gap-4 md:gap-8"

            variants={scrollAnimation}
          >
            <div className="hidden md:flex flex-col items-center justify-center gap-3 w-[40px] h-full   ">

              {/* Top vertical line (visible on desktop only) */}
              <div className="hidden sm:block w-[0.3px] h-30 bg-white" />

              {/* Social Icons */}
              <div className="space-y-7 mt-4 mb-4">
                <FaFacebook className="text-white text-[18px] hover:scale-110 transition" />
                <TbBrandWhatsappFilled className="yellow_color text-[21px] hover:scale-110 transition" />
                <FaInstagram className="text-white text-[18px] hover:scale-110 transition" />
              </div>
              {/* Bottom vertical line (visible on desktop only) */}
              <div className="hidden sm:block w-[0.3px] h-30 bg-white" />
            </div>
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left text-white  ">
              <p className={`${greatVibes.className} mt-4 mb-6 text-2xl lg:text-3xl xl:text-4xl text-[#00BF63]`}>
                Du goût, du plaisir et c'est servi
              </p>
              <h1 className={`${poppins.className} font-bold text-3xl lg:text-4xl xl:text-5xl leading-normal`}>
                <span className="text-[#FFBB00]">L’art</span> du goût, la passion <br />de la qualité
              </h1>
              <p className="mt-4 px-4 sm:px-0 max-w-xl md:text-[15px] text-[13px] ">
                Chez nous, chaque plat raconte une histoire. Des ingrédients frais, des recettes authentiques,
                et un service chaleureux pour vous offrir une expérience culinaire inoubliable.
              </p>

              <button
                onClick={toggleReservation}
                className="outline-none bg-yellow-500 px-3 py-2 my-7 font-semibold text-[13.5px] relative group rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl"
              >
                Réservation

              </button>
            </div>

            {/* Image */}
            <div className="md:w-full w-[90%]  max-w-xs md:max-w-full mx-auto md:mx-0 px-4 md:px-0  py-5 overflow-hidden ">
              <motion.div className="relative w-full" variants={scrollAnimation}>
                {/* Background image */}
                <Image
                  src={Background_Assiets_header}
                  alt="Assiettes background"
                  quality={100}
                  width={612}
                  height={383}
                  className="w-full h-auto object-contain"
                />

                {/* Foreground image */}
                <motion.div
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3/4    rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                  style={{ overflow: 'hidden' }}
                >
                  <Image
                    src={Assiets_header}
                    alt="Assiettes"
                    quality={100}
                    width={400}
                    height={250}
                    className="w-full h-auto object-contain"
                  />
                </motion.div>
              </motion.div>
            </div>


          </motion.div>
        </ScrollAnimationWrapper>
      </div>

      {/* Section 2 - Bottom Blocks */}
      <div className="sm:fixed sm:bottom-0 sm:left-0 sm:right-0 flex justify-start   sm:mt-0 z-50   ">

        <ScrollAnimationWrapper className="flex flex-col sm:flex-row w-full max-w-screen-xl  ">
          {listBloc.map((item, index) => (
            <motion.div
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}
              className={`group relative overflow-hidden w-full sm:w-[200px] h-18 md:h-20 lg:h-22 flex items-center justify-center text-center
    ${index === listBloc.length - 1 ? "rounded-tr-2xl" : "border-b-2 sm:border-b-0 sm:border-r-2 border-green-500"}
  `}
              style={{
                backgroundImage: `url(${item.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Link href={item.path}>
                <div className="absolute inset-0 bg-black/60 z-0  " />
                <div className="relative z-10 px-2 w-full h-full flex flex-col items-center justify-center       ">
                  <p
                    className={`${poppins.className}  text-white text-[16px] font-semibold transition-transform duration-300 group-hover:-translate-y-0 pointer-events-none z-20`}
                  >
                    {item.name}
                  </p>

                  <p
                    className={`${poppins.className} text-white text-[13px] mt-[1px] overflow-hidden w-full text-center max-h-full opacity-100  sm:max-h-0 sm:opacity-0   sm:group-hover:opacity-100 sm:group-hover:max-h-24 transition-[max-height,opacity] duration-300`}
                  >
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>




          ))}

        </ScrollAnimationWrapper>
      </div>

      {/* reservation form Overlay pr*/}
      <AnimatePresence>
        {isReservationOpen && (
          <motion.div
            className="fixed py-10 top-0 right-0 h-full w-full flex justify-center items-center z-[1000] backdrop-blur-[3px]"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.2 } }} // exit plus rapide
            transition={{ duration: 0.2 }}


          >
            {/* Close Button */}


            <div className="max-w-4xl  mx-auto flex md:flex-row flex-col justify-center items-center p-8">
              <motion.div
                className="bg-white w-full md:my-0 my-22   h-[600px] flex md:flex-row flex-col items-center  rounded-2xl shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }} // déclenche une fois quand 30% visible
                transition={{ duration: 0.4 }}
              >
                {/* Image Section (30%) */}
                <div className="md:w-[30%] w-full object-cover md:h-full h-[20%]">
                  <Image
                    src={Background_header}
                    alt="image"
                    className="object-cover  w-full h-full"
                  />
                </div>

                {/* Form Section (70%) */}
                <div className="relative md:w-[70%] w-full h-full   flex flex-col items-start justify-center md:px-10  px-5 md:pt-0 pt-56 md:pb-0 pb-5 md:overflow-y-hidden overflow-y-scroll"
                >

                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl focus:outline-none"
                    onClick={toggleReservation}
                  >
                    <IoClose />
                  </button>
                  <h3
                    className={`${greatVibes.className} md:pt-0  text-yellow-500 font-medium text-[25px] mb-2 flex items-center gap-2`}
                  >
                    Réservation
                    <span className="inline-block h-[2px] w-10 bg-yellow-500 mt-3"></span>
                  </h3>
                  <motion.h1
                    className={`${poppins.className} dark_color font-bold text-[22px] lg:text-[27px] xl:text-[28px]`}
                    variants={fadeUp}
                    transition={{ delay: 0.2 }}
                  >
                    Votre table, prête à vous accueillir
                  </motion.h1>
                  <motion.p
                    className={`${poppins.className} text-black/50 font-medium mt-3 mb-10  max-w-3xl md:text-[14px] text-[13px] mx-auto`}
                    variants={fadeUp}
                    transition={{ delay: 0.4 }}
                  >
                    Assurez-vous une place en réservant dès maintenant ! Notre équipe
                    vous accueillera avec plaisir pour partager un moment gourmand et
                    convivial
                  </motion.p>
                  <FormReservation onSubmit={handleSave} formData={formData} setFormData={setFormData} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accueil;
