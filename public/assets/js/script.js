const searchEl = document.querySelector("#city-form");
const clearEl = document.querySelector("#clear-search");
const previousEl = document.querySelector("#previous-searches");

// Local Storage
const searchObj = {
  previous: [],
  newCity: {},
  retrieveSearches: function () {
    this.previous = JSON.parse(localStorage.getItem("CitySearchHistory")) || []; // Either local Storage || Empty
    this.previous.map((city) => addButton(city.name)); // Display Previous Searches
  },
};

// Toolbox
function addButton(city) {
  const button = document.createElement("button");
  button.innerHTML = capitalize(city);
  previousEl.append(button);
}

function capitalize(city) {
  return city.charAt(0).toUpperCase() + city.slice(1); // Capitalize the first letter
}

function setHTML(element, value) {
  document.querySelector(element).innerHTML = value;
}

function setStorage() {
  localStorage.setItem("CitySearchHistory", JSON.stringify(searchObj.previous));
}

// ------- Go Fetch -------
var fetchLatLon = async function (city) {
  // Request to the server for Geolocation
  await fetch("/city", {
    method: "post",
    body: JSON.stringify({
      city,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.coord) {
        alert("City not found!");
      } else {
        searchObj.newCity = {
          name: city,
          lat: data.coord.lat,
          lon: data.coord.lon,
        };
        addButton(city);
        searchObj.previous.push(searchObj.newCity);
        setStorage(); // Store City Info
        fetchWeather(searchObj.newCity.lat, searchObj.newCity.long);
      }
    })
    .catch((err) => console.log(err));
};

var fetchWeather = async function (lat, lon) {
  // Request to the server for Weather Data
  const response = await fetch("/weather", {
    method: "post",
    body: JSON.stringify({
      lat,
      lon,
    }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      setHTML("#city", capitalize(searchObj.newCity.name));
      displayWeather(data, cityname);
      console.log(data);
    })
    .catch((err) => console.log(err));
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

// ------- Handle Events -------
var handleSearch = function (e) {
  e.preventDefault();
  const city = document.querySelector("#city-name").value.trim().toLowerCase(); // get city name
  searchEl.reset(); // clear the form

  // INPUT VALIDATOR
  if (city) {
    // Check if the city is in previous searches!
    if (searchObj.previous.findIndex((search) => search.name === city) === -1) {
      fetchLatLon(city); // If new search, attempt to tech coordinates
    } else {
      reSearch(city);
    }
  } else {
    alert("You must enter the name of a city!");
  }
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

searchEl.addEventListener("submit", handleSearch);
previousEl.addEventListener("click", reSearch);

searchObj.retrieveSearches(); // Display Previous Searches on page load
