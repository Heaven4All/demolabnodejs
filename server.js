const express = require('express')
const https = require('https')
const bodyParser = require('body-parser')
const exec = require("child_process").exec;
require('dotenv').config();
// Fixit 
const fs = require('fs');


const app = express()

// telling my app to use ejs as the default template engine
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
  extended: true
}))

// code to serve the static files
app.use(express.static("public"))

app.get('/', (req, res) => {
  res.render('index', { data: '' });
})

app.post('/', (req, res) => {
  const location = req.body.location ? req.body.location : "Lyon";
  const appId = process.env.APIKEY;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&APPID=" + appId + "&units=metric";

  //exec(`echo ${location} >> log.txt`, function (error, stdout, stderr) {
  //  console.dir(stdout);
  //})
  
  fs.writeFile('logs.txt', location, function (err) {
	  if (err) return console.log(err);
	  console.log('New city search logged');
  });


  https.get(url, (response) => {
    if (response.statusCode === 200) {
      response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        res.render('index', { data: weatherData });
      })
    } else {
      res.render('index', { data: "0" })
    }
  })
})

app.listen(process.env.PORT || 3000)