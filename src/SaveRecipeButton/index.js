/*global chrome*/

import React, { Component } from "react";
import PropTypes from "prop-types";

/** Saves the users current page content */
class SaveRecipeButton extends Component {
  static propTypes = {
    handleSave: PropTypes.func
  };

  constructor() {
    super();

    this.state = {
      saveError: ""
    };
  }

  /**
   * Captures the page source of the provided tabId
   * Uses {@link https://developer.chrome.com/extensions/pageCapture | pageCapture}
   * @async
   * @param <Number>  tabId - tab id of a valid tab
   * @returns <Promise> - represents the
   */
  capturePage = tabId => {
    return Promise((resolve, reject) => {
      chrome.pageCapture({ tabId }, mHtml => {
        console.log(mHtml);
        resolve(mHtml);
      });
    });
  };

  /**
   * Sets the state of 'saveError' to a supplied error message
   * @param <Error> - err
   */
  displayError = err => {
    this.setState({ saveError: err });
  };

  /**
   * Gets the user's current active tab
   * Uses {@link https://developer.chrome.com/extensions/tabs#method-getCurrent| tabs.getCurrent}
   * @returns <Promise> - represents {@link https://developer.chrome.com/extensions/tabs#type-Tab | all tab data} of the current tab
   */
  getCurrentTab = () => {
    return Promise((resolve, reject) => {
      chrome.tabs.getCurrent(tab => {
        tab ? resolve(tab) : reject(new Error("No Current Tab"));
      });
    });
  };
  /**
   * Driver function to save a recipe
   * @async
   */
  saveRecipe = async () => {
    let currentTabId;
    let mHtml;
    try {
      const { id } = await this.getCurrentTab();
      currentTabId = id;
    } catch (err) {
      this.displayError(err);
    }

    try {
      mHtml = await this.capturePage(currentTabId);
    } catch (err) {
      this.displayError(err);
    }
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
