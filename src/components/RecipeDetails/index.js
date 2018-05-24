import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from "react-bootstrap/lib/Button";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
import Tab from "react-bootstrap/lib/Tab";
import Tabs from "react-bootstrap/lib/Tabs";

import "./index.css";

/**
 * Displays the details of a recipe and allows editing of the
 * ingredients and the recipe steps
 */
class RecipeDetails extends Component {
  /**
   * Initilizes ingredients, recipe, and tempRecipe to empty sets/arrays in state
   */
  constructor() {
    super();

    this.state = {
      ingredients: new Set(),
      recipe: new Set(),
      tempRecipe: []
    };
  }

  componentDidMount() {
    this.setState({ tempRecipe: this.props.recipe.recipe });
  }

  /** Updates the components version of the recipe to matche the new recipe prop */
  componentDidUpdate(prevProps, prevState) {
    if (this.props.recipe !== prevProps.recipe) {
      this.setState({ tempRecipe: this.props.recipe.recipe });
    }
  }

  /**
   * Adds the instructions index to the indices of items being edited
   * @param {Number} instructionIndex
   * @param {String} type - "recipe", "ingredients", or "meta"
   */
  editItem(instructionIndex, type) {
    const t = new Set([instructionIndex, ...this.state[type]]);
    this.setState({
      [type]: t
    });
  }

  /**
   * Removes the given index from the set of indices of items being edited
   * @param {Number} instructionIndex  - index of the item being edited
   */
  closeEdit(instructionIndex) {
    let t = this.state.recipe;
    t.delete(instructionIndex);
    this.setState({ recipe: t });
  }

  updateItem = (newItemText, type, index) => {
    this.props.updateRecipe({
      ...this.props.recipe,
      [type]: this.state.tempRecipe.map((item, i) => {
        if (i !== index) {
          return item;
        } else {
          return newItemText;
        }
      })
    });
  };

  render() {
    const ingredients = this.props.recipe.ingredients;
    return (
      <div>
        <Tabs defaultActiveKey="Recipe">
          <Tab eventKey="Recipe" title="Recipe">
            <ListGroup>
              {this.state.tempRecipe.map((step, i) => (
                <ListGroupItem>
                  {this.state.recipe.has(i) ? (
                    <div className="itemContainer">
                      <textarea
                        className="recipeText"
                        type="text"
                        value={step}
                        onChange={e =>
                          this.updateItem(e.target.value, "recipe", i)
                        }
                        wrap="hard"
                        rows="8"
                      />
                      <Button
                        onClick={() => this.closeEdit(i)}
                        bsStyle="primary"
                        className={["button", "crudButton"]}
                      >
                        <Glyphicon glyph="ok" />
                      </Button>
                    </div>
                  ) : (
                    <div className="itemContainer">
                      <span className="recipeText">{step}</span>
                      <Button
                        onClick={() => this.editItem(i, "recipe")}
                        bsStyle="info"
                        className={["button", "crudButton"]}
                      >
                        <Glyphicon glyph="pencil" />
                      </Button>
                      <Button
                        bsStyle="danger"
                        className={["button", "crudButton"]}
                      >
                        <Glyphicon glyph="trash" />
                      </Button>
                    </div>
                  )}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Tab>
          <Tab eventKey="Ingredients" title="Ingredients">
            <ListGroup>
              {ingredients.map((ingredient, i) => (
                <ListGroupItem className="itemContainer">
                  <span className="recipeText">{ingredient}</span>{" "}
                  <Button
                    onClick={() => this.editItem(i, "ingredients")}
                    bsStyle="info"
                    className={["button", "crudButton"]}
                  >
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
  }
}

RecipeDetails.proptypes = {
  recipe: PropTypes.shape({
    recipe: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.arrayOf(PropTypes.string),
    meta: PropTypes.object
  }),
  updateRecipe: PropTypes.func
};

export default RecipeDetails;
