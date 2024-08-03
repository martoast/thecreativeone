import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Determine the base URL
  let baseUrl = process.env.URL || 'http://localhost:8888'
  
  // Ensure baseUrl doesn't end with a slash
  baseUrl = baseUrl.replace(/\/$/, '')

  const functionUrl = `${baseUrl}/.netlify/functions/get-property`

  const response = await $fetch(functionUrl, {
    method: 'POST',
    body: JSON.stringify(body)
  })

  return response
})