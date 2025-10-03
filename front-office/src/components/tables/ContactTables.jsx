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


export default function ContactTables({ searchTerm = "", filterType = "" }) {
  const [Contact, setContact] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [formData, setFormData] = useState({
    Nom_Prenom_Contact: "",
    NumTel_Contact: "",
    Email_Contact: "",
    Sujet_Contact: "",
    Message_Contact: ""
  });

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsContact, setDetailsContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
    
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Contact/Get_AllContact`);
        setContact(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des Contact", error);
      }
    };
    fetchContact();
  }, []);

  const filtered = Contact.filter((f) => {
    const matchesSearch = f.Nom_Prenom_Contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "" || f.Etat_Contact === filterType;
    return matchesSearch && matchesType;
  });

  const openModal = (Contact) => {
    setSelectedContact(Contact);
    setFormData({
      Nom_Prenom_Contact: Contact.Nom_Prenom_Contact,
      NumTel_Contact: Contact.NumTel_Contact,

      Email_Contact: Contact.Email_Contact,
      Message_Contact: Contact.Message_Contact,
      Sujet_Contact: Contact.Sujet_Contact,
    });
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedContact(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/Contact/Update_spec_Contact/${selectedContact.id_Contact}`, formData);
      setContact(prev =>
        prev.map(f =>
          f.id_Contact === selectedContact.id_Contact
            ? { ...f, ...formData }
            : f
        )
      );
      handleClose();
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  const openDetailsModal = (Contact) => {
    setDetailsContact(Contact);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setDetailsContact(null);
    setShowDetailsModal(false);
  };
  const handleUpdateEtat = (id, newEtat) => {
    setContact((prev) =>
      prev.map((c) =>
        c.id_Contact === id ? { ...c, Etat_Contact: newEtat } : c
      )
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table className="">
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {["#N", "Nom et Prénom", "Email", "Numéro de télèphone", "Sujet", "Message", "Date", "Etat", ""].map((title, idx) => (
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
            <TableBody className=" py-96 divide-y divide-gray-100 dark:divide-white/[0.05]">
              {filtered.length > 0 ? (


                filtered.map((Contact, index) => (
                  <TableRow key={index} className="">
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{index + 1}</TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Contact.Nom_Prenom_Contact}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Contact.Email_Contact}</TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Contact.NumTel_Contact}</TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Contact.Sujet_Contact}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Contact.Message_Contact}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">{Contact.createdAt.slice(0, 10)}</TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={Contact.Etat_Contact === "En attente" ? "warning" : Contact.Etat_Contact === "Approuver" ? "success" : "error"}
                      >
                        {Contact.Etat_Contact === "En attente" ? "En attente" : Contact.Etat_Contact === "Approuver" ? "Approuver" : "Annuler"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3">
                      <EditButton
                        id={Contact.id}
                        deleteUrl={`${process.env.NEXT_PUBLIC_API_URL}/api/Contact/Delete_spec_Contact/${Contact.id_Contact}`}
                        onDelete={() => setContact(prev => prev.filter(f => f.id_Contact !== Contact.id_Contact))}

                        showDeleteButton={true}

                        showApproveButton={true}

                        etatField="Etat_Contact"

                        urlUpdate={`${process.env.NEXT_PUBLIC_API_URL}/api/Contact/Update_spec_Contact/${Contact.id_Contact}`}
                        onUpdate={handleUpdateEtat}


                        openModal={() => openModal(Contact)}
                        openDetailsModal={() => openDetailsModal(Contact)}
                      />
                    </TableCell>

                  </TableRow>
                ))) : (
                <TableRow>
                  <TableCell colSpan={9} className="px-4 py-6  text-gray-500 text-md text-center">
                    Aucun contact n’a été enregistré pour le moment.<br />
                    Veuillez vérifier ultérieurement pour consulter les nouveaux messages reçus.
                  </TableCell>
                </TableRow>)

              }
            </TableBody>
          </Table>
        </div>
      </div>




    </div>
  );
}






