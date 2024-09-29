// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './Dashboard/Dashboard';
import ProtectedRoute from './Firebase/ProtectedRoute';
import { AuthProvider } from './Firebase/AuthContext';
import './index.css';
import Header from './components/Headersection/Header';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/header" element={<Header />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
