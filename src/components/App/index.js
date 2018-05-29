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

  closeExtension() {
    window.close();
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
   * @async
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

  /**
   * Updates state.recipe to the newRecipe param
   * @param {Object} - recipe
   */
  updateRecipe = newRecipe => {
    this.setState({ recipe: newRecipe });
  };

  /**
   * Renders state.scrapeError if there is an error
   */
  renderScrapeError() {
    if (this.state.scrapeError) {
      return (
        <div className="center">
          <h1>Error</h1>
          <p>{this.state.scrapeError}</p>
        </div>
      );
    }
  }

  /**
   * Renders save success message if state.saveSuccess is truthy
   */
  renderSaveSuccess() {
    if (this.state.saveSuccess) {
      return (
        <div className="center">
          <h1>Save Success</h1>
          <Button bsStyle="primary" onClick={() => this.closeExtension()}>
            Close
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="mainContainer">
        {this.renderScrapeError()}
        {this.renderSaveSuccess()}

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
        <div className="recipeHtml" />
      </div>
    );
  }
}

export default App;
