console.log("scrapRoute R");

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request')
const cheerio = require("cheerio");

const app = express();
const scrapRouter = express.Router();

scrapRouter.route('/')
  .get((req, res, next) => {
    // First, we grab the body of the html with request
    request("http://happymugcoffee.com/6-roasted-coffee", function(error, response, html) {
      const $ = cheerio.load(html);
      let results = [];

      // Select each element in the HTML body from which you want information.
      // NOTE: Cheerio selectors function similarly to jQuery's selectors,
      // but be sure to visit the package's npm page to see how it works
      $("div.product-preview").each(function(i, element) {

        const img = $(element).children('.preview').children().children().attr('src')
        const link = $(element).children('.product-info').children().attr('href');
        const title = $(element).children(".product-info").children('a').text();
        // console.log(link)
        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
          title: title,
          img: img,
          link: link
        });
      });

      // results.map((x) => {
        // console.log(x.title)
        // console.log(x.img)
        // console.log(x.title)
      // })
      // Log the results once you've looped through each of the elements found with cheerio
      // console.log(results);
      console.log(typeof results);
      res.json("Complete")
    });
  });

module.exports = scrapRouter
