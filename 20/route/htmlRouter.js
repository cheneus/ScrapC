console.log("htmlRouter R")

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

const db = require("../models");
const app = express();


const htmlRouter = express.Router();
htmlRouter.use(bodyParser.urlencoded({ extended: false }));
htmlRouter.use(bodyParser.json());

htmlRouter.route('/')
  .get((req, res, next) => {
    // First, we grab the body of the html with request
    // request("http://happymugcoffee.com/6-roasted-coffee", function(error, response, html) {

    //   const $ = cheerio.load(html);

    //   $("div.product-preview").each(function(i, element) {
    //     var result = {};
    //     result.img = $(element).children('.preview').children().children().attr('src')
    //     result.link = $(element).children('.product-info').children().attr('href');
    //     result.title = $(element).children(".product-info").children('a').text();
    //     // console.log("before db" + JSON.stringify(result))
    //     db.Product.create(result)
    //       .then((dbProduct) => {
    //         // console.log(result)
    //         console.log(dbProduct)
    //         console.log("inserted")
    //       })
    //       .catch(err => res.json(err))
    //   });
    // // .then(()=>{
    // //   console.log("test")
    // });
    // console.log(data)
    res.render("index")
  });

module.exports = htmlRouter
