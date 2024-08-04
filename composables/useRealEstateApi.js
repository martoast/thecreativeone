// composables/usePropertyDetail.js
export const usePropertyDetail = async (address) => {
  try {
    const response = await $fetch('/.netlify/functions/re-property-detail', {
      method: 'POST',
      body: { address }
    })

    // Check if response needs parsing
    const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response

    if (parsedResponse.error) {
      throw new Error(parsedResponse.error)
    }

    return parsedResponse.data
  } catch (error) {
    console.error('Error fetching property details:', error)
    throw error
  }
}

// composables/usePropertyComps.js
export const usePropertyComps = async (address) => {
  try {
    const response = await $fetch('/.netlify/functions/re-property-comps', {
      method: 'POST',
      body: { address }
    })

    // Check if response needs parsing
    const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response


    if (parsedResponse.error) {
      throw new Error(parsedResponse.error)
    }

    return parsedResponse.data
  } catch (error) {
    console.error('Error fetching property comps:', error)
    throw error
  }
}

// composables/useSkipTrace.js
export const useSkipTrace = async (address, city, state, zip) => {
  try {
    const response = await $fetch('/.netlify/functions/re-skip-trace', {
      method: 'POST',
      body: { address, city, state, zip }
    })

    // Check if response needs parsing
    const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response


    if (parsedResponse.error) {
      throw new Error(parsedResponse.error)
    }

    return parsedResponse.data
  } catch (error) {
    console.error('Error fetching skip trace data:', error)
    throw error
  }
}