import React, { useState } from 'react';
import '../styles/ExerciseLog.css';
import { useAuth } from '../context/AuthContext';

function ExerciseLog() {
  const { user } = useAuth();
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');

  const handleLogExercise = async (e) => {
    e.preventDefault();
  
    const exerciseData = {
      exercise,
      duration,
      date,
      userId: user ? user._id : null, // You can still include the userId if needed
    };
  
    console.log('Sending exercise data:', exerciseData);
  
    try {
      const response = await fetch('https://health-fitness-tracker-9l7o.vercel.app/api/log-exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, // Access the token from the user object
        },
        body: JSON.stringify(exerciseData),
      });
  
      console.log('Response status:', response.status);
  
      if (response.ok) {
        setMessage('Exercise log submitted successfully!');
        setExercise('');
        setDuration('');
        setDate('');
      } else {
        const errorMessage = await response.text();
        console.error('Error response:', errorMessage);
        setMessage('Failed to submit exercise log');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="exercise-log-container">
      <h2>Log Exercise</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogExercise}>
        <div>
          <label>Exercise:</label>
          <select 
            value={exercise} 
            onChange={(e) => setExercise(e.target.value)} 
            required
          >
            <option value="">Select an exercise</option>
            <option value="Running">Running</option>
            <option value="Cycling">Cycling</option>
            <option value="Walking">Walking</option>
            <option value="Swimming">Swimming</option>
            <option value="JumpingRope">Jumping Rope</option>
            <option value="Weightlifting">Weightlifting</option>
            <option value="BodyweightExercises">Bodyweight Exercises</option>
            <option value="Yoga">Yoga</option>
            <option value="Pilates">Pilates</option>
            <option value="Stretching">Stretching</option>
            <option value="HIIT">HIIT</option>
            <option value="Soccer">Soccer</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
          </select>
        </div>
        <div>
          <label>Duration (in minutes):</label>
          <input 
            type="number" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Log Exercise</button>
      </form>
    </div>
  );
}

export default ExerciseLog;
