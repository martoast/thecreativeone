// /.netlify/functions/zillow-images.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { zpid } = JSON.parse(event.body);

    if (!zpid) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'ZPID is required' })
      };
    }

    const zillowApiKey = process.env.ZILLOW_API_KEY;
    const apiUrl = `https://zillow-com1.p.rapidapi.com/images?zpid=${zpid}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': zillowApiKey,
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      data
    };
  } catch (error) {
    console.error('Error fetching property images:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching property images' })
    };
  }
};
