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

const ReservationOptions = [
  { value: "Cuisine", label: "Cuisine" },
  { value: "Patisserie", label: "Pâtisserie" },
];
export default function ReservationTables({ searchTerm = "", filterType = "" }) {
  const [Reservations, setReservations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [formData, setFormData] = useState({
    Nom_Prenom_Reservation: "",
    NumTel_Reservation: "",
    Nbr_personne_Reservation: "",
    Date_Reservation: "",
    Horraire_Reservation: ""
  });

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsReservation, setDetailsReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${url}/api/ReservationsTable/Get_AllReservation`);
        setReservations(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des Reservations", error);
      }
    };
    fetchReservations();
  }, []);

  const filtered = Reservations.filter((f) => {
    const matchesSearch = f.Nom_Prenom_Reservation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || f.Etat_Reservation === filterType;
    return matchesSearch && matchesType;
  });

  const openModal = (Reservation) => {
    setSelectedReservation(Reservation);
    setFormData({
      Nom_Prenom_Reservation: Reservation.Nom_Prenom_Reservation,
      NumTel_Reservation: Reservation.NumTel_Reservation,

      Nbr_personne_Reservation: Reservation.Nbr_personne_Reservation,
      Date_Reservation: Reservation.Date_Reservation,
      Horraire_Reservation: Reservation.Horraire_Reservation,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedReservation(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${url}/api/Reservations/Update_spec_Reservation/${selectedReservation.id_Reservation}`, formData);
      setReservations(prev =>
        prev.map(f =>
          f.id_Reservation === selectedReservation.id_Reservation
            ? { ...f, ...formData }
            : f
        )
      );
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const openDetailsModal = (Reservation) => {
    setDetailsReservation(Reservation);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setDetailsReservation(null);
    setShowDetailsModal(false);
  };
  // mise à jour côté front
  const handleUpdateEtat = (id, newEtat) => {
    setReservations((prev) =>
      prev.map((c) =>
        c.id_Reservation === id ? { ...c, Etat_Reservation: newEtat } : c
      )
    );
  };
  console.log(Reservations);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["#N", "Nom et Prénom", "TNuméro de télèphone", "Nombre de personne", "Date de Réservation", "Horraire de Réservation", "Etat", ""].map((title, idx) => (
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
              {filtered.length > 0 ? (
                filtered.map((Reservation, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{index + 1}</TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Reservation.Nom_Prenom_Reservation}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Reservation.NumTel_Reservation}</TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Reservation.Nbr_personne_Reservation}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{new Date(Reservation.Date_Reservation).toLocaleDateString()}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Reservation.Horraire_Reservation}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          Reservation.Etat_Reservation === "Approuver"
                            ? "success"
                            : Reservation.Etat_Reservation === "En attente"
                              ? "warning"
                              : Reservation.Etat_Reservation === "Annuler"
                                ? "error"
                                : "default"
                        }
                      >
                        {Reservation.Etat_Reservation}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <EditButton
                        id={Reservation.id_Reservation}
                        deleteUrl={`${url}/api/ReservationsTable/Delete_spec_Reservation/${Reservation.id_Reservation}`}
                        onDelete={() => setReservations(prev => prev.filter(f => f.id_Reservation !== Reservation.id_Reservation))}

                        showDeleteButton={true}
                        showUpdateButton={true}
                        linkpage={Reservation.id_Reservation}
                        link={"Reservations/Candidat"}
                        VoirPLus={"Liste des candidats"}
                        Details={"Détails de la Reservation"}
                        showApproveButton={true}
                        showCancelButton={true}
                        etatField="Etat_Reservation"
                        urlUpdate={`${url}/api/ReservationsTable/Update_spec_Reservation/${Reservation.id_Reservation}`}
                        onUpdate={handleUpdateEtat}

                        openModal={() => openModal(Reservation)}
                        openDetailsModal={() => openDetailsModal(Reservation)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (

                <TableRow>
                  <TableCell colSpan={9} className="px-4 py-6  text-gray-500 text-md text-center">
                    Aucune réservation n’a été enregistrée pour le moment.<br />
                    Veuillez vérifier ultérieurement pour consulter les nouvelles réservations reçues.           </TableCell>
                </TableRow>


              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* MODAL: Modifier Reservation */}
      {selectedReservation && (
        <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Modifier la Reservation</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
              <input name="Nom_Prenom_Reservation" value={formData.Nom_Prenom_Reservation} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Libellé" />
              <input name="NumTel_Reservation" value={formData.NumTel_Reservation} onChange={handleChange} className="w-full px-4 py-2 border rounded" placeholder="Modules" />
              <input name="photo_Reservation" onChange={handleChange} className="w-full px-4 py-2 border rounded" type="file" />
              <div>

                <select
                  name="Nbr_personne_Reservation"
                  value={formData.Nbr_personne_Reservation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="" disabled>
                    Sélectionnez un type de Reservation
                  </option>
                  {ReservationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <input name="Date_Reservation" value={formData.Date_Reservation} onChange={handleChange} className="w-full px-4 py-2 border rounded" type="date" />
              <input name="Horraire_Reservation" value={formData.Horraire_Reservation} onChange={handleChange} className="w-full px-4 py-2 border rounded" type="time" />
              <div className="flex justify-end gap-2">
                <Button type="button" onClick={handleClose} variant="outline">Fermer</Button>
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </div>
        </Modal>
      )}


    </div>
  );
}






