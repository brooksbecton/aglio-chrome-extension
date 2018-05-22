import React from "react";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";

import "./index.css";

const RecipeDetails = ({ recipe }) => {
  return (
    <div>
      <h2>Recipe</h2>
      <ListGroup>
        {recipe.recipe.map(step => (
          <ListGroupItem className="itemContainer">
            <span className="recipeText">{step}</span>{" "}
            <Button bsStyle="info" className="crudButton">
              <Glyphicon glyph="pencil" />
            </Button>
            <Button bsStyle="danger" className="crudButton">
              <Glyphicon glyph="trash" />
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
      <ListGroup>
        {recipe.ingredients.map(ingredient => (
          <ListGroupItem className="itemContainer">
            <span className="recipeText">{ingredient}</span>{" "}
            <Button bsStyle="info" className="crudButton">
              <Glyphicon glyph="pencil" />
            </Button>
            <Button bsStyle="danger" className="crudButton">
              <Glyphicon glyph="trash" />
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default RecipeDetails;
