"use client";
import React, { useEffect, useState } from "react";

import logo_Enis from "../../../public/images/logo_Enis.webp";
import { IoClose, IoMenu } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FaFacebook, FaFacebookF, FaInstagram } from "react-icons/fa";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import { usePathname } from "next/navigation";
import FormReservation from "../form/FormReservation";
import { greatVibes, poppins } from "@/Styles/fonts/fonts";

import Background_header from "../../../public/images/Réservation_background.webp";


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
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleReservation = () => setIsReservationOpen((prev) => !prev);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/A_propos', label: 'À propos' },
    { href: '/Galerie', label: 'Galerie' },
    { href: '/Contact', label: 'Contact' },
  ];

  const [isReservationOpen, setIsReservationOpen] = useState(false);



  const [formData, setFormData] = useState({
    Nom_Prenom_Reservation: "",
    NumTel_Reservation: "",
    Nbr_personne_Reservation: "",
    Date_Reservation: "",
    Horraire_Reservation: "",

  });
  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ReservationsTable/Create_Reservation`, {
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

      alert("Réservation créée avec succès !");
    } catch (error) {
      console.error("Erreur front :", error);
      alert("Une erreur est survenue lors de la création.");
    }
  };

  return (
    <div className="">
      {/* ✅ Navbar scroll background and padding change */}
      <nav
        className={`fixed flex justify-center  w-full z-999 top-0 transition-all duration-500 ease-in-out ${isScrolled ? "backdrop-blur-md shadow-md   " : "py-2.5"
          } ${isMenuOpen ? "py-0" : ""}`}
        style={

          isMenuOpen
            ? {
              background: "transparent", // or fully transparent gradient if you want
              height: "0px",
              transition: "all 0.3s ease",
              boxShadow: "none", // remove shadow when menu open
            }
            : isScrolled
              ? {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                height: "70px",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }
              : {

              }
        }

      >
        <div className={`w-full max-w-screen-2xl px-8 md:px-0    lg:mx-15 md:mx-13 mx-0 flex justify-between  ${isScrolled ? "items-center" : "items-start "}`}>
          <motion.div
            className="flex items-center "
            initial={{ x: "-20%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: "-20%",
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Link href="/">
              {/* ✅ Logo shrink on scroll */}
              <Image
                className={`transition-all duration-300 max-w-full h-auto
                  ${isMenuOpen ? "hidden md:block" : ""}
                  ${isScrolled ? "w-[50px] md:w-[65px] p-1" : "w-[60px] md:w-[100px]"}`}
                src={logo_Enis}
                alt="logo_Enis de Enis"
                loading="lazy"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex space-x-15 text-white my-5 mx-15  text-[15px]"
            initial={{ x: '20%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: '20%',
              opacity: 0,
              transition: { duration: 0.8, ease: 'easeInOut' },
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {links.map(({ href, label }) => {
              const isActive = pathname === href;

              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative group block p-2 text-[13.5px] transition-colors duration-300 ${isActive ? 'text-white' : 'text-white '
                    }`}
                >
                  {label}

                  {/* Ligne blanche */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 -bottom-1 mt-10 rounded-full transition-all duration-300
                ${isActive ? 'bg-[#FFBB00] w-2 h-2  ' : 'bg-[#FFBB00] w-0 h-0 group-hover:w-2 group-hover:h-2'}
              `}
                  />
                </Link>
              );
            })}


          </motion.div>

          {/* Mobile Menu Button */}

          {!isMenuOpen && (
            <div className="md:hidden flex items-center h-[70px]">
              <button
                className=" text-white focus:outline-none    "
                onClick={toggleMenu}
              >
                <IoMenu />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-0 right-0 h-full w-1/2 text-white py-4 z-60 backdrop-blur-md"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: "100%",
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleMenu}
            >
              <IoClose />
            </button>
            <motion.div
              className="flex justify-center  "
              initial={{ x: "-20%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x: "-20%",
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Link href="/">
                <Image
                  className="w-[120px]"
                  src={logo_Enis}
                  alt="logo_Enis de Enis"
                  loading="lazy"
                />
              </Link>
            </motion.div>

            <motion.div
              className="space-y-4 mt-16"
              initial={{ x: "20%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x: "20%",
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >

              {links.map(({ href, label }) => {
                const isActive = pathname === href;

                return (
                  <Link
                    onClick={toggleMenu}
                    key={href}
                    href={href}
                    className={`relative group block p-2 text-[15px] text-center transition-colors duration-300  text-white  `}
                  >
                    {label}

                    {/* Ligne blanche */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 -bottom-1 mt-10 rounded-full transition-all duration-300
                ${isActive ? 'bg-[#FFBB00] w-2 h-2  ' : 'bg-[#FFBB00] w-0 h-0 group-hover:w-2 group-hover:h-2'}
              `}
                    />
                  </Link>
                );
              })}
              <motion.div
                className="social-icons flex     justify-center  mt-5"
                initial={{ x: "-20%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: "-20%",
                  opacity: 0,
                  transition: { duration: 0.8, ease: "easeInOut" },
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <button
                  onClick={toggleReservation}
                  className="outline-none bg-yellow-500 px-3 py-2 my-7 font-semibold text-[13.5px] relative group rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl"
                >
                  Réservation

                </button>
              </motion.div>
              <motion.div
                className="social-icons flex flex-row space-x-3 justify-center items-center mt-10"
                initial={{ x: "-20%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{
                  x: "-20%",
                  opacity: 0,
                  transition: { duration: 0.8, ease: "easeInOut" },
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >

                <div className="  h-[0.3px] w-22 mx-5 bg-white/50" />

                {/* Social Icons */}
              <div    className="  flex flex-row space-x-5 justify-center items-center "
           >
                  <FaFacebook className="text-white text-[22px] hover:scale-110 transition" />
                  <TbBrandWhatsappFilled className="yellow_color text-[27px] hover:scale-110 transition" />
                  <FaInstagram className="text-white text-[22px] hover:scale-110 transition" />
               </div>
                {/* Bottom vertical line (visible on desktop only) */}
                <div className="  h-[0.3px] w-22 mx-5 bg-white/50" />

                {/* <Link href="https://www.instagram.com/ogourmet_44/" className="block p-2 text-[25px] text-[#ffbe33]">
                  <FaFacebookF className="text-white text-[18px] hover:scale-110 transition" />
                </Link>
                <Link href="https://www.instagram.com/ogourmet_44/" className="block p-2 text-[25px] text-[#ffbe33]">
                  <TbBrandWhatsappFilled className="text-[#ffbe33] text-[18px] hover:scale-110 transition" />
                </Link>
                <Link href="https://www.instagram.com/ogourmet_44/" className="block p-2 text-[25px] text-[#ffbe33]">
                  <FaInstagram className="text-white text-[18px] hover:scale-110 transition" />
                </Link>*/}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
