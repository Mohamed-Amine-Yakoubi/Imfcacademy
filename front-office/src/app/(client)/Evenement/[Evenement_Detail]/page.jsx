'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navbar } from "../../../../components/common/Navbar";
import Footer from "../../../../components/common/Footer";
import FormReservationEvent from "../../../../components/form/FormReservationEvent";
import { motion } from "framer-motion";
import getScrollAnimation from "../../../../utils/getScrollAnimation";
import ScrollAnimationWrapper from "../../../../layout/ScrollAnimationWrapper";
import Background_Header from "../../../../../public/images/Evenement/Background_Header.webp";
import Background_Evenement_Detail from "../../../../../public/images/Evenement/Background_Evenement_Detail.webp";
import Background_Section from "../../../../../public/images/Background_header.webp";
import { greatVibes, poppins } from '../../../../Styles/fonts/fonts';
import Header from '@/components/common/Header';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaCalendarAlt, FaClock, FaPhoneAlt, FaUser, FaUsers } from 'react-icons/fa';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Modal } from '@/components/ui/modal';
import Button from '@/components/ui/button/Button';
import { useModal } from '@/hooks/useModal';
import { IoMdClose } from 'react-icons/io';

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


export default function Evenement_Detail() {
  const sectionRef = useRef(null);

  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const [event, setEvent] = useState([]);
  const [statusInfo, setStatusInfo] = useState({ text: "", bg: "" });
  const { Evenement_Detail } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const [openSection, setOpenSection] = useState(false);
  const handleOpenSection = () => setOpenSection(true);

  // Fermer la section
  const handleCloseSection = () => setOpenSection(false);
  const handleClose = () => {
    closeModal();
  };
  useEffect(() => {
    if (openSection && sectionRef.current) {
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
  }, [openSection]);





  useEffect(() => {
    if (!Evenement_Detail) return;

    fetch(`${url}/api/Evenements/Get_spec_Evenement/${Evenement_Detail}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setEvent(data);

          // Fix: compare timestamps, not date strings
          const today = new Date();
          today.setHours(0, 0, 0, 0); // remove time part for accurate comparison
          const eventDate = new Date(data.Date_Evenement);
          eventDate.setHours(0, 0, 0, 0);

          if (eventDate.getTime() > today.getTime()) {
            setStatusInfo({ text: "À venir", bg: "bg-green-500" });
          } else if (eventDate.getTime() < today.getTime()) {
            setStatusInfo({ text: "Terminé", bg: "bg-gray-400" });
          } else {
            setStatusInfo({ text: "Aujourd'hui", bg: "bg-gray-600" });
          }
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de l'événement:", error);
      });
  }, [Evenement_Detail]);

  const [formData, setFormData] = useState({
    Nom_Prenom_Reservation: "",
    NumTel_Reservation: "",
    Nbr_personnes: "",
    id_Evenement: Evenement_Detail,
  });
  const handleSave = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("Nom_Prenom_Reservation", formData.Nom_Prenom_Reservation);
      formPayload.append("NumTel_Reservation", formData.NumTel_Reservation);
      formPayload.append("Nbr_personnes", formData.Nbr_personnes);
      formPayload.append("id_Evenement", formData.id_Evenement);



      const response = await fetch(`${url}/api/ReservationsEvent/Create_Reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création de la formation");
      }

      const data = await response.json();
      console.log(data)
      // setEvents((prevEvents) => [...prevEvents, data]);

      setFormData({
        Nom_Prenom_Reservation: "",
        NumTel_Reservation: "",
        Nbr_personnes: "",
     id_Evenement: Evenement_Detail, 

      });

      alert("Félicitations ! Votre réservation a été envoyée avec succès.");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la création.");
    }
  };
  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden  ">
      <Navbar />

      {/* Section 1 - Header avec background */}
      <Header
        backgroundImage={Background_Header.src}
        subtitle="Instant Festif"
        title={`Soirée Exclusive – [${event.libelle_Evenement}]`}
        greatVibes={greatVibes}
        accentColor={"white"}
        highlightColor={"#FFBB00"}
        path={"Évènement"}
        LinksNavigation={true}
        margin_top={"md:mt-70 mt-30"}

      />



      <section
        className="w-full text-black py-16 px-4 md:px-12"
        style={{
          backgroundImage: `url(${Background_Evenement_Detail.src})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="max-w-8xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 my-8">
          {/* Info Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
          >
            {/* Status Badge */}
            <div className={`relative inline-block ${statusInfo.bg} text-white text-[13.5px] px-3.5 py-1.5 font-semibold mb-6 rounded-t-md rounded-br-md`}>
              {statusInfo.text}
              <span
                className={`absolute top-7 left-0 w-0 h-0 border-r-[18px] border-r-transparent border-t-[18px]   rounded-b-md
  ${statusInfo.text === "À venir" ?
     "  border-t-green-500" :
  statusInfo.text ===  "Aujourd'hui"?"border-gray-600" 
     : "border-t-gray-400 "

                  }
    `}
              ></span>


            </div>


            <h2 className={`${poppins.className} text-[30px] md:text-[35px] dark_color font-bold mb-4 leading-snug`}>
              {event.libelle_Evenement}
            </h2>

            <p className={`${poppins.className} gray_color text-[11px] md:text-[13px] mb-2`}>
              {event.Description_Evenement || "Aucune description disponible."}
            </p>

            <ul className="space-y-4 mb-6 text-sm text-gray-800 mt-8">
              <li className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-500 text-[20px]" />
                {new Date(event.Date_Evenement).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </li>
              <li className="flex items-center gap-2">
                <FaClock className="text-green-500 text-[20px]" />
                {event.horaire_Evenement?.slice(0, 5)}
              </li>
              <li className="flex items-center gap-2">
                <FaMapLocationDot className="text-green-500 text-[20px]" />
                Restaurant Enis
              </li>
            </ul>

            <button onClick={handleOpenSection} className="bg-[#282828] text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center gap-2 rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl">
              Réserver
            </button>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/3 flex justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Image
              src={
                event.photo_Evenement?.length > 0
                  ? `http://localhost:4000${event.photo_Evenement[0]}`
                  : Background_Header
              }
              alt={"photo evenement"}
              width={600}
              height={800}
              className="w-full h-[270px] md:h-[560px] object-cover rounded-tr-xl rounded-bl-xl rounded-tl-[60px] rounded-br-[60px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Section 4 - reservation */}

      {openSection && (
        <section
          className="w-full relative min-h-[350px] md:min-h-[500px] flex items-center justify-center p-10"
          ref={sectionRef}
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

          <div className="w-full mx-auto flex   items-center  justify-center z-10 px-4 md:px-0">
            {/* Partie gauche (Texte et infos) */}
            <motion.div
              className="w-full    flex flex-col items-center    text-center  "
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >


              <h3
                className={`${greatVibes.className} text-green-500 font-medium text-[28px]  `}
              >
                Réservation
              </h3>

              <h2
                className={`${poppins.className} text-[25px] md:text-[35px] font-bold mb-4 leading-snug text-white`}
              >
                Réservez votre table
              </h2>
              <form
                className=" w-full flex items-center justify-center  mt-5 "
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSave();
                }}
              >
                <FormReservationEvent formData={formData} setFormData={setFormData} />
              </form>
            </motion.div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
