'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaClock, FaMapPin } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function EventCard({
  status,
  title,
  date,
  time,
  location,
  imageUrl,
  id_Event,
}) {

  const router = useRouter();

  const handleClick = () => {
      router.push(`/Evenement/${id_Event}`);
  };

  const statusBgClass = status === "Terminé"
      ? "bg-gray-400 text-white"
      : "bg-[#00BF63] text-white";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }} // déclenche une fois quand 30% visible
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[800px] mx-auto"
    >
      {/* Image */}
      <div className="h-53 rounded-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt="event"
          className="w-full h-full object-cover"
          width={200}
          height={200}
        />
      </div>

      {/* Contenu */}
      <div className="mt-[-1.5rem] mx-auto text-start w-[90%] bg-white rounded-xl shadow-md p-3 relative z-10">
        <div className={`relative inline-block ${statusBgClass} text-white px-2.5 py-1 font-semibold mb-1 rounded-t-sm rounded-br-sm text-[11px]`}>
          {status}
          <span
            className={`absolute top-4 left-0 w-0 h-0 border-r-[18px] border-r-transparent border-t-[18px] rounded-b-md
              ${status === "À venir" ? "border-t-[#00BF63]" : "border-t-gray-400"}`
            }
          ></span>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-3 mt-2">{title}</h2>

        <div className="text-sm text-gray-600 space-y-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center gap-2 text-[12.5px]">
              <FaCalendarDays size={16} /> {date}
            </div>
            <div className="w-[8px] h-[8px] bg-green-500 rounded-full" />
            <div className="flex items-center text-[12.5px] gap-2">
              <FaClock size={16} /> {time}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[12.5px]">
              <FaMapPin size={16} /> {location}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleClick}
                className="bg-black text-white text-[11px] px-3 py-2 rounded-md hover:bg-green-600 flex items-center gap-2 rounded-tr-sm rounded-bl-sm rounded-tl-[13px] rounded-br-[13px]"
              >
                Voir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
