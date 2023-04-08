var myKey = "24d6dabc28b4faa4bf2a0df1923872d5";
var form = document.getElementById("search-form");
var input = document.getElementById("city-input");
var btn = document.getElementById("search-btn");
// var weatherDiv = document.getElementById("weather");

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
                // lat: data.coord.lat,
                // lon: data.coord.lon
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
            var currentWeather = {
                // date: data.dt_txt,
                temp: data.main.temp,
                wind: data.wind.speed,
                humidity: data.main.humidity,
            };
            // return { temp, wind, humidity };
            return currentWeather;
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
                    // date: data.list[i].dt_txt,
                    temp: data.list[i].main.temp,
                    wind: data.list[i].wind.speed,
                    humidity: data.list[i].main.humidity,
                };
                forecast.push(forecastDay);
            }
            return forecast;
        });
};

function renderWeather(currentWeather, forecast) {
    var currentWeatherDiv = document.getElementById("current-weather");
    // var currentWeatherHead = document.getElementById("current-header");
    // var forecastHeader = document.getElementById("forecast-header"); 
    var forecastDiv = document.getElementById("5day-forecast");

    var currentWeatherContent = `
        <h2 class=""> Current Weather </h2>
        <img src="" alt=""> 
        <ul>
            <li> Temp: ${currentWeather.temp} F </li>
            <li> Wind: ${currentWeather.wind} mph </li>
            <li> Humidity: ${currentWeather.humidity}% </li>
        </ul>
    `;

    currentWeatherDiv.innerHTML = currentWeatherContent;

    forecastHeader.innerHTML = "5-Day Forecast";

    for (i = 0; i < forecast.length; i++) {
        dailyForecastContent += `
            <div class="card">
                <h4> Day ${i+1} </h4> 
                <ul>
                    <li> Temp: ${forecast[i].temp} F </li>
                    <li> Wind: ${forecast[i].wind} mph </li>
                    <li> Humidity: ${forecast[i].humidity} % </li>
                </ul>
            </div>
        `;
    }
    forecastDiv.innerHTML = dailyForecastContent;
};

// event listeners for form submit 
function handleSearch(event) {
    event.preventDefault();

    // get coords
    var city = input.value;
    var coords = getCoordinates(city);
    // var currentWeather = getCurrentWeather(coords.lat, coords.lon);
    // var forecast = get5DayForecast(coords.lat, coords.lon);

    // get current weather and forecast by passing coordinates in to fxns correctly
    coords.then(function(coordinates) {
        return Promise.all([getCurrentWeather(coordinates), get5DayForecast(coordinates)]);
    })
    .then(function([currentWeather, forecast]) {
        //render weather on page
        renderWeather(currentWeather, forecast);
    })
    .catch(function(error) {
        console.log("Error encountered in handleSearch(): " + error);
    });
};

form.addEventListener("submit", handleSearch);
// btn.addEventListener("click", handleSearch);

// old event listeners that don't work together. Only current weather worked.
form.addEventListener("submit", function(event) {
    event.preventDefault();

    var city = input.value;

    if (!city) {
        return Error("No city entered or found. Please try again.");
    } else {
        getCoordinates(city)
            .then(function(coords) {
                return getCurrentWeather(coords.lat, coords.lon);
            })
            .then(function(currentWeather) {
                renderWeather(currentWeather);
            })
            .catch(function(error) {
                console.log("Error: could not get coordinates for current weather. " + error);
            });
    };
});

// form.addEventListener("submit", function(event) {
//     event.preventDefault();
//     var city = input.value;

//     if (!city) {
//         return Error("No city entered or found. Please try again.");
//     } else {
//         getCoordinates(city)
//             .then(function(coords) {
//                 return get5DayForecast(coords.lat, coords.lon);
//             })
//             .then(function(forecast) {
//                 renderWeather(forecast);
//             })
//             .catch(function(error) {
//                 console.log("Error: could not get coordinates for forecast. " + error);
//             });
//     };
// });