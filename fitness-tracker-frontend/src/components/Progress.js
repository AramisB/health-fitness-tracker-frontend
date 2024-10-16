import React, { useState, useEffect } from 'react';
import ProgressChart from './ProgressChart';
import { useAuth } from '../context/AuthContext';
import '../styles/Progress.css';

function Progress() {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState([]);

  // Fetch progress data from the backend
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://health-fitness-tracker-9l7o.vercel.app/api/progress', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setProgressData(data.progress);
        } else {
          console.error('Error fetching progress:', data.msg);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProgress();
  }, [user]);

  // Prepare data for the chart
  const chartData = {
    labels: progressData.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Calories Burned',
        data: progressData.map((entry) => entry.caloriesBurned),
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  // Render the ProgressChart component with the chart data
  return (
    <div>
      <h2>Your Progress</h2>
      {progressData.length > 0 ? (
        <ProgressChart data={chartData} /> // Use the ProgressChart component
      ) : (
        <p>No progress data available</p>
      )}
    </div>
  );
}

export default Progress;
