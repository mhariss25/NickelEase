import React, { useEffect, useState } from "react";
import {
  Panel,
  DatePicker,
  Stack,
} from "rsuite";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function DashboardChartComponent({ dataV }) {
  const router = useRouter();
  const [chartData, setChartData] = useState({});

  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d;
  });
  const [endDate, setEndDate] = useState(() => new Date());

  const start = new Date(startDate);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setUTCHours(23, 59, 59, 999);

  const formatDateTime = (dateString) => {
    const dt = new Date(dateString);
    const yy = dt.getUTCFullYear();
    const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(dt.getUTCDate()).padStart(2, "0");
    return `${dd}-${mm}-${yy}`;
  };

  // Proses chart data
  const processChartData = (data) => {
    const models = data.map(vehicle => `${vehicle.registration_number} / ${formatDateTime(vehicle.service_schedule)}`);
    const fuelConsumption = data.map(vehicle => vehicle.fuel_consumption);

    const chartData = {
      labels: models,
      datasets: [
        {
          label: 'Fuel Consumption',
          data: fuelConsumption,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    setChartData(chartData); // Set data chart
  };

  // Fungsi untuk menangani filter berdasarkan tanggal
  const handleFilterByDate = () => {
    const filteredData = dataV.filter(vehicle => {
      const serviceDate = new Date(vehicle.service_schedule);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (
        (!start || serviceDate >= start) && (!end || serviceDate <= end)
      );
    });

    processChartData(filteredData); // Proses data yang sudah difilter
  };

  // useEffect untuk melakukan filter otomatis ketika startDate atau endDate berubah
  useEffect(() => {
    if (dataV.length > 0) {
      handleFilterByDate();
    }
  }, [startDate, endDate, dataV]); // Menonton perubahan startDate, endDate, dan dataV

  return (
    <Panel
      bordered
      style={{ margin: 10, width: "950px" }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: 4 }}>Start Date</label>
          <DatePicker
            placeholder="Start Date"
            value={startDate}
            onChange={setStartDate}
            format="dd-MM-yyyy"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: 4 }}>End Date</label>
          <DatePicker
            placeholder="End Date"
            value={endDate}
            onChange={setEndDate}
            format="dd-MM-yyyy"
          />
        </div>
      </div>
      {startDate && endDate && endDate < startDate && (
        <div style={{ color: "red", marginTop: 8 }}>
          Tanggal akhir tidak boleh kurang dari tanggal awal.
        </div>
      )}
      {/* Render chart */}
      {chartData.labels && chartData.datasets ? (
        <Bar data={chartData} options={{ responsive: true }} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </Panel>
  );
}
