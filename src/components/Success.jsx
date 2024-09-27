// src/components/Success.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Success = () => {
  const navigate = useNavigate();

  return (
    <motion.div className="container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <motion.h2 
        initial={{ y: -20 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.3 }}
      >
        Success!
      </motion.h2>
      <p>You have successfully signed in.</p>
      <motion.button onClick={() => navigate('/')} 
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        Logout
      </motion.button>
    </motion.div>
  );
};

export default Success;
