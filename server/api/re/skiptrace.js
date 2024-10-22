// server/api/re/skiptrace.js

import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    return createError({ statusCode: 405, statusMessage: 'Method Not Allowed' })
  }

  try {
    const { address, city, state, zip } = await readBody(event)

    if (!address || !city || !state || !zip) {
      return createError({
        statusCode: 400,
        statusMessage: 'Address, city, state, and zip are required for skip tracing'
      })
    }

    const config = useRuntimeConfig()
    const realEstateApiKey = config.REAL_ESTATE_API_KEY
    const url = 'https://api.realestateapi.com/v1/SkipTrace'
    const data = { address, city, state, zip }

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
        statusMessage: result.message || 'Error fetching skip trace data'
      })
    }
  } catch (error) {
    console.error('Error fetching skip trace data:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Error fetching skip trace data'
    })
  }
})