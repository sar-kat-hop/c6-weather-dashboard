var APIKey = "62eb98c3ab74f9534ab6935d0569a051";
var city;
// var state;
// var zip; 
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

//desired fxnality:
//user types city name
//matching cities suggested as user types, user clicks one to select (?)
//api pulls city's 5-day forecast, displays each day in separate card (or list?)
//user enters city name, city name is matched against JSON library of city IDs



//TODO: link api key
//TODO: on page load, display user's default location's weather forecast (?)
//TODO: add functionality to city search bar to suggest cities
//TODO: write fxn to pull, display, and save weather data to local storage once city is selected