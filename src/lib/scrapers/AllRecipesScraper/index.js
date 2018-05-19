import BaseScraper from "./../BaseScraper";

/**
 * Class representing the web scraper to pull recipe data from a www.allrecipes.com webpage
 * @extends BaseScraper
 */
class AllRecipesScraper extends BaseScraper {
  /**
   * Grabs and returns the directions for a recipe
   * @returns An array of strings corresponding to the recipe's steps
   */
  getRecipe() {
    const recipeNodeList = document.querySelectorAll(
      ".recipe-directions__list li span"
    );

    const recipeSteps = Array.from(recipeNodeList);
    return recipeSteps.map(({ innerHTML }) =>
      innerHTML.replace("↵", "").trim()
    );
  }

  /**
   * Gets all ingredients from .list-ingredients-x
   * There can be more than one list
   * @returns {Array} All the ingredients in a recipe
   */
  getIngredients() {
    /**
     * Queries DOM for a
     * @param {Number} listNumber - the number of the list currently being sought
     */
    function getIngredientList(listNumber) {
      const ingredientsNodeList = document.querySelectorAll(
        `.list-ingredients-${listNumber} li span`
      );
      return Array.from(ingredientsNodeList);
    }

    let allIngredients = [];
    let ingredientListCount = 1;
    let ingredients = getIngredientList(ingredientListCount);

    while (ingredients.length > 0) {
      allIngredients = [
        ...allIngredients,
        ...ingredients
          .filter(
            ({ innerHTML }) => innerHTML.toLowerCase().indexOf("add all") === -1
          )
          .map(({ innerHTML }) => innerHTML.trim())
      ];
      ingredientListCount += 1;
      ingredients = getIngredientList(ingredientListCount);
    }
    return allIngredients;
  }
  getMeta() {}
}

export default AllRecipesScraper;
