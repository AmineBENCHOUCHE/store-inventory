
//Import the google cloud client library 
import vision from '@google-cloud/vision';

const analyzeImage = async (image: HTMLCanvasElement) => {
  try {
    // Validate image format (PNG or JPEG)
    const imageData = image.toDataURL('image/png'); // Change to 'image/jpeg' if needed

    const client = new vision.ImageAnnotatorClient({
      keyFilename: './API_KEY.json'
    });

    // Get the file path of the image to analyze
    const results = await client.labelDetection(imageData)

    const labels = results[0].labelAnnotations;
    // console.log('Labels:');
    if (labels) {
      return labels[0]?.description;
    } else {
      console.error({ error: 'No labels detected in the image' });
      return null;
    }
      

  } catch (error: any) { console.error('Error' + error.message); }

}




export default analyzeImage
