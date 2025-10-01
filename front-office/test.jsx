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
import Cocktails_Fruits from "../../../../public/images/Menu_patisserie/Cocktails_Fruits.webp";
import Crepes_Salées from "../../../../public/images/Menu_patisserie/Crepes_Salées.webp";
import Crepes_Sucrées from "../../../../public/images/Menu_patisserie/Crepes_Sucrées.webp";
import Dessert from "../../../../public/images/Menu_patisserie/Dessert.webp";
import Gaufres from "../../../../public/images/Menu_patisserie/Gaufres.webp";
import Glace from "../../../../public/images/Menu_patisserie/Glace.webp";
import Jus from "../../../../public/images/Menu_patisserie/Jus.webp";
import Milkshakes from "../../../../public/images/Menu_patisserie/Milkshakes.webp";
import Petit_déjeuner from "../../../../public/images/Menu_patisserie/Petit_déjeuner.webp";

// Static menu array for images
const Menu_item = [
  {
    category: "Sucré & Gourmandises",
    items: [
      { src: Crepes_Salées, label: "Crêpes salées", Specialite: "Crêpes salées" },
      { src: Crepes_Sucrées, label: "Crêpes sucrées", Specialite: "Crêpes sucrées" },
      { src: Gaufres, label: "Gaufres", Specialite: "Gaufres" },
      { src: Gaufres, label: "Gâteaux", Specialite: "Gâteaux" },
      { src: Dessert, label: "Desserts", Specialite: "Desserts" },
    ],
  },
  {
    category: "Liquides & Boissons",
    items: [
      { src: Glace, label: "Glaces", Specialite: "Glaces" },
      { src: Milkshakes, label: "Milkshakes", Specialite: "Milkshakes" },
      { src: Jus, label: "Jus", Specialite: "Jus" },
      { src: Cocktails_Fruits, label: "Cocktail de fruits", Specialite: "Cocktail de fruits" },
      { src: Boissons, label: "Boissons chaudes", Specialite: "Boissons chaudes" },
      { src: Boissons, label: "Boissons froides", Specialite: "Boissons froides" },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Patisserie() {
  const [menuItems, setMenuItems] = useState([]);

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

  // Fetch menu JSON
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("/data/Menu_Patisserie.json");
        const data = await res.json();

        const formattedMenu = data.map(item => ({
          name: item.Libelle_Menu,
          price: item.Prix_Menu > 0 ? `${item.Prix_Menu} FCFA` : "—",
          desc: item.Description_Menu || "",
          img: item.photo_Menu ? `http://localhost:4000${item.photo_Menu}` : null,
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
          className="scroll-mt-24 relative mb-28 max-w-7xl mx-auto px-6"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className={`${greatVibes.className} text-green-500 text-[26px]`}>Nos plats</p>
          <h3 className={`${poppins.className} text-[17px] md:text-[24px] dark_color font-bold`}>
            Découvrez nos <span className="text-green-500">{activeSpecialiteSucre}</span>
          </h3>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
            <AnimatePresence mode="wait">
              <motion.ul
                key={activeSpecialiteSucre}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {currentSpecialiteSucreItems.map((item, i) => (
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
                      <p className={`${poppins.className} text-black/50 text-[13px] mt-2 truncate`}>
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>

            <div className="hidden lg:flex justify-center">
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
                      width={400}
                      height={400}
                      className="w-[400px] h-[400px] object-cover"
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
          className="scroll-mt-24 relative mb-28 max-w-7xl mx-auto px-6"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 ">

            {/* Contenu à gauche : détail + photo */}
            <div className="flex flex-col justify-start lg:order-1 order-2">
              <p className={`${greatVibes.className} text-green-500 text-[26px]`}>Nos Boissons</p>
              <h3 className={`${poppins.className} text-[17px] md:text-[24px] dark_color font-bold`}>
                Découvrez nos <span className="text-green-500">{activeSpecialiteBoissons || "Boissons"}</span>
              </h3>



              <AnimatePresence mode="wait">
                <motion.ul
                  key={activeSpecialiteSucre}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className=" border border-blue-600 mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr_420px] gap-10">
                    {/* Colonne 2 : Liste Boissons */}
                    <div className="border border-yellow-600 w-2/3  ">
                      <motion.ul
                        key="boissons-list"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 border-l border-gray-700 pl-4 lg:pl-0 lg:border-l-0 lg:border-r lg:pr-4"
                      >
                        {boissonsItems.map((b, i) => (
                          <li
                            key={i}
                            className={`cursor-pointer ${activeSpecialiteBoissons === b.Specialite ? "text-green-500 font-semibold" : "text-gray-300"}`}
                            onClick={() => {
                              setActiveSpecialiteBoissons(b.Specialite);
                              setActiveSpecialiteBoissonsImg(b.src);
                            }}
                          >
                            {b.label}
                          </li>
                        ))}
                      </motion.ul>
                    </div>
                    {/* Colonne 1 : Liste Sucre */}
                    <div className="w-full ">
                      {currentSpecialiteSucreItems.map((item, i) => (
                        <li key={i} className="group flex items-center gap-4 border border-red-600">
                          {item.img && (
                            <Image
                              src={item.img}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="w-16 h-16 rounded-full object-cover shadow flex-shrink-0"
                            />
                          )}
                          {currentBoissonsItems.length > 0 && (
                            <div className="mt-4 space-y-4">
                              {currentBoissonsItems.map((item, i) => (
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
                                  <p className={`${poppins.className} text-black/50 text-[13px] mt-2 truncate`}>
                                    {item.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}
                        </li>
                      ))}
                    </div>



                    {/* Colonne 3 : Image */}
                    <div className="w-2/3">
                    {activeSpecialiteBoissonsImg && (
                      <div className="mt-6 w-full lg:w-[400px] lg:h-[400px] mx-auto lg:mx-0 border border-red-600">
                        <Image
                          src={activeSpecialiteBoissonsImg}
                          alt={activeSpecialiteBoissons}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                    )}
</div>
                  </div>
                </motion.ul>
              </AnimatePresence>



            </div>

            {/* Liste à droite */}


          </div>
        </motion.section>

      </div>

      <Footer />
    </div>
  );
}
