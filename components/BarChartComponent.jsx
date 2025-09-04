// BarChartComponent.jsx
import { Chart as Bar, BarElement, CategoryScale, ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';

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
