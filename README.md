# Aglio Browser Extension

Extension for getting clean recipe data from sites to later be used in another site.

## Getting Started

After adding the extension, you should be able to sign into the extension and click the "Save" button. This will pull the current pages source and pull out the recipe, ingredients, and other data to be stored.

### Prerequisites

* NodeJS

### Installing

#### Download Source

1.  `git clone git@github.com:brooksbecton/aglio-chrome-extension.git`
1.  `cd aglio-chrome-extension`
1.  `npm i`
1.  `npm start`

#### Build Extension

`npm run build`

#### Add to chrome

1.  go to [chrome://extensions](chrome://extensions/)
1.  Turn on Developer Mode
1.  drag `build` folder onto chrome

## Running the tests

`npm test`

## Built With

* [create-react-app](https://github.com/facebook/create-react-app)
* [Firebase](https://firebase.google.com/)

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/brooksbecton/aglio-chrome-extension/tags).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
