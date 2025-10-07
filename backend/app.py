print("🚀 Starting Flask app...")

from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import requests
import os
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SPOONACULAR_API_KEY = os.getenv("SPOONACULAR_API_KEY")

# --- Configure Gemini ---
genai.configure(api_key=GEMINI_API_KEY)

# --- Initialize Flask app ---
app = Flask(__name__)
CORS(app)


@app.route("/generate", methods=["POST"])
def generate():
    """
    Generate an AI-created recipe using Gemini and fetch real recipes
    from the Spoonacular API based on provided ingredients.
    """
    data = request.get_json()
    ingredients = data.get("ingredients")

    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    # --- 1. Generate AI Recipe with Gemini ---
    prompt = f"""
    Create a unique recipe using these ingredients: {ingredients}.
    Please format your response clearly with:
    - Recipe Name
    - Ingredients (list)
    - Step-by-step Instructions
    - Extra Cooking Tips
    """

    ai_recipe = "Error: could not generate AI recipe."
    try:
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        response = model.generate_content(prompt)
        ai_recipe = response.text.strip()
    except Exception as e:
        ai_recipe = f"AI generation error: {str(e)}"

    # --- 2. Fetch real recipes from Spoonacular ---
    recipes = []
    try:
        url = (
            f"https://api.spoonacular.com/recipes/complexSearch"
            f"?query={ingredients}&number=6&apiKey={SPOONACULAR_API_KEY}"
        )
        res = requests.get(url)
        res.raise_for_status()
        spoonacular_data = res.json()
        recipes = spoonacular_data.get("results", [])
    except Exception as e:
        print("Error fetching Spoonacular:", e)

    # --- Return combined results ---
    return jsonify({
        "ai_recipe": ai_recipe,
        "recipes": recipes
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
