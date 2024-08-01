export const usePropertyDetail = async (address) => {
  try {
    const response = await $fetch('/.netlify/functions/re-property-detail', {
      method: 'POST',
      body: { address }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.data
  } catch (error) {
    console.error('Error fetching property details:', error)
    throw error
  }
}

export const usePropertyComps = async (address) => {
  try {
    const response = await $fetch('/.netlify/functions/re-property-comps', {
      method: 'POST',
      body: { address }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.data
  } catch (error) {
    console.error('Error fetching property comps:', error)
    throw error
  }
}

export const useSkipTrace = async (address, city, state, zip) => {
  try {
    const response = await $fetch('/server/api/re-skip-trace', {
      method: 'POST',
      body: { address, city, state, zip }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.data
  } catch (error) {
    console.error('Error fetching skip trace data:', error)
    throw error
  }
}
