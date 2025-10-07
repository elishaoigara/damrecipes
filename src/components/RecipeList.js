import React from "react";
import { Card, Col, Row, OverlayTrigger, Tooltip } from "react-bootstrap";

function RecipeList({ recipes }) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center mt-5">
        <h4 className="fw-bold text-muted">No recipes found 🍴</h4>
        <p className="text-secondary">
          Try searching with different ingredients!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {recipes.map((recipe) => (
          <Col key={recipe.id}>
            <Card
              className="h-100 shadow border-0 rounded-4"
              style={{
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              {/* Recipe Image */}
              <Card.Img
                variant="top"
                src={recipe.image}
                alt={recipe.title || "Recipe image"}
                style={{
                  height: "220px",
                  objectFit: "cover",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              />

              {/* Card Body */}
              <Card.Body className="d-flex flex-column justify-content-between">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>{recipe.title}</Tooltip>}
                >
                  <Card.Title
                    className="fw-semibold text-center text-truncate"
                    style={{
                      fontSize: "1.05rem",
                      fontFamily: "'Poppins', sans-serif",
                      color: "#333",
                    }}
                  >
                    {recipe.title}
                  </Card.Title>
                </OverlayTrigger>

                <a
                  href={
                    recipe.id && recipe.title
                      ? `https://spoonacular.com/recipes/${recipe.title
                          .toLowerCase()
                          .replace(/ /g, "-")}-${recipe.id}`
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-100 mt-3 fw-semibold"
                  style={{
                    backgroundColor: "#ff7043",
                    border: "none",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  🍽 View Recipe
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default RecipeList;
