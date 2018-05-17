import React, { Component } from "react";

import SaveRecipeButton from "./SaveRecipeButton";
import ScraperFactory from "./lib/scrapers/ScraperFactory";
/** Wrapper for application */
class App extends Component {
  /** Creates an instance of ScraperFactory and attaches it to component */
  constructor() {
    super();
    this.scraperFactory = new ScraperFactory();
  }

  /**
   * Creates a scraper for the user's current page and parses
   * data from it.
   */
  scrapePageRecipe = async () => {
    const scraper = await this.scraperFactory.create();
    await scraper.run();
  };

  render() {
    return (
      <div>
        <SaveRecipeButton scrapePageRecipe={this.scrapePageRecipe} />
        <div className="recipeHtml" />
      </div>
    );
  }
}

export default App;
