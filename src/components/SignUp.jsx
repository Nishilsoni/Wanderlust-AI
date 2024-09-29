import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-violet-800">
      <motion.div
        className="backdrop-blur-lg bg-white bg-opacity-10 p-10 rounded-2xl shadow-2xl max-w-lg w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <motion.h2
          className="text-4xl font-extrabold text-white mb-8 text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Sign Up
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-5">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-gray-900 bg-opacity-50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all glow-effect"
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-gray-900 bg-opacity-50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all glow-effect"
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all glow-effect"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Sign Up
          </motion.button>

          {/* Error Message */}
          {error && (
            <motion.p
              className="text-red-500 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}
        </form>

        {/* Navigation Links */}
        <div className="text-center mt-6 text-white">
          <p>
            Already have an account?{' '}
            <motion.button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all glow-effect"
              whileHover={{ scale: 1.05 }}
            >
              Sign In
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
