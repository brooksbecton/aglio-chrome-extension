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
   * Initilizes ingredients & recipe to empty sets in state
   */
  constructor() {
    super();

    this.state = {
      ingredients: new Set(),
      recipe: new Set()
    };
  }

  /**
   * Adds the instructions index to the indices of items being edited
   * @param {Number} instructionIndex
   * @param {String} itemType - "recipe", "ingredients", or "meta"
   */
  openEditItem(instructionIndex, itemType) {
    const t = new Set([instructionIndex, ...this.state[itemType]]);
    this.setState({
      [itemType]: t
    });
  }

  /**
   * Removes the given index from the set of indices of items being edited
   * @param {Number} instructionIndex  - index of the item being edited
   * @param {String} itemType - "recipe", "ingredients", or "meta"
   */
  closeEdit(instructionIndex, itemType) {
    let t = this.state[itemType];
    t.delete(instructionIndex);
    this.setState({ [itemType]: t });
  }

  /**
   * Updates parent component with newItemText
   * @param {String} newItemText
   * @param {String} itemType - "recipe", "ingredients", or "meta"
   * @param {Number} index
   */
  updateItem(newItemText, itemType, index) {
    this.props.updateRecipe({
      ...this.props.recipe,
      /* 
      Only give back the new text if it is the index matches 
      the index of the item that we are editing 
      */
      [itemType]: this.props.recipe[itemType].map((item, i) => {
        if (i !== index) {
          return item;
        } else {
          return newItemText;
        }
      })
    });
  }

  /**
   * Displays UI for item information and editing.
   * @param {Array} itemSet - Array of strings containing thing like recipe steps or ingredient list
   * @param {String} itemType - "recipe", "ingredients", or "meta"
   */
  renderItem(itemSet, itemType) {
    return (
      <ListGroup>
        {itemSet.map((step, i) => (
          <ListGroupItem key={i}>
            {this.state[itemType].has(i) ? (
              <div className="itemContainer">
                <textarea
                  className="itemText"
                  type="text"
                  value={step}
                  onChange={e => this.updateItem(e.target.value, itemType, i)}
                  wrap="hard"
                  rows="8"
                />
                <Button
                  onClick={() => this.closeEdit(i, itemType)}
                  bsStyle="primary"
                  className={["button", "crudButton"]}
                >
                  <Glyphicon glyph="ok" />
                </Button>
              </div>
            ) : (
              <div className="itemContainer">
                <span className="itemText">{step}</span>
                <Button
                  onClick={() => this.openEditItem(i, itemType)}
                  bsStyle="info"
                  className={["editItem", "button", "crudButton"]}
                >
                  <Glyphicon glyph="pencil" />
                </Button>
                <Button bsStyle="danger" className={["button", "crudButton"]}>
                  <Glyphicon glyph="trash" />
                </Button>
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    );
  }

  render() {
    return (
      <div>
        <Tabs defaultActiveKey="Recipe" id="Recipe Details">
          <Tab eventKey="Recipe" title="Recipe">
            {this.renderItem(this.props.recipe.recipe, "recipe")}
          </Tab>
          <Tab eventKey="ingredients" title="Ingredients">
            {this.renderItem(this.props.recipe.ingredients, "ingredients")}
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
