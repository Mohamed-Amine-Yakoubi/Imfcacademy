'use client';

import { Navbar } from '@/components/common/Navbar';
import React, { useEffect, useMemo, useState } from 'react';
 
 import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import getScrollAnimation from "../../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../../layout/ScrollAnimationWrapper";
import { greatVibes, poppins } from '../../../Styles/fonts/fonts';

import Header from '@/components/common/Header';
import Footer from "../../../components/common/Footer";
import Menu_link from '../../../components/common/Menu_link';
import Menu_link_cards from '../../../components/common/Menu_link_cards';
import Section_titles from '../../../components/common/Section_titles';

const Menu_item = [
  { src: "/images/Menu_restaurant/Burger.webp", label: 'Burger', Specialite: "Burger" },
  { src: "/images/Menu_restaurant/Entrées_libanaises.webp", label: 'Entrées libanaises', Specialite: "Entrées libanaises" },
  { src: "/images/Menu_restaurant/Griallades.webp", label: 'Grillades', Specialite: "Grillades" },
  { src: "/images/Menu_restaurant/Pate.webp", label: 'Pate', Specialite: "Pate" },
  { src: "/images/Menu_restaurant/Pizza.webp", label: 'Pizza', Specialite: "Pizza" },
  { src: "/images/Menu_restaurant/Salade.webp", label: 'Salade', Specialite: "Salade" },
  { src: "/images/Menu_restaurant/Sandwichs.webp", label: 'Plat', Specialite: "Plat" },
  { src: "/images/Menu_restaurant/Sandwichs.webp", label: 'Sandwichs', Specialite: "Sandwichs" },
  { src: "/images/Menu_restaurant/Soupe.webp", label: 'Soupe', Specialite: "Soupe" }
];

const plats_Composes = [
  { img: "/images/Menu_restaurant/Volailles.webp", Specialite: "Volailles" },
  { img: "/images/Menu_restaurant/Viande_rouge.webp", Specialite: "Viandes rouges" },

  { img: "/images/Menu_restaurant/Lapin.webp", Specialite: "Lapin" },
  { img: "/images/Menu_restaurant/Poisson.webp", Specialite: "Poisson" },
  { img: "/images/Menu_restaurant/Fruits_de_mer.webp", Specialite: "Fruits de mer" },
]
  ;
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
export default function Restaurant() {
  const [activeSpecialite, setActiveSpecialite] = useState('Burger');
  const [activeSpecialitePLats, setActiveSpecialitePLats] = useState('Volailles');
  const [menuItems, setMenuItems] = useState([]);
const [selectedImage, setSelectedImage] = useState(null);

  // Fetch menu from backend
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`/data/Menu_Restaurant.json`);
        const data = await res.json();

        const formattedMenu = data.map(item => ({
          name: item.Libelle_Menu,
          price: `${item.Prix_Menu_Solo} FCFA`,
          desc: item.Description_Menu,
          // img: item.photo_Menu ? `http://localhost:4000${item.photo_Menu}` : null,
          img: item.photo_Menu || null,
          Specialite: item.Specialite,
        }));

        setMenuItems(formattedMenu);
      } catch (error) {
        console.error("Erreur fetch menu:", error);
      }
    };
    fetchMenu();
  }, []);

  // Filter menu items by selected category
  const currentSpecialiteItems = menuItems.filter(
    item => item.Specialite === activeSpecialite
  );

  const platsComposesFiltered = menuItems.filter(
    item => item.Specialite === activeSpecialitePLats
  );

  // Pagination
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(currentSpecialiteItems.length / ITEMS_PER_PAGE);
  const paginatedItems = currentSpecialiteItems.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
