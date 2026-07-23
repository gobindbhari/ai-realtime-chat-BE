import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai";
import Groq from "groq-sdk";

dotenv.config()

console.log("Gemini key:", process.env.GEMINI_API_KEY?.slice(0, 10));
console.log("Groq key:", process.env.GROQ_API_KEY?.slice(0, 10));


export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});


export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});