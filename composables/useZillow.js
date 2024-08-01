// composables/useZillowPropertyDetails.js
export const useZillowPropertyDetails = async (address) => {
  try {
    const response = await $fetch('/.netlify/functions/zillow-property-details', {
      method: 'POST',
      body: { address }
    })

    // Parse the response
    const parsedResponse = JSON.parse(response)

    if (parsedResponse.error) {
      throw new Error(parsedResponse.error)
    }

    return parsedResponse.data
  } catch (error) {
    console.error('Error fetching property details:', error)
    throw error
  }
}

// composables/useZillowImages.js
export const useZillowImages = async (zpid) => {
  try {
    const response = await $fetch('/.netlify/functions/zillow-images', {
      method: 'POST',
      body: { zpid: String(zpid) }
    })

    // Parse the response
    const parsedResponse = JSON.parse(response)

    if (parsedResponse.error) {
      throw new Error(parsedResponse.error)
    }

    return parsedResponse.data
  } catch (error) {
    console.error('Error fetching images:', error)
    throw error
  }
}