const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const stream = require('stream');

exports.handler = async (event, context) => {
  let credentials;
  try {
    credentials = JSON.parse(process.env.GOOGLE_SHEETS_API_CREDENTIALS);
  } catch (error) {
    console.error('Error parsing credentials:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error parsing GOOGLE_SHEETS_API_CREDENTIALS', details: error.message })
    };
  }

  const jwtClient = new JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/drive.file']
  );

  try {
    await jwtClient.authorize();
    
    const drive = google.drive({ version: 'v3', auth: jwtClient });
    
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (error) {
      console.error('Error parsing request body:', error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON in request body', details: error.message })
      };
    }

    const { fileName, fileContent, folderId } = requestBody;

    if (!fileName || !fileContent || !folderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'fileName, fileContent, and folderId are required' })
      };
    }

    console.log('Received fileContent:', fileContent.substring(0, 100) + '...'); // Log first 100 characters

    // Decode base64 content
    const buffer = Buffer.from(fileContent, 'base64');

    // Create a readable stream from the buffer
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const fileMetadata = {
      name: fileName,
      parents: [folderId]
    };

    const media = {
      mimeType: 'application/octet-stream',
      body: bufferStream
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id'
    });

    console.log('File uploaded successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'File uploaded successfully', fileId: file.data.id })
    };
  } catch (error) {
    console.error('Error details:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error uploading file', 
        details: error.message 
      })
    };
  }
};