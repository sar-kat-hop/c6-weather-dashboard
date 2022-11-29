var APIKey = "62eb98c3ab74f9534ab6935d0569a051";
var city;
// var state;
// var zip; 
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

//desired fxnality:
//user types city name
//matching cities suggested as user types, user clicks one to select (?)
//user enters city name, city name is matched against JSON library of city IDs
//api pulls city's 5-day forecast, displays each day in separate card (or list?)

//TODO: link api key
//TODO: on page load, display user's default location's weather forecast (?)
//TODO: add functionality to city search bar to suggest cities
//TODO: write fxn to pull, display, and save weather data to local storage once city is selected

//pseudocode
//save user input to var city
//match var city to city ID/name in city list.JSON
//fetch/call api for city's 5-day forecast (date, icon representing conditions, temperature, wind, humidity)
//render 5-day forecast on page
//save rendered data to local storage, load on refresh
//add city to search history (save to local storage), display history somewhere on page