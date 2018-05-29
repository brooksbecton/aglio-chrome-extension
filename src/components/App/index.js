import React, { Component } from "react";
import Button from "react-bootstrap/lib/Button";

import "./index.css";
import RecipeDetails from "./../RecipeDetails";
import ScraperFactory from "./../../lib/scrapers/ScraperFactory";
import Recipe from "./../../lib/models/Recipe";

/** Wrapper for application */
class App extends Component {
  /** Creates an instance of ScraperFactory and attaches it to component */
  constructor() {
    super();
    this.state = {
      recipe: {},
      recipeLoaded: false,
      saveSuccess: null,
      saveError: null,
      scrapeError: null
    };
    this.recipeModel = new Recipe();
    this.scraperFactory = new ScraperFactory();
  }

  componentDidMount() {
    /** Scrapes the page when the extension is opened */
    this.scrapePageRecipe();
  }

  /**
   * Save the component's state to the database
   * @async
   */
  saveRecipe = async () => {
    const { recipe } = this.state;
    try {
      await this.recipeModel.insert(recipe);
      this.setState({ saveSuccess: true });
    } catch (err) {
      this.setState({ saveSuccess: false, saveError: err });
    }
  };

  /**
   * Creates a scraper for the user's current page and parses
   * data from it.
   */
  scrapePageRecipe = async () => {
    let scraper;
    try {
      scraper = await this.scraperFactory.create();
      const recipe = await scraper.run();
      this.setState({ recipe, recipeLoaded: true });
    } catch (err) {
      this.setState({ scrapeError: err.toString() });
    }
  };

  updateRecipe = newRecipe => {
    console.log(newRecipe);
    this.setState({ recipe: newRecipe });
  };

  renderScrapeError() {
    if (this.state.scrapeError) {
      return (
        <div>
          <h3>Error</h3>
          <p>{this.state.scrapeError}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="mainContainer">
        {this.renderScrapeError()}

        {!this.state.saveSuccess &&
          this.state.recipeLoaded && (
            <div>
              <Button
                bsStyle="success"
                className={["button", "saveButton"]}
                onClick={() => this.saveRecipe()}
              >
                Save
              </Button>
              <br />
              <RecipeDetails
                recipe={this.state.recipe}
                updateRecipe={this.updateRecipe}
              />
            </div>
          )}
        {this.state.saveSuccess && <h1>Save Success</h1>}

        <div className="recipeHtml" />
      </div>
    );
  }
}

export default App;
