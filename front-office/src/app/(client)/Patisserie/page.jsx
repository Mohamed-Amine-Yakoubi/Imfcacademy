'use client';

import { Navbar } from '@/components/common/Navbar';
import React, { useEffect, useState, useMemo } from 'react';
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { greatVibes, poppins } from '../../../Styles/fonts/fonts';
import Header from '@/components/common/Header';
import Footer from "../../../components/common/Footer";
import Menu_link from '../../../components/common/Menu_link';
import Section_titles from '../../../components/common/Section_titles';

import Header_Background from "../../../../public/images/Formations/Header_Background.webp";
import Background_section from "../../../../public/images/Menu_patisserie/Background_section.webp";
import Boissons from "../../../../public/images/Menu_patisserie/Boissons.webp";
import Boissons_froides from "../../../../public/images/Menu_patisserie/Boissons_froides.webp";
import Cocktails_Fruits from "../../../../public/images/Menu_patisserie/Cocktails_Fruits.webp";
import Crepes_Salées from "../../../../public/images/Menu_patisserie/Crepes_Salées.webp";
import Crepes_Sucrées from "../../../../public/images/Menu_patisserie/Crepes_Sucrées.webp";
import Dessert from "../../../../public/images/Menu_patisserie/Dessert.webp";
import Gateaux from "../../../../public/images/Menu_patisserie/Gateaux.webp";
import Gaufres from "../../../../public/images/Menu_patisserie/Gaufres.webp";
import Glace from "../../../../public/images/Menu_patisserie/Glace.webp";
import Jus from "../../../../public/images/Menu_patisserie/Jus.webp";
import Milkshakes from "../../../../public/images/Menu_patisserie/Milkshakes.webp";
import Petit_déjeuner from "../../../../public/images/Menu_patisserie/Petit_déjeuner.webp";
import Tapas_Charcuterie from "../../../../public/images/Menu_patisserie/Tapas & Charcuterie.webp";
import brush from "../../../../public/images/brush.webp";

import ScrollAnimationWrapper from '@/layout/ScrollAnimationWrapper';


// Static menu array for images
const Menu_item = [
  {
    category: "Sucré & Gourmandises",
    items: [
      { src: Crepes_Salées, label: "Crêpes salées", Specialite: "Crêpes salées" },
      { src: Crepes_Sucrées, label: "Crêpes sucrées", Specialite: "Crêpes sucrées" },
      { src: Gaufres, label: "Gaufres", Specialite: "Gaufres" },
      { src: Gateaux, label: "Gâteaux", Specialite: "Gâteaux" },
      { src: Dessert, label: "Desserts", Specialite: "Desserts" },
    ],
  },
  {
    category: "Liquides & Boissons",
    items: [
      // { src: Glace, label: "Glaces", Specialite: "Glaces" },
      { src: Milkshakes, label: "Milkshakes", Specialite: "Milkshakes" },
      { src: Jus, label: "Jus", Specialite: "Jus" },
      { src: Cocktails_Fruits, label: "Cocktail de fruits", Specialite: "Cocktail de fruits" },
      { src: Boissons, label: "Boissons chaudes", Specialite: "Boissons chaudes" },
      { src: Boissons_froides, label: "Boissons froides", Specialite: "Boissons froides" },
    ],
  },
  {
    category: "Tapas & Charcuterie",
    items: [
      // { src: Glace, label: "Glaces", Specialite: "Glaces" },
      { label: "Cheese box", Specialite: "Cheese box" },
      { label: "Box le gourmet", Specialite: "Box le gourmet" },
      { label: "Box orientale", Specialite: "Box orientale" },

    ],
  },
  {
    category: "Petit déjeuner",
    items: [
      // { src: Glace, label: "Glaces", Specialite: "Glaces" },
      { label: "Petit déjeuner", Specialite: "Petit déjeuner" },


    ],
  },
];


