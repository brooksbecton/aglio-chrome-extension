import React from "react";
import { link } from "fs";

const RecipeDetails = ({ recipe }) => {
  return (
    <div>
      <h2>{recipe.url}</h2>
      <h2>Recipe</h2>
      <ul>{recipe.recipe.map(step => <li>{step}</li>)}</ul>
      <ul>{recipe.ingredients.map(ingredient => <li>{ingredient}</li>)}</ul>
    </div>
  );
};

export default RecipeDetails;
