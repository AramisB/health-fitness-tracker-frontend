import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import ExerciseLog from './components/ExerciseLog';
import Goals from './components/Goals';
import Progress from './components/Progress';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Use ProtectedRoute to wrap the protected routes */}
          <Route path="/log-exercise" element={<ProtectedRoute element={<ExerciseLog />} />} />
          <Route path="/goals" element={<ProtectedRoute element={<Goals />} />} />
          <Route path="/progress" element={<ProtectedRoute element={<Progress />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
