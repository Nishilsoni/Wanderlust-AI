// src/components/SignUp.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './SignUp.css'; // Import the new CSS file

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <motion.div className="container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <motion.h2 
        initial={{ y: -20 }} 
        animate={{ y: 0 }} 
        transition={{ duration: 0.3 }}>
        Sign Up
      </motion.h2>
      <form onSubmit={handleSignUp}>
        <motion.input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          whileHover={{ scale: 1.05 }}
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          whileHover={{ scale: 1.05 }}
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}>
          Sign Up
        </motion.button>
        {error && (
          <motion.p className="error-message" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}>
            {error}
          </motion.p>
        )}
      </form>
      <p>
        Already have an account?{' '}
        <motion.button onClick={() => navigate('/')} className="link" whileHover={{ scale: 1.05 }}>
          Sign In
        </motion.button>
      </p>
    </motion.div>
  );
};

export default SignUp;
