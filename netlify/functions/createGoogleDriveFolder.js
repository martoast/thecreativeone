const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

exports.handler = async (event, context) => {
  // Parse the credentials from the environment variable
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

  // Create a new JWT client using the credentials
  const jwtClient = new JWT(
    credentials.client_email,
    null,
    credentials.private_key.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/drive']
  );

  try {
    // Authorize the client
    await jwtClient.authorize();
    
    // Create a new Drive instance
    const drive = google.drive({ version: 'v3', auth: jwtClient });
    
    // Parse the request body
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

    // Extract folder name and parent folder ID from the request
    const { folderName, parentFolderId } = requestBody;

    if (!folderName) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Folder name is required' })
      };
    }

    // Create the folder
    const folderMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: parentFolderId ? [parentFolderId] : []
    };

    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: 'id'
    });

    console.log('Folder created successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Folder created successfully', folderId: folder.data.id })
    };
  } catch (error) {
    console.error('Error details:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error creating folder', 
        details: error.message 
      })
    };
  }
};