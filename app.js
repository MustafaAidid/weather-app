/**********DOM Selection**********/
var searchBtn = $(".search-btn");
var searchBar = $(".search-bar");
var tempItemDisplay = $(".temp-item");
var tempDisplay = $("#temp");
var humidityDisplay = $("#humidity");
var windSpeedDisplay = $("#wind");
var weatherDisplay = $("#weather");
var currentBanner = $(".current-banner");
var city = "";
var cityID = "";

/****** API KEY & QUERY String*******/
var APIKey = "a0aca8a89948154a4182dcecc780b513";
var queryStr = "";
var IdQueryStr = "";

/***** Fetch weather data based on city******/
function getCity(event) {
  event.preventDefault();
  city = searchBar.val();
  queryStr =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&APPID=" +
    APIKey;
  console.log(city);
  getCurrentWeather(city);
}

function getCurrentWeather() {
  fetch(queryStr)
    .then((response) => response.json())
    .then((data) => {
      tempDisplay.text(" : " + data.main.temp);
      humidityDisplay.text(" : " + data.main.humidity);
      windSpeedDisplay.text(" : " + data.wind.speed);
      weatherDisplay.text(" : " + data.weather[0].description);
      currentBanner.text(
        "Currently it feels like " + data.main.feels_like + " in " + data.name
      );
      getFutureForecast(data.id);
    });
}
function getFutureForecast(cityID) {
  IdQueryStr =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityID +
    "&appid=" +
    APIKey;
  fetch(IdQueryStr)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

searchBtn.on("click", getCity);
