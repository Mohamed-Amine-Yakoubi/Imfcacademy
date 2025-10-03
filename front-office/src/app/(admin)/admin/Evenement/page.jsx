"use client"
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Evenement from "../../../../components/tables/Evenement";

import FormEvenement from "../../../../components/form/FormEvenement";




export default function Tables_Evenement() {

  const [searchTerm, setSearchTerm] = useState(""); // <- ici
  const [filterType, setFilterType] = useState("");
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    libelle_Evenement: "",
    photo_Evenement: null,
    Description_Evenement: "",
    Date_Evenement: "",
    horaire_Evenement: "",
  });
  const handleSave = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("libelle_Evenement", formData.libelle_Evenement);
      formPayload.append("Description_Evenement", formData.Description_Evenement);
      formPayload.append("Date_Evenement", formData.Date_Evenement);
      formPayload.append("horaire_Evenement", formData.horaire_Evenement);

      if (formData.photo_Evenement) {
        formPayload.append("photo_Evenement", formData.photo_Evenement);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Evenements/Create_Evenement`,
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la formation");
      }

      const data = await response.json();
    
      setEvents((prevEvents) => [...prevEvents, data]);
      // Reset form et/ou fermer modal si besoin
      setFormData({
        libelle_Evenement: "",
        photo_Evenement: null,
        Description_Evenement: "",
        Date_Evenement: "",
        horaire_Evenement: "",

      });

      alert("Événement créée avec succès !");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la création.");
    }
  };
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleFilterChange = (value) => {
    setFilterType(value);
  };
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Évènement" />
      <div className="space-y-6">
        <ComponentCard title="liste des évènements"
          showSearch={true} // affiche la barre de recherche
          showFilter={true} // affiche le select filtre
          showAddButton={true} // affiche le bouton Ajouter
          filterOptions={[

            { value: "En cours", label: "En cours" },
            { value: "À venir", label: "À venir" },
            { value: "Terminée", label: "Terminée" },

          ]}

          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSave={handleSave}
          modalContent={
            <FormEvenement formData={formData} setFormData={setFormData} />
          }>
          <Evenement searchTerm={searchTerm} filterType={filterType} />
        </ComponentCard>
      </div>
    </div>
  );
}
