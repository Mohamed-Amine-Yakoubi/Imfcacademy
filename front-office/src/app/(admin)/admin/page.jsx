"use client";
 
import Logo_enis from "../../../../public/images/logo/Logo_enis.png";

import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import StatisticsCard from "@/components/common/StatisticsCard";
import { poppins } from "@/Styles/fonts/fonts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  // 👉 Ces données peuvent venir d’une API (totaux par table)
  const totals = {
    formations: 12,
    evenements: 8,
    inscriptions: 150,
    reservationsTable: 90,
    reservationsEvent: 60,
    contacts: 25,
  };

  // Bar Chart : Totaux par table
  const barData = {
    labels: [
      "Formations",
      "Événements",
      "Inscriptions",
      "Réserv. Table",
      "Réserv. Event",
      "Contacts",
    ],
    datasets: [
      {
        label: "Totaux",
        data: [
          totals.formations,
          totals.evenements,
          totals.inscriptions,
          totals.reservationsTable,
          totals.reservationsEvent,
          totals.contacts,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  // Doughnut Chart : Répartition inscriptions par formation (exemple)
  const doughnutData = {
    labels: ["Formation A", "Formation B", "Formation C"],
    datasets: [
      {
        label: "Inscriptions",
        data: [50, 70, 30],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  // Line Chart : Évolution inscriptions par mois
  const lineData = {
    labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin"],
    datasets: [
      {
        label: "Inscriptions par mois",
        data: [10, 25, 40, 30, 20, 25],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.3,
      },
    ],
  };

  return (
 <div className="flex justify-center items-center   h-[500px]  overflow-hidden    "
    
  >
      {/* 👉 Tes Cards */}
      {/* <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      
        <StatisticsCard
          color={"greenColor"}
          title={"Événements"}
          value={totals.evenements}
          footer={"+1 ce mois"}
        />
        <StatisticsCard
          color={"greenColor"}
          title={"Inscriptions"}
          value={totals.inscriptions}
          footer={"+15 ce mois"}
        />
        <StatisticsCard
          color={"greenColor"}
          title={"Réservations Table"}
          value={totals.reservationsTable}
          footer={"+10 ce mois"}
        />
        <StatisticsCard
          color={"greenColor"}
          title={"Réservations Événements"}
          value={totals.reservationsEvent}
          footer={"+5 ce mois"}
        />
      
      </div> */}

      {/* 👉 Charts en dessous */}
      {/* <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <Bar data={barData} options={{ responsive: true }} />
        </div>
        <div className="bg-white p-1 rounded-xl shadow flex justify-center items-center">
          <Doughnut data={doughnutData} />
        </div>
      
      </div> */}

 
  <div className={`${poppins.className}  flex   justify-center font-bold text-center items-center text-[50px] text-black/30`}>
    Bienvenue dans votre <br />Dashboard
  </div>
 
    </div>
  );
}
