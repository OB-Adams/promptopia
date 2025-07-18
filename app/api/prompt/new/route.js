import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      prompt,
      tag,
      creator: userId,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return new Response("Failed to create prompt", { status: 500 });
  }
};
 