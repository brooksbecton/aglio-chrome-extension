/** Interface for Getting and parsing HTML for recipes */
class BaseScrape {
  constructor() {
    this.html = "";
  }

  getHTML() {}
  getRecipe() {}
  getIngredients() {}
  getMeta() {}
}

export default BaseScrape;
