import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ClientOptions, OpenAI } from "openai";

import { increaseAPILimit, checkAPILimit } from "@/lib/api-limit";

const options: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(options);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized access", { status: 401 });
    }
    if (!options.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Prompt are required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount are required", { status: 400 });
    }
    if (!resolution) {
      return new NextResponse("Resolution are required", { status: 400 });
    }

    const freeTrial = await checkAPILimit();

    if (!freeTrial) {
      return new NextResponse("Free trial has expired", { status: 403 });
    }

    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    await increaseAPILimit();

    // console.log(response.choices[0].message);

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
