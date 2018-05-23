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
      scrapeError: ""
    };
  }

  /**
   * Sets the state of 'scrapeError' to a supplied error message
   * @param {Error} err
   */
  displayError = err => {
    this.setState({ scrapeError: err });
  };

  /**
   * Driver function to save a recipe
   * @async
   */
  scrapePageRecipe = async () => {
    this.props.scrapePageRecipe();
  };
  render() {
    return (
      <div>
        <Button className="saveButton" onClick={() => this.scrapePageRecipe()}>
          Pull Recipe
        </Button>
        <p className="error">
          {this.state.scrapeError.length > 0 && this.state.scrapeError}
        </p>
      </div>
    );
  }
}

export default SaveRecipeButton;
