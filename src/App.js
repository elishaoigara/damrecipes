import React, { useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (query) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch`,
        {
          params: {
            query: query,
            number: 12, // limit results
            apiKey: process.env.REACT_APP_SPOONACULAR_KEY
          }
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">🍲 DamRecipes Finder</h1>
      <SearchBar onSearch={fetchRecipes} />
      <RecipeList recipes={recipes} />
    </Container>
  );
}

export default App;
