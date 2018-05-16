/** Creates an appropriate scraper for a given url */
class ScraperFactory {
  /**
   * Attaches url to classs
   * @param {String} url
   */
  constructor(url) {
    this.url = url;
  }

  create() {
    const hostname = this.getHostname(this.url);
    switch (hostname) {
      case (hostname = "www.allrecipes.com"):
      //Handle allrecipes
    }
  }

  getHostname(qUrl) {
    const { hostname } = new URL(
      "https://www.yahoo.com/?fr=yset_ie_syc_oracle&type=orcl_hpset#page0"
    );
    return hostname;
  }
}

export default ScraperFactory;
