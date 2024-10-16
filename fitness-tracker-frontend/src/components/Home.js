import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import fitnessImage from '../images/fitness.png';
function Home() {
  return (
    <div className="home-container">
      <img src={fitnessImage} alt="Health and Fitness" className="home-image" />
      <div className="home-text">
        <h2>Welcome to Health and Fitness Tracker!</h2>
        <p>
          Track your health and fitness journey with our easy-to-use application. 
          Log your exercises, set personal goals, and visualize your progress over time!
        </p>
        <h3>Features:</h3>
        <ul>
          <li>Log exercises and workouts</li>
          <li>Set and view personal goals</li>
          <li>Track your progress with visual charts</li>
        </ul>
        <h3>Get Started:</h3>
        <p>
          <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to start tracking your fitness journey today!
        </p>
      </div>
    </div>
  );
}

export default Home;
