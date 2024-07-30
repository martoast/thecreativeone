// server/api/re-property-comps.ts

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const realEstateApiKey = config.REAL_ESTATE_API_KEY

  const body = await readBody(event)
  const { address } = body

  if (!address) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Address is required'
    })
  }

  const url = 'https://api.realestateapi.com/v2/PropertyComps'
  const data = { address }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': realEstateApiKey
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `Real Estate API error: ${response.statusText}`
      })
    }

    const result = await response.json()

    if (result.statusCode === 200) {
      return result.data || result
    } else {
      throw createError({
        statusCode: result.statusCode,
        statusMessage: result.message || 'Error fetching property comps'
      })
    }
  } catch (error) {
    console.error('Error fetching property comps:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching property comps'
    })
  }
})