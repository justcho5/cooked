import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You’re a world-renowned chef known for creating delicious meals. You’re currently competing in Top Chef and provided a fridge of the following ingredients: onion, garlic, beansprouts, eggs, ribeye, squash, kimchi, mushrooms, miso, dumplings.Given these ingredients, you’re tasked with the mission of creating a dish for the judges. The prize is $10,000. What is the recipe for the disk that you are creating? Be specific with the amount of an ingredient, how many servings the recipe is for, and the steps for cooking. In addition, provide a small description with the title.",
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
