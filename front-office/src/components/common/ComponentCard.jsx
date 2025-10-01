"use client";
import { useModal } from "@/hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { useState } from "react";

export default function ComponentCard({
  title,
  children,
  modalContent,
  className = "",
  desc = "",
  modalTitle = "Créer un nouvel élément",
  addButtonLabel = "Ajouter",
  onSave,
  onClose,
  onSearch = () => {},
  onFilterChange = () => {},
  showSearch = true,
  showFilter = true,
  showAddButton = true,
  filterOptions = [],
  showCategorySelect = false, // NEW: show top-level select
  categoryOptions = [],       // NEW: options for select
  onCategoryChange = () => {},// NEW: callback for category change
  selectedCategory = "",      // NEW: controlled value for select
}) {
  const { isOpen, openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleSave = () => {
    if (onSave) onSave();
    closeModal();
  };

  const handleClose = () => {
    if (onClose) onClose();
    closeModal();
  };

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{title}</h3>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:space-x-4 w-full sm:w-auto">

         

            {/* Search */}
            {showSearch && (
              <div className="relative w-full sm:w-auto">
                <button className="absolute top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg left-4 pointer-events-none">
                  <svg
                    className="fill-gray-500 dark:fill-gray-400"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                      fill=""
                    />
                  </svg>
                </button>
                <input
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    onSearch(value);
                  }}
                  type="text"
                  placeholder="Chercher"
                  className="dark:bg-dark-900 h-11 w-full sm:w-[250px] xl:w-[430px] rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            )}
   {/* Category Select */}
            {showCategorySelect && (
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="h-11 rounded-lg border border-gray-200 bg-transparent px-3 text-sm text-gray-800 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900 dark:text-white/90"
              >
                <option value="">Sélectionnez</option>
                {categoryOptions.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            )}
            {/* Filter */}
            {showFilter && (
              <select
                value={selectedFilter}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedFilter(value);
                  onFilterChange(value);
                }}
                className="h-11 rounded-lg border border-gray-200 bg-transparent px-3 text-sm text-gray-800 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900 dark:text-white/90"
              >
                <option value="">Tous</option>
                {filterOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            )}

            {/* Add Button */}
            {showAddButton && (
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-300 px-4 py-3 text-sm font-medium text-gray-800 shadow-theme-xs hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                {addButtonLabel}
              </button>
            )}
          </div>
        </div>

        {desc && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{desc}</p>}
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6 overflow-x-auto">
        <div className="space-y-6">{children}</div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={handleClose} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              {modalTitle}
            </h4>
          </div>
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="px-2 overflow-y-auto custom-scrollbar">{modalContent}</div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={handleClose}>
                Fermer
              </Button>
              <Button size="sm" type="submit">
                Enregistrer
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
