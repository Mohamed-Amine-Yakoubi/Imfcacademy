"use client"
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";

import EditButton from "@/components/header/EditButton";
import Badge from "../ui/badge/Badge";

export default function ReservationDetail({ id_Evenement, searchTerm = "", filterType = "" }) {
  const [Reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          `${url}/api/ReservationsEvent/Get_spec_Reservation/${id_Evenement}`
        );
        setReservations(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des Reservations :", error);
      }
    };

    fetchReservations();
  }, [id_Evenement]);

  // mise à jour côté front
  const handleUpdateEtat = (id, newEtat) => {
    setReservations((prev) =>
      prev.map((c) =>
        c.id_Reservation === id ? { ...c, Etat_Reservation: newEtat } : c
      )
    );
  };

  const filtered = Reservations.filter((f) => {
    const matchesSearch =
      f.Nom_Prenom_Reservation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(f.NumTel_Reservation).includes(searchTerm);

    const matchesType = filterType === "" || f.Etat_Reservation === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["#N", "Nom de Reservation", "Numéro de téléphone", "Nombre de personne", "Date", "Etat", ""].map((title, idx) => (
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

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filtered.length > 0 ? (
                filtered.map((reservation, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden">{index + 1}</div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {reservation.Nom_Prenom_Reservation}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {reservation.NumTel_Reservation}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {reservation.Nbr_personnes}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {reservation.createdAt.slice(0,10)}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          reservation.Etat_Reservation === "Approuver"
                            ? "success"
                            : reservation.Etat_Reservation === "En attente"
                              ? "warning"
                              : reservation.Etat_Reservation === "Annuler"
                                ? "error"
                                : "default"
                        }
                      >
                        {reservation.Etat_Reservation}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <EditButton
                        showDeleteButton={true}
                        id={reservation.id_Reservation}
                        showApproveButton={true}
                        showCancelButton={true}
                        etatField="Etat_Reservation"
                        urlUpdate={`${url}/api/ReservationsEvent/Update_spec_Reservation/${reservation.id_Reservation}`}
                        deleteUrl={`${url}/api/ReservationsEvent/Delete_spec_Reservation/${reservation.id_Reservation}`}
                        onUpdate={handleUpdateEtat}
                        onDelete={() =>
                          setReservations((prev) =>
                            prev.filter((f) => f.id_Reservation !== reservation.id_Reservation)
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex items-center justify-center h-full">
                  Aucune réservation n’a été enregistrée pour le moment.<br/>
Veuillez vérifier ultérieurement pour consulter les nouvelles réservations reçues.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
