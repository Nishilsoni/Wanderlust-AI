// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Success from './dashboard/Success';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Protect the /success route */}
      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
