var myKey = "24d6dabc28b4faa4bf2a0df1923872d5";
var form = document.getElementById("search-form");
var input = document.getElementById("city-input");
var weatherDiv = document.getElementById("weather");

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
                throw Error("Couldn't fetch weather.");
            }
        })
        .then(function(data) {
            var temp = data.main.temp;
            var wind = data.wind.speed;
            var humidity = data.main.humidity;

            return { temp, wind, humidity };
        });
};

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var city = input.value;

    getCoordinates(city)
        .then(function(coords) {
            return getCurrentWeather(coords.lat, coords.lon);
        })
        .then(function(data) {
            var {temp, humidity, wind } = data;
            weatherDiv.innerHTML = `The temperature in ${city} is ${temp}°F. Humidity is at ${humidity}%. Wind speed is ${wind}mph.`;
        });
    });
