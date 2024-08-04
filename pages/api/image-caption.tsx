import * as dotenv from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';
dotenv.config();

import OpenAIApi from "openai";

const openAI = new OpenAIApi({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });
// console.log(openai.apiKey);

const analyzeImage = async (req:NextApiRequest, res:NextApiResponse) => {

  // transform image to base64
  const imgData = req.body.imageData;

  const response = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe the objects with one word and put them in a unordered list?" },
          {
            type: "image_url",
            image_url: {
              "url": imgData,
            },
          },
        ],
      },
    ],
  })
  
  console.log(response)
  const messageContent = response.choices[0].message;
  console.log(messageContent)

  return res.status(200).json(messageContent)


}

export default analyzeImage;

