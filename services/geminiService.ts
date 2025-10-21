
import { GoogleGenAI, Type } from "@google/genai";
import type { EyeAnalysis } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        disclaimer: {
            type: Type.STRING,
            description: "A mandatory disclaimer stating this is not a medical diagnosis."
        },
        potentialCondition: {
            type: Type.STRING,
            description: "The name of the most likely potential eye condition. If none, state 'No immediate concerns detected'."
        },
        description: {
            type: Type.STRING,
            description: "A detailed description of the potential condition."
        },
        commonSymptoms: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            },
            description: "A list of common symptoms associated with the condition."
        },
        recommendation: {
            type: Type.STRING,
            description: "A clear recommendation, usually advising to consult a professional ophthalmologist."
        },
    },
    required: ["disclaimer", "potentialCondition", "description", "commonSymptoms", "recommendation"]
};

export const analyzeEyeImage = async (base64Image: string, mimeType: string): Promise<EyeAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
          parts: [
              {
                  inlineData: {
                      data: base64Image,
                      mimeType: mimeType,
                  },
              },
              {
                  text: "You are an AI medical assistant specializing in ophthalmology. Analyze this image of an eye. Identify potential health concerns and provide information in the specified JSON format. Do not diagnose, but suggest possibilities. If the image is not of an eye or is unclear, state that in the `potentialCondition` field and recommend uploading a clearer image."
              },
          ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    return parsedJson as EyeAnalysis;
  } catch (error) {
    console.error("Error analyzing eye image:", error);
    throw new Error("Failed to analyze image. The Gemini API may be experiencing issues.");
  }
};
