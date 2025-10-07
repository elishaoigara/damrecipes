import React, { useState } from "react";
import axios from "axios";
import { Container, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [aiRecipe, setAiRecipe] = useState("");
  const [mode, setMode] = useState("api"); // default mode = Spoonacular API

  const fetchResults = async (query) => {
    try {
      if (mode === "api") {
        // 🍳 Spoonacular API Mode
        const response = await axios.get(
          "https://api.spoonacular.com/recipes/complexSearch",
          {
            params: {
              query: query,
              number: 12,
              apiKey: process.env.REACT_APP_SPOONACULAR_KEY,
            },
          }
        );
        setRecipes(response.data.results);
        setAiRecipe("");
      } else {
        // 🤖 AI Mode
        const response = await axios.post("http://127.0.0.1:5000/generate", {
          ingredients: query,
        });

        setAiRecipe(response.data.ai_recipe);
        setRecipes(response.data.recipes || []); // AI can return recipes too
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container className="my-4 app-container">
      <h1 className="text-center mb-4 app-title">🍲 DamRecipes Finder</h1>

      {/* Mode Toggle */}
      <div className="d-flex justify-content-center mb-3 toggle-btn-group">
        <ToggleButtonGroup
          type="radio"
          name="mode"
          value={mode}
          onChange={(val) => setMode(val)}
        >
          <ToggleButton id="api-mode" value="api" variant="outline-warning">
            🔍 Search Recipes
          </ToggleButton>
          <ToggleButton id="ai-mode" value="ai" variant="outline-warning">
            🤖 AI Suggestions
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {/* Search Input */}
      <SearchBar onSearch={fetchResults} mode={mode} />

      {/* Show AI Result */}
      {mode === "ai" && aiRecipe && (
        <div className="card mb-4 p-3 ai-card">
          <h5 className="ai-title">✨ AI Recipe Suggestion</h5>
          <pre style={{ whiteSpace: "pre-wrap" }}>{aiRecipe}</pre>
        </div>
      )}

      {/* Show API Recipes */}
      {mode === "api" && <RecipeList recipes={recipes} />}
    </Container>
  );
}

export default App;
