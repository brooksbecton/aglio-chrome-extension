/*global chrome*/

import AllRecipesScraper from "./../AllRecipesScraper";

/** Creates an appropriate scraper for a given url */
class ScraperFactory {
  /**
   * Searches for sub-string and returns true if testStr contains it
   * @param {String} testStr the string to look through
   * @param {String} searchStr the query to be searched for
   */
  contains(testStr, searchStr) {
    return testStr.indexOf(searchStr) > -1;
  }

  /**
   * Creates an instance of a scraper based on the url supplied
   * @async
   * @param {String} url
   */
  async create(url) {
    const tab = await this.getCurrentTab();
    const hostname = this.getHostname(tab.url);

    switch (hostname) {
      case this.contains(hostname, "allrecipes"):
        return new AllRecipesScraper(tab.url);
    }
  }
  /**
   * Gets the user's current page {@link https://developer.chrome.com/extensions/tabs#type-Tab | tab }
   *
   * @returns {Object} user's current tab
   */
  getCurrentTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.getCurrent(tab => resolve(tab));
    });
  }

  /**
   * Parses and returns hostname from a given URL
   *
   * @param {String} qUrl
   * @returns {String} hostname of the given URL
   */
  getHostname(qUrl) {
    const { hostname } = new URL(qUrl);
    return hostname;
  }
}

export default ScraperFactory;