useEffect(() => {
  setSelectedImage(null);
}, [activeSpecialite, currentPage]);
useEffect(() => {
  if (currentPage >= totalPages) {
    setCurrentPage(0);
  }
}, [totalPages, currentPage]);
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />

      <Header
        backgroundImage="/images/Formations/Header_Background.webp"
        subtitle="Saveurs en Images"
        title={`[L’Art Culinaire] du Restaurant Enis `}
        greatVibes={greatVibes}
        accentColor={"white"}
        highlightColor={"#FFBB00"}
        path={"Restaurant"}
        LinksNavigation={true}
        margin_top={"md:mt-70 mt-30"}
      />
      <div className=""
        style={{
          backgroundImage: `url(/images/Menu_restaurant/Background_section.webp)`,
          backgroundSize: "contain",
          backgroundPosition: "center  ", // décale vers le haut de 50px

          backgroundRepeat: "repeat",

        }}>
        <Section_titles
          title={<>Découvrez Notre <span className="text-green-500">Menu</span> </>}
          subtitle={"Plats Frais et Délicieux"}
        />

        <Menu_link Menu_item={Menu_item} setActiveSpecialite={setActiveSpecialite} />
        <ScrollAnimationWrapper>
          <motion.section id={activeSpecialite.toLowerCase()} className="scroll-mt-24 relative mb-28"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp} // or fadeRight/fadeLeft
          >
            <div className="max-w-6xl mx-auto px-6">
              <p className={`${greatVibes.className} text-green-500 text-[26px]`}>Nos plats</p>
              <h3 className={`${poppins.className} text-[17px] md:text-[24px] dark_color font-bold`}>
                Découvrez nos <span className="text-green-500">{activeSpecialite}</span>
              </h3>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">
  <AnimatePresence mode="wait">
    <motion.ul
      key={`${activeSpecialite}-${currentPage}`}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {paginatedItems.map((b, i) => (
        <li key={i} className="group flex items-center gap-4">
          {b.img && (
            <Image
              src={b.img}
              alt={b.name}
              width={70}
              height={70}
              onClick={() => setSelectedImage(b.img)}   // ✅ clique change la grande image
              className="w-[70px] h-[70px] rounded-md object-contain flex-shrink-0 cursor-pointer"
            />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center w-full">
              <div
                className={`${poppins.className} text-[14px] font-semibold dark_color truncate pr-2 z-10 inline-block`}
                style={{ maxWidth: '60%' }}
              >
                {b.name}
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
              <div
                className={`${poppins.className} text-[14px] font-semibold text-green-500 flex-shrink-0 pl-2 z-10 inline-block whitespace-nowrap`}
              >
                {b.price}
              </div>
            </div>
            <p className={`${poppins.className} text-black/50 text-[13px] mt-2 truncate`}>
              {b.desc}
            </p>
          </div>
        </li>
      ))}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`w-2 h-2 rounded-full ${
                currentPage === index ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </motion.ul>
  </AnimatePresence>

  {/* Large image */}
  <div className=" flex justify-center">
    <AnimatePresence mode="wait">
      {(selectedImage || currentSpecialiteItems[0]?.img) && (
        <motion.div
          key={`${activeSpecialite}-${currentPage}-${selectedImage || 'default'}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={selectedImage || currentSpecialiteItems[0].img}  // ✅ utilise selectedImage si dispo
            alt={`${activeSpecialite} sélectionné`}
            width={400}
            height={400}
            className="w-[400px] h-[400px] object-contain rounded-md"
          />
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</div>


            </div>
          </motion.section>
        </ScrollAnimationWrapper>

        <Section_titles
          title={<><span className="text-green-500 ">Plats</span> Composés</>}
          description={"Composez votre plat selon vos envies : choisissez une base, ajoutez vos garnitures favorites et complétez avec nos accompagnements variés."}
        />
        <ScrollAnimationWrapper>
          <motion.div
            className="my-10 md:mx-0 mx-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <Menu_link_cards
              Menu_item={menuItems}
              setActiveSpecialite={setActiveSpecialitePLats}
              image={plats_Composes}
            />
          </motion.div>
        </ScrollAnimationWrapper>
      </div>
      <Footer />
    </div>
  )
}