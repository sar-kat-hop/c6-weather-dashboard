var myKey = "62eb98c3ab74f9534ab6935d0569a051";
var form = document.getElementById("search-form");
var input = document.getElementById("city-input");
var weatherDiv = document.getElementById("weather");

function getCoordinates(city) {
    var GEO_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myKey}`;

    return fetch(GEO_URL)
        .then(function(response) {
            if (!response.ok) {
                throw error("Couldn't fetch coordinates.");
            }
            return response.json();
        })
        .then(function(data) {
            if (data.length === 0) {
                throw error("Couldn't find location. Please try again.");
            }
            return {
                lat: data[0].lat,
                lon: data[0].lon
            };
        });
};

function getCurrentWeather(lat, lon) {
    var URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${myKey}&units=metric`;

    
};

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var city = input.value;

    getCoordinates(city)
        .then(function(coords) {
            return getCurrentWeather(coords.lat, coords.lon);
        })
        .then(function(data) {
            var {temp, description, timezone} = data;
            weatherDiv.innerHTML = `The temperature in ${city} (${timezone}) is ${temp}°C and the weather is ${description}.`;
        });
    });
