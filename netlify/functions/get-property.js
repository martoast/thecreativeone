// /.netlify/functions/get-property.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Check if the request method is POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    // Parse the body to get the id
    const { id } = JSON.parse(event.body);
    
    if (!id) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Property ID is required' }) };
    }

    const url = `https://seashell-app-lestx.ondigitalocean.app/properties/${id}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching property:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching property', details: error.message })
    };
  }
};