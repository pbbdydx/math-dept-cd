import { GoogleGenAI } from "@google/genai";
import { MathematicianData, Source } from "../types";

// Initialize Gemini AI Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Random categories to ensure diversity in results
const DISCOVERY_PROMPTS = [
  "a female mathematician from the 19th or early 20th century",
  "an African American mathematician who made history",
  "an ancient mathematician from India, China, or the Middle East",
  "a lesser-known contributor to modern computer science or cryptography",
  "an indigenous mathematician",
  "a mathematician from South America",
  "a mathematician who overcame significant disability or discrimination",
  "a pioneer in statistics from a non-western country"
];

export const fetchRandomMathematician = async (): Promise<{ data: MathematicianData, sources: Source[] }> => {
  const randomCategory = DISCOVERY_PROMPTS[Math.floor(Math.random() * DISCOVERY_PROMPTS.length)];

  // We ask for JSON in the text prompt because responseSchema is not recommended with googleSearch in all cases
  const prompt = `Identify a mathematician fitting the description: "${randomCategory}". 
  Focus on someone who is lesser-known to the general public but had a significant impact.
  
  You MUST find a real, valid URL for a photograph or portrait of this person from the web (e.g. Wikimedia Commons).
  
  Return ONLY a raw JSON object (no markdown formatting like \`\`\`json) with the following structure:
  {
    "name": "Name",
    "years": "Birth-Death",
    "origin": "Country/Region",
    "bio": "2-3 sentence biography",
    "famousResult": "Brief explanation of their most famous theorem/result",
    "impact": "Why their work matters today",
    "visualDescription": "Visual details for an AI art generator (clothing, setting, appearance)",
    "realImageUrl": "A direct URL to a real image/portrait found online. Leave empty if absolutely no image is found."
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate mathematician data");
  }

  // Parse JSON from the text response
  let jsonString = response.text;
  // Clean up markdown code blocks if present
  jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
  
  let textData: MathematicianData;
  try {
    textData = JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse JSON response", response.text);
    throw new Error("Received malformed data from the archives.");
  }

  // Extract sources from grounding metadata
  const sources: Source[] = [];
  if (response.candidates?.[0]?.groundingMetadata?.groundingChunks) {
    response.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
      if (chunk.web?.uri && chunk.web?.title) {
        sources.push({
          uri: chunk.web.uri,
          title: chunk.web.title
        });
      }
    });
  }

  return { data: textData, sources };
};

export const generateMathematicianImage = async (visualDescription: string): Promise<string> => {
  const prompt = `A tasteful, artistic digital tribute portrait of a mathematician. 
  Description: ${visualDescription}. 
  Style: Realistic oil painting or charcoal drawing, dignified, academic, soft lighting.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: {
      parts: [
        { text: prompt }
      ]
    }
  });

  for (const candidate of response.candidates || []) {
    for (const part of candidate.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }
  
  throw new Error("No image generated");
};