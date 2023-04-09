var myKey = "24d6dabc28b4faa4bf2a0df1923872d5";
var form = document.getElementById("search-form");
var input = document.getElementById("city-input");

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

            // console.log("getCoordinates result: " + data);
            console.log(data);

            return {
                lat: data[0].lat,
                lon: data[0].lon
            };
        });
};

// 45.4871723
// -122.80378

function getCurrentWeather(lat, lon) {

    var URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`;

    // var URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}$units=imperial`;

    return fetch(URL)
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw Error("Couldn't fetch weather.");
            }
        })
        .then(function(data) {
            var currentWeather = {
                temp: data.main.temp,
                wind: data.wind.speed,
                humidity: data.main.humidity
            }
            return currentWeather;
        });
};

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//5-day forecast info:
// list.main.temp, list.main.humidity, list.weather.icon, list.wind.speed
// index 0 in list is today's date, index 8 is the next day, & so forth. One possibility is to grab only the specific days... 8, 16, 24, 32, 40

function getForecast(lat, lon) {
    var URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${myKey}&units=imperial`;

    //5-day forecast
    return fetch(URL)
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                throw Error("Couldn't fetch weather forecast.");
            }
        })
        .then(function(data) {

            console.log(data); 
            console.log(data.list[0].dt_txt);
            console.log(data.list[0].main.temp);
            console.log(data.list[0].wind.speed);
            console.log(data.list[0].main.humidity);

            var forecast = [];

            for ( let i = 0; i < data.list.length && i < 8 * 5; i += 8) { //start at index 8, since 0-7 are for current day, and skip every 8 indices. Stop after 5 iterations, collecting info for 5 days.
                var forecastDay = {
                    date: data.list[i].dt_txt,
                    temp: data.list[i].main.temp,
                    wind: data.list[i].wind.speed,
                    humidity: data.list[i].main.humidity
                };
                forecast.push(forecastDay);
                }
                console.log(forecast);
                renderForecast(forecast);
        })
        .catch(function(error) {
            console.log("Error caught in getForecast(). " + error);
        });
};

//5-day forecast content rendering
function renderForecast(forecastData) {
    for ( let i = 0; i < forecastData.length; i++) {    //iterate over forecast array to render info to page
        var forecastDiv = document.getElementById("weather-forecast");
        var forecastHeading = document.getElementById("forecast-header");
        forecastHeading.textContent = "5-Day Forecast";
            forecastHeading.setAttribute("class", "fw-light fs-4")

        //make a new div for every forecast day
        dailyForecastCard = document.createElement("div");
        // card.setAttribute()
        forecastCardBody = document.createElement("div");
        forecastCardBody.innerHTML = `
            <h4>Date: ${forecastData[i].date} </h4>
            <img src="">
                <p>Temp: ${forecastData[i].temp}</p>
                <p>Wind: ${forecastData[i].wind}</p>
                <p>Humidity: ${forecastData[i].humidity}</p>
            <br>
        `;

        dailyForecastCard.appendChild(forecastCardBody);
        dailyForecastCard.setAttribute("class", "border border-light bg-light col p-4 me-2 mb-2")
            forecastDiv.append(dailyForecastCard);
        };
};

//current weather rendering
function renderCurrentWeather(currentWeatherData) {
    
    var currentWeatherDiv = document.getElementById("weather-current");
    var currentWeatherHeading = document.getElementById("current-header");
    // currentWeatherDiv.append(currentWeatherHeading);
    currentWeatherHeading.textContent = "Today's Weather";
        currentWeatherHeading.setAttribute("class", "fw-light fs-4");

    todayCard = document.createElement("div");
    todayCard.setAttribute("class", "p-3 border border-light");
    todayCardBody = document.createElement("div");
    todayCardBody.innerHTML = `
        <img src="">
        <p>Temp: ${currentWeatherData.temp} </p>
        <p>Wind: ${currentWeatherData.wind} </p>
        <p>Humidity: ${currentWeatherData.humidity} </p>
        <hr>
    `;

    todayCard.appendChild(todayCardBody);
        currentWeatherDiv.append(todayCard);        
};

function clearPage() {
    var currentWeatherDiv = document.getElementById("weather-current");
    currentWeatherDiv.empty();

    var forecastDiv = document.getElementById("weather-forecast");
    forecastDiv.empty();

    return;
};

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var city = input.value;

    getCoordinates(city)
        .then(function(coords) {
            return getForecast(coords.lat, coords.lon);
        })        
        .then(function(forecastData) {
            renderForecast(forecastData);
        })
        .catch(function(error) {
            console.log("Error: " + error);
        });

        return;
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var city = input.value;

    getCoordinates(city)
        .then(function(coords) {
            return getCurrentWeather(coords.lat, coords.lon);
        })
        .then(function(currentWeatherData) {
            renderCurrentWeather(currentWeatherData);
        })
        .catch(function(error) {
            console.log("Error: " + error);
        });

        return;
});

// form.addEventListener("submit", function(event) {
//     event.preventDefault();

//     var city = input.value;

//     getCoordinates(city)
//         .then(function(coords) {
//             return getCurrentWeather(coords.lat, coords.lon);
//         })
//         .then(function(data) {
//             var {temp, humidity, wind } = data;
//             weatherDiv.innerHTML = `The temperature in ${city} is ${temp}°F. Humidity is at ${humidity}%. Wind speed is ${wind}mph.`;
//         });
//     });

