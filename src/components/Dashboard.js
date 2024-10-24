import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          console.log('Fetching dashboard data with token:', user.token);
          const response = await axios.get("https://seal-app-buzkz.ondigitalocean.app/api/dashboard", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          console.log('Dashboard Response:', response.data);
          
          // Set exercises, goals, progress
          setExercises(response.data.data.exercises);
          setGoals(response.data.data.goals);
          setProgress(response.data.data.progress);
  
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [user]);


  if (!user) {
    return <p>Loading...</p>; 
  }

  const totalCaloriesBurned = progress.reduce((total, p) => total + p.caloriesBurned, 0);
  const totalDays = progress.length;

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard, {user.name || 'User'}!</h1>

      <section>
        <h2>Your Logged Exercises</h2>
        <div className="card-container">
          {exercises.length === 0 ? (
            <p>No logged exercises found.</p>
          ) : (
            exercises.map((exercise) => (
              <div key={exercise._id} className="card">
                <h4>{exercise.exerciseType}</h4>
                <p>Duration: {exercise.duration} minutes</p>
                <p>Date: {new Date(exercise.date).toLocaleDateString()}</p>
                <p>Calories Burned: {exercise.caloriesBurned}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2>Your Fitness Goals</h2>
        <div className="card-container">
          {goals.length === 0 ? (
            <p>No goals set.</p>
          ) : (
            goals.map((goal) => (
              <div key={goal._id} className="card">
                <h4>{goal.goal}</h4>
                <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2>Progress Summary</h2>
        {progress.length === 0 ? (
          <p>No progress data available.</p>
        ) : (
          <div className="progress-summary">
            <p>You have burned a total of <strong>{totalCaloriesBurned}</strong> calories over <strong>{totalDays}</strong> days!</p>
            <p>Keep up the great work! 🎉</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
