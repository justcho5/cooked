from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


def buildGptPayload(ingredients):
    system = "You are a world class chef, skilled in creating delicious recipes. Your task is to create a recipe that uses the given ingredients. Must use at least one ingredient. Don't try to use all the ingredients if it compromises taste. Including other ingredients is allowed. Assume user has basic ingredients.\
      Here are the instructions for the recipe: 1. Your output is in JSON format with the following keys: 'title', 'description', 'cuisine', 'categories','servings', 'calories_per_serving', 'ingredients','instructions', and 'total_time'. For ingredients, make sure to include the 'amount' and 'unit' and the 'ingredient'"
    user = f"Ingredients: {ingredients}"

    message = [{"role": "system", "content": system}, {"role": "user", "content": user}]
    # return messages

    return message


def sendGptRequest(messages):
    client = OpenAI()
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo", messages=messages
    )
    return completion.choices[0].message.content


{
    "title": "Stuffed Tomatoes with Ground Beef",
    "description": "Juicy and flavorful stuffed tomatoes filled with seasoned ground beef, perfect for a satisfying meal.",
    "cuisine": "European",
    "categories": ["Main Dish", "Stuffed Vegetables"],
    "servings": 4,
    "calories_per_serving": 350,
    "ingredients": [
        {"amount": 2, "unit": "", "ingredient": "Roma tomatoes"},
        {"amount": 500, "unit": "g", "ingredient": "Ground beef"},
        {"amount": 1, "unit": "tsp", "ingredient": "Salt"},
        {"amount": 1, "unit": "tsp", "ingredient": "Pepper"},
        {"amount": 1, "unit": "tbsp", "ingredient": "Olive oil"},
        {"amount": 1 / 2, "unit": "cup", "ingredient": "Chopped onion"},
        {"amount": 2, "unit": "cloves", "ingredient": "Minced garlic"},
        {"amount": 1 / 4, "unit": "cup", "ingredient": "Grated Parmesan cheese"},
    ],
    "instructions": [
        "Preheat the oven to 375°F (190°C).",
        "Cut the tops off the Roma tomatoes and scoop out the seeds with a spoon to create a hollow cavity.",
        "In a skillet, heat the olive oil over medium heat.",
        "Add the chopped onion and minced garlic, sauté until softened.",
        "Add the ground beef, salt, and pepper. Cook until the beef is browned and cooked through.",
        "Remove the skillet from heat and stir in the grated Parmesan cheese.",
        "Stuff each tomato with the ground beef mixture and place them in a baking dish.",
        "Bake in the preheated oven for 20-25 minutes until the tomatoes are tender.",
        "Serve the stuffed tomatoes warm and enjoy!",
    ],
    "total_time": "45 minutes",
}

example_imported_recipe = {
    "calories": "233 kcal",
    "category": "Dinner",
    "cuisine": "Mediterranean Inspired",
    "description": "These spinach and feta turkey burgers are moist and easy to make in one bowl with simple ingredients, shaped into patties, and cooked on a hot grill.",
    "image": "https://www.allrecipes.com/thmb/cpf6Rics5oHGq1TZ1df5fEaImwM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/1360550-582be362ee99424bb4f363c2274a9d0d.jpg",
    "ingredients": [
        "cooking spray",
        "2 pounds ground turkey",
        "1 (10 ounce) box frozen chopped spinach, thawed and squeezed dry",
        "4 ounces feta cheese",
        "2 large eggs, beaten",
        "2 cloves garlic, minced",
    ],
    "instructions": [
        "Preheat an outdoor grill for medium-high heat and lightly oil the grate.",
        "Mix together turkey, spinach, feta, eggs, and garlic in a large bowl until well combined; form into 8 patties.",
        "Cook patties on the preheated grill on both sides until no longer pink in the center, 15 to 20 minutes. An instant-read thermometer inserted into the center of patties should read at least 165 degrees F (74 degrees C).",
    ],
    "servings": "8 servings",
    "title": "Spinach and Feta Turkey Burgers",
    "total_time": 35,
    "url": "https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/",
}


def buildResponse(content):
    response = {
        "title": content["title"],
        "description": content["description"],
        "servings": content["servings"],
        "ingredients": content["ingredients"]
        .map(lambda x: f'{x["amount"]} {x["unit"]} {x["ingredient"]}')
        .tolist(),
        "instructions": content["instructions"],
        "total_time": content["total_time"],
        "cuisine": content["cuisine"],
        "categories": content["categories"],
        "calories": content["calories_per_serving"],
    }
