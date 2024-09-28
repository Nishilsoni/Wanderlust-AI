// src/components/Modal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Modal.css'; // Import your modal styles

const Modal = ({ isOpen, onClose, onSubmit, resetEmail, setResetEmail, resetError, successMessage }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }} // Adjust duration as needed
      >
        <h3>Reset Password</h3>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Email</button>
        </form>
        {resetError && <p className="error-message">{resetError}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button className="close-modal" onClick={onClose}>Close</button>
      </motion.div>
    </div>
  );
};

export default Modal;
