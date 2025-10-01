"use client"
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ContactTables from "../../../../components/tables/ContactTables";
 
 

 

export default function  Tables_Contact() {

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
      <PageBreadcrumb pageTitle="Contact " />
      <div className="space-y-6">
          <ComponentCard
               title="Liste des Contact"
               modalTitle="Créer une nouvelle Contact"
           showAddButton={false}
               onSearch={handleSearch}
               onFilterChange={handleFilterChange}
     
               filterOptions={[
                 { value: "Approuver", label: "Approuver" },
           
                 { value: "En attente", label: "En attente" },
               ]}
     
             >
               <ContactTables searchTerm={searchTerm} filterType={filterType} />
             </ComponentCard>
      </div>
    </div>
  );
}
