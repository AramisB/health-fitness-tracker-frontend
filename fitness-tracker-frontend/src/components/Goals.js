import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Goals.css';

function Goals() {
  const [goal, setGoal] = useState('');
  const [deadline, setDeadline] = useState('');
  const [goalsList, setGoalsList] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const { user } = useAuth();

  const handleSetGoal = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://health-fitness-tracker-9l7o.vercel.app/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ goal, deadline }),
      });

      const data = await response.json();
      if (response.ok) {
        setGoalsList((prevGoals) => [...prevGoals, data.goal]); // Update the goals list
        setGoal(''); // Clear input fields
        setDeadline('');
        setSuccessMsg('Goal added successfully!');
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        console.error('Error submitting goal:', data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch existing goals when the component mounts
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/goals', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setGoalsList(data.goals); // Assuming the API returns a list of goals
        } else {
          console.error('Error fetching goals:', data.msg);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchGoals();
  }, [user]); // Refetch goals if user changes

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="goals-container">
      <h2>Set Fitness Goals</h2>
      <form onSubmit={handleSetGoal} className="goals-form">
        <div className="form-group">
          <label>Goal:</label>
          <input 
            type="text" 
            value={goal} 
            onChange={(e) => setGoal(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Deadline:</label>
          <input 
            type="date" 
            value={deadline} 
            onChange={(e) => setDeadline(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Set Goal</button>
        {successMsg && <p className="success-msg">{successMsg}</p>}
      </form>

      <h3>Your Goals</h3>
      <ul className="goals-list">
        {goalsList.map((g, index) => (
          <li key={index} className="goal-item">
            {g.goal} - <span className="deadline">{formatDate(g.deadline)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Goals;
