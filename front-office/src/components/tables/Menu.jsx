"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";
import Badge from "../ui/badge/Badge";
import EditButton from "@/components/header/EditButton";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Image from "next/image";
import InputField from "../form/input/InputField";
import Select from "../form/Select";
import Label from "../form/Label";


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

export default function Menu({ menu = [], searchTerm = "", filterType = "" }) {
  const [Menu, setMenu] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [formData, setFormData] = useState({
    Libelle_Menu: "",
    Description_Menu: "",
    Prix_Menu: "",
    photo_Menu: null,
    Type_Menu: "",
    Specialite: "",
  });


  useEffect(() => {
    if (menu.length > 0) {
      setMenu(menu);
    } else {
      const fetchMenu = async () => {
        try {
          const response = await axios.get(`${url}/api/Menu/Get_AllMenu`);
          setMenu(response.data);
        } catch (error) {
          console.error("Erreur lors du chargement des événements", error);
        }
      };
      fetchMenu();
    }
  }, [menu]);

  const filtered = Menu.filter((f) => {
    const matchesSearch = f.Libelle_Menu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || f.Specialite === filterType;
    return matchesSearch && matchesType;
  });

  const openModal = (menuItem) => {
    setSelectedMenu(menuItem);
    setFormData({
      Libelle_Menu: menuItem.Libelle_Menu || "",
      Description_Menu: menuItem.Description_Menu || "",
      Prix_Menu: menuItem.Prix_Menu || "",
      photo_Menu: null,
      Type_Menu: menuItem.Type_Menu || "",
      Specialite: menuItem.Specialite || "",
    });
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
    setSelectedMenu(null);
  };

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      setFormData(prev => ({ ...prev, [name]: files[0] })); // single file
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleSave = async () => {
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      const response = await axios.put(
        `${url}/api/Menu/Update_spec_Menu/${selectedMenu.id_Menu}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      // Update the menu list with the data returned from the server
      const updatedMenu = response.data.data; // this should include photo_Menu URL
      setMenu(prev =>
        prev.map(f =>
          f.id_Menu === selectedMenu.id_Menu ? { ...f, ...updatedMenu } : f
        )
      );

      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };



  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["#N", "Libellé  de menu", "Description", "Prix", "Type de menu", "Spécialité", ""].map((title, idx) => (
                  <TableCell
                    key={idx}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filtered.map((Menu, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400 flex items-center "><Image
                    src={Menu.photo_Menu ? `${url}${Menu.photo_Menu}` : "/images/placeholder.png"}
                    alt="photo"
                    width={200}
                    className="w-10 h-10 rounded-full mr-2"
                    height={200}
                  />{Menu.Libelle_Menu}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Menu.Description_Menu.slice(0, 60)}...</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Menu.Prix_Menu}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Menu.Type_Menu}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Menu.Specialite}</TableCell>

                  <TableCell className="px-4 py-3">
                    <EditButton
                      id={Menu.id}
                      deleteUrl={`${url}/api/Menu/Delete_spec_Menu/${Menu.id_Menu}`}
                      onDelete={() => setMenu(prev => prev.filter(f => f.id_Menu !== Menu.id_Menu))}

                      showDeleteButton={true}
                      showUpdateButton={true}
                      linkpage={Menu.id_Menu}
                      link={"Menu"}

                      openModal={() => openModal(Menu)}
                      openDetailsModal={() => openDetailsModal(Menu)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* MODAL: Modifier Menu */}
      {selectedMenu && (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Modifier le Menu</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-4"
            >
              <div>
                <Label>Libellé</Label>
                <InputField
                  name="Libelle_Menu"
                  placeholder="Libellé"
                  defaultValue={formData.Libelle_Menu}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Description</Label>
                <InputField
                  name="Description_Menu"
                  placeholder="Description"
                  defaultValue={formData.Description_Menu}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Prix</Label>
                <InputField
                  name="Prix_Menu"
                  type="text"
                  placeholder="Prix"
                  defaultValue={formData.Prix_Menu}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label>Type de Menu</Label>
                <Select
                  options={Type_Menu} // <- utilisation de la constante
                  placeholder="Choisir un type de Menu"
                  defaultValue={formData.Type_Menu}
                  onChange={(value) =>
                    setFormData((prev) => ({
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
                  options={formData.Type_Menu ? Specialite[formData.Type_Menu] : []}
                  placeholder="Choisir une spécialité"
                  defaultValue={formData.Specialite}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, Specialite: value }))
                  }
                />
              </div>

              <div>
                <Label>Images</Label>
                {/* Photo du menu */}
                <InputField
                  name="photo_Menu"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {formData.photo_Menu && typeof formData.photo_Menu === "object" && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {formData.photo_Menu.name}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" onClick={handleClose} variant="outline">
                  Fermer
                </Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </div>
        </Modal>

      )}


    </div>
  );
}






