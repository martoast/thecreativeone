// /.netlify/functions/property-operations.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { operation, id, property } = JSON.parse(event.body);
    let url = `https://seashell-app-lestx.ondigitalocean.app/properties`;
    let method = 'GET';

    switch (operation) {
      case 'find':
        url += `/${id}`;
        break;
      case 'store':
        method = property.ID ? 'PUT' : 'POST';
        if (property.ID) url += `/${property.ID}`;
        break;
      case 'delete':
        url += `/${id}`;
        method = 'DELETE';
        break;
      default:
        throw new Error('Invalid operation');
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: operation === 'store' ? JSON.stringify(property) : null,
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
    console.error('Error performing property operation:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error performing property operation' })
    };
  }
};