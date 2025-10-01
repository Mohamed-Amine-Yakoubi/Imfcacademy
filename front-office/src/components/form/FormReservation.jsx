


"use client"
import React, { useState } from "react";

import { FaCalendarAlt, FaClock, FaPhoneAlt, FaUser, FaUsers } from "react-icons/fa";

export default function FormReservation({ onChange,onSubmit, formData, setFormData }) {
  // Si tu préfères gérer l'état ici, sinon tu peux passer formData + setFormData en props

  // Local state si pas passé en props
  const [localData, setLocalData] = useState({
    Nom_Prenom_Reservation: "",
    NumTel_Reservation: "",
    Nbr_personne_Reservation: "",
    Date_Reservation:"",
    Horraire_Reservation:"",


  });

  // Choix : utiliser formData + setFormData (si passés) sinon localData
  const data = formData || localData;
  const setData = setFormData || setLocalData;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (onChange) onChange(e); // callback optionnel
  };
 const handleSubmit = (e) => {
    e.preventDefault(); // avoid reload
    if (onSubmit) onSubmit(data); // call parent's handleSave
  };
  return (
   <form onSubmit={handleSubmit} className="md:max-w-lg w-full grid gap-5">

  
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
      <div className="relative">
        <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
          name="Nom_Prenom_Reservation"
          value={data.Nom_Prenom_Reservation}
          onChange={handleChange}
          placeholder="Nom et Prénom"
        />
      </div>

   {/* Numéro de télèphone */}
      <div className="relative">
        <FaPhoneAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
          name="NumTel_Reservation"
          value={data.NumTel_Reservation}
          onChange={handleChange}
          placeholder="Numéro de télèphone"
        />
      </div>
      </div>
      {/* Numéro de téléphone */}
      <div className="relative">
        <FaUsers className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
       <input
          type="number"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
          placeholder="Nombre de personnes"


          name="Nbr_personne_Reservation"
          value={data.Nbr_personne_Reservation}
          onChange={handleChange} min={1}
        />
      </div>

   
 {/* Adresse */}
      <div className="relative">
        <FaCalendarAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
         <input
          type="date"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
          placeholder="Date de la réservation"


          name="Date_Reservation"
          value={data.Date_Reservation}
          onChange={handleChange} min={1}
        />
      </div> {/* Numéro de cin */}
      <div className="relative">
        <FaClock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
          <input
          type="time"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
          placeholder="Horraire de la réservation"


          name="Horraire_Reservation"
          value={data.Horraire_Reservation}
          onChange={handleChange} min={1}
        />
      </div>
      <div className="flex md:justify-end justify-center">
      <button type="submit" className="bg-green-500 text-white  w-1/4 py-3  rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl text-[15px] outline-none     ">
        Envoyer
      </button>
      </div>
    </form>
  );
}


   