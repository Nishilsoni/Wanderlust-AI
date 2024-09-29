// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from "./dashboard/Dashboard.jsx";
import ProtectedRoute from './Firebase/ProtectedRoute';
import { AuthProvider } from './Firebase/AuthContext';
import './index.css'; // Global styles (if needed)
import './components/styles.css'; // Custom styles (if needed)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          {/* No need for a separate Header route, it should be included in App.jsx */}
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
