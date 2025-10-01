"use client";
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function EditButton({
  etatField,
  id,
  deleteUrl,
  onDelete,
  showUpdateButton,
  showDeleteButton,
  showApproveButton,
  showCancelButton,
  showRejectButton,
  onUpdate,
  urlUpdate,
  openModal,
  openDetailsModal,
  link,
  linkpage,
  VoirPLus,
  Details,
  showVoirPlusButton,
  ShowDetailsButton
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  function toggleDropdown(e) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  async function handleDelete() {
    try {
      await axios.delete(deleteUrl);
      onDelete?.();
      setIsOpen(false);
    } catch (error) {
      console.error(`❌ Erreur lors de la suppression ${id}:`, error.response?.data || error.message);
    }
  }

  async function handleUpdateEtat(etat) {
    try {
      const response = await axios.put(urlUpdate, { [etatField]: etat });
      console.log("✅ Réponse API mise à jour :", response.data);

      onUpdate?.(id, etat);
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour :", error.response?.data || error.message);
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("click", handleClickOutside);
    else document.removeEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-700 dark:text-gray-400 text-[20px]"
      >
        <PiDotsThreeOutlineFill />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {showVoirPlusButton && (
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => router.push(`/admin/${link}/${linkpage}`)}
                >
                  {VoirPLus}
                </button>
              </li>
            )}

            {ShowDetailsButton && (
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {
                    if (openDetailsModal) openDetailsModal();
                    setIsOpen(false);
                  }}
                >
                  {Details}
                </button>
              </li>
            )}

            {showUpdateButton && (
              <li>
                <button
                  onClick={() => {
                    openModal?.();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Modifier
                </button>
              </li>
            )}

            {showDeleteButton && (
              <li>
                <button
                  onClick={handleDelete}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Supprimer
                </button>
              </li>
            )}

            {showApproveButton && (
              <li>
                <button
                  onClick={() => handleUpdateEtat("Approuver")}
                  className="w-full text-left px-4 py-2"
                >
                  Approuver
                </button>
              </li>
            )}

            {showCancelButton && (
              <li>
                <button
                  onClick={() => handleUpdateEtat("Annuler")}
                  className="w-full text-left px-4 py-2"
                >
                Annuler
                </button>
              </li>
            )}

            {showRejectButton && (
              <li>
                <button
                  onClick={() => handleUpdateEtat("Rejeter")}
                  className="w-full text-left px-4 py-2"
                >
                Rejeter
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
