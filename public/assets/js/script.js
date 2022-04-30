// City Search Form
var citySearchEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");
var searchButtonEl = document.querySelector("#city-storage");

// Local Storage
var cityCount = 0;
var searchHistory = [];

// INPUT VALIDATOR
var inputValidator = function (event) {
  event.preventDefault();
  var cityname = cityNameEl.value.trim();

  // If Input is present, send a requst for lat/long values
  if (cityname) {
    citySearchHandler(cityname);
    cityNameEl.value = "";
  } else {
    alert("Please enter the name of a city.");
  }
};

// CITY VALIDATOR
var citySearchHandler = async function (cityname) {
  // Request to the server for Open Weather API Geolocation
  const response = await fetch("/city", {
    method: "post",
    body: JSON.stringify({
      cityname,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      geolocation = data.coord;
      if (geolocation === undefined) {
        alert("City not found!");
      } else {
        // Store lat/long variables
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;
        // Request weather data, Save form input to a button
        openWeatherRequest(latitude, longitude, cityname);
        cityStorage(latitude, longitude, cityname);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// REQUEST WEATHER DATA FROM OPEN WEATHER API
var openWeatherRequest = async function (latitude, longitude, cityname) {
  // Request to the server for Open Weather API Weather data
  const response = await fetch("/weather", {
    method: "post",
    body: JSON.stringify({
      latitude,
      longitude,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      displayWeather(data, cityname);
    })
    .catch((err) => {
      console.log(err);
    });
};

// ADD SEARCH HISTORY BUTTONS
var cityStorage = function (latitude, longitude, cityname) {
  // Create the button
  var newButtonEl = document.createElement("button");
  newButtonEl.setAttribute("id", cityCount);
  newButtonEl.setAttribute("class", "btn previousSearch");
  newButtonEl.innerHTML = cityname;
  // Append
  document.getElementById("city-storage").appendChild(newButtonEl);

  // push variables into array for storage
  var cityInfo = [];
  cityInfo.push(cityname);
  cityInfo.push(latitude);
  cityInfo.push(longitude);
  cityInfo.push(newButtonEl.id);

  // push array into array
  searchHistory.push(cityInfo);

  // Save search to local storage
  localStorage.setItem("search", JSON.stringify(searchHistory));
  cityCount++;
};

// PREVIOUS SEARCH BUTTON HANDLER
var reSearch = function (event) {
  // Get the id
  var targetEl = event.target;
  var i = targetEl.id;

  // Grab the City data from localstorage
  var newSearch = localStorage.getItem("search");
  var cityData = JSON.parse(newSearch);
  var cityInfo = cityData[i];

  // Define values from cityInfo array
  var cityname = cityInfo[0];
  var latitude = cityInfo[1];
  var longitude = cityInfo[2];
  // console.log("Displaying the weather for -", cityname, latitude, longitude);

  // Request the Weather Data
  openWeatherRequest(latitude, longitude, cityname);
};

// DISPLAY WEATHER DATA
var displayWeather = function (weather, cityname) {
  // Use image constructor to add Open Weather Icon
  var img = new Image();
  var iconSource = weather.current.weather[0].icon;
  img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
  img.className = "currentIcon";

  // Format the date
  var unixUTCCurrent = weather.current.dt;
  var currentDate = new Date(unixUTCCurrent * 1000);
  var date = currentDate.toLocaleDateString();

  // Update the Current Weather Card
  document.getElementById("cityName").innerHTML = cityname;
  document.getElementById("cityDate").innerHTML = date;
  // Clear the old icon (if applicable), append new
  document.getElementById("cityIcon").innerHTML = "";
  document.getElementById("cityIcon").appendChild(img);
  document.getElementById("cityTemp").innerHTML = weather.current.temp + " °";
  document.getElementById("cityWeather").innerHTML =
    "Wind: " +
    weather.current.wind_speed +
    "mph <br> Humidity: " +
    weather.current.humidity +
    "% <br> UV Index: ";

  // Determine the UV index
  var uvi = weather.current.uvi;
  var uviEl = document.createElement("span");
  if (uvi <= 2) {
    // If UVI is "2" or less - green
    uviEl.setAttribute("class", "bg-success p-1 text-center");
    // If UVI is between "3" to "5" - yellow
  } else if (uvi >= 3 && uvi <= 5) {
    uviEl.setAttribute("class", "bg-warning p-1 text-center");
    // If UVI is above "5" - red
  } else {
    uviEl.setAttribute("class", "bg-danger p-1 text-center");
  }
  // Set the #
  uviEl.innerHTML = uvi;
  // Append
  document.getElementById("cityWeather").appendChild(uviEl);

  // Update 5 Day Forecast cards
  for (let i = 0; i < 5; i++) {
    // Format the date
    var unixUTCdaily = weather.daily[i].dt;
    var dailyDate = new Date(unixUTCdaily * 1000);
    var dayDate = dailyDate.toLocaleDateString();

    // Get the Icon from Open Weather
    var img = new Image();
    var iconSource = weather.daily[i].weather[0].icon;
    img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";

    // Update each "day" card
    document.getElementById("cityDate" + i).innerHTML = dayDate;
    // Clear the old icon (if applicable), append new
    document.getElementById("cityIcon" + i).innerHTML = "";
    document.getElementById("cityIcon" + i).appendChild(img);
    document.getElementById("cityTemp" + i).innerHTML =
      weather.daily[i].temp.day + " °";
    document.getElementById("cityWeather" + i).innerHTML =
      weather.daily[i].wind_speed +
      "mph <br>" +
      weather.daily[i].humidity +
      "%";
  }
};

// Event Listeners
citySearchEl.addEventListener("submit", inputValidator);
searchButtonEl.addEventListener("click", reSearch);

welcome = function () {
  firstSearch = "Austin";
  citySearchHandler(firstSearch);
};

// On load, display Austin, TX weather
welcome();
