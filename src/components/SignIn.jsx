// src/components/SignIn.jsx
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/success');
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
        transition={{ duration: 0.3 }}
      >
        Sign In
      </motion.h2>
      <form onSubmit={handleSignIn}>
        <motion.input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          whileHover={{ scale: 1.05 }} // Scale effect on hover
          whileFocus={{ scale: 1.05 }} // Scale effect on focus
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          whileHover={{ scale: 1.05 }} // Scale effect on hover
          whileFocus={{ scale: 1.05 }} // Scale effect on focus
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.1 }} // Scale effect on hover
          transition={{ type: "spring", stiffness: 300 }}
        >
          Sign In
        </motion.button>
        {error && (
          <motion.p className="error-message" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
          >
            {error}
          </motion.p>
        )}
      </form>
      <p>
        Don't have an account?{' '}
        <motion.button onClick={() => navigate('/signup')} className="link" whileHover={{ scale: 1.05 }}>
          Create New Account
        </motion.button>
      </p>
    </motion.div>
  );
};

export default SignIn;
