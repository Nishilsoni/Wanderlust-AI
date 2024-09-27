// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Success from './components/Success'; // Import Success component
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* SignIn is the first screen */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/success" element={<Success />} /> {/* Route for Success page */}
      </Routes>
    </Router>
  </React.StrictMode>
);
