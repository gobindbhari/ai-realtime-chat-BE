import { groq } from "../lib/gemini";
import Message from "../models/message";
import { type Request, type Response } from "express";



export const aiSummary =  async (req: Request, res: Response) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: 1 })
      .limit(100);

    const chat = messages
      .map((m) => `${m.userName}: ${m.message}`)
      .join("\n");

    const response = await groq.chat.completions.create({
      // model: "llama-3.3-70b-versatile",
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "system",
          content:
            "Summarize the conversation in 4-5 short bullet points.",
        },
        {
          role: "user",
          content: chat,
        },
      ],
    });

    res.json({
      summary: response?.choices[0]?.message.content,
    });
  } catch (err) {
    console.log("ai-error", err)
    res.status(500).json({
      message: "Something went wrong",
      error: err
    });
  }
}