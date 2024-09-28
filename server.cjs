// server.cjs
const express = require('express');
const axios = require('axios');

const app = express();
const geminiApiKey = 'AIzaSyBD5MlVkd78waOrDFMNyjnZ3l9pcFOvfXY'; // Replace with your actual key

app.use(express.json());

// Define the endpoint for querying Gemini API
app.post('/api/gemini', async (req, res) => {
  const { query } = req.body; // Extract query from the request body

  // Validate query
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // Make a POST request to the Gemini API
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
      { query: query }, // Send the query in the request body
      {
        headers: {
          'Authorization': `Bearer ${geminiApiKey}`, // Set authorization header
          'Content-Type': 'application/json', // Specify content type
        },
      }
    );

    res.json(response.data); // Send the response back to the frontend
  } catch (error) {
    console.error('Error querying Gemini API:', error.message);

    // Handle different error cases
    if (error.response) {
      // If the error response is available
      return res.status(error.response.status).json({ error: error.response.data });
    }

    // Default error response
    res.status(500).json({ error: 'Failed to fetch from Gemini API' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
