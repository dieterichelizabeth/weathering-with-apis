// API key storage
var apiKey = "91f9a95536d09a6da3e85f409255652c";

// City search form storage
var citySearchEl = document.querySelector("#city-form");
var cityNameEl = document.querySelector("#city-name");

// var searchHistory = [];

// Input validator function
// on submit - data is transferred to the citySearch Handler
var inputValidator = function(event) {
    event.preventDefault();
    var cityname = cityNameEl.value.trim();
    // if the User input value to the search -> move to citySearch function
    if (cityname) {
        citySearchHandler (cityname);
        cityNameEl.value = "";
    }
    else {
        alert("Please enter the name of a city.");
    }
// function to create key
    // Save search to local storage
    // var citySave = JSON.stringify(cityname);
    // localStorage.setItem("City", citySave);
}

// Function to search city by name
var citySearchHandler = function() {
    // https request to the open weather API for geolocation
    var cityname = cityNameEl.value.trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&appid=" + apiKey;  
        // fetch geolocation based on city name
        fetch(apiUrl).then(function(response) {
        console.log(response);
    
    // Conditional: if Open weather API returns a valid response- then run the rest of the function
    if (response.ok) {
            // JSON formats the response under "location"
            response.json().then(function(location) {
            // storing lat/long variables
            var latitude = location.coord.lat;
            var longitude = location.coord.lon;
            openWeatherRequest(latitude, longitude, cityname);
    })}
    // if there is no response based on user input - alert (invalid city)
    else {
        alert("City not found")
    }
})}        

// Function to request weather data
var openWeatherRequest = function(latitude, longitude, cityname) { 
    // request for weather data using lat/long variables
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
        // fetch the weather data (response)
        fetch(apiUrl).then(function(response) {
        // JSON formats the response under data
        response.json().then(function(data) {
                
            // move to displayWeather function and City storage?
            displayWeather (data, cityname);
            console.log(data);
            cityStorage(cityname);
        })})
    // notice: unable to connect to the API
    .catch(function(error) {
        alert("Unable to connect to Open Source Weather");
    });
} 

// add buttons to the screen
        // needs to be re-factored
        function cityStorage(cityname) {
            // set variable for uvi
            var previousNames = cityname;
            // var currentTemp = document.getElementById("current-temp");
            var newButton = document.createElement('button');
            // set the class
            newButton.setAttribute('class', 'btn btn-secondary rounded text-center text-dark col-lg-12 mb-4');
            // display uvi value
            // inner HTML should be the pulled JSON string [0- for city's name]
            newButton.innerHTML = previousNames
            // append to h2 element
            document.getElementById('city-storage').appendChild(newButton);
}

