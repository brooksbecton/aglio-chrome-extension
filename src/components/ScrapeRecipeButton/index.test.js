import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import SaveRecipeButton from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("SaveRecipeButton", () => {
  it("matches snapshot", () => {
    const tree = shallow(<SaveRecipeButton scrapePageRecipe={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it("has a button to click", () => {
    const tree = mount(<SaveRecipeButton scrapePageRecipe={() => {}} />);
    expect(tree.find("button").length).toBe(1);
  });

  it("calls scrapePageRecipe() when button is clicked", () => {
    const tree = mount(<SaveRecipeButton scrapePageRecipe={() => {}} />);
    const mockSaveRecipe = jest.fn();
    tree.instance().scrapePageRecipe = mockSaveRecipe;
    tree.find("button").simulate("click");
    expect(mockSaveRecipe).toHaveBeenCalled();
  });

  it("displays error", () => {
    const errorMessage = "BAM!";
    const tree = shallow(<SaveRecipeButton scrapePageRecipe={() => {}} />);
    tree.setState({ scrapeError: errorMessage });

    expect(tree.find("p").text()).toBe(errorMessage);
  });

  it("displayError() sets 'scrapeError' state", () => {
    const errorMessage = "asdfasdfasdf";
    const tree = shallow(<SaveRecipeButton scrapePageRecipe={() => {}} />);
    tree.instance().displayError(errorMessage);

    expect(tree.state().scrapeError).toBe(errorMessage);
  });
});
