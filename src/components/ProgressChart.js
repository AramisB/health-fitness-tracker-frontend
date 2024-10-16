import React, { useRef, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController } from 'chart.js';

// Register required components for Chart.js, including 'LineController'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, LineController);

const ProgressChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy the existing chart instance before re-creating it
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Ensure data is valid before creating the chart
    if (data && data.labels && data.datasets) {
      // Create a new chart instance
      chartInstance.current = new ChartJS(chartRef.current, {
        type: 'line', // Ensure the line type is registered
        data: {
          labels: data.labels,
          datasets: [
            {
              label: 'Calories Burned',
              data: data.datasets[0].data,
              fill: true,
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Light background color
              borderColor: 'rgba(75, 192, 192, 1)', // Line color
              pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
              pointBorderColor: '#fff', // Point border color
              pointHoverBackgroundColor: '#fff', // Point hover background color
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)', // Point hover border color
              tension: 0.1, // Smooth the line
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Control the chart height independently
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Date',
                font: {
                  size: 14, // Font size for x-axis title
                },
              },
            },
            y: {
              title: {
                display: true,
                text: 'Calories Burned',
                font: {
                  size: 14, // Font size for y-axis title
                },
              },
              min: 0,
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 12, // Font size for legend
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `Calories: ${tooltipItem.parsed.y}`; // Custom tooltip format
                },
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]); // Chart will update when the 'data' prop changes

  return <canvas ref={chartRef} style={{ height: '300px', width: '100%' }}></canvas>;
};

export default ProgressChart;
