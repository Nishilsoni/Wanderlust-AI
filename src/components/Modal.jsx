import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, onSubmit, resetEmail, setResetEmail, resetError, successMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-md">
      <motion.div
        className="bg-gray-900 p-5 rounded-lg shadow-lg max-w-sm w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-white mb-4">Reset Password</h3>

        {/* Reset Password Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg hover:bg-blue-600 shadow-lg transition-all"
          >
            Send Reset Email
          </button>
        </form>

        {/* Error and Success Messages */}
        {resetError && (
          <p className="text-red-500 mt-3">{resetError}</p>
        )}
        {successMessage && (
          <p className="text-green-500 mt-3">{successMessage}</p>
        )}

        {/* Close Modal Button */}
        <button
          className="bg-purple-600 text-white mt-4 py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
