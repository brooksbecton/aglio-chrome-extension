import { database } from "./../../firebase";

/** Handles DB interactions for Model Recipe */
class Recipe {
  /**
   * Inserts a new recipe into the DB
   * @async
   * @typedef recipe
   * @type {Object}
   * @property {Array} ingredients - Array of Strings representing the ingredients for a recipe
   * @property {Object} meta - Any meta information about the recipe
   * @property {Array} recipeInstructions - Array of Strings representing the recipe
   * @property {String} url - The URL the recipe was pulled form
   * @returns {Promise} - represents the success or failure of the insert
   */
  async insert(recipe) {
    // var provider = new firebase.auth.GoogleAuthProvider();

    // const { user } = await auth.signInWithRedirect(provider);
    // const uid = user.uid;

    return database()
      .ref(`users/${1}/recipes/`)
      .push(recipe);
  }
}
export default Recipe;
