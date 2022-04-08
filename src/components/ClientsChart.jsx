import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClientsChart = () => {
  const data = useSelector((state) => state.data);

  const clients = data.map((d) => d["Client"]);
  const sizeGB = data.map((d) => d["SizeGB"]);

  const chartData = {
    labels: clients,
    datasets: [
      {
        label: "Clients data in GB",
        data: sizeGB,
        backgroundColor: ["rgba(0, 99, 132, 0.8)"],
        borderColor: ["rgba(0, 99, 132, 0.8)"],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl uppercase text-center">
        Size(GB) transfer per Client/Project
      </h2>
      <div className="text-center">
        <div className="col-span-2">
          <Bar
            data={chartData}
            options={{
              title: {
                display: true,
                text: "Size in GB",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientsChart;
