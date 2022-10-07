const PORT = 8000; // const variable for the port being used
//const variables for the require statements needed to use each npm package
const axios = require("axios"); // Promise based HTTP client for the browser and node.js
const cheerio = require("cheerio"); //Fast, flexible & lean implementation of core jQuery designed specifically for the server.
const express = require("express"); // Fast, unopinionated, minimalist web framework for node.

const app = express(); //makes an express app and put
const url = "https://www.theguardian.com"; // const variable for the url

axios(url) //GET is the default action for axios so no need to write axios.get; getting the data from url
  .then((response) => {
    // every action will have a then and a catch for error handling
    const html = response.data; // if succesful, data from the response will be in a const variable name html
    const $ = cheerio.load(html); // loading the html
    const articles = []; // making an array

    $(".fc-item__title", html).each(function () {
      // for each "fc-item__title" class in the html(for every article title)
      const title = $(this).text(); // title variable will equal text from this class
      const url = $(this).find("a").attr("href"); //find the "a" tag with the href attribute and make the url variable equal to that
      articles.push({
        // push the title and url for each article into the array
        title,
        url,
      });
    });
    console.log(articles); //log the array of article titles and urls
  })
  .catch((err = console.log("err"))); // if error log out "err"

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}.`)); // listen for the port and log "Server runninng ... "
