import React, { Component } from "react";

import SaveRecipeButton from "./SaveRecipeButton";
import ScraperFactory from "./lib/scrapers/ScraperFactory";
/** Wrapper for application */
class App extends Component {
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
    scraper.getHTML();
  };

  render() {
    return (
      <div>
        <SaveRecipeButton scrapePageRecipe={this.scrapePageRecipe} />
      </div>
    );
  }
}

export default App;
