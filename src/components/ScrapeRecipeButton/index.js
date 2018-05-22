import React, { Component } from "react";
import Button from "react-bootstrap/lib/Button";
import PropTypes from "prop-types";

import "./index.css";

/** UI for saving the user's current page */
class SaveRecipeButton extends Component {
  static propTypes = {
    scrapePageRecipe: PropTypes.func
  };

  /**
   * Initializes State
   */
  constructor() {
    super();

    this.state = {
      saveError: ""
    };
  }

  /**
   * Sets the state of 'saveError' to a supplied error message
   * @param {Error} err
   */
  displayError = err => {
    this.setState({ saveError: err });
  };

  /**
   * Driver function to save a recipe
   * @async
   */
  saveRecipe = async () => {
    this.props.scrapePageRecipe();
  };
  render() {
    return (
      <div>
        <Button className="saveButton" onClick={() => this.saveRecipe()}>
          Pull Recipe
        </Button>
        <p className="error">
          {this.state.saveError.length > 0 && this.state.saveError}
        </p>
      </div>
    );
  }
}

export default SaveRecipeButton;
