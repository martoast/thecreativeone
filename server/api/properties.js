// /server/api/properties.js

import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // Ensure the request method is POST
  if (event.node.req.method !== 'POST') {
    return createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // Read the body of the request
    const { page, pageSize, sold } = await readBody(event)

    // Construct the URL
    let url = `https://seashell-app-lestx.ondigitalocean.app/properties/?page=${page}&pageSize=${pageSize}`
    if (sold !== null && sold !== undefined) {
      url += `&sold=${sold}`
    }

    // Fetch the data
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    // Return the data
    return data
  } catch (error) {
    console.error('Error fetching properties:', error)
    
    // Return an error response
    return createError({
      statusCode: 500,
      statusMessage: 'Error fetching properties'
    })
  }
})