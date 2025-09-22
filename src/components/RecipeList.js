import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

function RecipeList({ recipes }) {
  return (
    <Row>
      {recipes.map((recipe) => (
        <Col key={recipe.id} xs={12} md={4} lg={3} className="mb-4">
          <RecipeCard recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
}

export default RecipeList;
