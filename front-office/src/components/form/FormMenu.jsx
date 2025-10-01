
"use client"
import React, { useState } from "react";
import Input from "./input/InputField";
import Select from "./input/Select";
import Label from "./Label";
const Type_Menu = [
  { value: "restaurant", label: "Restaurant" },
  { value: "patisserie", label: "Patisserie" },
 
];



const Specialite = {
  restaurant: [{ label: 'Burger', value: "Burger" },
  { label: 'Entrées libanaises', value: "Entrées libanaises" },
  { label: 'Grillades', value: "Grillades" },
  { label: 'Pate', value: "Pate" },
  { label: 'Pizza', value: "Pizza" },
  { label: 'Salade', value: "Salade" },
  { label: 'Sandwichs', value: "Sandwichs" },
  { label: 'Soupe', value: "Soupe" },
  { label: 'Plats Composes(Volailles)', value: "Volailles" },
  { label: 'Plats Composes(Viandes rouges)', value: "Viandes rouges" },
  { label: 'Plats Composes(Lapin)', value: "Lapin" },
  { label: 'Plats Composes(Poisson)', value: "Poisson" },
  { label: 'Plats Composes(Fruits de mer)', value: "Fruits de mer" }
  ], patisserie: [
    { value: "tarte", label: "Tarte" },
    { value: "gateau", label: "Gâteau" },
    { value: "viennoiserie", label: "Viennoiserie" },
  ],
 
  
};
 

export default function FormMenu({ onChange, formData, setFormData }) {
  // Si tu préfères gérer l'état ici, sinon tu peux passer formData + setFormData en props

  // Local state si pas passé en props
  const [localData, setLocalData] = useState({

    Libelle_Menu: "",
    Description_Menu: "",
    Prix_Menu: "",
    photo_Menu: null,
    Type_Menu: "",
    Specialite: ""

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
        <Label>Libellé</Label>
        <Input
          type="text"
          name="Libelle_Menu"
          value={data.libelle_Menu}
          onChange={handleChange}
          placeholder="Libellé de Menu"
        />
      </div>



      <div>
        <Label>Description</Label>
        <Input
          type="text"
          name="Description_Menu"
          value={data.Description_Menu}
          onChange={handleChange}
          placeholder="Description de Menu"
        />
      </div>

      <div>
        <Label>Prix</Label>
        <Input
          type="text"
          name="Prix_Menu"
          value={data.Description_Menu}
          onChange={handleChange}
          placeholder="Prix"
        />
      </div>
      <div>
        <Label>Type de Menu</Label>
        <Select
          options={Type_Menu}
          placeholder="Choisir un Type de Menu"
          defaultValue={data.Type_Menu}
          onChange={(value) =>
            setData((prev) => ({
              ...prev,
              Type_Menu: value,
              Specialite: "",
            }))
          }
        />
      </div>

      <div>
        <Label>Spécialité</Label>
        <Select
          options={data.Type_Menu ? Specialite[data.Type_Menu] : []}
          placeholder="Choisir une spécialité"
          defaultValue={data.Specialite}
          onChange={(value) =>
            setData((prev) => ({ ...prev, Specialite: value }))
          }
        />
      </div>

      <div>
        <Label>Photo de Menu</Label>
        <Input type="file" name="photo_Menu" onChange={handleChange} />
        {data.photo_Menu && typeof data.photo_Menu === "object" && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{data.photo_Menu.name}</p>
        )}
      </div>
    </div>
  );
}
