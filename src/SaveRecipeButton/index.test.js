import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SaveRecipeButton from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("SaveRecipeButton", () => {
  it("matches snapshot", () => {
    const tree = shallow(<SaveRecipeButton />);
    expect(tree).toMatchSnapshot();
  });

  it("has a button to click", () => {
    const tree = shallow(<SaveRecipeButton />);
    expect(tree.find("button").length).toBe(1);
  });

  it("calls saveRecipe() when button is clicked", () => {
    const tree = shallow(<SaveRecipeButton />);
    const mockSaveRecipe = jest.fn();
    tree.instance().saveRecipe = mockSaveRecipe;
    tree.find("button").simulate("click");
    expect(mockSaveRecipe).toHaveBeenCalled();
  });

  it("displays error", () => {
    const errorMessage = "BAM!";
    const tree = shallow(<SaveRecipeButton />);
    tree.setState({ saveError: errorMessage });

    expect(tree.find("p").text()).toBe(errorMessage);
  });

  it("displayError() sets 'saveError' state", () => {
    const errorMessage = "asdfasdfasdf";
    const tree = shallow(<SaveRecipeButton />);
    tree.instance().displayError(errorMessage);

    expect(tree.state().saveError).toBe(errorMessage);
  });
});
