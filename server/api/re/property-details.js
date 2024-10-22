// server/api/re/property-details.js

import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    return createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  try {
    const { address } = await readBody(event)

    if (!address) {
      return createError({ statusCode: 400, statusMessage: 'Address is required' })
    }

    const config = useRuntimeConfig()
    const realEstateApiKey = config.REAL_ESTATE_API_KEY
    const url = 'https://api.realestateapi.com/v2/PropertyDetail'
    const data = { address, comps: true }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': realEstateApiKey
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      return createError({
        statusCode: response.status,
        statusMessage: `Real Estate API error: ${response.statusText}`
      })
    }

    const result = await response.json()

    if (result.statusCode === 200) {
      return { data: result.data || result }
    } else {
      return createError({
        statusCode: result.statusCode,
        statusMessage: result.message || 'Error fetching property details'
      })
    }
  } catch (error) {
    console.error('Error fetching property details:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Error fetching property details'
    })
  }
})