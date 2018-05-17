import ScraperFactory from "./index";
import AllRecipeScraper from "./../AllRecipesScraper";
describe("ScraperFactory", () => {
  it("gets hostname from url", () => {
    const testScraper = new ScraperFactory();

    expect(
      testScraper.getHostname("https://github.com/lifaon74/url-polyfill")
    ).toBe("github.com");
  });

  it("gets returns an instance of 'AllRecipeScraper' for an allrecipe URL", async () => {
    const testScraper = new ScraperFactory();
    testScraper.getCurrentTab = jest.fn(() => {
      return {
        url:
          "https://www.allrecipes.com/recipe/220854/chef-johns-italian-meatballs/"
      };
    });
    expect.assertions(1);

    expect(await testScraper.create()).toBeInstanceOf(AllRecipeScraper);
  });

  it("throws an error if it does not have a scraper for a given url", async () => {
    const testScraper = new ScraperFactory();

    testScraper.getCurrentTab = jest.fn(() => {
      return new Promise(resolve => {
        resolve({
          url: "https://facebook.github.io/jest/docs/en/asynchronous.html"
        });
      });
    });
    try {
      await testScraper.create();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });
});
