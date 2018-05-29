import React from "react";
import Enzyme, { mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {
  it("matches recipe loaded snapshot", () => {
    const tree = shallow(<App />);

    tree.setState({
      saveSuccess: false,
      recipeLoaded: true,
      recipe: {
        recipe: ["eat", "sleep", "code"],
        ingredients: ["JavaScript", "vscode", "jest"],
        meta: {
          cookTime: "24h 60m"
        }
      },
      scrapeError: null
    });

    expect(tree).toMatchSnapshot();
  });

  it("matches save success snapshot", () => {
    const tree = shallow(<App />);

    tree.setState({
      saveSuccess: true
    });

    expect(tree).toMatchSnapshot();
  });

  it("matches 'No Scraper' snapshot", () => {
    const tree = shallow(<App />);

    tree.setState({
      saveSuccess: null,
      recipeLoaded: null,
      scrapeError: "Jest offers no recipes!"
    });

    expect(tree).toMatchSnapshot();
  });
});
