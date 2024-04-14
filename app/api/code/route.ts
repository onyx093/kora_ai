import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ClientOptions, OpenAI } from "openai";
import { ChatCompletionSystemMessageParam } from "openai/resources/index.mjs";

const options: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(options);
const instructions: ChatCompletionSystemMessageParam = {
  role: "system",
  content:
    "you are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    if (!options.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructions, ...messages],
    });

    // console.log(response.choices[0].message);

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
