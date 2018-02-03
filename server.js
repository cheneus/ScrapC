const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

// Require all models
const db = require("./models");
const PORT = process.env.PORT ||3000;
// Initialize Express
const app = express();
const scrapeRouter = require('./route/scrapeRouter')
const htmlRouter = require('./route/htmlRouter')
const productRouter = require('./route/productRouter')

// Configure middleware
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: false }));
// Use express.static to serve the public folder as a static directory
// app.use(express.static("public/js"));
app.use(express.static('public'));

const connection = process.env.MONGODB_URI || 'mongodb://localhost/coffee'

mongoose.connect(connection, { useMongoClient: true },
  function(err) {
    if (err) throw err
  })
// .once('mongodb://localhost/coffee', () => { 
//   done(); 
// })
// mongoose.connection.on('error', (err) => {
//   console.warn('err', err)
// });

app.use('/', htmlRouter)
app.use('/scrape', scrapeRouter)
app.use('/product', productRouter)

// app.get('/getCoffee', (req,res,next) => {
request("http://happymugcoffee.com/6-roasted-coffee", function(error, response, html) {

  const $ = cheerio.load(html);

  $("div.product-preview").each(function(i, element) {
    var result = {};
    result.img = $(element).children('.preview').children().children().attr('src')
    result.link = $(element).children('.product-info').children().attr('href');
    result.title = $(element).children(".product-info").children('a').text();
    // result.title = title.replace(/\s+/g, '')
    // console.log("before db" + JSON.stringify(result))
    db.Product.create(result)
      .then((dbProduct) => {
        // console.log(result)
        console.log(dbProduct)
        console.log("inserted")
      })
      .catch((err) => {
        // console.log(err)
        console.log("duplicate")
      })
  });
  //   res.send("Done SC")
  // });

})


// app.listen(PORT, function() {
//   console.log("App running on port " + PORT + "!");
// });

app.listen(PORT, () => {
  console.log(`App running on port ${env}`)
})
