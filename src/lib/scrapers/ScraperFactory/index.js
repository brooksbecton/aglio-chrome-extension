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
   * @throws Will throw an error if it doesn't have a scraper for a url
   * @returns {Function} A Child
   */
  async create() {
    const tab = await this.getCurrentTab();
    const hostname = this.getHostname(tab.url);

    if (this.contains(hostname, "allrecipes")) {
      return new AllRecipesScraper(tab.url);
    } else {
      throw new Error(`No Scraper for ${hostname}`);
    }
  }
  /**
   * Gets the user's current page {@link https://developer.chrome.com/extensions/tabs#type-Tab | tab }
   * Using {@link https://developer.chrome.com/extensions/tabs#method-getCurrent | getCurrent}
   *
   * @returns {Promise} user's current tab
   */
  getCurrentTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (tabs.length > 0) {
          resolve(tabs[0]);
        } else {
          reject(new Error("No Tab Found"));
        }
      });
    });
  }

  /**
   * Parses and returns hostname from a given URL
   *
   * @param {String} qUrl
   * @returns {String} hostname of the given URL
   */
  getHostname(qUrl) {
    let hostname;
    try {
      const url = new URL(String(qUrl));
      hostname = url.hostname;
    } catch (err) {
      throw new Error(`${qUrl} is not a valid URL - ${err}`);
    }
    return hostname;
  }
}

export default ScraperFactory;
