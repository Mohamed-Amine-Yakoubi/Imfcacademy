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

export default function Candidats({ CandidatId, searchTerm = "", filterType = "" }) {
  const [candidats, setCandidats] = useState([]);

  useEffect(() => {
    const fetchCandidats = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Inscriptions/Get_Inscription_Formation/${CandidatId}`
        );
        setCandidats(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des candidatss", error);
      }
    };

    fetchCandidats();
  }, [CandidatId]);

  const handleUpdateEtat = (id, newEtat) => {
    setCandidats((prev) =>
      prev.map((c) =>
        c.id_Inscrit === id ? { ...c, Etat_Inscrit: newEtat } : c
      )
    );
  };

  const handleMontantChange = (id, newMontant) => {
    setCandidats((prev) =>
      prev.map((c) =>
        c.id_Inscrit === id ? { ...c, Montant_payer: newMontant } : c
      )
    );
  };

  const handleMontantBlur = async (id, montant) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Inscriptions/Update_spec_Inscription/${id}`,
        { Montant_payer: montant }
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du montant", error);
    }
  };

  const filtered = candidats.filter((f) => {
    const matchesSearch =
      f.Nom_Prenom_inscrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.Email_inscrit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(f.NumTel_Inscrit).includes(searchTerm) ||
      String(f.NumCin_Inscrit).includes(searchTerm);

    const matchesType = filterType === "" || f.Etat_Inscrit === filterType;
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
                {[
                  "#N",
                  "Nom de candidat",
                  "Email de candidat",
                  "Numéro de téléphone",
                  "Carte d'identité",
                  "Adresse",
                  "Montant payé",
                  "Etat",
                  "",
                ].map((title, idx) => (
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
                filtered.map((c, index) => (
                  <TableRow key={index}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      {c.Nom_Prenom_inscrit}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      {c.Email_inscrit}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      {c.NumTel_Inscrit}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      {c.NumCin_Inscrit}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      {c.Adresse_Inscrit}
                    </TableCell>

                    {/* Input pour montant payé */}
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      <input
                        type="number"
                        value={c.Montant_payer || ""}
                        className="border rounded px-2 py-1 w-24 text-sm"
                        onChange={(e) =>
                          handleMontantChange(c.id_Inscrit, e.target.value)
                        }
                        onBlur={() =>
                          handleMontantBlur(c.id_Inscrit, c.Montant_payer)
                        }
                      />
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      <Badge
                        size="sm"
                        color={
                          c.Etat_Inscrit === "Approuver"
                            ? "success"
                            : c.Etat_Inscrit === "En attente"
                              ? "warning"
                              : c.Etat_Inscrit === "Rejeter"
                                ? "error"
                                : "default"
                        }
                      >
                        {c.Etat_Inscrit}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                      <EditButton
                        showDeleteButton={true}
                        id={c.id_Inscrit}
                        showApproveButton={true}
                        showRejectButton={true}
                        etatField="Etat_Inscrit"

                        urlUpdate={`${process.env.NEXT_PUBLIC_API_URL}/api/Inscriptions/Update_spec_Inscription/${c.id_Inscrit}`}
                        deleteUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/Inscriptions/Delete_spec_Inscription/${c.id_Inscrit}`}
                        onDelete={() =>
                          setCandidats((prev) =>
                            prev.filter((f) => f.id_Inscrit !== c.id_Inscrit)
                          )
                        }
                        onUpdate={handleUpdateEtat}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (

                <TableRow>
                  <TableCell colSpan={9} className="px-4 py-6  text-gray-500 text-md text-center">
                    Aucun condidat n’a été enregistré pour le moment.<br/>
                    Veuillez vérifier ultérieurement pour consulter les nouveaux condidats reçus.
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
