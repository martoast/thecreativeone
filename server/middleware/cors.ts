export default defineEventHandler((event) => {
    const origin = getRequestHeader(event, 'origin')
    const allowedOrigins = [
      'http://localhost:3000',
      'https://www.thecreativeone.io',
      'https://maps.googleapis.com',
      'https://hooks.zapier.com'
    ]
  
    if (origin && allowedOrigins.includes(origin)) {
      setResponseHeaders(event, {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Credentials": 'true',
        "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept',
        "Access-Control-Expose-Headers": '*'
      })
    }
  
    if (getMethod(event) === 'OPTIONS') {
      event.res.statusCode = 204
      event.res.statusMessage = "No Content."
      return 'OK'
    }
  })