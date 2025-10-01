'use client';
import React, { useMemo, useState } from 'react';
import { Navbar } from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import Background_header from "../../../../public/images/Réservation_background.webp";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import getScrollAnimation from "../../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../../layout/ScrollAnimationWrapper";
import Header_Background from "../../../../public/images/Formations/Header_Background.webp";
import Poivron from "../../../../public/images/A_propos/Poivron.webp";
import Pate from "../../../../public/images/A_propos/Pate.webp";
import Boisson from "../../../../public/images/A_propos/Boisson.webp";
import Photo_Restaurant from "../../../../public/images/A_propos/Photo_Restaurant.webp";
import Photo_Patisserie from "../../../../public/images/A_propos/Photo_Patisserie.webp";
import Photo_Formation from "../../../../public/images/A_propos/Photo_Formation.webp";
import Photo_Evenement from "../../../../public/images/A_propos/Photo_Evenement.webp";
import Background_Service from "../../../../public/images/A_propos/Background_Service.webp";
import partenaire_1 from "../../../../public/images/A_propos/partenaire_1.webp";
import partenaire_2 from "../../../../public/images/A_propos/partenaire_2.webp";
import partenaire_3 from "../../../../public/images/A_propos/partenaire_3.webp";
import partenaire_4 from "../../../../public/images/A_propos/partenaire_4.webp";
import partenaire_5 from "../../../../public/images/A_propos/partenaire_5.webp";
import partenaire_6 from "../../../../public/images/A_propos/partenaire_6.webp";

import tomat from "../../../../public/images/Formations/Patisserie/tomat.webp";
import Background_Section from "../../../../public/images/A_propos/Background_Section.webp";
import Epinard from "../../../../public/images/Formations/Cuisine/Epinard.webp";
import { greatVibes, poppins } from '../../../Styles/fonts/fonts';
import { SiCodefresh } from "react-icons/si";
import { MdOutlineFamilyRestroom, MdRestaurantMenu } from "react-icons/md";
import { PiChefHat } from "react-icons/pi";
import Header from '@/components/common/Header';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import FormReservation from '@/components/form/FormReservation';

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


const partenaire_logo = [
  { image: partenaire_1, alt: 'partenaire_1' },
  { image: partenaire_2, alt: 'partenaire_2' },
  { image: partenaire_3, alt: 'partenaire_3' },
  { image: partenaire_4, alt: 'partenaire_4' },
  { image: partenaire_5, alt: 'partenaire_5' },
  { image: partenaire_6, alt: 'partenaire_6' },
];
const cardsData = [
  {
    image: Photo_Restaurant,
    alt: "Photo Restaurant",
    title: "Restaurant",
    Link: "Restaurant",
    description:
      "Savourez des plats variés faits maison dans un cadre chaleureux, préparés par nos chefs passionnés.",
  },
  {
    image: Photo_Patisserie,
    alt: "Photo Pâtisserie",
    title: "Pâtisserie",
    Link: "Patisserie",
    description:
      "Découvrez nos pâtisseries artisanales, alliant goût raffiné et présentation soignée.",
  },
  {
    image: Photo_Formation,
    alt: "Photo Formation",
    title: "Formation",
    Link: "Formations",
    description:
      "Participez à nos ateliers de cuisine ou pâtisserie et apprenez aux côtés de professionnels.",
  },
  {
    image: Photo_Evenement,
    alt: "Photo Événement",
    title: "Événement",
    Link: "Evenement",
    description:
      "Confiez-nous vos événements pour une organisation sur mesure et une ambiance conviviale.",
  },
];

