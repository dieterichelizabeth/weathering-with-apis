// City search form storage
var citySearchEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");
var searchButtonEl = document.querySelector("#city-storage");

// Local storage variables
var cityCount = 0;
var searchHistory = [];

// Input validator function
var inputValidator = function (event) {
  event.preventDefault();
  var cityname = cityNameEl.value.trim();
  // if the User input value to the search -> move to citySearchHandler function
  if (cityname) {
    citySearchHandler(cityname);
    cityNameEl.value = "";
  } else {
    alert("Please enter the name of a city.");
  }
};

// Function to search city by name for lat/long values
var citySearchHandler = function () {
  // Request to the open weather API for geolocation
  var cityname = cityNameEl.value.trim();
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    console.log(response);

    // Condition: if Open weather API returns a valid response- use lat/lon in openWeatherRequest function
    if (response.ok) {
      response.json().then(function (location) {
        // storing lat/long variables
        var latitude = location.coord.lat;
        var longitude = location.coord.lon;

        // move to next functions (request weather data and save form input to a button)
        openWeatherRequest(latitude, longitude, cityname);
        cityStorage(latitude, longitude, cityname);
      });
    }
    // if there is no response from API based on user input - alert (invalid city)
    else {
      alert("City not found");
    }
  });
};

// Add buttons by search
var cityStorage = function (latitude, longitude, cityname) {
  // create new button
  var newButtonEl = document.createElement("button");
  // give the button a new #
  newButtonEl.setAttribute("id", cityCount);
  // set the class
  newButtonEl.setAttribute(
    "class",
    "btn btn-secondary rounded text-center text-dark col-lg-12 mb-4"
  );
  // save the name
  newButtonEl.innerHTML = cityname;
  // append to div
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

// function to grab values to run through openWEatherRequest
var reSearch = function (event) {
  var targetEl = event.target;
  // get item #
  var i = targetEl.id;
  var newSearch = localStorage.getItem("search");
  var cityData = JSON.parse(newSearch);
  // grab city arrays from arrays
  var cityInfo = cityData[i];
  // grab values to use from correct city array
  var cityname = cityInfo[0];
  var latitude = cityInfo[1];
  var longitude = cityInfo[2];
  console.log("Displaying the weather for -", cityname, latitude, longitude);

  // pass to openWeatherRequest function
  openWeatherRequest(latitude, longitude, cityname);
};

// Function to request weather data
var openWeatherRequest = function (latitude, longitude, cityname) {
  // request for weather data using lat/long variables
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&appid=" +
    apiKey +
    "&units=imperial";
  // fetch the weather data (response)
  fetch(apiUrl)
    .then(function (response) {
      // JSON formats the response under data
      response.json().then(function (data) {
        // move to displayWeather function and City storage?
        displayWeather(data, cityname);
        //console.log(data);
      });
    })
    // notice: unable to connect to the API
    .catch(function (error) {
      console.log(error);
      alert("Unable to connect to Open Source Weather");
    });
};

// Function to dipsplay weather data
var displayWeather = function (weather, cityname) {
  linebreak = "<br>";

  // Get the date
  var unixUTCCurrent = weather.current.dt;
  var currentDate = new Date(unixUTCCurrent * 1000);
  var date = currentDate.toLocaleDateString();

  // Update the Current Weather Card
  document.getElementById("cityName").innerHTML = cityname;
  document.getElementById("cityDate").innerHTML = date;
  document.getElementById("cityTemp").innerHTML = weather.current.temp + " °";
  document.getElementById("cityWeather").innerHTML =
    "Wind: " +
    weather.current.wind_speed +
    "mph" +
    linebreak +
    "Humidity: " +
    weather.current.humidity +
    "%" +
    linebreak +
    "UV Index: ";

  // function to create a span holding the UV index and colors
  function uvIndex() {
    var uvi = weather.current.uvi;
    var newSpan = document.createElement("span");
    // if uvi is "2" or less - green
    if (uvi <= 2) {
      newSpan.setAttribute("class", "bg-success text-center");
      // if uvi is between "3" to "5" - yellow
    } else if (uvi >= 3 && uvi <= 5) {
      newSpan.setAttribute("class", "bg-warning text-center");
      // if uvi is above "5" - red
    } else {
      newSpan.setAttribute("class", "bg-danger text-center");
    }
    // display uvi value
    newSpan.innerHTML = uvi;
    // append to p element
    document.getElementById("cityWeather").appendChild(newSpan);
  }

  uvIndex();

  // // function to grab the image from Open Weather's Api to display
  // function iconImage() {
  //   // uses image constructor
  //   var img = new Image();
  //   var iconSource = weather.current.weather[0].icon;
  //   img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
  //   // append to h2 element
  //   document.getElementById("current-city-date").appendChild(img);
  // }

  // Updates 5 Day Forecast widgets
  // for (let i = 0; i < 5; i++) {
  //   // date display
  //   var dayOne = document.getElementById("day-one-date");
  //   var unixDayOne = weather.daily[i].dt;
  //   var humanFormat1 = new Date(unixDayOne * 1000);
  //   var date1 = humanFormat1.toLocaleDateString();
  //   dayOne.innerHTML = "(" + date1 + ")";

  //   // icon display
  //   function iconImage1() {
  //     var img = new Image();
  //     var iconSource = weather.daily[i].weather[0].icon;
  //     img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
  //     document.getElementById("day-one-date").appendChild(img);
  //   }

  //   // weather conditions display
  //   var futureDayOne = document.getElementById("dayOne");
  //   futureDayOne.innerHTML =
  //     "Temp: " +
  //     weather.daily[i].temp.day +
  //     " °F" +
  //     linebreak +
  //     "Wind: " +
  //     weather.daily[i].wind_speed +
  //     "mph" +
  //     linebreak +
  //     "Humidity: " +
  //     weather.daily[i].humidity +
  //     "%";
  // }

  // call for icon images and current UV index
  // iconImage();
  // // iconImage1();

  // uvIndex(currentTemp);
};

// event listener for Search button
citySearchEl.addEventListener("submit", inputValidator);

// event listener for Search History clicks
searchButtonEl.addEventListener("click", reSearch);
