import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth(); // Correctly use the custom hook to get user
  const [exercises, setExercises] = useState([]);
  const [goals, setGoals] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    if (user) { // Check if user exists before making API calls
      const fetchData = async () => {
        try {
          // Fetch the user's exercise log
          const exerciseResponse = await axios.get(`/api/exercises/${user.id}`);
          setExercises(exerciseResponse.data);
          
          // Fetch the user's goals
          const goalsResponse = await axios.get(`/api/goals/${user.id}`);
          setGoals(goalsResponse.data);
          
          // Fetch the user's progress summary
          const progressResponse = await axios.get(`/api/progress/${user.id}`);
          setProgress(progressResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData(); // Call the fetch function
    }
  }, [user]); // Dependency on user

  if (!user) {
    return <p>Loading...</p>; // Handle loading state if user is not yet available
  }

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
