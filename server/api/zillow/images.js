// api/server/zillow/images.js

import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    return createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  try {
    const { zpid } = await readBody(event)

    if (!zpid) {
      return createError({ statusCode: 400, statusMessage: 'ZPID is required' })
    }

    const config = useRuntimeConfig()
    const zillowApiKey = config.ZILLOW_API_KEY
    const apiUrl = `https://zillow-com1.p.rapidapi.com/images?zpid=${zpid}`

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': zillowApiKey,
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return { data }
  } catch (error) {
    console.error('Error fetching property images:', error)
    return createError({ statusCode: 500, statusMessage: 'Error fetching property images' })
  }
})