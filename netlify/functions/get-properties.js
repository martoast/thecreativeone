// /.netlify/functions/get-properties.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { page, pageSize, sold } = JSON.parse(event.body);
    let url = `https://seashell-app-lestx.ondigitalocean.app/properties/?page=${page}&pageSize=${pageSize}`;
    if (sold !== null) {
      url += `&sold=${sold}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching properties:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching properties' })
    };
  }
};