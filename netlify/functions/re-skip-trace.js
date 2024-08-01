// /.netlify/functions/re-skip-trace.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { address, city, state, zip } = JSON.parse(event.body);

    if (!address || !city || !state || !zip) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ error: 'Address, city, state, and zip are required for skip tracing' })
      };
    }

    const realEstateApiKey = process.env.REAL_ESTATE_API_KEY;
    const url = 'https://api.realestateapi.com/v1/SkipTrace';
    const data = { address, city, state, zip };

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
      return { data: result.data || result };
    } else {
      throw createError({
        statusCode: result.statusCode,
        statusMessage: result.message || 'Error fetching skip trace data'
      })
    }
  } catch (error) {
    console.error('Error fetching skip trace data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching skip trace data'
    })
  }
};