export const useZillowPropertyDetails = async (address) => {
  try {
    const response = await $fetch('/.netlify/functions/zillow-property-details', {
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


export const useZillowImages = async (zpid) => {
  try {
    const response = await $fetch('/.netlify/functions/zillow-images', {
      method: 'POST',
      body: { zpid: String(zpid) }
    })

    if (response.error) {
      throw new Error(response.error)
    }

    return response.data
  } catch (error) {
    console.error('Error fetching images:', error)
    throw error
  }
}
