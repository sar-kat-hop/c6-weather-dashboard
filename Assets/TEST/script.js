var myKey = "24d6dabc28b4faa4bf2a0df1923872d5";
var form = document.getElementById("search-form");
var input = document.getElementById("city-input");
// var weatherDiv = document.getElementById("weather");

//vars for creating els and appending weather info to page:
var card = document.createElement("div");
var cardHead = document.createElement("h4");
var cardBody = document.createElement("div");

var tempEl = document.createElement("p");
var windEl = document.createElement("p");
var humidEl = document.createElement("p");
var imgEl = document.createElement("img");


function getCoordinates(city) {
    var GEO_URL = "http://api.openweathermap.org/geo/1.0/direct?q=" + `${city}` + "&limit=1&appid=" + `${myKey}`;

    return fetch(GEO_URL)
        .then(function(response) {
            if (!response.ok) {
                throw Error("Couldn't fetch coordinates.");
            }
            return response.json();
        })
        .then(function(data) {
            if (data.length === 0) {
                throw Error("Couldn't find location. Please try again.");
            }
            return {
                lat: data[0].lat,
                lon: data[0].lon
            };
        });
};

function getCurrentWeather(lat, lon) {
    var URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + `${lat}` + "&lon=" + `${lon}` + "&appid=" + `${myKey}` + "&units=imperial";

    return fetch(URL)
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw Error("Couldn't fetch current weather.");
            }
        })
        .then(function(data) {
            var temp = data.main.temp;
            var wind = data.wind.speed;
            var humidity = data.main.humidity;

            return { temp, wind, humidity };
        });
};

function get5DayForecast(lat, lon) {
    var URL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + `${lat}` + "&lon=" + `${lon}` + "&appid=" + `${myKey}` + "&units=imperial";

    return fetch(URL)
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw Error("Couldn't fetch 5-day forecast.");
            }
        })
        .then(function(data) {
            var forecast = [];

            for (let i = 0; i < data.length; i += 8) {  //OpenWeather returns forecast data for every 3 hours. i += 8 skips over 8 items it'll return for the 5-day forecast so we only get the by-day info we're looking for. This loop adds 8 to i every iteration, processingly only for every 24 hours (8*3 = 24).
                var forecastDay = {
                    date: data.list[i].dt_txt,
                    temp: data.list[i].main.temp,
                    wind: data.list[i].wind.speed,
                    humidity: data.list[i].main.humidity,
                };
                forecast.push(forecastDay);
            }
            return forecast;
        });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var city = input.value;
    
    if (!city) {
        return Error("No city entered or found.");
    }

    getCoordinates(city)
        .then(function(coords) {
            // return Promise.all([getCurrentWeather(coords.lat, coords.lon), get5DayForecast(lat, lon)]);
            return getCurrentWeather(coords.lat, coords.lon);
        })
        .then(function(data) {
            var {temp, humidity, wind } = data;

            var currentWeatherDiv = document.getElementById("current-weather");
            var currentWeatherHead = document.getElementById("current-header");

            
            // weatherDiv.innerHTML = `The temperature in ${city} is ${temp}°F. Humidity is at ${humidity}%. Wind speed is ${wind}mph.`;

        });
    });

    var forecastHeader = document.getElementById("forecast-header"); //to append heading when rendering forecast data
    var forecastDiv = document.getElementById("5day-forecast");


