/*global chrome*/

/** Interface for Getting and parsing HTML for recipes */
class BaseScraper {
  /** Initialized html to null and url property */
  constructor(url) {
    this.url = url;
  }

  /**
   * Captures the page source of the page the user's active page
   * Uses {@link https://developer.chrome.com/extensions/pageCapture | pageCapture}
   * @returns <Promise> - represents the html of the current page
   */
  getHTML() {
    return new Promise((resolve, reject) => {
      chrome.tabs.executeScript(
        { code: "document.querySelector('html').innerHTML" },
        results => {
          if (results) {
            const recipeSource = document.createElement("html");
            recipeSource.innerHTML = results[0];
            document.querySelector(".recipeHtml").appendChild(recipeSource);
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

  /**
   * Main Driver for scraper
   *
   * @async
   * @type RecipeData
   * @property {String} url URL the data was pulled from
   * @property {Array} ingredients ingredients of recipe
   * @property {Object} meta Meta data about the recipe
   * @returns {RecipeData}
   */
  async run() {
    await this.getHTML();
    const recipe = this.getRecipe();
    const ingredients = this.getIngredients();
    const meta = this.getMeta();

    return { url: this.url, recipe, ingredients, meta };
  }
}

export default BaseScraper;
