
"use client"
import React, { useState } from "react";
import Input from "./input/InputField";
import Label from "./Label";
import Select from "./Select";

export default function FormReservationAdmin({ onChange, formData, setFormData }) {
    // Si tu préfères gérer l'état ici, sinon tu peux passer formData + setFormData en props

    // Local state si pas passé en props
    const [localData, setLocalData] = useState({
        Nom_Prenom_Reservation: "",
        NumTel_Reservation: "",
        Nbr_personne_Reservation: "",
        Date_Reservation: "",
        Horraire_Reservation: "",
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
                <Label>Nom et Prénom</Label>
                <Input
                    type="text"

                    name="Nom_Prenom_Reservation"
                    value={data.Nom_Prenom_Reservation}
                    onChange={handleChange}
                    placeholder="Nom et Prénom"
                />
            </div>



            <div>
                <Label>Numéro de télèphone</Label>
                <Input
                    type="text"
                    name="NumTel_Reservation"
                    value={data.NumTel_Reservation}
                    onChange={handleChange}
                    placeholder="Numéro de télèphone"
                />
            </div>
            <div>
                <Label>Nombre de personnes</Label>
                <Input
                    type="text"
                    placeholder="Nombre de personnes"
                    name="Nbr_personne_Reservation"
                    value={data.Nbr_personne_Reservation}
                    onChange={handleChange} min={1}
                />
            </div>
            <div>
                <Label>Date de la réservation</Label>
                <Input
                    type="date"
                    placeholder="Date de la réservation"


                    name="Date_Reservation"
                    value={data.Date_Reservation}
                    onChange={handleChange} min={1}
                />
            </div>
            <div>
                <Label>Horraie de la réservation</Label>
                <Input
                    type="time"
                    placeholder="Horraie de la réservation"


                    name="Horraire_Reservation"
                    value={data.Horraire_Reservation}
                    onChange={handleChange} min={1}
                />

            </div>


        </div>
    );
}
