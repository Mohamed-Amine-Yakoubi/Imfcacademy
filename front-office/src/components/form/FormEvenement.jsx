
"use client" 
import React, { useState } from "react";
import Input from "./input/InputField";
import Label from "./Label";

export default function FormEvenement({ onChange, formData, setFormData }) {
  // Si tu préfères gérer l'état ici, sinon tu peux passer formData + setFormData en props

  // Local state si pas passé en props
  const [localData, setLocalData] = useState({
        libelle_Evenement:"",
        photo_Evenement:null,
        Description_Evenement:"",
        Date_Evenement:"",
        horaire_Evenement:"",
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
    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
      <div>
        <Label>Libellé de l'événement</Label>
        <Input
          type="text"
          name="libelle_Evenement"
          value={data.libelle_Evenement}
          onChange={handleChange}
          placeholder="Libellé de l'événement"
        />
      </div>

 

      <div>
        <Label>Description de l'événement</Label>
        <Input
          type="text"
          name="Description_Evenement"
          value={data.Description_Evenement}
          onChange={handleChange}
          placeholder="Description de l'événement"
        />
      </div>

      <div>
        <Label>Date de l'événement</Label>
        <Input type="date" name="Date_Evenement" value={data.Date_Evenement} onChange={handleChange} />
      </div>

      <div>
        <Label>Heure de l'événement</Label>
        <Input type="time" name="horaire_Evenement" value={data.horaire_Evenement} onChange={handleChange} />
      </div>

      <div>
        <Label>Photo de l'événement</Label>
        <Input type="file" name="photo_Evenement" onChange={handleChange} />
        {data.photo_Evenement && typeof data.photo_Evenement === "object" && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{data.photo_Evenement.name}</p>
        )}
      </div>
    </div>
  );
}
