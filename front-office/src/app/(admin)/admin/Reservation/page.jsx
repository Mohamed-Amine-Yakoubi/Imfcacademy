"use client"
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ReservationTables from "../../../../components/tables/ReservationTables";
import FormReservationAdmin from "@/components/form/FormReservationAdmin";





export default function Tables_Réservation() {

  const [searchTerm, setSearchTerm] = useState(""); // <- ici
  const [filterType, setFilterType] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  const handleFilterChange = (value) => {
    setFilterType(value);
  };
  const [formData, setFormData] = useState({
            Nom_Prenom_Reservation: "",
    NumTel_Reservation: "",
    Nbr_personne_Reservation: "",
    Date_Reservation:"",
    Horraire_Reservation:"",
  });
const handleSave = async () => {
  try {
    const response = await fetch(`${url}/api/ReservationsTable/Create_Reservation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // ✅ JSON.stringify
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création de la réservation");
    }

    const data = await response.json();
    console.log("Réponse backend :", data);

    setFormData({
          Nom_Prenom_Reservation: "",
    NumTel_Reservation: "",
    Nbr_personne_Reservation: "",
    Date_Reservation:"",
    Horraire_Reservation:"",
    });

    alert("Réservation créée avec succès !");
  } catch (error) {
    console.error("Erreur front :", error);
    alert("Une erreur est survenue lors de la création.");
  }
};
  return (
    <div>
      <PageBreadcrumb pageTitle="Réservation " />
      <div className="space-y-6">
        <ComponentCard
          title="Liste des réservation"
          modalTitle="Créer une nouvelle Réservation"
          onSave={handleSave}
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}

          filterOptions={[
            { value: "Approuver", label: "Approuver" },
            { value: "Annuler", label: "Annuler" },
            { value: "En attente", label: "En attente" },
          ]}
    modalContent={
            <FormReservationAdmin formData={formData} setFormData={setFormData} />
          }
        >
          <ReservationTables searchTerm={searchTerm} filterType={filterType} />
        </ComponentCard>

      </div>
    </div>
  );
}
