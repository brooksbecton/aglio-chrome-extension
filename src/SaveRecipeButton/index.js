/*global chrome*/

import React, { Component } from "react";
import PropTypes from "prop-types";

/** Saves the users current page content */
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
        <button onClick={() => this.saveRecipe()}>Save Recipe</button>
        <p className="error">
          {this.state.saveError.length > 0 && this.state.saveError}
        </p>
      </div>
    );
  }
}

export default SaveRecipeButton;
