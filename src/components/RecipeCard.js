import React from 'react';
import { Card, Button } from 'react-bootstrap';

function RecipeCard({ recipe }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={recipe.image}
        alt={recipe.title}
      />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Button
          variant="success"
          href={`https://spoonacular.com/recipes/${recipe.title
            .toLowerCase()
            .replace(/ /g, "-")}-${recipe.id}`}
          target="_blank"
        >
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
