import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail;

  const [title, setTitle] = useState('');
  const [messages, setMessages] = useState([]);
  const [travelTips, setTravelTips] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  
  const openWeatherApiKey = '11e01a344b24c6fbc1c19d945ae95a9a'; // OpenWeather API key
  const geminiApiKey = 'AIzaSyBD5MlVkd78waOrDFMNyjnZ3l9pcFOvfXY'; // Gemini API key

  // Fetch travel tips when the component mounts
  useEffect(() => {
    setTravelTips([
      "Tip 1: Always check your passport's expiration date.",
      "Tip 2: Learn a few basic phrases in the local language.",
      "Tip 3: Pack a universal power adapter for your electronics.",
    ]);
  }, []);

  // Handle Gemini API response
  const handleGeminiResponse = async (query) => {
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: query }] }],
        },
      });
      return response.data.candidates[0].content.parts[0].text; // Adjust according to API response structure
    } catch (error) {
      console.error("Error fetching Gemini API response:", error);
      return "❌ Sorry, there was an error with your request. Please try again.";
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      const userMessage = { text: title, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setTitle('');
      setGeneratingAnswer(true);

      if (title.toLowerCase().includes('weather')) {
        const city = title.split(' ').pop();
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherApiKey}&units=metric`
          );
          const weatherData = weatherResponse.data;
          const botMessage = {
            text: `🌤️ The weather in ${weatherData.name} is ${weatherData.main.temp}°C with ${weatherData.weather[0].description}.`,
            sender: 'bot',
          };
          setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          const errorMessage = {
            text: "❌ Sorry, I couldn't fetch the weather. Please try again.",
            sender: 'bot',
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
      } else {
        try {
          const geminiResponse = await handleGeminiResponse(title);
          const botMessage = {
            text: `🤖 AI says: ${geminiResponse}`,
            sender: 'bot',
          };
          setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
          const botMessage = {
            text: "❌ Sorry, there was an error with your request. Please try again.",
            sender: 'bot',
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      }

      setGeneratingAnswer(false);
    }
  };

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
          <div className="chatbot-container">
            <h2 className="chat-header">Chatbot</h2>
            <div className="messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="message-input">
              <textarea
                required
                className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type your message..."
              ></textarea>
              <button
                type="submit"
                className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${
                  generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={generatingAnswer}
              >
                {generatingAnswer ? 'Generating...' : 'Send'}
              </button>
            </form>
          </div>

          <div className="tips-container">
            <h3>Travel Tips:</h3>
            <ul>
              {travelTips.map((tip, index) => (
                <li key={index} className="travel-tip">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