const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Patisserie() {
  const [menuItems, setMenuItems] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
const [openIndex, setOpenIndex] = useState(null); // null = aucun ouvert
   // États séparés pour chaque section
  const [activeSpecialiteSucre, setActiveSpecialiteSucre] = useState("");
  const [activeSpecialiteImg, setActiveSpecialiteImg] = useState(null);


  const [activeSpecialiteBoissons, setActiveSpecialiteBoissons] = useState("");
  const [activeSpecialiteBoissonsImg, setActiveSpecialiteBoissonsImg] = useState(null);


  useEffect(() => {
    // First check static menu
    const staticItem = flatMenuItems.find(i => i.Specialite === activeSpecialiteSucre);
    if (staticItem) {
      setActiveSpecialiteImg(staticItem.src);
      return;
    }
    // Then check API menu
    const apiItem = menuItems.find(i => i.Specialite === activeSpecialiteSucre);
    if (apiItem && apiItem.img) {
      setActiveSpecialiteImg(apiItem.img);
    }
  }, [activeSpecialiteSucre, menuItems]);
  // Flatten items for Sucré & Gourmandises
  const flatMenuItems = Menu_item.find(category => category.category === "Sucré & Gourmandises")?.items || [];
  // Items for Boissons
  const boissonsItems = Menu_item.find(cat => cat.category === "Liquides & Boissons")?.items || [];



  // Fetch menu JSON
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/data/Menu_Patisserie.json");
        const data = await res.json();

        const formattedMenu = data.map(item => ({
          name: item.Libelle_Menu,
          price: item.Prix_Menu_Solo > 0 ? `${item.Prix_Menu_Solo} FCFA` : "—",
          price_duo: item.Prix_Menu_Duo > 0 ? `${item.Prix_Menu_Duo} FCFA` : "—",
          desc: item.Description_Menu || "",
          img: item.photo_Menu || null,
          Specialite: item.Specialite,
          category: item.Type_Menu
        }));

        setMenuItems(formattedMenu);
      } catch (error) {
        console.error("Erreur fetch menu:", error);
      }
    };
    fetchMenu();
  }, []);
  // Initialisation section Sucré
  useEffect(() => {
    if (flatMenuItems.length) {
      setActiveSpecialiteSucre(flatMenuItems[0].Specialite);
      setActiveSpecialiteImg(flatMenuItems[0].src);
    }
  }, []);

  // Initialisation section Boissons
  useEffect(() => {
    if (boissonsItems.length) {
      setActiveSpecialiteBoissons(boissonsItems[0].Specialite);
      setActiveSpecialiteBoissonsImg(boissonsItems[0].src);
    }
  }, []);



  const petitDejItems = useMemo(() => {
    return menuItems.filter(item => item.Specialite === "Petit déjeuner");
  }, [menuItems]);





  // Filter items per section
  const currentSpecialiteSucreItems = useMemo(() => {
    return menuItems.filter(
      item => item.Specialite?.toLowerCase().trim() === activeSpecialiteSucre.toLowerCase().trim()
    );
  }, [menuItems, activeSpecialiteSucre]);

  const currentBoissonsItems = useMemo(() => {
    return menuItems.filter(
      item => item.Specialite?.toLowerCase().trim() === activeSpecialiteBoissons.toLowerCase().trim()
    );
  }, [menuItems, activeSpecialiteBoissons]);



  const [sucrePage, setSucrePage] = useState(1);
  const [boissonsPage, setBoissonsPage] = useState(1);
  const itemsPerPage = 5; // max items per page
  const paginatedSucreItems = currentSpecialiteSucreItems.slice(
    (sucrePage - 1) * itemsPerPage,
    sucrePage * itemsPerPage
  );

  // For Boissons items
  const paginatedBoissonsItems = currentBoissonsItems.slice(
    (boissonsPage - 1) * itemsPerPage,
    boissonsPage * itemsPerPage
  );



  const tapasItemsFromAPI = menuItems.filter(item =>
    ["Cheese box", "Box le gourmet", "Box orientale"].includes(item.Specialite)
  );





  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />

      <Header
        backgroundImage={Header_Background.src}
        subtitle="Saveurs en Images"
        title={`[L’Art Culinaire] du Restaurant Enis`}
        greatVibes={greatVibes}
        accentColor={"white"}
        highlightColor={"#FFBB00"}
        path={"Restaurant"}
        LinksNavigation={true}
        margin_top={"md:mt-70 mt-30"}
      />

      <div
        style={{
          backgroundImage: `url(${Background_section.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <Section_titles
          title={<>Découvrez Notre <span className="text-green-500">Menu</span></>}
          subtitle={"Plats Frais et Délicieux"}
        />

        {/* Section Sucré & Gourmandises */}
        <Menu_link
          Menu_item={flatMenuItems}
          setActiveSpecialite={(specialite, img) => {
            setActiveSpecialiteSucre(specialite);
            setActiveSpecialiteImg(img);
          }}
        />

        <motion.section
          key={activeSpecialiteSucre}
          className="scroll-mt-24 relative mb-28 max-w-6xl lg:mx-auto mx-4 px-6"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >


          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
            <div>
              <div className="mb-5">
                <p className={`${greatVibes.className} text-green-500 text-[26px]`}>Nos plats</p>
                <h3 className={`${poppins.className} text-[17px] md:text-[24px] dark_color font-bold`}>
                  Découvrez nos <span className="text-green-500">{activeSpecialiteSucre}</span>
                </h3>
              </div>

              <AnimatePresence mode="wait">

                <motion.ul
                  key={activeSpecialiteSucre}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >


                  {paginatedSucreItems.map((item, i) => (
                    <li key={i} className="group flex items-center gap-4">
                      {item.img && (
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-16 h-16 rounded-full object-cover shadow flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0" key={i}>
                        <div className="flex items-center w-full">
                          <div
                            className={`${poppins.className} text-[14px] font-semibold dark_color truncate pr-2 z-10 inline-block`}
                            style={{ maxWidth: '60%' }}
                          >
                            {item.name}
                          </div>
                          <div className="flex-1 relative mx-1" style={{ minWidth: 0, height: 18 }}>
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: '80%',
                                transform: 'translateY(-50%)',
                                height: 1,
                                backgroundImage:
                                  'repeating-linear-gradient(to right, rgba(156,163,175,0.95) 0 5px, transparent 2px 9px)',
                              }}
                            />
                          </div>
                          <div className={`${poppins.className} text-[14px] font-semibold text-green-500 flex-shrink-0 pl-2 z-10 inline-block whitespace-nowrap`}>
                            {item.price}
                          </div>
                        </div>
                        <p className={`${poppins.className} text-black/50 text-[13px]  mt-[1px] truncate`}>
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                  {currentSpecialiteSucreItems.length > itemsPerPage && (
                    <div className="flex justify-center gap-2 mt-7">
                      {Array.from({ length: Math.ceil(currentSpecialiteSucreItems.length / itemsPerPage) }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full cursor-pointer ${sucrePage === i + 1 ? "bg-green-500" : "bg-gray-300"}`}
                          onClick={() => setSucrePage(i + 1)}
                        />
                      ))}
                    </div>
                  )}
                </motion.ul>
              </AnimatePresence>
            </div>
            <div className="hidden lg:flex justify-center items-center  ">
              <AnimatePresence mode="wait">
                {activeSpecialiteImg && (
                  <motion.div
                    key={activeSpecialiteSucre}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={activeSpecialiteImg}
                      alt={`${activeSpecialiteSucre} géant`}
                      width={300}
                      height={300}
                      className="w-[300px] h-[300px] object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* Section Liquides & Boissons */}

        <motion.section
          key="liquides-boissons"
          className="scroll-mt-24 relative mb-28 max-w-6xl  lg:mx-auto   px-6 mx-4"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="text-center lg:text-start">
            <p className={`${greatVibes.className} text-green-500 text-[26px]`}>Nos Boissons</p>
            <h3 className={`${poppins.className} text-[17px] md:text-[24px] dark_color font-bold`}>
              Découvrez nos <span className="text-green-500">{activeSpecialiteBoissons}</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_220px] gap-6 my-10 ">

            {/* Colonne 1 : Liste catégories boissons (petite) */}
            <div className="relative    ">
              {/* Desktop */}
              <motion.ul
                key="boissons-list"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="hidden lg:block relative space-y-4   h-full   md:h-[185px]"
              >
                <div className="absolute right-6 top-0 h-full w-[2px] bg-gray-300" />
                {boissonsItems.map((b, i) => (
                  <li
                    key={i}
                    className={`relative cursor-pointer ${activeSpecialiteBoissons === b.Specialite
                      ? "text-green-500 font-semibold"
                      : "text-gray-600"
                      }`}
                    onClick={() => {
                      setActiveSpecialiteBoissons(b.Specialite);
                      setActiveSpecialiteBoissonsImg(b.src);
                    }}
                  >
                    {activeSpecialiteBoissons === b.Specialite && (
                      <motion.div
                        layoutId="active-bar"
                        className="absolute right-[23.5px] top-0 h-full w-[3px] bg-green-500"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    {b.label}
                  </li>
                ))}
              </motion.ul>


              {/* Mobile/Tablet */}
              <div className="lg:hidden overflow-x-auto no-scrollbar mb-10">
                <div className="flex justify-center items-center gap-4 px-4">
                  {boissonsItems.map((b, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveSpecialiteBoissons(b.Specialite);
                        setActiveSpecialiteBoissonsImg(b.src);
                      }}
                      className="flex-shrink-0 cursor-pointer px-4 py-2 text-center relative"
                    >
                      <span
                        className={`transition-colors duration-300  ${activeSpecialiteBoissons === b.Specialite
                          ? "text-green-500 font-semibold"
                          : "text-gray-700"
                          }`}
                      >
                        {b.label}
                      </span>
                      {/* Barre verte sous le texte */}

                      {activeSpecialiteBoissons === b.Specialite && (
                        <motion.div
                          layoutId="active-bar-mobile"
                          className="absolute bottom-0 left-0  right-0 h-[2px] bg-green-500 rounded"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </div>
                  ))}

                </div>
              </div>



            </div>


            <AnimatePresence mode="wait">

              <motion.ul
                key={activeSpecialiteBoissons}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Colonne 2 : Liste sélectionnée (grande) */}
                <div className="space-y-4">
                  {paginatedBoissonsItems.length > 0 &&
                    paginatedBoissonsItems.map((item, i) => (
                      <div className="flex-1 min-w-0" key={i}>
                        <div className="flex items-center w-full">
                          <div
                            className={`${poppins.className} text-[14px] font-semibold dark_color truncate pr-2 z-10 inline-block`}
                            style={{ maxWidth: '60%' }}
                          >
                            {item.name}
                          </div>
                          <div className="flex-1 relative mx-1" style={{ minWidth: 0, height: 18 }}>
                            <div
                              style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: '80%',
                                transform: 'translateY(-50%)',
                                height: 1,
                                backgroundImage:
                                  'repeating-linear-gradient(to right, rgba(156,163,175,0.95) 0 5px, transparent 2px 9px)',
                              }}
                            />
                          </div>
                          <div className={`${poppins.className} text-[14px] font-semibold text-green-500 flex-shrink-0 pl-2 z-10 inline-block whitespace-nowrap`}>
                            {item.price}
                          </div>
                        </div>
                        <p className={`${poppins.className} text-black/50 text-[13px] mt-[1px] truncate`}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  {currentBoissonsItems.length > itemsPerPage && (
                    <div className="flex justify-center gap-2 mt-7">
                      {Array.from({ length: Math.ceil(currentBoissonsItems.length / itemsPerPage) }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full cursor-pointer ${boissonsPage === i + 1 ? "bg-green-500" : "bg-gray-300"}`}
                          onClick={() => setBoissonsPage(i + 1)}
                        />
                      ))}
                    </div>
                  )}

                </div>
              </motion.ul>
            </AnimatePresence>
            {/* Colonne 3 : Image (petite) */}

            <AnimatePresence mode="wait">
              {activeSpecialiteBoissonsImg && (
                <motion.div
                  key={activeSpecialiteBoissons}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center "
                >
                  <Image
                    src={activeSpecialiteBoissonsImg}
                    alt={activeSpecialiteBoissons}
                    width={220}
                    height={220}
                    className="w-[220px] h-[220px] object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>




        {/* Tapas & Charcuterie */}
        <Section_titles
          title={<>Tapas<span className="text-green-500 "> &</span> Charcuterie</>}
          description={"Composez votre plat selon vos envies : choisissez une base, ajoutez vos garnitures favorites et complétez avec nos accompagnements variés."}
        />
        <AnimatePresence mode="wait">
          <motion.ul
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className=" "
          >
            {/* Colonne 2 : Liste sélectionnée (grande) */}

            <div className="max-w-6xl lg:mx-auto px-4 mx-6 mt-7 flex flex-col md:flex-row  justify-center  items-center md:space-x-8 space-y-6 md:space-y-0">
              {/* Image Section */}
              <div className="flex justify-center  items-center flex-shrink-0  ">
                <Image
                  src={Tapas_Charcuterie.src}
                  alt="photo Tapas & Charcuterie"
                  width={300}
                  height={300}
                  className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full object-contain"
                />
              </div>

              {/* Content Section */}
              <div className="flex-1 space-y-6  ">
                {["Cheese box", "Box le gourmet", "Box orientale"].map((specialite, i) => {
                  const apiItem = menuItems.find(item => item.Specialite === specialite);
                  const staticItem = Menu_item.find(cat => cat.category === "Tapas & Charcuterie")
                    ?.items.find(i => i.Specialite === specialite);

                  return (
                    <div className="flex flex-col" key={i}>
                      <div className="flex items-center w-full">
                        {/* Title */}
                        <div
                          className={`${poppins.className} text-sm font-semibold dark_color truncate pr-2`}
                          style={{ maxWidth: "60%" }}
                        >
                          {apiItem?.name || specialite}
                        </div>

                        {/* Separator */}
                        <div className="flex-1 relative mx-1" style={{ minWidth: 0, height: 18 }}>
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              right: 0,
                              top: "50%",
                              transform: "translateY(-50%)",
                              height: 1,
                              backgroundImage:
                                "repeating-linear-gradient(to right, rgba(156,163,175,0.95) 0 5px, transparent 2px 9px)",
                            }}
                          />
                        </div>

                        {/* Price */}
                        <div
                          className={`${poppins.className} text-sm font-semibold text-green-500 flex-shrink-0 pl-2 whitespace-nowrap`}
                        >
                          {apiItem?.price || "—"}
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className={`${poppins.className} text-black/50 md:text-start text-center text-sm mt-1 break-words`}
                      >
                        {apiItem?.desc || ""}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.ul>
        </AnimatePresence>





        {/* Petit déjeuner */}
        <Section_titles
          title={<>Découvrez nos <span className="text-green-500 ">Petit déjeuner</span></>}
        />


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto p-6 my-12">
  {petitDejItems.map((item, i) => {
    const isOpen = openIndex === i; // true si cette carte est ouverte

    return (
    <div
  key={i}
  className="relative w-full max-w-xs lg:max-w-md mx-auto rounded-md overflow-hidden shadow-lg"
>
  <Image
    src={item.img || Header_Background}
    alt={item.name}
    width={400}
    height={500}
    className="w-full h-[450px] object-cover transition-transform duration-500 hover:scale-105"
  />

  {/* Overlay texte */}
  <div
    className={`absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-4 transition-all duration-500
      ${isOpen ? "backdrop-blur-[3px]" : ""}`}
  >
    <div className="border-2 border-white rounded-lg w-full h-full flex flex-col justify-center items-center p-4">

      <h2 className={`${greatVibes.className} lg:text-[40px] md:text-[35px] text-[32px] font-bold leading-[40px]`}>
        {item.name}
      </h2>

      {/* Bouton mobile & desktop */}
      {!isOpen && (
        <button
          className="mt-4 px-4 py-2 border-2 border-white text-white rounded hover:bg-gray-200 hover:text-black transition lg:block"
          onClick={() => setOpenIndex(i)}
        >
          Voir le menu
        </button>
      )}

      {/* Contenu description & prix uniquement si ouvert */}
      {isOpen && (
        <div className="mt-2 transition-all duration-500 w-full">
          {Array.isArray(item.desc) ? (
            <ul className="mt-2 space-y-1 lg:text-[15px] text-[13px]">
              {item.desc.map((d, idx) => (
                <li key={idx}>- {d}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 lg:text-[15px] text-[13px]  ">{item.desc}</p>
          )}

          <div className="flex  lg:flex-row flex-col mt-5 items-center justify-center gap-1  ">
            <div className="relative inline-block py-4 w-1/2 sm:w-[150px]">
              <Image
                src={brush}
                alt="brush"
                width={500}
                height={500}
                className="absolute inset-0 w-full h-full transform scale-x-[-1]"
              />
              <span className=" lg:text-[15px] text-[13px] relative block w-full text-center text-white font-medium">
                Solo : {item.price || "—"}
              </span>
            </div>

            <div className="relative inline-block py-4 w-1/2 sm:w-[150px]">
              <Image
                src={brush}
                alt="brush"
                width={500}
                height={500}
                className="absolute inset-0 w-full h-full"
              />
              <span className=" lg:text-[15px] text-[13px] relative block w-full text-center text-white font-medium">
                Duo : {item.price_duo || "—"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>

    );
  })}
</div>

      </div>

      <Footer />
    </div>
  );
}
