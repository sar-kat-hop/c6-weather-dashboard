var myKey = "24d6dabc28b4faa4bf2a0df1923872d5";
var form = document.getElementById("search-form");
var input = document.getElementById("city-input");
var btn = document.getElementById("search-btn");
// var city = input.value;
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

            console.log(data);
            console.log(data[0].lat, data[0].lon); 

            return { lat: data[0].lat, lon: data[0].lon };
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
            // console.log(data.list[0]);

            var forecast = [];

            for (let i = 0; i < data.length; i += 8) {  //OpenWeather returns forecast data for every 3 hours. i += 8 skips over 8 items it'll return for the 5-day forecast so we only get the by-day info we're looking for. This loop adds 8 to i every iteration, processingly only for every 24 hours (8*3 = 24).
                var forecastDay = {
                    date: data.list[0].dt_txt,
                    temp: data.list[0].main.temp,
                    wind: data.list[0].wind.speed,
                    humidity: data.list[0].main.humidity,
                };
                forecast.push(forecastDay);
            }
            console.log(forecast);
            return forecast;
        });
};

function renderWeather(currentWeather, forecast) {
    var currentWeatherDiv = document.getElementById("current-weather");
    // var currentWeatherHead = document.getElementById("current-header");
    var forecastHeader = document.getElementById("forecast-header"); 
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
        dailyForecastContent = `
            <div class="card">
                // <h4> ${forecast[i].date} </h4> 
                // <ul>
                //     <li> Temp: ${forecast[i].temp} F </li>
                //     <li> Wind: ${forecast[i].wind} mph </li>
                //     <li> Humidity: ${forecast[i].humidity} % </li>
                // </ul>
            </div>
        `;

        forecastDiv.innerHTML = dailyForecastContent;
    };
};

// event listeners for form submit 
function handleSearch(event) {
    event.preventDefault(); 

    //call getCoordinates
        //extract lat and lon from getCoordinates result
    //pass lat and lon to getCurrentWeather
        //extract current weather data from result
    //pass lat and lon to getForecast
        //extract forecast data from result
    //pass current weather data and forecast data to renderWeather

    var city = input.value;

    if (!city) {
        console.error("No city entered or city not found. Please try again.");
        return;
    }
    getCoordinates(city)
        .then(function(result) { //this returns lat and lon
            console.log(result);

            return Promise.all([getCurrentWeather(result.lat, result.lon), get5DayForecast(result.lat, result.lon)]) //not sure if I need to pass in lat, lon as args here since they're passed in to the fxns themselves above
        })
        .then(function([currentWeather], [forecast]) {
            //call renderWeather here
            renderWeather(currentWeather, forecast);
        })
        .catch(function(error) {
            console.log("Error caught in handleSearch(). " + error);
        });
};





// I cannot get this to work. Issues with passing the coordinates to getCurrentWeather and getForecast, and then passing those results to renderWeather.
// function handleSearch(event) {
//     event.preventDefault();

//     // get coords
//     var city = input.value;
//     var coords = getCoordinates(city);
    
//     // get current weather and forecast by passing coordinates in to fxns correctly

//     coords
//     .then(function(coordinates) {
//             var currentWeather = getCurrentWeather(coordinates.lat, coordinates.lon);
//             var forecast = get5DayForecast(coordinates.lat, coordinates.lon);
            
            // Promise.all([getCurrentWeather(coordinates), get5DayForecast(coordinates)])
            //     .then(function([currentWeather, forecast]) {
            //         console.log(currentWeather, forecast);
                    //resolve promises so renderWeather can be called and have the right data passed to it 
                    // return renderWeather(currentWeather, forecast);
                // });

            // console.log(coordinates); //confirmed coordinates are being fetched correctly

            //these are being logged as pending promises ... need to fix fxn to use .then
                // console.log(currentWeather);
                // console.log(forecast);


            //currentWeather and forecast aren't being defined properly by calling them (I think...)

                // return { currentWeather, forecast };
                // return renderWeather(currentWeather, forecast);
        // })
        // .then(function([currentWeather, forecast]) {
        //     //render weather on page
        //     renderWeather(currentWeather, forecast);
        // })
        // .catch(function(error) {
        //     console.log("Error encountered in handleSearch(): " + error);
        // });
// };

form.addEventListener("submit", handleSearch);
// btn.addEventListener("click", handleSearch);

// old event listeners that don't work together. Only current weather worked.
// form.addEventListener("submit", function(event) {
//     event.preventDefault();

//     var city = input.value;

//     if (!city) {
//         return Error("No city entered or found. Please try again.");
//     } else {
//         getCoordinates(city)
//             .then(function(coords) {
//                 return getCurrentWeather(coords.lat, coords.lon);
//             })
//             .then(function(currentWeather) {
//                 renderWeather(currentWeather);
//             })
//             .catch(function(error) {
//                 console.log("Error: could not get coordinates for current weather. " + error);
//             });
//     };
// });

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