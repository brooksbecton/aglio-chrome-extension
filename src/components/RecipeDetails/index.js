import React from "react";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import Tab from "react-bootstrap/lib/Tab";
import Tabs from "react-bootstrap/lib/Tabs";

import "./index.css";

const RecipeDetails = ({ recipe }) => {
  return (
    <div>
      <Tabs defaultActiveKey="Recipe">
        <Tab eventKey="Recipe" title="Recipe">
          <ListGroup>
            {recipe.recipe.map(step => (
              <ListGroupItem className="itemContainer">
                <span className="recipeText">{step}</span>{" "}
                <Button bsStyle="info" className={["button", "crudButton"]}>
                  <Glyphicon glyph="pencil" />
                </Button>
                <Button bsStyle="danger" className={["button", "crudButton"]}>
                  <Glyphicon glyph="trash" />
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Tab>
        <Tab eventKey="Ingredients" title="Ingredients">
          <ListGroup>
            {recipe.ingredients.map(ingredient => (
              <ListGroupItem className="itemContainer">
                <span className="recipeText">{ingredient}</span>{" "}
                <Button bsStyle="info" className={["button", "crudButton"]}>
                  <Glyphicon glyph="pencil" />
                </Button>
                <Button bsStyle="danger" className={["button", "crudButton"]}>
                  <Glyphicon glyph="trash" />
                </Button>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    </div>
  );
};

export default RecipeDetails;
