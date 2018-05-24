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
      recipeLoaded: false
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
      console.error(err);
      this.setState({ saveSuccess: false, saveError: err });
    }
  };

  /**
   * Creates a scraper for the user's current page and parses
   * data from it.
   */
  scrapePageRecipe = async () => {
    const scraper = await this.scraperFactory.create();
    const recipe = await scraper.run();
    this.setState({ recipe, recipeLoaded: true });
  };

  updateRecipe = newRecipe => {
    console.log(newRecipe);
    this.setState({ recipe: newRecipe });
  };

  render() {
    return (
      <div className="mainContainer">
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
