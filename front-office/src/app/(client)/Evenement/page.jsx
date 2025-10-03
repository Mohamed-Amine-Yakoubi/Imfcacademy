'use client'

import React, { useEffect, useMemo, useState } from 'react';
import { Navbar } from "../../../components/common/Navbar";
import Footer from "../../../components/common/Footer";
import EventCard from "../../../components/common/EventCard";
import { motion } from "framer-motion";

 

import { greatVibes, poppins } from '../../../Styles/fonts/fonts';
import Header from '@/components/common/Header';
import Section_titles from '@/components/common/Section_titles';

export default function Evenement() {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Evenements/Get_AllEvenements`)
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sortedEvents = [...data].sort((a, b) => {
          const dateA = new Date(a.Date_Evenement);
          const dateB = new Date(b.Date_Evenement);

          dateA.setHours(0, 0, 0, 0);
          dateB.setHours(0, 0, 0, 0);

          const isAFuture = dateA >= today;
          const isBFuture = dateB >= today;

          if (isAFuture && !isBFuture) return -1;
          if (!isAFuture && isBFuture) return 1;

          return dateA - dateB;
        });

        setEvents(sortedEvents);
      })
      .catch((error) => console.error("Erreur récupération événements:", error));
  }, []);

  const getStatus = (eventDateString) => {
    const today = new Date();
    const eventDate = new Date(eventDateString);

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate >= today) return "À venir";
    return "Terminé";
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <Header
        backgroundImage="/images/Evenement/Background_Header.webp"
        subtitle="Moments Partagés"
        title="Découvrez nos [Événements]"
        path={"Évènement"}
        greatVibes={greatVibes}
        accentColor={"white"}
        highlightColor={"#FFBB00"}
        LinksNavigation={true}
        margin_top={"md:mt-70 mt-30"}
      />

      {/* Section Événements */}
      <section
        className="text-black pb-16 px-4 md:px-12"
        style={{
          backgroundImage: `url(images/Evenement/Background_Section.webp)`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto px-4 z-10 text-white text-center h-full">

          <Section_titles
            title={"Nos Evenements"}
            subtitle={"Rejoignez-nous !"}
            description={" Chez Enis, nous organisons vos événements avec soin : anniversaires, ateliers , célébrations … Chaque moment devient unique et mémorable dans une ambiance conviviale."}
          />
          <div className="mt-16 mb-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-8 px-6 mx-auto w-full text-center">
            {

              events.map((event, index) => (
                <EventCard
                  key={event.id_Evenement}
                  status={getStatus(event.Date_Evenement)}
                  title={event.libelle_Evenement}
                  date={formatDate(event.Date_Evenement)}
                  time={event.horaire_Evenement.slice(0, 5)}
                  location="Restaurant Enis"
                  id_Event={event.id_Evenement}
                  imageUrl={event.photo_Evenement.length > 0
                    ? `${process.env.NEXT_PUBLIC_API_URL}` + event.photo_Evenement[0]
                    : "/images/Evenement/Background_Section.webp"
                  }
                  delay={index * 0.15} // Stagger animation
                />
              ))
            }
          </div>
          {events.length === 0 && (
            <div className="flex justify-center items-center my-22 mb-56  ">
              <p className='text-black/50 font-medium text-[20px] text-center'>Aucun événement n’est prévu pour le moment.<br />
                Restez connectés pour découvrir nos prochaines annonces.
              </p>
            </div>

          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
