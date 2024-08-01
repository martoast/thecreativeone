// /.netlify/functions/re-property-detail.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { address } = JSON.parse(event.body);

    if (!address) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Address is required' })
      };
    }

    const realEstateApiKey = process.env.REAL_ESTATE_API_KEY;
    const url = 'https://api.realestateapi.com/v2/PropertyDetail';
    const data = { address, comps: true };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': realEstateApiKey
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Real Estate API error: ${response.statusText}` })
      };
    }

    const result = await response.json();

    if (result.statusCode === 200) {
      return { data: result.data || result }
    } else {
      throw createError({
        statusCode: result.statusCode,
        statusMessage: result.message || 'Error fetching property details'
      })
    }
  } catch (error) {
    console.error('Error fetching property details:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching property details'
    })
  }
};