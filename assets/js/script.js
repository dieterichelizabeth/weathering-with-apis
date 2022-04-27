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
  // https request to the open weather API for geolocation
  var cityname = cityNameEl.value.trim();
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityname +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    //console.log(response);

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
      alert("Unable to connect to Open Source Weather");
    });
};

// Function to dipsplay weather data
var displayWeather = function (weather, cityname) {
  linebreak = "<br>";

  // Updates Current (today's) Date and Forecast
  var CurrentDate = document.getElementById("current-city-date");

  // formats the date from unix to human time
  var unixUTCCurrent = weather.current.dt;
  var currentDate = new Date(unixUTCCurrent * 1000);
  var date = currentDate.toLocaleDateString();
  CurrentDate.innerHTML = cityname + "(" + date + ")";

  // function to grab the image from Open Weather's Api to display
  function iconImage() {
    // uses image constructor
    var img = new Image();
    var iconSource = weather.current.weather[0].icon;
    img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
    // append to h2 element
    document.getElementById("current-city-date").appendChild(img);
  }

  // weather conditions display
  var currentTemp = document.getElementById("current-temp");
  // use values from the returned Open Weather fetch
  currentTemp.innerHTML =
    "Temp: " +
    weather.current.temp +
    " °F" +
    linebreak +
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
      newSpan.setAttribute("class", "bg-success rounded text-center p-2 w-25");
      // if uvi is between "3" to "5" - yellow
    } else if (uvi >= 3 && uvi <= 5) {
      newSpan.setAttribute("class", "bg-warning rounded text-center p-2 w-25");
      // if uvi is above "5" - red
    } else {
      newSpan.setAttribute("class", "bg-danger rounded text-center p-2 w-25");
    }
    // display uvi value
    newSpan.innerHTML = uvi;
    // append to p element
    document.getElementById("current-temp").appendChild(newSpan);
  }

  // Updates 5 Day Forecast widgets
  // Day 1
  // date display
  var dayOne = document.getElementById("day-one-date");
  var unixDayOne = weather.daily[1].dt;
  var humanFormat1 = new Date(unixDayOne * 1000);
  var date1 = humanFormat1.toLocaleDateString();
  dayOne.innerHTML = "(" + date1 + ")";

  // icon display
  function iconImage1() {
    var img = new Image();
    var iconSource = weather.daily[1].weather[0].icon;
    img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
    document.getElementById("day-one-date").appendChild(img);
  }

  // weather conditions display
  var futureDayOne = document.getElementById("dayOne");
  futureDayOne.innerHTML =
    "Temp: " +
    weather.daily[1].temp.day +
    " °F" +
    linebreak +
    "Wind: " +
    weather.daily[1].wind_speed +
    "mph" +
    linebreak +
    "Humidity: " +
    weather.daily[1].humidity +
    "%";

  // Day 2
  // date display
  var dayTwo = document.getElementById("day-two-date");
  var unixDayTwo = weather.daily[2].dt;
  var humanFormat2 = new Date(unixDayTwo * 1000);
  var date2 = humanFormat2.toLocaleDateString();
  dayTwo.innerHTML = "(" + date2 + ")";

  // icon display
  function iconImage2() {
    var img = new Image();
    var iconSource = weather.daily[2].weather[0].icon;
    img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
    document.getElementById("day-two-date").appendChild(img);
  }

  // weather conditions display
  var futureDayTwo = document.getElementById("dayTwo");
  futureDayTwo.innerHTML =
    "Temp: " +
    weather.daily[2].temp.day +
    " °F" +
    linebreak +
    "Wind: " +
    weather.daily[2].wind_speed +
    "mph" +
    linebreak +
    "Humidity: " +
    weather.daily[2].humidity +
    "%";

  // Day 3
  // date display
  var dayThree = document.getElementById("day-three-date");
  var unixDayThree = weather.daily[3].dt;
  var humanFormat3 = new Date(unixDayThree * 1000);
  var date3 = humanFormat3.toLocaleDateString();
  dayThree.innerHTML = date3;

  // icon display
  function iconImage3() {
    var img = new Image();
    var iconSource = weather.daily[3].weather[0].icon;
    img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
    document.getElementById("day-three-date").appendChild(img);
  }

  // weather conditions display
  var futureDayThree = document.getElementById("dayThree");
  futureDayThree.innerHTML =
    "Temp: " +
    weather.daily[3].temp.day +
    " °F" +
    linebreak +
    "Wind: " +
    weather.daily[3].wind_speed +
    "mph" +
    linebreak +
    "Humidity: " +
    weather.daily[3].humidity +
    "%";

  // Day 4
  // date display
  var dayFour = document.getElementById("day-four-date");
  var unixDayFour = weather.daily[4].dt;
  var humanFormat4 = new Date(unixDayFour * 1000);
  var date4 = humanFormat4.toLocaleDateString();
  dayFour.innerHTML = date4;

  // icon display
  function iconImage4() {
    var img = new Image();
    var iconSource = weather.daily[4].weather[0].icon;
    img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
    document.getElementById("day-four-date").appendChild(img);
  }

  // weather conditions display
  var futureDayFour = document.getElementById("dayFour");
  futureDayFour.innerHTML =
    "Temp: " +
    weather.daily[4].temp.day +
    " °F" +
    linebreak +
    "Wind: " +
    weather.daily[4].wind_speed +
    "mph" +
    linebreak +
    "Humidity: " +
    weather.daily[4].humidity +
    "%";

  // Day 5
  // date display
  var dayFive = document.getElementById("day-five-date");
  var unixDayFive = weather.daily[5].dt;
  var humanFormat5 = new Date(unixDayFive * 1000);
  var date5 = humanFormat5.toLocaleDateString();
  dayFive.innerHTML = date5;

  // icon display
  function iconImage5() {
    var img = new Image();
    var iconSource = weather.daily[5].weather[0].icon;
    img.src = "http://openweathermap.org/img/wn/" + iconSource + "@2x.png";
    document.getElementById("day-five-date").appendChild(img);
  }

  // weather conditions display
  var futureDayFive = document.getElementById("dayFive");
  futureDayFive.innerHTML =
    "Temp: " +
    weather.daily[5].temp.day +
    " °F" +
    linebreak +
    "Wind: " +
    weather.daily[5].wind_speed +
    "mph" +
    linebreak +
    "Humidity: " +
    weather.daily[5].humidity +
    "%";

  // call for icon images and current UV index
  iconImage();
  iconImage1();
  iconImage2();
  iconImage3();
  iconImage4();
  iconImage5();
  uvIndex(currentTemp);
};

// event listener for Search button
citySearchEl.addEventListener("submit", inputValidator);

// event listener for Search History clicks
searchButtonEl.addEventListener("click", reSearch);
