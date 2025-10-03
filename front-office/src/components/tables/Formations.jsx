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
import FormationDetail from "./FormationsDetail";
const formationOptions = [
  { value: "Cuisine", label: "Cuisine" },
  { value: "Patisserie", label: "Pâtisserie" },
];
export default function Formation({ searchTerm = "", filterType = "" }) {
  const [formations, setFormations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [formData, setFormData] = useState({
    libelle_formation: "",
    modules_enseignes: "",
    photo_formation: "",
    type_formation: "",
    Date_Debut: "",
    Date_Fin: "",
  });

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsFormation, setDetailsFormation] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Formations/Get_AllFormations`);
        setFormations(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des formations", error);
      }
    };
    fetchFormations();
  }, []);

  const filtered = formations.filter((f) => {
    const matchesSearch = f.libelle_formation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || f.type_formation === filterType;
    return matchesSearch && matchesType;
  });

  const openModal = (formation) => {
    setSelectedFormation(formation);
    setFormData({
      libelle_formation: formation.libelle_formation,
      modules_enseignes: formation.modules_enseignes,
      photo_formation: formation.photo_formation,
      type_formation: formation.type_formation,
      Date_Debut: formation.Date_Debut,
      Date_Fin: formation.Date_Fin,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedFormation(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/Formations/Update_spec_Formation/${selectedFormation.id_formation}`, formData);
      setFormations(prev =>
        prev.map(f =>
          f.id_formation === selectedFormation.id_formation
            ? { ...f, ...formData }
            : f
        )
      );
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const openDetailsModal = (formation) => {
    setDetailsFormation(formation);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setDetailsFormation(null);
    setShowDetailsModal(false);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["#N", "Libellé", "Type", "Date début", "Date fin", "Statut", ""].map((title, idx) => (
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
            <TableBody className="  divide-gray-100 dark:divide-white/[0.05]  ">
              
              {filtered.length > 0 ? (
              
              filtered.map((formation, index) => (
                <TableRow key={index} className=" ">
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{formation.libelle_formation}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{formation.type_formation}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{new Date(formation.Date_Debut).toLocaleDateString()}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{new Date(formation.Date_Fin).toLocaleDateString()}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color= {new Date() >= new Date(formation.Date_Debut) &&
                        new Date() <= new Date(formation.Date_Fin)
                        ? "success"
                        :new Date() < new Date(formation.Date_Debut)? "info" : "error"}
                    >
                      {new Date() >= new Date(formation.Date_Debut) &&
                        new Date() <= new Date(formation.Date_Fin)
                        ? "En cours"
                        :new Date() < new Date(formation.Date_Debut)? "À venir" : "Terminée"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <EditButton
                      id={formation.id}
                      deleteUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/Formations/Delete_spec_Formation/${formation.id_formation}`}
                      onDelete={() => setFormations(prev => prev.filter(f => f.id_formation !== formation.id_formation))}
                      showVoirPlusButton={true}
                      ShowDetailsButton={true}
                      showDeleteButton={true}
                      showUpdateButton={true}
                      linkpage={formation.id_formation}
                      link={"Formations/Candidat"}
                      VoirPLus={"Liste des candidats"}
                      Details={"Détails de la formation"}
                      openModal={() => openModal(formation)}
                      openDetailsModal={() => openDetailsModal(formation)}
                    />
                  </TableCell>
                </TableRow>
             ))) : (
                        <TableRow>
                          <TableCell colSpan={9} className="px-4 py-6  text-gray-500 text-md text-center">
                            Aucun formation n’a été enregistré pour le moment.
                          
                          </TableCell>
                        </TableRow>)
        
                      }
            </TableBody>
          </Table>
        </div>
      </div>

      {/* MODAL: Modifier Formation */}
      {selectedFormation && (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Modifier la formation</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              <input name="libelle_formation" value={formData.libelle_formation} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Libellé" />
              <input name="modules_enseignes" value={formData.modules_enseignes} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Modules" />
              <input name="photo_formation" onChange={handleChange} className="w-full px-4 py-2 border rounded" type="file" />
              <div>

                <select
                  name="type_formation"
                  value={formData.type_formation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="" disabled>
                    Sélectionnez un type de formation
                  </option>
                  {formationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <input name="Date_Debut" value={formData.Date_Debut} onChange={handleChange} className="w-full px-4 py-2 border rounded" type="date" />
              <input name="Date_Fin" value={formData.Date_Fin} onChange={handleChange} className="w-full px-4 py-2 border rounded" type="date" />
              <div className="flex justify-end gap-2">
                <Button type="button" onClick={handleClose} variant="outline">Fermer</Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* MODAL: Détails Formation */}
      {showDetailsModal && detailsFormation && (
        <Modal isOpen={showDetailsModal} onClose={closeDetailsModal} className="max-w-[800px] m-4">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Détails de la formation</h2>

            {/* ✅ Intégration du composant FormationDetail */}
            <FormationDetail FormationId={detailsFormation.id_formation} />

            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={closeDetailsModal}>Fermer</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}






