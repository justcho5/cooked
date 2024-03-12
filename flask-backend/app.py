from flask import Flask, request, abort
from utils import buildGptPayload, sendGptRequest, scrape_recipe

# TODO: add cors

app = Flask(__name__)


@app.post("/api/generate/import-by-url")
def import_by_url():
    """
    This function handles the POST request to import a recipe using a URL. It retrieves the URL from the request JSON and then attempts to scrape the recipe data from the URL. If successful, it returns the recipe JSON. If the URL is invalid or the recipe extraction fails, appropriate error messages are returned.
    """

    req = request.get_json()

    if "url" not in req:
        abort(400, "Missing url")

    url = req["url"]

    try:
        recipe_json = scrape_recipe(url)

        if (
            len(recipe_json["ingredients"]) == 0
            and len(recipe_json["instructions"]) == 0
        ):
            abort(
                500, "Recipe extraction incomplete. Check your URL or submit a new URL"
            )

        return recipe_json

    except Exception as e:
        print(e)
        abort(500, "Recipe unable to be extracted. Check URL")


@app.post("/api/generate/generate-recipe")
def generate_recipe():
    """
    This function handles the POST request to '/generate-recipe'. It expects a JSON payload with a key 'ingredients'. If the key is missing, it aborts with a 400 error. It then builds a payload using the provided ingredients and sends a request to a GPT model. If successful, it returns the generated content; otherwise, it aborts with a 500 error.
    """
    req = request.get_json()

    print(req)
    if "ingredients" not in req:
        abort(400, "Missing ingredients")

    ingredients = req["ingredients"]
    messages = buildGptPayload(ingredients)
    try:
        content = sendGptRequest(messages)
        print("CONTENT", content)
        return content

    except Exception as e:
        print(e)
        abort(500, e)
