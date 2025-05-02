import dotenv from "dotenv"
import Groq from "groq-sdk"
dotenv.config()

// Ensure you have set your API key as an environment variable
const apiKey = process.env.GROQ_API_KEY

if (!apiKey) {
  throw new Error("GROQ_API_KEY is not set")
}

const groq = new Groq({
  apiKey: apiKey,
})

export const generateRecipe = async (prompt: string) => {
  console.log("prompt in generate recipe: ", prompt)

  try {
    const chatCompletion = await getGroqChatCompletion(prompt)
    console.log(chatCompletion.choices[0]?.message?.content || "")
    return chatCompletion.choices[0]?.message?.content || ""
  } catch (error) {
    console.error("Error generating recipe:", error)
    throw new Error("Failed to generate recipe")
  }
}

export const getGroqChatCompletion = async (prompt: string) => {
  try {
    return await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  } catch (error) {
    console.error("Error fetching chat completion:", error)
    throw new Error("Failed to fetch chat completion")
  }
}

export const test = async () => {
  try {
    return await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: "say hi",
        },
      ],
      model: "llama-3.3-70b-versatile",
    })
  } catch (error) {
    console.error("Error fetching chat completion:", error)
    throw new Error("Failed to fetch chat completion")
  }
}
