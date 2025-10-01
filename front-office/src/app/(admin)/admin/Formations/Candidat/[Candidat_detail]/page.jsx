"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Candidats from "@/components/tables/Candidats";

export default function Candidat_detail({ params }) {
  // Déballer la promesse params avec React.use()
  const unwrappedParams = React.use(params);
  const [searchTerm, setSearchTerm] = useState(""); // <- ici
  const [filterType, setFilterType] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleFilterChange = (value) => {
    setFilterType(value);
  };
  return (
    <div>
      <PageBreadcrumb pageTitle="Inscriptions" />
      <div className="space-y-6">
        <ComponentCard
          title="Liste des candidats"
          modalTitle="Créer une nouvelle formation en cuisine"
          showSearch={true} // affiche la barre de recherche
          showFilter={true} // affiche le select filtre
          showAddButton={false} // affiche le bouton Ajouter
          filterOptions={[

            { value: "Approuver", label: "Approuver" },
            { value: "Rejeter", label: "Rejeter" },
            { value: "En attente", label: "En attente" },

          ]}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onSave={() => console.log("Enregistrer clic")}
          modalContent={<div>Formulaire de création ici</div>}
        >
          <Candidats CandidatId={unwrappedParams.Candidat_detail} searchTerm={searchTerm} filterType={filterType} />
        </ComponentCard>
      </div>
    </div>
  );
}
