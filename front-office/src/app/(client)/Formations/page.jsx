'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navbar } from "../../../components/common/Navbar";
import TextWithButton from "../../../components/ui/button/TextWithButton";
import Header from "../../../components/common/Header";
import Footer from "../../../components/common/Footer";
import HorizontalLink from "../../../components/common/HorizontalLink";
import FormInscription from "../../../components/form/FormInscription";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import getScrollAnimation from "../../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../../layout/ScrollAnimationWrapper";
import background_section from "../../../../public/images/Formations/background_section.webp";

import Header_Background from "../../../../public/images/Formations/Header_Background.webp";
import Gateau_2 from "../../../../public/images/Formations/Patisserie/Gateau_2.webp";
import Macaran from "../../../../public/images/Formations/Patisserie/Macaran.webp";
import tomat from "../../../../public/images/Formations/Patisserie/tomat.webp";


import { greatVibes, poppins } from '../../../Styles/fonts/fonts';
import { FaArrowLeft, FaCalendarAlt, FaFileAlt, FaMoneyBillWave } from 'react-icons/fa';
import { FaMapLocationDot } from "react-icons/fa6";

import { ImUserPlus } from "react-icons/im";
import axios from 'axios';

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
const Catégory = ["Aide Cuisinier", "Aide Pâtisserie", "Agent de Réception et Accueil", "Aide Service et Bar", "Agent de Nettoyage"];
const API_BASE_URL = "http://localhost:4000";

