import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function getWeatherAdvisory(weatherData: any) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Based on the following weather forecast data, provide agricultural advisory and irrigation planning recommendations:
      
      Current Weather:
      - Temperature: ${weatherData.current.temperature}°C
      - Humidity: ${weatherData.current.humidity}%
      - Wind Speed: ${weatherData.current.wind} km/h
      - Precipitation: ${weatherData.current.precipitation} mm
      - Condition: ${weatherData.current.condition}
      
      5-Day Forecast:
      ${weatherData.forecast
        .slice(0, 5)
        .map((day: any) => `- ${day.day}: ${day.temp}°C, ${day.condition}`)
        .join("\n")}
      
      Return ONLY a JSON object in the following format without any additional text or markdown:
      {
        "advisory": [
          {
            "crop": "string",
            "stage": "string",
            "advice": "string"
          }
        ],
        "irrigation": {
          "soilMoisture": [
            {
              "field": "string",
              "crop": "string",
              "moisture": number
            }
          ],
          "recommendations": [
            {
              "field": "string",
              "crop": "string",
              "advice": "string"
            }
          ]
        }
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean the response text by removing markdown code blocks if present
    const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();

    try {
      return JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.log("Raw response:", cleanedText);
      return null;
    }
  } catch (error) {
    console.error("Error generating weather advisory:", error);
    return null;
  }
}
