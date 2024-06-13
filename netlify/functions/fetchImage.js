// functions/fetchImage.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { url } = event.queryStringParameters;

  console.log(url)

  if (!url.startsWith('https://maps.googleapis.com/maps/api/streetview')) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid URL' }),
    };
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch image' }),
      };
    }
    const imageBuffer = await response.buffer();
    
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'image/jpeg' },
      body: imageBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
