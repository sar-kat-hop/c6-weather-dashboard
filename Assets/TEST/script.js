var myKey = "";
var form = document.getElementById("search-form");
var input = document.getElementById("search-input");
var weatherDiv = document.getElementById("weather");

function getCoordinates(city) {
    var GEO_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${myKey}`;
    var response = fetch(GEO_URL);
    var data = response.json();
    var { lat, lon } = data[0];

    return {lat, lon };
};

function getCurrentWeather(lat, lon) {
    var URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${myKey}&units=metric`;
    var response = fetch(URL);
    var data = response.json();
    var { temp, description } = data.current.weather[0];
    var { timezone } = data;
    
    return { temp, description, timezone };
};

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var city = input.ariaValueMax;

    getCoordinates(city)
        .then(function(coords) {
            return getCurrentWeather(coords.lat, coords.lon);
        })
        .then(function(data) {
            var {temp, description, timezone} = data;
            weatherDiv.innerHTML = `The temperature in ${city} (${timezone}) is ${temp}°C and the weather is ${description}.`;
        });
    });
