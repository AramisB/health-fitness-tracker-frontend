import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css'

const Header = () => {
  const { user, logout } = useAuth(); // Access user and logout function from AuthContext

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* Show login and register links only when user is not logged in */}
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            // Show these links only when user is logged in
            <>
              <li>
                <Link to="/log-exercise">Log Exercise</Link>
              </li>
              <li>
                <Link to="/goals">Goals</Link>
              </li>
              <li>
                <Link to="/progress">Progress</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
