'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import Logo_Footer from "../../../public/images/Logo_Footer.webp";
import Persil from "../../../public/images/Persil.webp";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
 
 
const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full dark:bg-dark mt-14 pt-10  "
    >
      {/* Background image */}
      <div className="absolute md:mt-42 mt-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-5 pointer-events-none">
        <Image
          src={Logo_Footer}
          alt="Logo Footer Background"
          width={450}
          height={450}
        />
      </div>

      {/* Decorative image (hidden on mobile) */}
      <div className="hidden md:block absolute bottom-35 left-0 md:w-[400px] md:h-[400px] w-[300px] h-[400px] overflow-hidden lg:z-50 -z-10">
        <Image
          src={Persil}
          alt="Persil décoratif"
          width={380}
          height={380}
          className="object-cover object-right relative -left-[150px]"
        />
      </div>

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-8 z-20">
        <div className="flex flex-wrap justify-between gap-10 mb-10">
          {/* Logo + horaires */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 md:text-start text-center"
          >
            <Link href="/" className="mb-6 inline-block max-w-[160px]">
              <Image
                src="/images/Logo_Enis.webp"
                alt="logo"
                 width={450}
          height={450}
                className="max-w-full dark:hidden"
              />
            </Link>
            <p className="mb-6 text-sm text-[#636363]">
             Chez nous, chaque plat raconte une histoire. Des ingrédients frais, des recettes authentiques, et un service chaleureux pour vous offrir une expérience culinaire inoubliable.
            </p>
            <h4 className="mb-3 text-lg font-semibold text-dark dark:text-white">
              Horaires d'ouverture
            </h4>
            <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-[#636363] gap-2">
              <div>
                <p className="font-semibold">Lundi - vendredi</p>
                <p>8:00 am - 9:00 pm</p>
              </div>
              <div>
                <p className="font-semibold">Samedi</p>
                <p>8:00 am - 9:00 pm</p>
              </div>
              <div>
                <p className="font-semibold">Dimanche</p>
                <p>Fermé</p>
              </div>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/3 lg:w-1/4"
          >
            <LinkGroup header="Navigation" className="w-full md:w-1/3 lg:w-1/4">
              <NavLink link="/" label="Accueil" />
              <NavLink link="/A_propos" label="À propos" />
              <NavLink link="/Galerie" label="Galerie" />
              <NavLink link="/Contact" label="Contact" />
            </LinkGroup>
          </motion.div>

          {/* Réseaux sociaux */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full md:w-1/3 lg:w-1/6 md:text-start text-center"
          >
            <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">
              Suivez-nous
            </h4>
            <div className="flex space-x-3 md:justify-start justify-center">
              {[FaFacebookF, FaInstagram, FaWhatsapp].map((Icon, index) => (
                <Link
                  key={index}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full  -stroke text-dark hover:bg-primary hover:text-white dark:-dark-3 dark:text-white"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <hr className="my-6 -gray-300" />

        <p className="text-center text-sm text-[#2f2f2f] mb-5">
          © 2025. Tous droits réservés par Enis
        </p>
      </div>
    </motion.div>
  );
};

export default Footer;

// Sous-composants
const LinkGroup = ({ children, header, className }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h4 className="mb-4 text-lg font-semibold text-dark dark:text-white">
        {header}
      </h4>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
};

const NavLink = ({ link, label }) => {
  return (
    <li>
      <Link
        href={link}
        className="text-sm text-[#636363] hover:text-primary transition"
      >
        {label}
      </Link>
    </li>
  );
};
