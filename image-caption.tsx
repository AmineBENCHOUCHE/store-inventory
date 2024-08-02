
//Import the google cloud client library 
import vision from '@google-cloud/vision';

const analyzeImage = async (image: string) => {
  try {
    // Validate image format (PNG or JPEG)
    if (!image.match(/\.(png|jpg|jpeg)$/i)) {
      console.error({ error: 'Invalid image format. Please provide a PNG or JPEG file.' });
      return "Invalid image format. Please provide a PNG or JPEG file.";
    }

    const client = new vision.ImageAnnotatorClient({
      keyFilename: './API_KEY.json' // replace with your service account key file path
    });

    // Get the file path of the image to analyze
    const results = await client.labelDetection(image)
      .then(results => {
        const labels = results[0].labelAnnotations;
        // console.log('Labels:');
        if (labels) {
          return labels[0]?.description;
        } else {
          console.error({ error: 'No labels detected in the image' });
          return null;
        }

        //labels.forEach(label => console.log(label.description));
      })

  } catch (error: any) { console.error('Error' + error.message); }

}




export default analyzeImage
