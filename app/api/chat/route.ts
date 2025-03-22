import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generatePrompt = (query: string, state: string, district: string) => `
  You are a helpful AI assistant designed to answer user queries about agriculture. You are currently helping a farmer from ${district}, ${state}. The farmer has asked you the following question: "${query}". Please provide a helpful response to the farmer's query. Refer to the indian government's official agriculture website for accurate information.
  Answer the query in marathi.
`;

export async function POST(req: Request) {
  const { query, state, district } = await req.json();

  try {
    const prompt = generatePrompt(query, state, district);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ answer: text }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { answer: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
