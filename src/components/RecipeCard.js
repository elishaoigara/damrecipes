import React from "react";
import { Card, Button, OverlayTrigger, Tooltip, Badge } from "react-bootstrap";

function RecipeCard({ recipe, buttonLabel = "🍽 View Recipe" }) {
  return (
    <Card className="h-100 recipe-card shadow-sm border-0 rounded-4">
      {/* Image Section */}
      <div className="image-wrapper">
        <Card.Img
          variant="top"
          src={recipe.image}
          alt={`Recipe for ${recipe.title}`}
          className="recipe-img"
        />
      </div>

      {/* Card Body */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <OverlayTrigger placement="top" overlay={<Tooltip>{recipe.title}</Tooltip>}>
          <Card.Title className="fw-semibold text-center text-truncate recipe-title">
            {recipe.title}
          </Card.Title>
        </OverlayTrigger>

        {/* Optional Metadata */}
        {recipe.readyInMinutes && (
          <p className="text-muted small text-center mb-2">
            ⏱ {recipe.readyInMinutes} mins | 🍽 {recipe.servings} servings
          </p>
        )}

        {/* Badges */}
        <div className="text-center mb-2">
          {recipe.vegetarian && <Badge bg="success" className="me-1">🥦 Veg</Badge>}
          {recipe.vegan && <Badge bg="dark" className="me-1">🌱 Vegan</Badge>}
          {recipe.glutenFree && <Badge bg="info">🚫 Gluten</Badge>}
        </div>

        {/* Action Button */}
        <Button
          href={`https://spoonacular.com/recipes/${recipe.title
            .toLowerCase()
            .replace(/ /g, "-")}-${recipe.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 recipe-btn fw-semibold"
        >
          {buttonLabel}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
