var myKey = "62eb98c3ab74f9534ab6935d0569a051";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myKey;
var geocoder; 
//this uses open weather's geocoder api, which will match city name, state, and country code:
    //http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var requestURL = "http://api.openweathermap.org/data/2.5/weather";

var city = document.querySelector("#city-search").value;

//will need state, country code to get coordinates using geocoder
var state;
var country;  
var coords; 

var recent = [];

var searchInput = $("[id=city-search]").val();
var searchBtn = $("[id=searchBtn]");
var clearBtn = $("[id=clear-button]");
var searchHistory = $("[id=search-history");
var searchList = $("ul[id=recent-list]");
var weatherContainer = $("div[id^=day]");

$(document).ready(function() {
    let history = document.querySelector("#recent-list");
    let showHistory = JSON.stringify(localStorage);
    $(searchHistory).addClass("list-group list-group-flush");
    history.append(showHistory);
});

$.ajax({
    url: requestURL,
    method: "GET",
}).then(function(response) {
    return response;
}).then(function(data) {
    for (i = 0; i < data.length; i++) {
        var listItem = document.createElement("li");
        listItem.textContent = data[i]; //drill down further once desired info identified
        searchList.appendChild(listItem);
    }   
});

$(function showHistory() {
    if (localStorage != 0) {
        searchHistory.addClass("search-history-visible");
    }
});

$(function btnEventListener() {
    searchBtn.click(function(event) {
        event.preventDefault();
    })
});

searchBtn.addEventListener("click", getApi);

$(function clearHistory() {
    clearBtn.click(function() {
        localStorage.clear();
        searchHistory.children().text("");
    })
});

$(function saveMe() {
    searchBtn.click(function() {        
        if (newCity != 0) {
            var newCity = document.querySelector("#city-search").value; //can't figure out how to get value using jQuery
            
            recent.push(newCity); //push newly entered city to array 'recent'

            localStorage.setItem("cityNames", recent);

            // localStorage.setItem(newCity); //add newly entered city to local storage
            // localStorage.getItem(newCity);
            //parse array
            //display array as individual list items
        }
        // function getData();
    })
    // return newCity, recent;
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