export default function A_propos() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [isExpanded, setIsExpanded] = useState(false);
    const [isReservationOpen, setIsReservationOpen] = useState(false);
  
  const toggleReservation = () => setIsReservationOpen((prev) => !prev);
  const handleToggle = () => {

    setIsExpanded((prev) => !prev);
  };
    const [formData, setFormData] = useState({
      Nom_Prenom_Reservation: "",
      NumTel_Reservation: "",
      Nbr_personne_Reservation: "",
      Date_Reservation: "",
      Horraire_Reservation: "",
  
    });
  const handleSave = async () => {
    try {
      const response = await fetch(`${url}/api/ReservationsTable/Create_Reservation`, {
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
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />

      <Header backgroundImage={Header_Background.src}

        subtitle="Notre Histoire"
        title={`[A propos] du Restaurant Enis `}

        greatVibes={greatVibes}
        accentColor={"white"}
        highlightColor={"#FFBB00"}
        path={"À propos"}
        LinksNavigation={true}
        margin_top={"md:mt-70 mt-30"}


      />
      {/* Section 1 - Header avec background */}

      {/* Images décoratives animées */}
      <motion.div
        className="hidden md:block absolute top-280 left-0 z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeRight}
      >
        <Image src={tomat} alt="Tomate décorative" loading="lazy" width={60} height={60} />
      </motion.div>


      <motion.div
        className="hidden md:block absolute top-260 right-0 z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeRight}
      >
        <Image src={Poivron} alt="Poivron décorative" loading="lazy" width={60} height={60} />
      </motion.div>




      <motion.div
        className={`  idden md:block absolute top-640 right-0 w-[280px] h-[400px] overflow-hidden z-20 hidden  transition-all duration-500 ${isExpanded ? "top-545" : "top-490"
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
          loading="lazy"
          className="object-cover object-left relative -right-[155px]"
        />
      </motion.div>

      {/* Section 2 - Contenu Pâtisserie */}
      <section className="dark_color   px-4 md:px-10 my-22">
        <div className="max-w-screen-2xl mx-auto px-4 z-10 flex flex-col items-center justify-center text-white text-center h-full  ">
          {/* Partie gauche (Images) */}
          <motion.div
            className="items-center   text-center gap-4 md:gap-8"
            variants={scrollAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className={`${greatVibes.className}   text-[28px] lg:text-[30px] xl:text-[35px] green_color`}
              variants={fadeUp}
            >
              Qui sommes-nous ?
            </motion.p>
            <motion.h1
              className={`${poppins.className} dark_color font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] leading-normal`}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              Nous vous invitons à visiter notre restaurant.
            </motion.h1>



            <motion.p
              className={`${poppins.className}  gray_color mt-4 px-4 sm:px-0 max-w-5xl     md:text-[15px] text-[13px] mx-auto`}
              variants={fadeUp}
              transition={{ delay: 0.4 }}
            >
              Bienvenue chez Enis, votre destination gourmande par excellence. Nous vous proposons une expérience culinaire complète avec notre
              menu restaurant riche en saveurs et notre menu pâtisserie délicieusement varié. Participez à nos formations en cuisine et pâtisserie,
              animées par des chefs passionnés. Nous organisons également vos événements pour en faire des moments inoubliables.
            </motion.p>


          </motion.div>


        </div>
      </section>
      {/* Section 3 - Cuisine avec background */}
      <section className="text-white py-16 px-4 md:px-12 mt-10">
        <div className="max-w-screen-2xl mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-center text-center gap-8">

          {/* Image Gauche */}
          <motion.div
            className="w-full md:w-1/4 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Image
              src={Pate}
              alt="pâtisserie"
              width={600}
              height={800}
              loading="lazy"
              className="w-full h-[270px] md:h-[550px] object-cover rounded-lg"
            />
          </motion.div>

          {/* Texte Centre */}
          <motion.div
            className="w-full md:w-1/3 flex flex-col items-center justify-center text-center"
            variants={scrollAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className={`${greatVibes.className} mt-4 text-[28px] lg:text-[30px] xl:text-[35px] green_color`}
              variants={fadeUp}
            >
              Pourquoi nous choisir ?
            </motion.p>
            <motion.h1
              className={`${poppins.className} dark_color font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] max-w-xl mx-auto leading-normal`}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              Goût Extraordinaire et Expérimenté
            </motion.h1>
            <motion.p
              className={`${poppins.className} gray_color mt-4 px-4 sm:px-0 max-w-2xl md:text-[15px] text-[13px] mx-auto `}
              variants={fadeUp}
              transition={{ delay: 0.4 }}
            >
              Chez Enis, chaque bouchée reflète notre passion et notre savoir-faire.
              Nos chefs expérimentés vous garantissent des plats savoureux et raffinés.
              Pour un repas, une pâtisserie ou une formation, vivez une expérience culinaire unique.
            </motion.p>

            <motion.div
              className="flex items-center justify-center flex-wrap md:flex-nowrap mt-8    overflow-x-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex flex-col items-center w-20 min-w-[90px]">
                <SiCodefresh className="bg-yellow-500 p-3 text-white text-[60px] rounded-[10px]" />
                <p className={`${poppins.className} gray_color mt-2 text-center md:text-[13px] text-[11px]`}>
                  Fraîcheur <br />garantie
                </p>
              </div>

              <div className="flex flex-col items-center w-20 min-w-[90px]">
                <MdOutlineFamilyRestroom className="bg-yellow-500 p-3 text-white text-[60px] rounded-[10px]" />
                <p className={`${poppins.className} gray_color mt-2 text-center md:text-[13px] text-[11px]`}>
                  Ambiance <br />familiale
                </p>
              </div>

              <div className="flex flex-col items-center w-20 min-w-[90px]">
                <MdRestaurantMenu className="bg-yellow-500 p-3 text-white text-[60px] rounded-[10px]" />
                <p className={`${poppins.className} gray_color mt-2 text-center md:text-[13px] text-[11px]`}>
                  Variété <br />garantie
                </p>
              </div>

              <div className="flex flex-col items-center w-20 min-w-[90px]">
                <PiChefHat className="bg-yellow-500 p-3 text-white text-[60px] rounded-[10px]" />
                <p className={`${poppins.className} gray_color mt-2 text-center md:text-[13px] text-[11px]`}>
                  Chefs <br />expérimentés
                </p>
              </div>
            </motion.div>


          </motion.div>

          {/* Image Droite */}
          <motion.div
            className="w-full md:w-1/4 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Image
              src={Boisson}
              alt="boisson"
              width={600}
              height={800}
              loading="lazy"
              className="w-full h-[270px] md:h-[550px] object-cover rounded-lg"
            />
          </motion.div>
        </div>
      </section>
      {/* Section 4 - Horaire d’ouverture */}


      <section
        className="w-full relative min-h-[400px] md:min-h-[550px] flex items-center justify-center p-10"
        style={{
          backgroundImage: `url(${Background_Section.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",

        }}
      >
        {/* Overlay sombre */}
        <div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 z-10 px-4 md:px-0">
          {/* Partie gauche (Texte et infos) */}
          <motion.div
            className="w-full md:w-1/2 md:mt-20 mt-0 flex flex-col items-center md:items-start text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3
              className={`${greatVibes.className} text-yellow-500 font-medium text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] mb-2 flex items-center gap-2 justify-center md:justify-start`}
            >
              Restaurant
              <span className="hidden sm:inline-block h-[2px] w-10 bg-yellow-500 mt-3"></span>
            </h3>

            <h2
              className={`${poppins.className} text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] font-bold mb-4 leading-snug text-white`}
            >
              Horaire d’ouverture
            </h2>

            <p
              className={`${poppins.className} text-white text-[12px] md:text-[13px] mb-2 transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"
                }`}
            >
              Notre restaurant Enis vous accueille tous les jours de 8h à 22h, dans une ambiance
              chaleureuse et conviviale. Pour plus de confort, vous pouvez réserver votre table en
              ligne à tout moment ou nous contacter directement pour toute demande. Nous serons
              ravis de vous recevoir !
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 justify-center md:justify-start">

              <button onClick={toggleReservation} className="bg-[#FFBB00] text-white px-4 py-2   rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl text-[15px] flex items-center gap-2">
                Réservation
              </button>

              <Link rel="stylesheet" href="/Contact" >
                <button className="relative text-white px-3 py-2 text-[15px] rounded-md flex items-center gap-2 overflow-hidden group">
                  Contactez-nous
                  <span className="absolute left-0 bottom-0 h-[1.3px] bg-[#FFBB00] w-0  w-full transition-all duration-300" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Partie droite (Horaires) */}
          <motion.div
            className="w-full md:w-1/2 flex gap-4 justify-center px-4 md:px-0  "
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-2xl py-13   text-center text-white border border-gray-400 max-w-sm w-full">
              <h1 className="font-semibold text-lg mb-2">Lundi Vendredi</h1>
              <p className="mb-4 leading-tight">
                9:00 am
                <br />-
                <br />
                10:00 pm
              </p>
              <hr className="border-gray-400   w-full max-w-[250px] mx-auto my-6" />

              <h1 className="font-semibold text-lg mb-2">Samedi</h1>
              <p className="mb-4 leading-tight">
                9:00 am
                <br />-
                <br />
                00:00 pm
              </p>
              <hr className="border-gray-400   w-full max-w-[250px] mx-auto my-6" />

              <h1 className="font-semibold text-lg mb-2 ">Dimanche</h1>
              <p className='leading-tight'>Fermer</p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Section 5 - services */}


      <section className="text-black py-16 px-4 md:px-12 mt-15" style={{
        backgroundImage: `url(${Background_Service.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // éviter que l'image se répète


      }}>
        <div className="max-w-screen-xl mx-auto px-4 z-10 flex flex-col items-center justify-center text-white text-center h-full  ">
          {/* Partie gauche (Images) */}
          <motion.div
            className="items-center   text-center gap-4 md:gap-8"
            variants={scrollAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              className={`${greatVibes.className} mt-4 text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] green_color`}
              variants={fadeUp}
            >
              Que proposons-nous ?
            </motion.p>
            <motion.h1
              className={`${poppins.className} dark_color font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] leading-normal`}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              Nos services
            </motion.h1>

            <div className="w-full px-4 md:px-12 py-8 mt-10  ">
              <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8  ">
                {cardsData.map((card, index) => (
                 
                  <motion.div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-md border border-gray-300 backdrop-blur-[2px] bg-white/5 "
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                     <Link href={card.Link} >
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={600}
                      height={800}
                      loading="lazy"
                      className="w-full h-[240px] object-cover"
                    />
                    <div className="p-4">
                      <h1
                        className={`${greatVibes.className} green_color text-[32px] mb-2`}
                      >
                        {card.title}
                      </h1>
                      <p className="gray_color text-[15px] text-left">
                        {card.description}
                      </p>
                    </div>
                  </Link>

                  </motion.div>
                ))}
              </div>
            </div>



          </motion.div>


        </div>
      </section>
      {/* Section 2 - Contenu partenaire
     */}
      <div className="max-w-screen-7xl  bg-black/3 mx-auto mt-22 py-10 mb-30 px-4 z-10 flex flex-col items-center justify-center text-white text-center h-full  ">
        {/* Partie gauche (Images) */}
        <motion.div
          className="items-center   text-center gap-4 md:gap-8 "
          variants={scrollAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >

          <motion.p
            className={`${greatVibes.className}   text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] green_color  `}
            variants={fadeUp}
          >
            Partenaires & clients
          </motion.p>
          <motion.h1
            className={`${poppins.className} dark_color font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px]  `}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            Nous travaillons avec les meilleurs

          </motion.h1>

          <div className="w-full overflow-hidden   mt-8">
            <motion.div
              className="flex gap-8 items-center"
              animate={{ x: ["0%", "-100%"] }}
              transition={{
                repeat: Infinity,
                duration: 20, // plus petit = plus rapide
                ease: "linear",
              }}
            >
              {/* On répète deux fois la liste pour éviter le "vide" entre les boucles */}
              {[...Array(5)].flatMap(() => partenaire_logo).map((items, index) => (<div
                key={index}
                className="flex items-center justify-center min-w-[12%]"
              >
                <Image
                  src={items.image}
                  alt={items.alt}
                  width={80}
                  height={80}
                  loading="lazy"
                  className="h-[80px] w-auto object-contain"
                />
              </div>
              ))}
            </motion.div>
          </div>





        </motion.div>


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
      <Footer />
    </div>
  );
}
