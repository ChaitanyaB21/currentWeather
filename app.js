const express = require("express");
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})

app.use(express.static("addons"));


app.set("view engine", "ejs");

app.post("/", function (req, res) {

    const cityName = req.body.city;

    url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=534efee7186f5c02a7bf59945f487636&units=metric"
    https.get(url, function (response) {

        
        if (response.statusMessage === "OK") {
            response.on("data", function (data) {
                const weatherData = JSON.parse(data);

                const temp = weatherData.main.temp;

                const weatherDescription = weatherData.weather[0].description;

                const fellTemp = weatherData.main.feels_like

                const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon +
                    "@2x.png";


                res.render("finalPage", { cityName: cityName, fellTemp: fellTemp, weatherDescription: weatherDescription, icon: icon, temp: temp });


            })
        }else{
            res.sendFile(__dirname + "/Error.html")
            
        }
    });
})

app.post("/views/finalPage.ejs", function (req, res) {
    res.redirect("/");
    
})

app.post("/Error.html" , function(req , res){
    res.redirect("/");
})







app.listen(process.env.PORT || 3000, function () {
    console.log("My server is running as hell on port 3000");
})