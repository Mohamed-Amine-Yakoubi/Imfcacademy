"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Formations from "@/components/tables/Formations";
import FormFormation from "../../../../components/form/FormFormation";

export default function Tables_Formation() {

  const [searchTerm, setSearchTerm] = useState(""); // <- ici
  const [filterType, setFilterType] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleFilterChange = (value) => {
    setFilterType(value);
  };
  const [formData, setFormData] = useState({
    libelle: "",
    type: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    prix:"",
    images: null,
  });
  const handleSave = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("libelle_formation", formData.libelle);
      formPayload.append("type_formation", formData.type);
      formPayload.append("modules_enseignes", formData.description);
      formPayload.append("Date_Debut", formData.dateDebut);
      formPayload.append("prix_formation", formData.dateDebut);
      formPayload.append("Date_Fin", formData.dateFin);
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach(file => {
        formPayload.append("photo_formation", file);
      });
    }
      const response = await fetch(
        `${url}/api/Formations/Create_Formation`,
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la formation");
      }

      const data = await response.json();
      console.log("Formation créée :", data);

      // Reset form et/ou fermer modal si besoin
      setFormData({
        libelle: "",
        type: "",
        description: "",
        dateDebut: "",
        dateFin: "",
        prix:"",
        images: null,
      });

      alert("Formation créée avec succès !");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue lors de la création.");
    }
  };
  return (
    <div>
      <PageBreadcrumb pageTitle="Formation" />

      <div className="space-y-6">
        <ComponentCard
          title="Liste des formations"
          modalTitle="Créer une nouvelle formation"
          onSave={handleSave}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
 
          filterOptions={[ 
            { value: "Aide Pâtisserie", label: "Aide Pâtisserie" },
            { value: "Aide Cuisinier", label: "Aide Cuisinier" },
            { value: "Agent de Réception et Accueil", label: "Agent de Réception et Accueil" },
            { value: "Aide Service et Bar", label: "Aide Service et Bar" },
            { value: "Agent de Nettoyage", label: "Agent de Nettoyage" },
          ]}
          modalContent={
            <FormFormation formData={formData} setFormData={setFormData} />
          }
        >
          <Formations searchTerm={searchTerm} filterType={filterType} />
        </ComponentCard>
      </div>
    </div>
  );
}
