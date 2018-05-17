/*global chrome*/

import React, { Component } from "react";
import PropTypes from "prop-types";

import ScraperFactory from "./../lib/scrapers/ScraperFactory";

/** Saves the users current page content */
class SaveRecipeButton extends Component {
  static propTypes = {
    handleSave: PropTypes.func
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
   * Captures the page source of the page the user's active page
   * Uses {@link https://developer.chrome.com/extensions/pageCapture | pageCapture}
   * @returns <Promise> - represents the html of the current page
   */
  capturePage = () => {
    return new Promise((resolve, reject) => {
      chrome.tabs.executeScript(
        { code: "document.querySelector('body').innerHTML" },
        ({ 0: html }) => {
          resolve(html);
        }
      );
    });
  };

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
    let html = await this.capturePage();
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
