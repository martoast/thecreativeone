// composables/usePropertyDetail.js
export const usePropertyDetail = async (address) => {
  try {
    const {data: response} = await $fetch('/.netlify/functions/re-property-detail', {
      method: 'POST',
      body: { address }
    })


    return response
  } catch (error) {
    console.error('Error fetching property details:', error)
    throw error
  }
}

// composables/usePropertyComps.js
export const usePropertyComps = async (address) => {
  try {
    const {data: response} = await $fetch('/.netlify/functions/re-property-comps', {
      method: 'POST',
      body: { address }
    })

    return response
  } catch (error) {
    console.error('Error fetching property comps:', error)
    throw error
  }
}

// composables/useSkipTrace.js
export const useSkipTrace = async (address, city, state, zip) => {
  try {
    const {data: response} = await $fetch('/.netlify/functions/re-skip-trace', {
      method: 'POST',
      body: { address, city, state, zip }
    })

    return response
  } catch (error) {
    console.error('Error fetching skip trace data:', error)
    throw error
  }
}