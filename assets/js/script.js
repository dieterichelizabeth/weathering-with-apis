 // API key storage
 var apiKey = "91f9a95536d09a6da3e85f409255652c";
 
 // City search form storage
 var citySearchEl = document.querySelector("#city-form");
 var cityNameEl = document.querySelector("#city-name");


// Input validator function
var citySearchHandler = function(event) {
    event.preventDefault();
    var cityname = cityNameEl.value.trim();
    // if the User input value to the search -> move to citySearch function
    if (cityname) {
        citySearch(cityname);
        cityNameEl.value = "";
    }
    else {
        alert("please search for a valid city");
    }
}

// function to search city by name
var citySearch = function() {
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
        
    // request for weather data using lat/long variables
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
        // fetch the weather data (response)
        fetch(apiUrl).then(function(response) {
        // JSON formats the response under data
        response.json().then(function(data) {
                
            // move to displayCityWeather function 
            displayCityWeather (data);
            console.log(data);
        })})
        })}
    // if there is no response based on user input - alert (invalid city)
    else {
        alert("City not found")
    }
})
    
// notice: unable to connect to the API
.catch(function(error) {
    alert("Unable to connect to Open Source Weather");
});


// function to display data
var displayCityWeather = function(weather){
    linebreak = document.createElement("br");

    // Updates Current Weather widget to display Current Weather Date and data
    var CurrentDate = document.getElementById("current-city-date");
    CurrentDate.innerHTML = "Dallas" + "(" + weather.current.dt + ")" + weather.current.weather[0].icon;

    var currentTemp = document.getElementById("current-temp");
    currentTemp.innerHTML = 
    "Temp: " + weather.current.temp + " °F" + linebreak +
    "Wind: " + weather.current.wind_speed + "mph" + linebreak +
    "Humidity: " + weather.current.humidity + "%" + linebreak +
    "UV Index: " + weather.current.uvi + linebreak +
   
    currentTemp.appendChild(linebreak);

    // Updates 5 day forecase to display Future Weather Date and data

    // Displays Day 1
    var dayOne = document.getElementById("day-one-date");
    dayOne.innerHTML = weather.daily[1].dt;

    var futureDayOne = document.getElementById("dayOne")
    futureDayOne.innerHTML = 
    "Temp: " + weather.daily[1].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[1].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[1].humidity + "%";

    // Displays Day 2
    var dayTwo = document.getElementById("day-two-date");
    dayTwo.innerHTML = weather.daily[2].dt;

    var futureDayTwo = document.getElementById("dayTwo")
    futureDayTwo.innerHTML = 
    "Temp: " + weather.daily[2].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[2].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[2].humidity + "%";

    // Displays Day 3
    var dayThree = document.getElementById("day-three-date");
    dayThree.innerHTML = weather.daily[3].dt;

    var futureDayThree = document.getElementById("dayThree")
    futureDayThree.innerHTML = 
    "Temp: " + weather.daily[3].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[3].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[3].humidity + "%";

    // Displays Day 4
    var dayFour = document.getElementById("day-four-date");
    dayFour.innerHTML = weather.daily[4].dt;

    var futureDayFour = document.getElementById("dayFour")
    futureDayFour.innerHTML = 
    "Temp: " + weather.daily[4].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[4].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[4].humidity + "%";

};}

citySearchEl.addEventListener("submit", citySearchHandler);
   
    // find converter from unix time to human time
    // link icon to api for display
    // the goal of making the HTML first was to display the user's current location weather first...how do I do this?
     

  