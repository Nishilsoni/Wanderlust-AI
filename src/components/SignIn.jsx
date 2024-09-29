import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from './Modal';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedPassword', password);
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
      }
      navigate('/dashboard', { state: { userEmail: email } });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    setSuccessMessage('');

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccessMessage('Password reset email sent!');
      setResetEmail('');
    } catch (error) {
      setResetError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-700 via-blue-500 to-red-700">
      {/* Main Sign In Container */}
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
          Sign In
        </motion.h2>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-5">
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 rounded-lg bg-gray-900 bg-opacity-50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
            className="w-full p-4 rounded-lg bg-gray-900 bg-opacity-50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            whileHover={{ scale: 1.05 }}
            whileFocus={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />

          {/* Remember Me */}
          <div className="flex items-center text-white">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-500 bg-gray-700 rounded focus:ring-blue-500 border-gray-300"
            />
            <label className="ml-2">Remember Me</label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 shadow-lg transition-all"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            disabled={!email || !password}
          >
            Sign In
          </motion.button>

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
            Don't have an account?{' '}
            <motion.button
              onClick={() => navigate('/signup')}
              className="text-blue-300 underline hover:text-blue-400 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Create New Account
            </motion.button>
          </p>
          <p className="mt-2">
            <motion.button
              onClick={() => setShowResetForm(true)}
              className="text-blue-300 underline hover:text-blue-400 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Forgot Password?
            </motion.button>
          </p>
        </div>

        {/* Password Reset Modal */}
        <Modal
          isOpen={showResetForm}
          onClose={() => setShowResetForm(false)}
          onSubmit={handleResetPassword}
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
          resetError={resetError}
          successMessage={successMessage}
        />
      </motion.div>
    </div>
  );
};

export default SignIn;
