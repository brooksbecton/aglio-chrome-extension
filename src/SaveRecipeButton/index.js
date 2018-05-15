/*global chrome*/

import React, { Component } from "react";
import PropTypes from "prop-types";

/** Saves the users current page content */
class SaveRecipeButton extends Component {
  static propTypes = {
    handleSave: PropTypes.func
  };

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
    try {
      const { id: currentTabId } = await this.getCurrentTab();
    } catch (err) {
      this.displayError(err);
    }

    try {
      const mHtml = await this.capturePage(currentTabId);
    } catch (err) {}
  };
  render() {
    return (
      <div>
        <button onClick={() => this.saveRecipe()}>Save Recipe</button>
        <p>{this.state.saveError && this.state.saveError}</p>
      </div>
    );
  }
}

export default SaveRecipeButton;
