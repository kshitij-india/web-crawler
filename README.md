# web-crawler
A web-crawler written in NodeJS which crawls a given url and exports all the internal, external links and image paths to JSON and text files.

## Installation ##
To install, first clone the repository and install the npm modules.
```bash
git clone https://github.com/kshitij-india/web-crawler.git
npm install
```
## Getting Started ##
Start the server using `npm start` command
```bash
npm start
```
The program will crawl the website https://www.wiprodigital.com by default. The default url can be changed by changing the constant `url` in `crawler.js` file.

The program will scan for internal, external links and image url's. It will save the site map in text and JSON files. The files will be saved at `siteMap/siteMap.txt` and `siteMap/siteMap.json`.

Success message will be printed on the terminal after successful saving. In situations where network connectivity is not proper and the application is not able to crawl, appropriate error message will be printed on the terminal.

## Unit Testing ##
Unit test cases are written in mocha and chai. They are located in `test` directory.
To start the testing environment, do:
```bash
npm test
```
