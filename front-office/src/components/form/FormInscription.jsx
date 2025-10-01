
"use client"
import React, { useState } from "react";
import Input from "./input/InputField";
import Label from "./Label";
import { FaPhoneAlt, FaUser, FaUsers } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { HiIdentification } from "react-icons/hi2";

export default function FormIscription({ onChange, formData, setFormData }) {




  const [localData, setLocalData] = useState({
    Nom_Prenom_inscrit: "", Email_inscrit: "",
    NumTel_Inscrit: "", NumCin_Inscrit: "",
    Adresse_Inscrit: "" 


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
    <div className='  md:max-w-lg w-full     grid gap-5'>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
      <div className="relative">
        <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
 
          name="Nom_Prenom_inscrit"
          value={data.Nom_Prenom_inscrit}
          onChange={handleChange}
          placeholder="Nom et prénom"
        />
      </div>

   {/* Numéro de télèphone */}
      <div className="relative">
        <FaPhoneAlt className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
  
      name="NumTel_Inscrit"
          value={data.NumTel_Inscrit}
          onChange={handleChange}
          placeholder="Numéro de télèphone"
        />
      </div>
      </div>
      {/* Numéro de téléphone */}
      <div className="relative">
        <IoIosMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"

    name="Email_inscrit"
          value={data.Email_inscrit}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>

   
 {/* Adresse */}
      <div className="relative">
        <IoLocation className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
  
            name="Adresse_Inscrit"
          value={data.Adresse_Inscrit}
          onChange={handleChange}
          placeholder="Adresse"
        />
      </div> {/* Numéro de cin */}
      <div className="relative">
        <HiIdentification className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          className="bg-black/5 pl-10 p-4 rounded-md outline-none text-[14px] w-full"
      name="NumCin_Inscrit"
          value={data.NumCin_Inscrit}
          onChange={handleChange}
          placeholder="Numéro de cin"
        />
      </div>
      <div className="flex justify-end">
      <button type="submit" className="bg-green-500 text-white  w-1/5 px-4 py-2    outline-none  rounded-tr-md rounded-bl-md rounded-tl-xl rounded-br-xl text-[15px]  ">
        Envoyer
      </button>
      </div>
    </div>
  );
}


