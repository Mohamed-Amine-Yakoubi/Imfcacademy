"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function FormationDetail({ FormationId }) {
  const [formation, setFormationdetail] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await axios.get(`${url}/api/Formations/Get_spec_Formation/${FormationId}`);
        setFormationdetail(response.data);

        // Filtrer uniquement les images
        const images = (response.data.photo_formation || []).filter(file =>
          /\.(png|jpe?g|gif|webp)$/i.test(file)
        );

        if (images.length > 0) {
          setActiveImage(new URL(images[0], "http://localhost:4000").href);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des formations", error);
      }
    };
    fetchFormations();
  }, [FormationId]);

  if (!formation) return <div>Chargement...</div>;

  // Filtrer uniquement les images et construire les URLs absolues
  const imageProd = (formation.photo_formation || [])
    .filter(file => /\.(png|jpe?g|gif|webp)$/i.test(file))
    .map(img => new URL(img, "http://localhost:4000").href);

  // Fonction utilitaire pour valider src
  const isValidSrc = (src) => typeof src === "string" && src.length > 0;

  // Choix sécurisé de l'image principale
  const mainImage = isValidSrc(activeImage)
    ? activeImage
    : (isValidSrc(imageProd[0]) ? imageProd[0] : "/placeholder.png");

  return (
    <div className="p-6 bg-white max-w-6xl mx-auto">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

        {/* Galerie images avec image active */}
        <div className="flex flex-col gap-2">
          <div className="bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={mainImage}
              alt="Image principale"
              width={450}
              height={450}
              className="w-[350px] h-[350px] aspect-square object-contain p-2 mix-blend-multiply rounded-md"
            />
          </div>

          {imageProd.length > 1 && (
            <div className="flex flex-wrap gap-2 md:gap-4 justify-center md:justify-between">
              {imageProd.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-md cursor-pointer overflow-hidden"
                  onClick={() => setActiveImage(item)}
                >
                  <Image
                    src={item}
                    alt={`Image miniature ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-[75px] h-[75px]  rounded-md object-contain p-2 mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Infos formation */}
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            {formation.libelle_formation}
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p><strong>Type :</strong> {formation.type_formation}</p>
            <p>
              <strong>Dates :</strong>{" "}
              {new Date(formation.Date_Debut).toLocaleDateString()} –{" "}
              {new Date(formation.Date_Fin).toLocaleDateString()}
            </p>
            <p><strong>Modules :</strong> {formation.modules_enseignes}</p>
          </div>
  
        </div>

      </div>
    </div>
  );
}
