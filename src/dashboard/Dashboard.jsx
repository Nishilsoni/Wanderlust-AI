import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
 // Retain custom styles if needed


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
  const aviationstackKey = '1029b54b951b96e5ce8297e545186674'

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

  const handleFlightQuery = async (flightNumber) => {
    try {
      const response = await axios.get(`http://api.aviationstack.com/v1/flights`, {
        params: {
          access_key: aviationstackKey,
          flight_iata: flightNumber,
        }
      });
      const flightData = response.data.data[0]; // Assuming the first result is the relevant one
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
     <header className="bg-gray-800 text-white flex justify-between items-center p-4">
      {/* Left section with logo and Wanderlust AI */}
      <div className="flex items-center">
        {/* Logo (Replace 'src' with your logo path when you have it) */}
        <img src="/path-to-your-logo.png" alt="Logo" className="w-10 h-10 mr-2" />

        {/* Wanderlust AI text */}
        <h1 className="text-2xl font-bold">Wanderlust AI</h1>

        {/* Sidebar button (future functionality) */}
        <div className="ml-6 mt-2">
          <button className="bg-gray-700 p-2 rounded-lg hover:bg-gray-600">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Right section with Logout button */}
      <div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </header>

      <motion.div 
        className="container mx-auto p-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="chatbot-dashboard bg-white rounded-lg shadow-lg p-4 w-full md:w-2/3">
            <h2 className="text-xl font-semibold mb-2">Chatbot</h2>
            <div className="messages overflow-y-auto max-h-60 border border-gray-300 rounded p-2 mb-4">
              {messages.map((msg, index) => (
                <motion.div 
                  key={index} 
                  className={`message ${msg.sender} mb-2 p-2 rounded ${msg.sender === 'user' ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'}`} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 0.3 }}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </motion.div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="message-input flex flex-col">
              <textarea
                required
                className="border border-gray-300 rounded p-2 transition-all duration-300 focus:border-blue-400 focus:shadow-lg resize-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type your message..."
                rows="3"
              ></textarea>
              <button
                type="submit"
                className={`bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all duration-300 mt-2 ${generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={generatingAnswer}
              >
                {generatingAnswer ? 'Generating...' : 'Send'}
              </button>
            </form>
          </div>

          <div className="tips-container bg-white rounded-lg shadow-lg p-4 w-full md:w-1/3">
            <h3 className="text-xl font-semibold mb-2">Travel Tips:</h3>
            <ul className="list-disc list-inside">
              {travelTips.map((tip, index) => (
                <li key={index} className="text-gray-700">{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Dashboard;
