var myKey = "62eb98c3ab74f9534ab6935d0569a051";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myKey;

var city;
// var state;
// var zip; 
var coords;
var recent = [];

var searchInput = $("[id=city-search]").val();
var searchBtn = $("[id=searchBtn]");
var searchHistory = $("[id=search-history");
var searchList = $("ul[id=recent-list]");
var weatherContainer = $("div[id^=day]");

// console.log($(searchList).textContent);
// console.log((fetch(queryURL)));

$(document).ready(function() {
    document.querySelector("#recent-list");
    $(searchHistory).addClass("search-history-visible");
    // $(searchHistory).append(txt);
    $(searchHistory).addClass("list-group list-group-flush");
});

$(function boop() {
    if (localStorage != 0) {
        console.log("stuff detected");
        $(searchHistory).addClass("search-history-visible");
    }
});

$(function btnEventListener() {
    searchBtn.click(function(event) {
        event.preventDefault();
    })
});

$(function saveMe() {
    searchBtn.click(function() {

        var newCity = document.querySelector("#city-search").value; //can't figure out how to get value using jQuery
        var listItem = document.createElement("li");
        recent.push(newCity);

        if (newCity != 0) {

            localStorage.setItem(recent, newCity);
            console.log(newCity, recent, localStorage);
            
            // $(searchList).append(listItem, newCity);
            // searchList.append(listItem, newCity);
        }
    })
});


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

//this uses open weather's geocoder api, which will match city name, state, and country code
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

//desired fxnality:
//user types city name
//matching cities suggested as user types, user clicks one to select (?)
//user enters city name, city name is matched against JSON library of city IDs
//api pulls city's 5-day forecast, displays each day in separate card (or list?)

//TODO: link api key
//TODO: on page load, display user's default location's weather forecast (?)
//TODO: add functionality to city search bar to suggest cities
//TODO: write fxn to pull, display, and save weather data to local storage once city is selected
//TODO: write fxn to only display cards if there is content to append to them, otherwise hide them

//pseudocode
//save user input to var city
//match var city to city ID/name in city list.JSON
//fetch/call api for city's 5-day forecast (date, icon representing conditions, temperature, wind, humidity)
//render 5-day forecast on page
//save rendered data to local storage, load on refresh
//add city to search history (save to local storage), display history somewhere on page