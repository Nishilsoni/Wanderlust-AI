// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from "./dashboard/Dashboard.jsx";
import ProtectedRoute from './Firebase/ProtectedRoute.jsx';
import Header from './components/Headersection/Header.jsx';
import './App.css';
import './styles.css'; // Import the CSS file

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate loading effect (optional)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 second delay
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>; // Placeholder for loading state
  }

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <Header />
      <main className='flex-grow'>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
          />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