// Function to dipsplay weather data
var displayWeather = function(weather, cityname){
    linebreak = "<br>";

// Updates Current (today's) Date and Forecast
    var CurrentDate = document.getElementById("current-city-date");
        
    // formats the date from unix to human time
        var unixUTCCurrent = weather.current.dt;
        var currentDate= new Date(unixUTCCurrent*1000);
        var date = currentDate.toLocaleDateString();
        CurrentDate.innerHTML = cityname + "(" + date + ")";

    // function to grab the image from Open Weather's Api to display
    function iconImage() {
        // uses image constructor
        var img = new Image();
        var iconSource = weather.current.weather[0].icon;
        img.src = 'http://openweathermap.org/img/wn/' + iconSource + '@2x.png';
        // append to h2 element
        document.getElementById('current-city-date').appendChild(img);
    } 

    // weather conditions display 
    var currentTemp = document.getElementById("current-temp");
    // use values from the returned Open Weather fetch
    currentTemp.innerHTML = 
    "Temp: " + weather.current.temp + " °F" + linebreak +
    "Wind: " + weather.current.wind_speed + "mph" + linebreak +
    "Humidity: " + weather.current.humidity + "%" + linebreak +
    "UV Index: ";
    
    // function to create a span holding the UV index and colors
    function uvIndex() {
        var uvi = weather.current.uvi
        var newSpan = document.createElement('span');
        // if uvi is "2" or less - green
        if (uvi <= 2 ) {
            newSpan.setAttribute('class', 'bg-success rounded text-center p-2 w-25');
        // if uvi is between "3" to "5" - yellow
        } else if (uvi >=3 && uvi <= 5) {
            newSpan.setAttribute('class', 'bg-warning rounded text-center p-2 w-25');
        // if uvi is above "5" - red
        } else {
            newSpan.setAttribute('class', 'bg-danger rounded text-center p-2 w-25');
        }
        // display uvi value
        newSpan.innerHTML = uvi
        // append to p element
        document.getElementById('current-temp').appendChild(newSpan);
    } 

// Updates 5 Day Forecast
    // Day 1 
        // date display
        var dayOne = document.getElementById("day-one-date");
        var unixDayOne = weather.daily[1].dt;
        var humanFormat1 = new Date(unixDayOne*1000);
        var date1 = humanFormat1.toLocaleDateString();
        dayOne.innerHTML = "(" + date1 + ")";

        // icon display
        function iconImage1() {
            var img = new Image();
            var iconSource = weather.daily[1].weather[0].icon;
            img.src = 'http://openweathermap.org/img/wn/' + iconSource + '@2x.png';
            document.getElementById('day-one-date').appendChild(img);
        } 

        // weather conditions display 
        var futureDayOne = document.getElementById("dayOne")
        futureDayOne.innerHTML = 
        "Temp: " + weather.daily[1].temp.day + " °F" + linebreak +
        "Wind: " + weather.daily[1].wind_speed + "mph" + linebreak +
        "Humidity: " + weather.daily[1].humidity + "%";

    // Day 2
        // date display
        var dayTwo = document.getElementById("day-two-date");
        var unixDayTwo = weather.daily[2].dt;
        var humanFormat2 = new Date(unixDayTwo*1000);
        var date2 = humanFormat2.toLocaleDateString();
        dayTwo.innerHTML = "(" + date2 + ")";

        // icon display
        function iconImage2() {
            var img = new Image();
            var iconSource = weather.daily[2].weather[0].icon;
            img.src = 'http://openweathermap.org/img/wn/' + iconSource + '@2x.png';
            document.getElementById('day-two-date').appendChild(img);
        } 

        // weather conditions display 
        var futureDayTwo = document.getElementById("dayTwo")
        futureDayTwo.innerHTML = 
        "Temp: " + weather.daily[2].temp.day + " °F" + linebreak +
        "Wind: " + weather.daily[2].wind_speed + "mph" + linebreak +
        "Humidity: " + weather.daily[2].humidity + "%";

    // Day 3
        // date display
        var dayThree = document.getElementById("day-three-date");
        var unixDayThree = weather.daily[3].dt;
        var humanFormat3 = new Date(unixDayThree*1000);
        var date3 = humanFormat3.toLocaleDateString();
        dayThree.innerHTML = date3;

        // icon display
        function iconImage3() {
            var img = new Image();
            var iconSource = weather.daily[3].weather[0].icon;
            img.src = 'http://openweathermap.org/img/wn/' + iconSource + '@2x.png';
            document.getElementById('day-three-date').appendChild(img);
        } 

        // weather conditions display 
        var futureDayThree = document.getElementById("dayThree")
        futureDayThree.innerHTML = 
        "Temp: " + weather.daily[3].temp.day + " °F" + linebreak +
        "Wind: " + weather.daily[3].wind_speed + "mph" + linebreak +
        "Humidity: " + weather.daily[3].humidity + "%";

    // Day 4
        // date display
        var dayFour = document.getElementById("day-four-date");
        var unixDayFour = weather.daily[4].dt;
        var humanFormat4 = new Date(unixDayFour*1000);
        var date4 = humanFormat4.toLocaleDateString();
        dayFour.innerHTML = date4;

        // icon display
        function iconImage4() {
            var img = new Image();
            var iconSource = weather.daily[4].weather[0].icon;
            img.src = 'http://openweathermap.org/img/wn/' + iconSource + '@2x.png';
            document.getElementById('day-four-date').appendChild(img);
        } 

        // weather conditions display
        var futureDayFour = document.getElementById("dayFour")
        futureDayFour.innerHTML = 
        "Temp: " + weather.daily[4].temp.day + " °F" + linebreak +
        "Wind: " + weather.daily[4].wind_speed + "mph" + linebreak +
        "Humidity: " + weather.daily[4].humidity + "%";

    // Day 5
        // date display
        var dayFive = document.getElementById("day-five-date");
        var unixDayFive = weather.daily[5].dt;
        var humanFormat5 = new Date(unixDayFive*1000);
        var date5 = humanFormat5.toLocaleDateString();
        dayFive.innerHTML = date5;

        // icon display
        function iconImage5() {
            var img = new Image();
            var iconSource = weather.daily[5].weather[0].icon;
            img.src = 'http://openweathermap.org/img/wn/' + iconSource + '@2x.png';
            document.getElementById('day-five-date').appendChild(img);
        } 

        // weather conditions display
        var futureDayFive = document.getElementById("dayFive")
        futureDayFive.innerHTML = 
        "Temp: " + weather.daily[5].temp.day + " °F" + linebreak +
        "Wind: " + weather.daily[5].wind_speed + "mph" + linebreak +
        "Humidity: " + weather.daily[5].humidity + "%";

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


  