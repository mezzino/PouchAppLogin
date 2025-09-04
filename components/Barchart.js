 npm install chart.js react-chartjs-2

    // src/components/BarChartComponent.tsx
    import React from 'react';
    import { Bar } from 'react-chartjs-2';
    import {
      Chart as ChartJS,
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend,
    } from 'chart.js';

    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );

    interface BarChartProps {
      data: {
        labels: string[];
        datasets: {
          label: string;
          data: number[];
          backgroundColor: string[];
          borderColor: string[];
          borderWidth: number;
        }[];
      };
      options?: object;
    }

    const BarChartComponent: React.FC<BarChartProps> = ({ data, options }) => {
      return <Bar data={data} options={options} />;
    };

    export default BarChartComponent;