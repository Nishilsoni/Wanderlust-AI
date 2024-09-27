// src/App.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h1>Welcome to Auth App</h1>
      <Link to="/signin">Sign In</Link> | <Link to="/signup">Sign Up</Link>
    </motion.div>
  );
};

export default App;
