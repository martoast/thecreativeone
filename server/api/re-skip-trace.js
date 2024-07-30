// server/api/re-skip-trace.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const realEstateApiKey = config.REAL_ESTATE_API_KEY

  const body = await readBody(event)
  const { address, city, state, zip } = body

  if (!address || !city || !state || !zip) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Address, city, state, and zip are required for skip tracing'
    })
  }

  const url = 'https://api.realestateapi.com/v1/SkipTrace'
  const data = { address, city, state, zip }

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

    console.log(result)

    if (result.statusCode === 200) {
      return { data: result.data || result }
    } else {
      throw createError({
        statusCode: result.statusCode,
        statusMessage: result.message || 'Error fetching skip trace data'
      })
    }
  } catch (error) {
    console.error('Error fetching skip trace data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching skip trace data'
    })
  }
})