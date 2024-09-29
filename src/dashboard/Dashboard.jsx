import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Sidebar from './Sidebar'; // Import Sidebar component

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail;

  const [title, setTitle] = useState('');
  const [messages, setMessages] = useState([]);
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const messagesEndRef = useRef(null); // Ref for scrolling

  const openWeatherApiKey = '11e01a344b24c6fbc1c19d945ae95a9a'; // OpenWeather API key
  const geminiApiKey = 'AIzaSyBD5MlVkd78waOrDFMNyjnZ3l9pcFOvfXY'; // Gemini API key
  const aviationstackKey = '1029b54b951b96e5ce8297e545186674';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleFlightQuery = async (flightNumber) => {
    try {
      const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
        params: {
          access_key: aviationstackKey,
          flight_iata: flightNumber,
        }
      });
      const flightData = response.data.data[0];
      const botMessage = {
        text: `✈️ Flight ${flightData.flight.iata} from ${flightData.departure.airport} to ${flightData.arrival.airport} is currently ${flightData.flight_status}.`,
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching flight data:", error);
      const errorMessage = {
        text: "❌ Sorry, I couldn't fetch flight details. Please try again.",
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

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

  const handleLogout = () => {
    navigate('/'); 
  };

  const handleRedirect = () => {
    window.open('https://forms.gle/cSRpjRn7k8B3bJNG8', '_blank'); // Replace with your desired link
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return;
      } else {
        e.preventDefault();
        handleSubmit(e);
      }
    }
  };

  return (
    <>
      <header className="flex justify-between items-center p-4 bg-gray-800 shadow-lg">
        <h1 className="text-2xl text-white">Wanderlust AI</h1>
        <div className="flex items-center">
          <p className="text-gray-300 mr-4">{userEmail}</p>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>
      <motion.div 
        className="flex h-[calc(100vh-80px)] mt-5 p-5 overflow-hidden bg-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex-1 max-w-3xl mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-5 flex flex-col">
          <h2 className="text-2xl text-center text-gray-800 mb-5">Chatbot</h2>
          <div className="flex-1 max-h-[60vh] overflow-y-auto mb-5 p-2 rounded-lg bg-gray-200 shadow-lg">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                className={`mb-2 p-3 rounded-lg transition-transform duration-300 ${
                  msg.sender === 'user' ? 'bg-blue-600 text-white self-end' : 'bg-gray-300 text-gray-800'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </motion.div>
            ))}
            <div ref={messagesEndRef} /> {/* Scroll target */}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <textarea
              required
              className="w-full min-h-[50px] bg-gray-200 border border-gray-400 rounded-lg p-3 mb-3 resize-none transition-all duration-300 focus:bg-gray-300 focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
            ></textarea>
            <button 
              type="submit" 
              className={`bg-blue-600 text-white rounded-md p-3 hover:bg-blue-700 transition-all duration-300 ${
                generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={generatingAnswer}
            >
              {generatingAnswer ? 'Generating...' : 'Send'}
            </button>
            <button
              type="button"
              onClick={handleRedirect}
              className="mt-3 bg-green-600 text-white rounded-md p-3 hover:bg-green-700 transition-all duration-300"
            >
              Feedback Form
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
