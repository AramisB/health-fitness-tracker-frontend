import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth(); 
  const [exercises, setExercises] = useState([]);
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (user) {
      const fetchExercises = async () => {
        try {
          const response = await axios.get(`/api/log-exercise`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          setExercises(response.data.logs);
        } catch (error) {
          console.error('Error fetching exercises:', error);
        }
      };
      fetchExercises();
    }
  }, [user]);

  if (!user) {
    return <p>Loading...</p>; 
  }
  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard, {user.name}!</h1>
      
      <section>
        <h2>Your Logged Exercises</h2>
        <div className="card-container">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="card">
              <li>
                {exercise.type}: {exercise.duration} minutes on {new Date(exercise.date).toLocaleDateString()}
              </li>
            </div>
          ))}
        </div>
      </section>
  
      <section>
        <h2>Your Fitness Goals</h2>
        <div className="card-container">
          {goals.map((goal) => (
            <div key={goal.id} className="card">
              <li>
                {goal.description} - Target: {goal.target}
              </li>
            </div>
          ))}
        </div>
      </section>
  
      <section>
        <h2>Progress Summary</h2>
        <div className="card card-container">
          <p>{progress.description}</p>
        </div>
      </section>
    </div>
  );
}
export default Dashboard;
