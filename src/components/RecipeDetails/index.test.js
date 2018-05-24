import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import RecipeDetails from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("RecipeDetails", () => {
  const testRecipe = {
    ingredients: ["5 dozen eggs"],
    recipe: ["Put all eggs into bowl", "Mix them well", "See what you get"],
    meta: { cookTime: "2h 5m" }
  };

  const mockUpdateRecipe = jest.fn();

  it("matches snapshot", () => {
    const tree = shallow(
      <RecipeDetails recipe={testRecipe} updateRecipe={mockUpdateRecipe} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("has an edit button for each item in the recipe ", () => {
    const tree = mount(
      <RecipeDetails recipe={testRecipe} updateRecipe={mockUpdateRecipe} />
    );

    expect(tree.find(".editItem").length).toBe(
      testRecipe.recipe.length + testRecipe.ingredients.length
    );
  });

  it("openEditItem() adds instruction index to state", () => {
    const tree = shallow(
      <RecipeDetails recipe={testRecipe} updateRecipe={mockUpdateRecipe} />
    );
    const instructionIndex = 2;
    // Opening the first recipe instruction
    tree.instance().openEditItem(instructionIndex, "recipe");

    expect(tree.state().recipe.has(instructionIndex)).toBe(true);
  });
});
