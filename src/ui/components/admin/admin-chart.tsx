"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryData {
  name: string;
  productCount: number;
}

export default function AdminChart() {
  const [dataChart, setDataChart] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();
        // Créer un tableau avec le nom et le nombre de produits
        const chartData = data.categories.map((c: any) => ({
          name: c.name,
          productCount: c.products.length,
        }));
        setDataChart(chartData);
      } catch (err) {
        console.error("Erreur chargement chart:", err);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: dataChart.map((c) => c.name),
    datasets: [
      {
        label: "Nombre de produits",
        data: dataChart.map((c) => c.productCount),
        backgroundColor: "rgba(14, 165, 233, 0.7)", // cyan
        borderColor: "rgba(14, 165, 233, 1)",
        borderWidth: 1,
        borderRadius: 6, // coins arrondis
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: "Produits par catégorie",
        font: { size: 4 },
      },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
