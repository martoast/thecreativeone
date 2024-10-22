// /server/api/property.js

import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  // Ensure the request method is POST
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Read the body of the request
    const { id } = await readBody(event)
    
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Property ID is required'
      })
    }

    const url = `https://seashell-app-lestx.ondigitalocean.app/properties/${id}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }

    const data = await response.json()
    
    // Return the data
    return data
  } catch (error) {
    console.error('Error fetching property:', error)
    
    // If it's not already a H3 error, create a new one
    if (!error.statusCode) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Error fetching property',
        data: { details: error.message }
      })
    }
    
    // If it's already a H3 error, just throw it
    throw error
  }
})