import BaseScraper from "./../BaseScraper";

/**
 * Class representing the web scraper to pull recipe data from a www.allrecipes.com webpage
 * @extends BaseScraper
 */
class AllRecipesScraper extends BaseScraper {
  constructor() {
    super();
  }

  getRecipe() {
    const recipeSteps = document.querySelectorAll(
      ".recipe-directions__list li"
    );
    return recipeSteps.map(({ innerHTML }) => innerHTML);
  }
  /**
   * Gets all ingredients from .list-ingredients-x
   * There can be more than one list
   */
  getIngredients() {
    let allIngredients = [];
    let ingredientListCount = 1;
    const ingredients = document.querySelectorAll(
      `.list-ingredients-${ingredientListCount} li`
    );
    while (ingredients) {
      allIngredients.push(ingredients.map(({ innerHTML }) => innerHTML));
      ingredientListCount += 1;
    }
    return allIngredients;
  }
  getMeta() {}
}

export default AllRecipesScraper;
