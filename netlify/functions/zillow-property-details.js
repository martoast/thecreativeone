// api/zillow-property-details.js

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const zillowApiKey = config.ZILLOW_API_KEY

  const body = await readBody(event)
  const { address } = body

  if (!address) {
    return createError({
      statusCode: 400,
      statusMessage: 'Address is required'
    })
  }

  const apiUrl = `https://zillow-com1.p.rapidapi.com/property?address=${encodeURIComponent(address)}`

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
    return {
      data
    }
  } catch (error) {
    console.error('Error fetching property details:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Error fetching property details'
    })
  }
})