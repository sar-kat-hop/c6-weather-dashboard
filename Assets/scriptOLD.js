$(() => {
    var myKey = "62eb98c3ab74f9534ab6935d0569a051";
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=";
    var geoURL = "https://api.openweathermap.org/geo/1.0/direct?q=";

    var requestURL = weatherURL + lat + "&lon=" + lon + "&appid=" + myKey;

    var searchBar = $('#city-search');
    var city = searchBar('input').val().trim();
    var searchBtn = $('#search-btn');
    var searchHistory = $('#history');

    var todaysWeatherEl = $('#today');
    var forecastEl = $('#forecast').children().eq(1);

    function showWeather(weather, El) {
        if (El.attri('id') === 'today') {

            var iconLoc = "https://openweathermap.org/img/w" + weather.weather[0].icon + ".png";

            El.children().eq(0).text(weather.name + ' ' + dayjs(weather.dt * 1000).format('MM/DD/YYY'));
            El.children().eq(1).attri('src', iconLoc);
            El.children().eq(2).text('Temp: ' + weather.main.temp + 'F');
            El.children().eq(3).text('Wind: ' + weather.main.speed + 'mph');
            El.children().eq(4).text('Humid.: ' + weather.main.humidity + '%');

        } else {

            var iconLoc = "https://openweathermap.org/img/w/" + weather.icon + ".png";

            El.children().eq(0).text(dayjs(weather.date * 1000).format('MM/DD/YYYY'));
            El.children().eq(1).attri('src', iconLoc);
            El.children().eq(2).text('Temp: ' + weather.temp + 'F');
            El.children().eq(3).text('Wind: ' + weather.speed + 'mph');
            El.children().eq(4).text('Humid.: ' + weather.humidity + '%');
        }
    };

    //fetch reqs
    // fetch lat and lon of city
    function getLoc(city) {
        var requestGeo = geoURL + city + "&limit=1&appid=" + myKey;

        fetch(requestGeo).then(function(res) {
            return res.json();
        })
        .then(function(data) {
            getWeatherToday(data[0].lat, data[0].lon);
            getForecast(data[0].lat, data[0].lon);
        });
    };

    //fetch today's weather
    function getWeatherToday(lat, lon) {
        fetch(requestURL).then(function (res) {
            return res.json();
        })
        .then(function(data) {
            showWeather(data, todaysWeatherEl);
        });
    };

    //fetch forecast
    function getForecast(lat, lon) {
        fetch(requestURL).then(function (res) {
            return res.json();
        })
        .then(function(data) {
            var forecast = data.list;
            for (var i = 0; i < 5; i++) {
                showWeather(forecast[x], forecastEl.children().eq(x));
            };
        });
    };

    //event listeners
    searchBar.submit(function (event) {
        event.preventDefault();
            if (!city) {
                return;
            } else {
                getLoc(city);
            }
    });

    searchBtn.click(function(event) {
        event.preventDefault();
            if (!city) {
                return;
            } else {
                getLoc(city);
            }
        });
});


// outdated, non-functioning code... keeping for ref during refactor

// var recent = [];

// var searchInput = $("[id=city-search]").val();
// var searchBtn = $("[id=searchBtn]");
// var clearBtn = $("[id=clear-button]");
// var searchHistory = $("[id=search-history");
// var searchList = $("ul[id=recent-list]");
// var weatherContainer = $("div[id^=day]");

// $(document).ready(function() {
//     let history = document.querySelector("#recent-list");
//     let showHistory = JSON.stringify(localStorage);
//     $(searchHistory).addClass("list-group list-group-flush");
//     history.append(showHistory);
// });

// $.ajax({
//     url: requestURL,
//     method: "GET",
// }).then(function(response) {
//     return response;
// }).then(function(data) {
//     for (i = 0; i < data.length; i++) {
//         var listItem = document.createElement("li");
//         listItem.textContent = data[i]; //drill down further once desired info identified
//         searchList.appendChild(listItem);
//     }   
// });

// $(function showHistory() {
//     if (localStorage != 0) {
//         searchHistory.addClass("search-history-visible");
//     }
// });

// searchBtn.addEventListener("click", getApi);

// $(function clearHistory() {
//     clearBtn.click(function() {
//         localStorage.clear();
//         searchHistory.children().text("");
//     })
// });

// $(function saveMe() {
//     searchBtn.click(function() {        
//         if (newCity != 0) {
//             var newCity = document.querySelector("#city-search").value; //can't figure out how to get value using jQuery
            
//             // recent.push(newCity); //push newly entered city to array 'recent'

//             // localStorage.setItem("cityNames", recent);

//             // localStorage.setItem(newCity); //add newly entered city to local storage
//             // localStorage.getItem(newCity);
//             //parse array
//             //display array as individual list items
//         }
//         // function getData();
//     })
//     // return newCity, recent;
// });

//save up to 3 most recently searched cities 
// $(function trimRecent() {
//     if (recent.length > 3) {
//         recent.slice(0, 3);
//     }
//     // return recent;
// });

// searchBtn.onclick = function() {
//     var newCity = searchInput.value; 
//     recent.push(newCity);
//     localStorage.setItem(recent, newCity);
//     console.log(recent, localStorage);
// };

// function renderRecent() {
//     if (recent.length != 0) {
//         localStorage.getItem();
//         searchHistoryList.appendChild(recent, listItem);
//     }
// }

//desired fxnality:
//user types city name
//matching cities suggested as user types, user clicks one to select (?)
//user enters city name, city name is matched against JSON library of city IDs
//api pulls city's 5-day forecast, displays each day in separate card (or list?)




//TODO:
//link api key
//on page load, display user's default location's weather forecast?
//add functionality to city search bar to suggest cities?
//write fxn to pull, display, and save weather data to local storage once city is selected
//write fxn to only show cards if there is content to append to them, otherwise keep them hidden

//save user input to var city
//match var city to city ID/name in city list.JSON (or use geocoder API to get coordinates)
//fetch/call api for city's 5-day forecast (date, icon representing conditions, temperature, wind, humidity)
//render 5-day forecast on page
//save data to local storage, load on refresh
//add city to search history (save to local storage), display history somewhere on page