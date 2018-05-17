import ScraperFactory from "./index";

describe("ScraperFactory", () => {
  it("gets hostname from url", () => {
    const testScraper = new ScraperFactory();

    expect(
      testScraper.getHostname("https://github.com/lifaon74/url-polyfill")
    ).toBe("github.com");
  });
});
