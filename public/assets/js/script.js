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

// ------- Time Toolbox -------
let date = "";

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function amPm() {
  let time = date.getHours(); // hh
  if (time > 12) {
    time = time - 12 + ":00 pm";
  } else if (time === 12) {
    time = time + ":00 pm";
  } else if (time === 0) {
    time = time + 12 + ":00 am";
  } else {
    time = time + ":00 am";
  }
  return time;
}

// ------- Toolbox -------
function abbreviate(day) {
  let firstThree = day.split("");
  let newDay = firstThree[0] + firstThree[1] + firstThree[2];
  return capitalize(newDay);
}

function addButton(city) {
  const button = document.createElement("button");
  button.innerHTML = capitalize(city);
  previousEl.append(button);
}

function capitalize(city) {
  return city.charAt(0).toUpperCase() + city.slice(1); // Capitalize the first letter
}

function createIcon(icon, id) {
  const image = document.getElementById(id);
  image.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

function removeDecimal(data) {
  let newData = data.toString().split(".");
  return newData[0];
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
      displayCurrent(data.current);
      display5DayForecast(data.daily);
      console.log(data);
    })
    .catch((err) => console.log(err));
};

// ------- Display Weather -------
function displayCurrent(data) {
  date = new Date(data.dt * 1000); // r/a date value
  setHTML("#date", weekday[date.getDay()] + " " + amPm()); // dd hh:mm am/pm
  setHTML("#description", capitalize(data.weather[0].description));
  createIcon(data.weather[0].icon, "icon");
  setHTML("#humidity", "Humidity: " + removeDecimal(data.humidity) + "%");
  setHTML("#temp", removeDecimal(data.temp) + "°F");
  setHTML("#wind", "Wind: " + removeDecimal(data.wind_speed) + "mph");
  setHTML("#uvi", "UV Index: " + removeDecimal(data.uvi));
}

function display5DayForecast(data) {
  for (var i = 0; i < 5; i++) {
    date = new Date(data[i].dt * 1000); // r/a date value
    setHTML(`#date${i}`, abbreviate(weekday[date.getDay()])); // dd
    createIcon(data[i].weather[0].icon, "icon" + [i]);
    setHTML(`#humidity${i}`, data[i].humidity + "%");
    setHTML(`#temp${i}`, removeDecimal(data[i].temp.day) + "°F");
    setHTML(`#wind${i}`, removeDecimal(data[i].wind_speed) + "mph");
  }
}

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
