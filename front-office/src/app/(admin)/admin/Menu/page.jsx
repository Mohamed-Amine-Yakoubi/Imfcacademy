"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Menu from "../../../../components/tables/Menu";
import FormMenu from "../../../../components/form/FormMenu";

export default function Tables_Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuCategory, setMenuCategory] = useState(""); // Restaurant or Patisserie
  const [filterType, setFilterType] = useState("");
  const [menu, setMenu] = useState([]);
  const [formData, setFormData] = useState({
    Libelle_Menu: "",
    Description_Menu: "",
    Prix_Menu: "",
    photo_Menu: null,
    Type_Menu: "",
    Specialite: "",
    Category: "", // save category in menu
  });

  const filterOptionsByCategory = {
    Restaurant: [
      { label: "Burger", value: "Burger" },
      { label: "Entrées libanaises", value: "Entrées libanaises" },
      { label: "Grillades", value: "Grillades" },
      { label: "Pate", value: "Pate" },
      { label: "Pizza", value: "Pizza" },
      { label: "Salade", value: "Salade" },
      { label: "Sandwichs", value: "Sandwichs" },
      { label: "Soupe", value: "Soupe" },
      { label: "Plat", value: "Plat" },
    ],
   Patisserie: [
  { label: 'Crêpes sucrées', value: "Crêpes sucrées" },
  { label: 'Crêpes salées', value: "Crêpes salées" },
  { label: 'Gaufres', value: "Gaufres" },
  { label: 'Gâteaux', value: "Gâteaux" },
  { label: 'Desserts', value: "Desserts" },
  { label: 'Milkshakes', value: "Milkshakes" },
  { label: 'Jus', value: "Jus" },
  { label: 'Boissons froides', value: "Boissons froides" },
  { label: 'Boissons gazeuses', value: "Boissons gazeuses" },
  { label: 'Boissons chaudes', value: "Boissons chaudes" },
  { label: 'Petit déjeuner', value: "Petit déjeuner" },
  { label: 'Cheese Box', value: "Cheese Box" },
  { label: 'Box Le Gourmet', value: "Box Le Gourmet" },
  { label: 'Box Orientale', value: "Box Orientale" },
  { label: 'Charcuterie', value: "Charcuterie" },
  { label: 'Tapas', value: "Tapas" }
],
  };

  // Save menu with category
  const handleSave = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("Libelle_Menu", formData.Libelle_Menu);
      formPayload.append("Description_Menu", formData.Description_Menu);
      formPayload.append("Prix_Menu", formData.Prix_Menu);
      formPayload.append("photo_Menu", formData.photo_Menu);
      formPayload.append("Type_Menu", formData.Type_Menu);
      formPayload.append("Specialite", formData.Specialite);
      formPayload.append("Category", menuCategory); // attach category

      const response = await fetch(
        `${url}/api/Menu/Create_Menu`,
        { method: "POST", body: formPayload }
      );

      if (!response.ok) throw new Error("Erreur lors de la création du menu");

      const data = await response.json();
      setMenu((prev) => [...prev, data]);
      setFormData({
        Libelle_Menu: "",
        Description_Menu: "",
        Prix_Menu: "",
        photo_Menu: null,
        Type_Menu: "",
        Specialite: "",
        Category: "",
      });
      alert("Menu créé avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du menu");
    }
  };

  // Filter menu items by category & filterType & searchTerm
  const filteredMenu = menu
    .filter((item) =>
      menuCategory ? item.Category === menuCategory : true
    )
    .filter((item) =>
      filterType ? item.Specialite === filterType : true
    )
    .filter((item) =>
      searchTerm
        ? item.Libelle_Menu.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    );

  return (
    <div>
      <PageBreadcrumb pageTitle="Menu" />

      <div className="space-y-6">
        <ComponentCard
          title="Liste de Menu"
          showCategorySelect={true}
          categoryOptions={[
            { label: "Restaurant", value: "Restaurant" },
            { label: "Patisserie", value: "Patisserie" },
          ]}
          selectedCategory={menuCategory}
          onCategoryChange={(value) => {
            setMenuCategory(value);
            setFilterType(""); // reset sub-filter
          }}
          showSearch={true}
          showFilter={!!menuCategory}
          filterOptions={menuCategory ? filterOptionsByCategory[menuCategory] : []}
          onFilterChange={setFilterType}
          onSearch={setSearchTerm}
          modalContent={<FormMenu formData={formData} setFormData={setFormData} />}
          onSave={handleSave}
        >
          <Menu  searchTerm={searchTerm} filterType={filterType} />
        </ComponentCard>
      </div>
    </div>
  );
}
