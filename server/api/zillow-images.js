// api/zillow-images.js

import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const zillowApiKey = config.ZILLOW_API_KEY

  const body = await readBody(event)
  const { zpid } = body

  if (!zpid) {
    return createError({
      statusCode: 400,
      statusMessage: 'ZPID is required'
    })
  }

  const apiUrl = `https://zillow-com1.p.rapidapi.com/images?zpid=${zpid}`

  try {
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
    return createError({
      statusCode: 500,
      statusMessage: 'Error fetching property images'
    })
  }
})