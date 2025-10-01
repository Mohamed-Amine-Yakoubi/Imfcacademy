


"use client"
import React, { useState } from "react";

import { FaPhoneAlt, FaUser, FaUsers } from "react-icons/fa";

export default function FormReservationEvent({ onChange, formData, setFormData }) {
  // Si tu préfères gérer l'état ici, sinon tu peux passer formData + setFormData en props

  // Local state si pas passé en props
  const [localData, setLocalData] = useState({
    Nom_Prenom_Reservation: "",
    NumTel_Reservation: "",
    Nbr_personnes: "",


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

  return (
    <div className='bg-white md:max-w-6xl w-full md:px-22 px-4 py-16 shadow-lg rounded-xl   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  items-center gap-6'>
      <div className="relative">
        <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[15px] w-full"
          name="Nom_Prenom_Reservation"
          value={data.Nom_Prenom_Reservation}
          onChange={handleChange}
          placeholder="Nom et prénom"
        />
      </div>

      {/* Numéro de téléphone */}
      <div className="relative">
        <FaPhoneAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[15px] w-full"



          name="NumTel_Reservation"
          value={data.NumTel_Reservation}
          onChange={handleChange}
          placeholder="Numéro de télèphone"
        />
      </div>

      {/* Nombre de personnes */}
      <div className="relative">
        <FaUsers className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="number"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[15px] w-full"
          placeholder="Nombre de personnes"


          name="Nbr_personnes"
          value={data.Nbr_personnes}
          onChange={handleChange} min={1}
        />
      </div>

      <button type="submit" className="bg-[#FFBB00] text-white   p-4 rounded-md outline-none text-[15px]   ">
        Réservation
      </button>
    </div>
  );
}
