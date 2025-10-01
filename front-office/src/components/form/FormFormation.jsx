
"use client" 
import React, { useState } from "react";
import Input from "./input/InputField";
import Label from "./Label";
import Select from "./Select";
 const formationOptions = [
  { value: "Aide Pâtisserie", label: "Aide Pâtisserie" },
  { value: "Aide cuisinier", label: "Aide cuisinier" },
    { value: "Agent de Réception et Accueil", label: "Agent de Réception et Accueil" },
  { value: "Aide Service et Bar", label: "Aide Service et Bar" },
    { value: "Agent de Nettoyage", label: "Agent de Nettoyage" },
 
  
];
export default function FormFormation({ onChange, formData, setFormData }) {
  // Si tu préfères gérer l'état ici, sinon tu peux passer formData + setFormData en props

  // Local state si pas passé en props
  const [localData, setLocalData] = useState({
    libelle: "",
    type: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    prix:"",
    images: [],
  });

  // Choix : utiliser formData + setFormData (si passés) sinon localData
  const data = formData || localData;
  const setData = setFormData || setLocalData;

 const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Si plusieurs fichiers
      setData((prev) => ({
        ...prev,
        [name]: Array.from(files),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (onChange) onChange(e);
  };


  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
      <div>
        <Label>Libellé de formation</Label>
        <Input
          type="text"
          name="libelle"
          value={data.libelle}
          onChange={handleChange}
          placeholder="Ex: Formation pâtisserie"
        />
      </div>

<div>
  <Label>Type de formation</Label>
  <Select
    options={formationOptions}
    placeholder="Sélectionnez un type de formation"
    value={data.type}
    onChange={(value) => {
      // Mets à jour le state data.type avec la valeur sélectionnée
      handleChange({ target: { name: "type", value } });
    }}
  />
</div>

      <div>
        <Label>Description de formation</Label>
        <Input
          type="text"
          name="description"
          value={data.description}
          onChange={handleChange}
          placeholder="Description courte"
        />
      </div>
    <div>
        <Label>Prix de formation</Label>
        <Input
          type="text"
          name="prix"
          value={data.description}
          onChange={handleChange}
          placeholder="prix de formation"
        />
      </div>
      <div>
        <Label>Date de début</Label>
        <Input type="date" name="dateDebut" value={data.dateDebut} onChange={handleChange} />
      </div>

      <div>
        <Label>Date de fin</Label>
        <Input type="date" name="dateFin" value={data.dateFin} onChange={handleChange} />
      </div>

   <div>
        <Label>Images</Label>
        <Input type="file" name="images"   accept="image/*"  onChange={handleChange} multiple />
        {data.images && data.images.length > 0 && (
          <ul className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {data.images.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
