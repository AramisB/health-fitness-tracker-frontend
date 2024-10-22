import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [exercises, setExercises] = useState([]);
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Fetch the user's exercise log
    axios.get(`/api/exercises/${user.id}`).then(response => {
      setExercises(response.data);
    });
    
    // Fetch the user's goals
    axios.get(`/api/goals/${user.id}`).then(response => {
      setGoals(response.data);
    });

    // Fetch the user's progress summary
    axios.get(`/api/progress/${user.id}`).then(response => {
      setProgress(response.data);
    });
  }, [user]);

  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard, {user.name}!</h1>
      <section>
        <h2>Your Logged Exercises</h2>
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              {exercise.type}: {exercise.duration} minutes on {new Date(exercise.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Your Fitness Goals</h2>
        <ul>
          {goals.map((goal) => (
            <li key={goal.id}>
              {goal.description} - Target: {goal.target} 
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Progress Summary</h2>
        <p>{progress.description}</p>
      </section>
    </div>
  );
};

export default Dashboard;
