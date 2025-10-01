'use client';
import { Navbar } from '@/components/common/Navbar'
import React, { useState } from 'react'
import Header_Background from "../../../../public/images/Formations/Header_Background.webp";
import Epinard from "../../../../public/images/Contact/Epinard.webp";
import Herbe from "../../../../public/images/Contact/Herbe.webp";
import Pizza from "../../../../public/images/Contact/Pizza.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import background_section from "../../../../public/images/Formations/background_section.webp";

import Header from '@/components/common/Header';
import Footer from "../../../components/common/Footer";
import { FaMapLocationDot } from "react-icons/fa6";


import { greatVibes, poppins } from '../../../Styles/fonts/fonts';
import { IoIosMail } from 'react-icons/io';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { TbBrandWhatsappFilled } from 'react-icons/tb';

const MapLeaflet = dynamic(() => import('../../../components/common/MapLeaflet'), { ssr: false });



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
// infosData
const infosData = [
  {
    icon: <FaMapLocationDot className="text-white bg-green-500 p-2 text-[40px] rounded-full" />,
    title: "Notre Localisation",
    description: "ipsum dolor sit amet",
  },
  {
    icon: <FaPhoneAlt className="text-white bg-green-500 p-2 text-[40px] rounded-full" />,
    title: "Téléphone",
    description: "+216 12 345 678",
  },
  {
    icon: <IoIosMail className="text-white bg-green-500 p-2 text-[40px] rounded-full" />,
    title: "Email",
    description: "contact@monsite.com",
  },
];
export default function Contact() {
  const [formData, setFormData] = useState({
    Nom_Prenom_Contact: "",
    NumTel_Contact: "",
    Email_Contact: "",
    Sujet_Contact: "",
    Message_Contact: "",
  });

  const [status, setStatus] = useState(null); // succès ou erreur

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append("Nom_Prenom_Contact", formData.Nom_Prenom_Contact);
    formPayload.append("NumTel_Contact", formData.NumTel_Contact);
    formPayload.append("Email_Contact", formData.Email_Contact);
    formPayload.append("Sujet_Contact", formData.Sujet_Contact);
    formPayload.append("Message_Contact", formData.Message_Contact);
    try {
      const res = await fetch(`${url}/api/Contact/Create_Contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Félicitations ! Votre message a été envoyé avec succès");
        setFormData({
          Nom_Prenom_Contact: "",
          NumTel_Contact: "",
          Email_Contact: "",
          Sujet_Contact: "",
          Message_Contact: "",
        });
      } else {
        setStatus("Erreur lors de l’envoi ❌");
      }
    } catch (error) {
      console.error(error);
      setStatus("Erreur serveur ❌");
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden ">
      <Navbar />

      {/* Section 1 - Header avec background */}
      <Header
        backgroundImage={Header_Background.src}
        subtitle="Saveurs Uniques"
        title={`À votre [écoute]\n pour mieux vous [servir]`}
        greatVibes={greatVibes}
        accentColor={"white"}
        highlightColor={"#FFBB00"}
        path={"Contact"}
        LinksNavigation={true}
        margin_top={"md:mt-55 mt-30"}
      />

      {/* Images décoratives animées */}

      {/* Section 1 - contact formulaire */}

      <div className=" py-12" style={{
        backgroundImage: `url(${background_section.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", // éviter que l'image se répète
loading:"lazy"

      }}>
        <section
          className="w-full relative   flex items-center justify-center my-18  "

        >

          <div className="max-w-7xl   flex flex-col md:flex-row items-center   gap-10  px-4 md:px-0 mx-4">
            {/* Partie gauche (Texte et infos) */}
            <motion.div
              className="w-full dark_color bg-gray-200/50 rounded-2xl p-8 md:w-1/2    flex flex-col items-center md:items-start text-center md:text-left"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >


              <h2
                className={`${poppins.className} text-[22px] md:text-[24px] font-bold mb-4    `}
              >
                Contact information
              </h2>

              <p
                className={`  text-[13px] md:text-[15px] mb-2 transition-all duration-300   `}
              >
                Notre restaurant Enis vous accueille tous les jours de 8h à 22h, dans une ambiance
                chaleureuse et conviviale. Pour plus de confort,
              </p>

              <div className="flex w-full ">
                <div className="w-full md:w-3/4  ">
                  <ul className="space-y-4 mb-6 text-sm text-gray-800 mt-8 w-full">
                    {infosData.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 bg-white py-4 px-3 rounded-full"
                      >
                        {item.icon}
                        <div>
                          <h1 className="font-semibold">{item.title}</h1>
                          <p className="gray_color">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='md:w-1/4   flex justify-center'>
                  <Image src={Epinard} alt="Epinard décorative" className='object-contain' loading="lazy" width={170} height={170} />
                </div>
              </div>

            </motion.div>

            {/* Partie droite (Horaires) */}
            <motion.div
              className="w-full dark_color   rounded-2xl py-8 md:px-4 px-0 md:w-1/2    flex flex-col items-center md:items-start text-center md:text-left "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: 0.3 }}
            >
              <div className="  rounded-2xl       dark_color     w-full">
                <h2
                  className={`${poppins.className} text-[22px] md:text-[24px] font-bold mb-5   `}
                >
                  Envoyez-nous un message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex justify-between gap-3">
                    <input
                      type="text"
                      name="Nom_Prenom_Contact"
                      value={formData.Nom_Prenom_Contact}
                      onChange={handleChange}
                      className="bg-gray-200/50 w-full p-3 rounded-xl text-[14px] outline-none"
                      placeholder="Nom et Prénom"
                      required
                    />
                    <input
                      type="text"
                      name="NumTel_Contact"
                      value={formData.NumTel_Contact}
                      onChange={handleChange}
                      className="bg-gray-200/50 w-full p-3 rounded-xl text-[14px] outline-none"
                      placeholder="Téléphone"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="Email_Contact"
                    value={formData.Email_Contact}
                    onChange={handleChange}
                    className="bg-gray-200/50 w-full p-3 rounded-xl text-[14px] outline-none"
                    placeholder="Email"
                    required
                  />


                  <input
                    type="text"
                    name="Sujet_Contact"
                    value={formData.Sujet_Contact}
                    onChange={handleChange}
                    className="bg-gray-200/50 w-full p-3 rounded-xl text-[14px] outline-none"
                    placeholder="Sujet"
                    required
                  />
                  <textarea
                    name="Message_Contact"
                    value={formData.Message_Contact}
                    onChange={handleChange}
                    className="bg-gray-200/50 w-full p-3 rounded-xl text-[14px] outline-none"
                    rows={7}
                    placeholder="Message"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4   outline-none rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl text-[15px]"
                    >
                      Envoyer
                    </button>
                  </div>

               
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Section 1 - map */}


      <section className="w-full flex justify-center   ">
        <div className="   flex flex-col md:flex-row items-center w-full md:px-0  ">

          {/* Partie gauche (Texte et infos) */}
          <motion.div
            className=" w-full md:w-1/2  px-4  h-full  bg-gray-200/50   flex flex-col items-center justify-center text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div
              className="w-full md:w-5/6 border-2 my-2 md:my-6 border-gray-300/90 rounded-3xl p-5 "
              style={{
                backgroundImage: `url(${Herbe.src}), url(${Pizza.src})`,
                backgroundSize: "18%, 18%",
                backgroundPosition: "left top, bottom right",
                backgroundRepeat: "no-repeat, no-repeat",
                backgroundOrigin: "content-box",
                loading:"lazy"
              }}
            >
              {/* Titre */}
              <div className="flex justify-center items-end mb-4 flex-wrap text-center">
                <hr className="w-10 h-[2px] my-4 border-0 bg-gray-300" />
                <h2 className={`${greatVibes.className} green_color text-[22px] md:text-[28px] font-bold mx-2`}>
                  Emplacement du restaurant
                </h2>
                <hr className="w-10 h-[2px] my-4 border-0 bg-gray-300" />
              </div>

              <h3 className={`${poppins.className} dark_color text-[22px] md:text-[24px] font-bold mb-4 text-center`}>
                Visitez notre restaurant
              </h3>

              <p className="gray_color text-[13px] md:text-[15px]   text-center">
                Cod'Ivoire, Abidjan – Venez découvrir notre ambiance chaleureuse et nos plats savoureux préparés avec passion.

              </p>

              <div className="flex justify-center">
                <hr className="w-[2px] h-10 my-3 border-0 bg-gray-300" />
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-center text-[12px] md:text-[14px] text-[#636363] gap-6 sm:gap-8">
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

              <div className="flex justify-center gap-3 mt-8 mb-2 flex-wrap">
                {[FaFacebookF, TbBrandWhatsappFilled, FaInstagram, FaLinkedinIn].map((Icon, i) => (
                  <div key={i} className="bg-[#353535] rounded-full hover:scale-110 transition">
                    <Icon className="text-white text-[19px] m-2" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Partie droite (Map) */}
          <motion.div
            className="w-full md:w-1/2 h-[300px] sm:h-[350px] md:h-full mt-6 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <MapLeaflet />
          </motion.div>

        </div>
      </section>







      <Footer />
    </div>
  )
}
