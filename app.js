import openai from "./config/openai.js"
import readlineSync from "readline-sync"
import colors from "colors"

async function bobi() {
  console.log(colors.bold.green("Welcome to Bobibot Program !"))

  const chatHistory = []

  while (true) {
    const userInput = readlineSync.question(colors.yellow("You: "))

    try {
      const messages = chatHistory.map(([role, content]) => {
        return {
          role,
          content,
        }
      })

      messages.push({ role: "user", content: userInput })

      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      })

      const responseText = chatCompletion.data.choices[0].message.content

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.green("Bobi: ") + responseText)
        return
      }

      console.log(colors.green("Bobi: ") + responseText)

      chatHistory.push(["user", userInput])
      chatHistory.push(["assistant", responseText])
    } catch (error) {
      console.error(colors.red(error))
    }
  }
}

bobi()
