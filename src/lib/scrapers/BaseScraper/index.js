/*global chrome*/

/** Interface for Getting and parsing HTML for recipes */
class BaseScrape {
  /** Initialized html property */
  constructor() {
    this.html = "";
  }

  /**
   * Captures the page source of the page the user's active page
   * Uses {@link https://developer.chrome.com/extensions/pageCapture | pageCapture}
   * @returns <Promise> - represents the html of the current page
   */
  getHTML() {
    return new Promise((resolve, reject) => {
      chrome.tabs.executeScript(
        { code: "document.querySelector('body').innerHTML" },
        results => {
          if (results) {
            this.html = results[0];
            resolve();
          } else {
            reject();
          }
        }
      );
    });
  }

  /**
   * Parses and returns steps of a recipe
   *
   * @returns {Array} Array of Strings reprsenting the steps in a recipe
   */
  getRecipe() {}

  /**
   * Parses and returns ingredients of a recipe
   *
   * @returns {Array} Array of Strings reprsenting the ingredients in a recipe
   */
  getIngredients() {}

  /**
   * Parses and returns meta data of a recipe
   *
   * @returns {Object} reprsenting the meta data in a recipe
   */
  getMeta() {}
}

export default BaseScrape;
