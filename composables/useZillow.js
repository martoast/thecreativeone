// composables/useZillowPropertyDetails.js
export const useZillowPropertyDetails = async (address) => {
  try {
    const {data: response} = await $fetch('/.netlify/functions/zillow-property-details', {
      method: 'POST',
      body: { address }
    })


    return response
  } catch (error) {
    console.error('Error fetching property details:', error)
    throw error
  }
}

// composables/useZillowImages.js
export const useZillowImages = async (zpid) => {
  try {
    const {data: response} = await $fetch('/.netlify/functions/zillow-images', {
      method: 'POST',
      body: { zpid: String(zpid) }
    })

    return response
  } catch (error) {
    console.error('Error fetching images:', error)
    throw error
  }
}