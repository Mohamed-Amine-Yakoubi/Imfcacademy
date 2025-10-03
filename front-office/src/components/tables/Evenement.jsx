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
import EvenementDetail from "./EvenementDetail";

export default function Evenement({ events = [], searchTerm = "", filterType = "" }) {
  const [evenements, setEvenements] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedevenement, setSelectedevenement] = useState(null);
  const [formData, setFormData] = useState({
    libelle_Evenement: "",
    photo_Evenement: "",
    Description_Evenement: "",
    Date_Evenement: "",
    horaire_Evenement: "",
  });

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsevenement, setDetailsevenement] = useState(null);

useEffect(() => {
  const fetchevenements = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/evenements/Get_AllEvenements`);
      setEvenements(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des événements", error);
    }
  };
  fetchevenements();
}, []); 

  // -----------------------------
  // Helper to get status of an event
  // -----------------------------
  const getEventStatus = (dateStr) => {
    const today = new Date();
    const eventDate = new Date(dateStr);

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate.getTime() === today.getTime()) return "En cours";
    if (eventDate.getTime() > today.getTime()) return "À venir";
    return "Terminée";
  };

  // -----------------------------
  // Filtering events
  // -----------------------------
  const filtered = evenements.filter((f) => {
    const matchesSearch = f.libelle_Evenement.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getEventStatus(f.Date_Evenement);
    const matchesType = filterType === "" || status === filterType;
    return matchesSearch && matchesType;
  });

  // -----------------------------
  // Modal functions
  // -----------------------------
  const openModal = (evenement) => {
    setSelectedevenement(evenement);
    setFormData({
      libelle_Evenement: evenement.libelle_Evenement,
      Description_Evenement: evenement.Description_Evenement,
      photo_Evenement: evenement.photo_Evenement,
      Date_Evenement: evenement.Date_Evenement,
      horaire_Evenement: evenement.horaire_Evenement,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedevenement(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
       await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/Evenements/Update_spec_Evenement/${selectedevenement.id_Evenement}`, formData);
      setEvenements(prev =>
        prev.map(f =>
          f.id_Evenement === selectedevenement.id_Evenement
            ? { ...f, ...formData }
            : f
        )
      );
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const openDetailsModal = (evenement) => {
    setDetailsevenement(evenement);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setDetailsevenement(null);
    setShowDetailsModal(false);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["#N", "Libellé de l'événement", "Description", "Date de l'événement", "Heure de l'événement", "Statut", ""].map((title, idx) => (
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
              {filtered.length > 0 ? (filtered.map((evenement, index) => (
                <TableRow key={index}>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{evenement.libelle_Evenement}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{evenement.Description_Evenement.slice(0, 60)}...</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{new Date(evenement.Date_Evenement).toLocaleDateString()}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{evenement.horaire_Evenement.slice(0, 5)}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        getEventStatus(evenement.Date_Evenement) === "En cours"
                          ? "success"
                          : getEventStatus(evenement.Date_Evenement) === "À venir"
                          ? "warning"
                          : "error"
                      }
                    >
                      {getEventStatus(evenement.Date_Evenement)}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <EditButton
                      id={evenement.id}
                      deleteUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/Evenements/Delete_spec_Evenement/${evenement.id_Evenement}`}
                      onDelete={() => setEvenements(prev => prev.filter(f => f.id_Evenement !== evenement.id_Evenement))}
                      showVoirPlusButton={true}
                      ShowDetailsButton={true}
                      showDeleteButton={true}
                      showUpdateButton={true}
                      linkpage={evenement.id_Evenement}
                      link={"Evenement"}
                      VoirPLus={"Liste des réservations"}
                      Details={"Détails de l'événement"}
                      openModal={() => openModal(evenement)}
                      openDetailsModal={() => openDetailsModal(evenement)}
                    />
                  </TableCell>
                </TableRow>
                ))) : (
                <TableRow>
                  <TableCell colSpan={9} className="px-4 py-6  text-gray-500 text-md text-center">
                 Aucun événement enregistré pour le moment.        </TableCell>
                </TableRow>)

              }
            </TableBody>
          </Table>
        </div>
      </div>

      {/* MODAL: Modifier evenement */}
      {selectedevenement && (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Modifier l'événement</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              <input name="libelle_Evenement" value={formData.libelle_Evenement} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Libellé" />
              <input name="Description_Evenement" value={formData.Description_Evenement} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Description" />
              <input name="photo_Evenement" onChange={handleChange} className="w-full px-4 py-2 border rounded" type="file" />
              <input name="Date_Evenement" value={formData.Date_Evenement} onChange={handleChange} className="w-full px-4 py-2 border rounded" type="date" />
              <input name="horaire_Evenement" value={formData.horaire_Evenement} onChange={handleChange} className="w-full px-4 py-2 border rounded" type="time" />
              <div className="flex justify-end gap-2">
                <Button type="button" onClick={handleClose} variant="outline">Fermer</Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* MODAL: Détails evenement */}
      {showDetailsModal && detailsevenement && (
        <Modal isOpen={showDetailsModal} onClose={closeDetailsModal} className="max-w-[800px] m-4">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Détails de l'événement</h2>
            <EvenementDetail EvenementId={detailsevenement.id_Evenement} />
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={closeDetailsModal}>Fermer</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
