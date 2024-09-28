// src/components/Success.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Success.css';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail;

  const [title, setTitle] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      try {
        const res = await axios.post('http://localhost:3000/ask', { question: title });
        setResponse(res.data.response);
        setHistory([...history, { title, response: res.data.response }]);
        setTitle('');
      } catch (error) {
        console.error("Error submitting question:", error);
      }
    }
  };

  const filteredHistory = history.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <header className="header">
        <h1>Wanderlust AI</h1>
        <div className="profile">
          <p>{userEmail}</p>
          <button onClick={() => navigate('/')}>Logout</button>
        </div>
      </header>
      <motion.div className="container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        
        <div className="chatbot-dashboard">
          <h2>Chatbot Dashboard</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a title for your question..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Ask</button>
          </form>

          <div className="response-box">
            <h2>Chatbot Response:</h2>
            <p>{response}</p>
          </div>

          <div className="history-section">
            <h2>Previous Queries:</h2>
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ul>
              {filteredHistory.map((item, index) => (
                <li key={index}>
                  <strong>{item.title}:</strong> {item.response}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Success;
