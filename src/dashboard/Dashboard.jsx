import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail;

  const [title, setTitle] = useState('');
  const [messages, setMessages] = useState([]);
  const [travelTips, setTravelTips] = useState([]);
  const openWeatherApiKey = '11e01a344b24c6fbc1c19d945ae95a9a'; // OpenWeather API key
  const geminiApiKey = 'AIzaSyBD5MlVkd78waOrDFMNyjnZ3l9pcFOvfXY'; // Your Gemini API key

  // Fetch travel tips from TripAdvisor API when the component mounts
  // Fetch travel tips when the component mounts
useEffect(() => {
  const fetchTravelTips = async () => {
    try {
      // Fetching travel tips
      const response = await axios.get('https://api.example.com/travel-tips', {
        headers: {
          'Authorization': `Bearer YOUR_API_KEY`, // Add your API key here
          'Content-Type': 'application/json',
        },
      });
      setTravelTips(response.data);
      
      // Fetching restaurant data
      const restaurantResponse = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=304554', {
        headers: {
          'x-rapidapi-key': '59283900cfmsh6790247db9f1361p14f2f6jsn9cd2ee9fb1a0',
          'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com',
        },
      });
      // Process restaurant data as needed
      console.log(restaurantResponse.data);
      
    } catch (error) {
      if (error.response) {
        // Handle specific error responses
        console.error("Error fetching travel tips:", error.response.status, error.response.data);
      } else {
        console.error("Error fetching travel tips:", error.message);
      }

      // Fallback data for testing
      setTravelTips([
        "Tip 1: Always check your passport's expiration date.",
        "Tip 2: Learn a few basic phrases in the local language.",
        "Tip 3: Pack a universal power adapter for your electronics.",
      ]);
    }
  };

  fetchTravelTips();
}, []);


  // Handle Gemini API response
  const handleGeminiResponse = async (query) => {
    try {
      const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent', {
        query: query,
      }, {
        headers: {
          'Authorization': `Bearer ${geminiApiKey}`, // Use the correct token type if required
          'Content-Type': 'application/json',
        },
      });
      return response.data; // Return the response data based on your API response structure
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized access: Please check your API key.");
      } else {
        console.error("Error fetching Gemini response:", error);
      }
      throw new Error("Failed to fetch Gemini response");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      const userMessage = { text: title, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setTitle('');

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
            text: `🤖 ${geminiResponse}`, // Update as needed based on Gemini API response format
            sender: 'bot',
          };
          setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
          console.error("Error handling Gemini response:", error);
          const botMessage = {
            text: "❌ Sorry, there was an error with your request. Please try again.",
            sender: 'bot',
          };
          setMessages((prev) => [...prev, botMessage]);
        }
      }
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
                  {msg.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="message-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-text" // Add class for styling
              />
              <button type="submit">Send</button>
            </form>
          </div>

          <div className="tips-container">
            <h3>Travel Tips:</h3>
            <ul>
              {travelTips.map((tip, index) => (
                <li key={index} className="travel-tip">{tip}</li> // Add class for styling
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
