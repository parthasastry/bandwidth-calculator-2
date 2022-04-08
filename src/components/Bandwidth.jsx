import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { sortObj, getDenormalizedRecord } from "./Helpers";

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

const Bandwidth = () => {
  const data = useSelector((state) => state.data);

  const denormalizedData = [];
  data.map((d) => {
    return denormalizedData.push(
      getDenormalizedRecord(d["StartDate"], d["EndDate"], d["SizeGB"])
    );
  });

  let flattened = denormalizedData.reduce(
    (acc, curVal) => acc.concat(curVal),
    []
  );

  let sum = flattened.reduce((total, row) => {
    total[row["cutover_date"]] =
      (total[row["cutover_date"]] || 0) + row["sizeGBperDay"];
    return total;
  }, {});

  const sortSum = sortObj(sum);
  let dates = Object.keys(sortSum);
  const totalSizeGBPerDay = Object.values(sortSum);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Total data transfer in GB/day",
        data: totalSizeGBPerDay,
        backgroundColor: ["rgba(0, 99, 132, 0.8)"],
        borderColor: ["rgba(0, 99, 132, 0.8)"],
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl uppercase text-center">
        Size(GB) transfer per Day
      </h2>
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
  );
};

export default Bandwidth;
