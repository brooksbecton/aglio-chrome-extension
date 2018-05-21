import React, { Component } from "react";

import SaveRecipeButton from "./components/SaveRecipeButton";
import RecipeDetails from "./components/RecipeDetails";
import ScraperFactory from "./lib/scrapers/ScraperFactory";
/** Wrapper for application */
class App extends Component {
  /** Creates an instance of ScraperFactory and attaches it to component */
  constructor() {
    super();

    this.state = {
      recipe: {},
      recipeLoaded: false
    };
    this.scraperFactory = new ScraperFactory();
  }

  /**
   * Creates a scraper for the user's current page and parses
   * data from it.
   */
  scrapePageRecipe = async () => {
    const scraper = await this.scraperFactory.create();
    const recipe = await scraper.run();
    this.setState({ recipe, recipeLoaded: true });
  };

  render() {
    return (
      <div style={{ "width": "600px" }
      }>
        {!this.state.recipeLoaded && <SaveRecipeButton scrapePageRecipe={this.scrapePageRecipe} />}
        {
          this.state.recipeLoaded && (
            <RecipeDetails recipe={this.state.recipe} />
          )
        }
        <div className="recipeHtml" />
      </div >
    );
  }
}

export default App;
