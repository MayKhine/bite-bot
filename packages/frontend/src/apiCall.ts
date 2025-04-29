const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY
import { InferenceClient } from "@huggingface/inference"

export const getRecipeSuggestions = async (prompt: string) => {
  try {
    const client = new InferenceClient(apiKey)

    const response = await client.chatCompletion({
      provider: "hyperbolic",
      model: "deepseek-ai/DeepSeek-V3-0324",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 512,
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error("Error generating recipe:", error)
    return "Sorry, there was an error generating the recipe."
  }
}