export default function Formations() {
  const sectionRef = useRef(null);

  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formations, setFormations] = useState([]);



  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [openSectionId, setOpenSectionId] = useState(null);


  const handleOpenSection = (id) => setOpenSectionId(id); // ← ouvre la formation spécifique
  const handleCloseSection = () => setOpenSectionId(null);





  useEffect(() => {
    if (openSectionId && sectionRef.current) {
      const targetY = sectionRef.current.getBoundingClientRect().top + window.scrollY - window.innerHeight / 2 + sectionRef.current.offsetHeight / 2;
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 1500; // durée en ms (plus grand = plus lent)
      let startTime = null;

      const scroll = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * progress);
        if (progress < 1) requestAnimationFrame(scroll);
      };

      requestAnimationFrame(scroll);
    }
  }, [openSectionId]);





  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(`${url}/api/Formations/Get_AllFormations`);
        setFormations(response.data);
        console.log("setFormations", response.data)

      } catch (error) {
        console.error("Erreur lors du chargement des formations", error);
      }
    };
    fetchFormations();
  }, []);
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const [selectedCategory, setSelectedCategory] = React.useState("Aide Cuisinier");

  const filteredFormations = formations
    .filter(form => selectedCategory ? form.type_formation === selectedCategory : form.type_formation === "Aide Pâtisserie").sort((a, b) => new Date(b.Date_Debut) - new Date(a.Date_Debut)).slice(0, 1);
  const [formData, setFormData] = useState({
    Nom_Prenom_inscrit: "", Email_inscrit: "",
    NumTel_Inscrit: "", NumCin_Inscrit: "",
    Adresse_Inscrit: "",
    id_formation: ""
  });
  const handleSave = async (formationId) => {
    try {
      const payload = { ...formData, id_formation: formationId }; // ← ID correct



      const response = await fetch(`${url}/api/Inscriptions/Create_Inscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création de la formation");
      }

      const data = await response.json();
      console.log(data)
      // setEvents((prevEvents) => [...prevEvents, data]);

      setFormData({
        Nom_Prenom_inscrit: "", Email_inscrit: "",
        NumTel_Inscrit: "", NumCin_Inscrit: "",
        Adresse_Inscrit: "",
        id_formation: ""

      });

      alert("Félicitations ! Votre inscription a été effectuée avec succès.");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la création.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden"

    >
      <Navbar />
      <Header backgroundImage={Header_Background.src}
        subtitle="Du goût, du plaisir et c'est servi"
        title={`  Maîtrisez [L’art]\n de la [cuisine] et de la [pâtisserie]`}
        greatVibes={greatVibes}
        poppins={poppins}
        highlightColor={"#FFBB00"}
        accentColor={"white"}
        LinksNavigation={true}
        path={"Formations"}
        ClassName_Links={" "}
        margin_top={"md:mt-60 mt-30"}
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


      <div style={{
        backgroundImage: `url(${background_section.src})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // éviter que l'image se répète


      }}>
        {/* Section 2 - Contenu Pâtisserie */}
        <div className="max-w-screen-2xl mx-auto mt-22 px-4 z-10 flex flex-col items-center justify-center text-white text-center h-full  ">
          {/* Partie gauche (Images) */}
          <motion.div
            className="items-center   text-center gap-4 md:gap-8 "
            variants={scrollAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >

            <motion.p
              className={`${greatVibes.className}  text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] green_color  `}
              variants={fadeUp}
            >
              Nos formations
            </motion.p>
            <motion.h1
              className={`${poppins.className} dark_color font-bold text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px]  `}
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              Formation au Service du Succès


            </motion.h1>


            <motion.p
              className={`${poppins.className} text-black/50 font-medium mt-3 px-4 sm:px-0 max-w-3xl md:text-[14px] text-[13px] mx-auto `}
              variants={fadeUp}
              transition={{ delay: 0.4 }}
            >
              Chez nous, chaque plat raconte une histoire. Des ingrédients frais, des recettes authentiques, et un service chaleureux pour vous offrir une expérience culinaire inoubliable.
            </motion.p>

          </motion.div>


        </div>

        <motion.div
          className="  mt-12 mb-8  flex justify-center itmes-center"
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

        {filteredFormations.length > 0 ? (filteredFormations.map((formation, index) => (
          <section key={formation.id_formation} className="dark_color  py-10 px-4 md:px-12 mb-22 ">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">

              {/* Partie gauche (Images) */}
              <motion.div
                className="w-full md:w-1/2 flex gap-4 justify-center  "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="md:w-1/2 w-full flex   justify-end ">
                  <Image
                    src={`${API_BASE_URL}${formation.photo_formation[0]}`}
                    alt={formation.libelle_formation}
                    width={250}
                    height={800}
                    className=" h-[450px] w-[260px] object-cover rounded-lg"
                  />
                </div>
                <div className="md:w-1/2 w-full flex flex-col justify-around gap-4 pt-15 ">
                  <Image
                    src={`${API_BASE_URL}${formation.photo_formation[1]}`}
                    alt={formation.libelle_formation}
                    width={250}
                    height={800}
                    className=" h-[170px] w-[240px] object-cover rounded-lg"
                  />
                  <Image
                    src={`${API_BASE_URL}${formation.photo_formation[2]}`}
                    alt={formation.libelle_formation}
                    width={250}
                    height={800}
                    className=" h-[340px] w-[240px] object-cover rounded-lg"
                  />

                </div>
              </motion.div>

              {/* Partie droite (Texte) */}
              <div className="w-full md:w-1/2  relative md:mt-20 z-50 ">

                <AnimatePresence mode="wait">
                  {openSectionId === formation.id_formation ? (
                    // Formulaire d’inscription
                    <motion.div
                      className="top-0 left-0 w-full"
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 300, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* En-tête avec la flèche pour revenir à la description */}
                      <div className="flex justify-between items-center mb-4">
                        <h3 className={`${greatVibes.className} text-yellow-500 font-medium text-[25px] flex items-center gap-2`}>
                          {formation.type_formation}
                          <span className="hidden sm:inline-block h-[2px] w-10 bg-yellow-500 mt-3"></span>
                        </h3>

                        <FaArrowLeft
                          className="cursor-pointer text-gray-700 hover:text-green-500"
                          onClick={() => setOpenSectionId(null)} // ← Retour à la description
                        />
                      </div>

                      <h2 className={`${poppins.className} text-[25px] md:text-[35px] font-bold mb-4 leading-snug`}>
                        Inscrivez-vous dès maintenant
                      </h2>

                      <p className="text-gray-700 text-sm md:text-base mb-2 transition-all duration-300">
                        Remplissez le formulaire ci-dessous pour créer votre compte et rejoindre notre communauté. C’est rapide et facile !
                      </p>

                      <form
                        className="w-full mt-10"
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSave(formation.id_formation);
                        }}
                      >
                        <FormInscription formData={formData} setFormData={setFormData} />
                      </form>
                    </motion.div>
                  ) : (
                    // Description / aperçu de la formation
                    <motion.div
                      key="formation-description"
                      initial={{ x: 300, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 300, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="top-0 left-0 w-full"
                    >
                      <h3 className={`${greatVibes.className} text-yellow-500 font-medium text-[25px] mb-2 flex items-center gap-2`}>
                        {formation.type_formation}
                        <span className="hidden sm:inline-block h-[2px] w-10 bg-yellow-500 mt-3"></span>
                      </h3>

                      <h2 className="text-[25px] md:text-[35px] font-bold mb-4 leading-snug">
                        {formation.libelle_formation}
                      </h2>

                      <TextWithButton text={formation.modules_enseignes} />

                      <ul className="space-y-4 mb-6 text-sm text-gray-800 mt-8">
                        <li className="flex items-center gap-2">
                          <FaMapLocationDot className="text-green-500 text-[20px]" /> Enis restaurant
                        </li>
                        <li className="flex items-center gap-2">
                          <FaCalendarAlt className="text-green-500 text-[20px]" />
                          {formation.Date_Debut} - {formation.Date_Fin}
                        </li>
                        <li className="flex items-center gap-2">
                          <FaMoneyBillWave className="text-green-500 text-[20px]" /> 1800 franc CFA
                        </li>
                      </ul>

                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => setOpenSectionId(formation.id_formation)} // ← ouvre le formulaire d’inscription
                          className="bg-green-500 text-white px-4 py-2 rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl text-[15px]   hover:bg-green-600 flex items-center gap-2"
                        >
                          <ImUserPlus /> S’inscrire
                        </button>
                        <button className="bg-[#282828] text-white px-4 py-2 rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl text-[15px]  hover:bg-green-600 flex items-center gap-2">
                          <FaFileAlt /> Brochure
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>
          </section>
        ))) : (
          <div className="flex justify-center items-center my-22 mb-56">
            <p className='text-black/50 font-medium text-[20px] text-center'>  Les inscriptions ne sont pas ouvertes actuellement. <br />Restez connectés pour les prochaines sessions.
            </p>
          </div>
        )}





      </div>
      <Footer />
    </div>
  );
}
