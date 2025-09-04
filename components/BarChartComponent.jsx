// BarChartComponent.jsx
import React from 'react';
import { Chart as Bar, ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ chartData, chartOptions }) => {
  return (
    <div className="bar-chart-container">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChartComponent;
