import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
})

export const generateRecipe = async (prompt: string) => {
  const chatCompletion = await getGroqChatCompletion(prompt)
  console.log(chatCompletion.choices[0]?.message?.content || "")
  return chatCompletion.choices[0]?.message?.content || ""
}

export const getGroqChatCompletion = async (prompt: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  })
}
