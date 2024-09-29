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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 via-blue-500 to-purple-700">
      <motion.div className="backdrop-blur-lg bg-white bg-opacity-10 p-10 rounded-lg shadow-2xl max-w-md w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title */}
        <motion.h2 className="text-3xl font-bold text-white mb-6 text-center"
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
            className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
            className="w-full p-3 rounded-lg bg-gray-900 bg-opacity-50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Sign Up
          </motion.button>

          {/* Error Message */}
          {error && (
            <motion.p className="text-red-500 mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {error}
            </motion.p>
          )}
        </form>

        {/* Navigation Link */}
        <p className="text-center mt-4 text-white">
          Already have an account?{' '}
          <motion.button onClick={() => navigate('/')} className="text-blue-300 underline hover:text-blue-400 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            Sign In
          </motion.button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
