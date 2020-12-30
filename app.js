/**********DOM Selection**********/
var searchBtn = $(".search-btn");
var searchBar = $(".search-bar");
var tempItemDisplay = $(".temp-item");
var tempDisplay = $("#temp");
var humidityDisplay = $("#humidity");
var windSpeedDisplay = $("#wind");
var weatherDisplay = $("#weather");
var currentBanner = $(".current-banner");
var nextDay1 = $("#nextdt-1");
var nextDay2 = $("#nextdt-2");
var nextDay3 = $("#nextdt-3");
var nextDay4 = $("#nextdt-4");
var nextDay5 = $("#nextdt-5");
var city = "";
var cityID = "";
var cities = [];

/****** API KEY & QUERY String*******/
var APIKey = "a0aca8a89948154a4182dcecc780b513";
var queryStr = "";
var IdQueryStr = "";
var UVQueryStr = "";

/*********Fetch latest city searched******/
if (localStorage.getItem("city") !== null) {
  let lastCity = localStorage.getItem("city");
  console.log(lastCity);
  queryStr =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    lastCity +
    "&APPID=" +
    APIKey;
  $(".last-search").text(lastCity);
  getCurrentWeather();
} else {
  $(".accordian-banner").text(
    "Find out the forecast for the coming days as well"
  );
  nextDay1.text("Day 1");
  nextDay2.text("Day 2");
  nextDay3.text("Day 3");
  nextDay4.text("Day 4");
  nextDay5.text("Day 5");
  $(".history").hide();
}
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
  getCurrentWeather();
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

      localStorage.setItem("city", data.name);

      getFutureForecast(data.id);
    });
}

//******Fetch UVIndex*******/
function getUVI(lat, lon) {
  UVQueryStr =
    "https://api.openweathermap.org/data/2.5/uvi?appid=" +
    APIKey +
    "&lat=" +
    lat +
    "&lon=" +
    lon;
  fetch(UVQueryStr)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $("#uvindex").text(" : " + data.value);
    });
}

// https://api.openweathermap.org/data/2.5/uvi?appid="+ APIKey+"&lat="+lt+"&lon="+ln;

function getFutureForecast(cityID) {
  IdQueryStr =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityID +
    "&appid=" +
    APIKey;
  fetch(IdQueryStr)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $(".accordian-banner").text(
        "The forcast for the coming five days in " + data.city.name
      );
      nextDay1.text(data.list[0].dt_txt.split(" ")[0] + " ");
      $("#day1-temp").text(data.list[0].main.temp);
      $("#day1-min").text(data.list[0].main.temp_min);
      $("#day1-max").text(data.list[0].main.temp_max);
      $("#day1-humd").text(data.list[0].main.humidity);
      nextDay2.text(data.list[10].dt_txt.split(" ")[0] + " ");
      $("#day2-temp").text(data.list[10].main.temp);
      $("#day2-min").text(data.list[10].main.temp_min);
      $("#day2-max").text(data.list[10].main.temp_max);
      $("#day2-humd").text(data.list[10].main.humidity);
      nextDay3.text(data.list[20].dt_txt.split(" ")[0] + " ");
      $("#day3-temp").text(data.list[20].main.temp);
      $("#day3-min").text(data.list[20].main.temp_min);
      $("#day3-max").text(data.list[20].main.temp_max);
      $("#day3-humd").text(data.list[20].main.humidity);
      nextDay4.text(data.list[30].dt_txt.split(" ")[0] + " ");
      $("#day4-temp").text(data.list[30].main.temp);
      $("#day4-min").text(data.list[30].main.temp_min);
      $("#day4-max").text(data.list[30].main.temp_max);
      $("#day4-humd").text(data.list[30].main.humidity);
      nextDay5.text(data.list[39].dt_txt.split(" ")[0] + " ");
      $("#day5-temp").text(data.list[39].main.temp);
      $("#day5-min").text(data.list[39].main.temp_min);
      $("#day5-max").text(data.list[39].main.temp_max);
      $("#day5-humd").text(data.list[39].main.humidity);
      getUVI(data.city.coord.lat, data.city.coord.lon);
    });
}

searchBtn.on("click", getCity);
$(".history-btn").on("click", () => {
  localStorage.clear();
  location.reload();
});
