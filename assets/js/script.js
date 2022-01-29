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
    linebreak = document.createElement('br');

    // Updates Current Weather widget to display Current Weather Date and data
    var CurrentDate = document.getElementById("current-city-date");
        // formats the date from unix to human time
        var unixUTCCurrent = weather.current.dt;
        var currentDate= new Date(unixUTCCurrent*1000);
        var date = currentDate.toLocaleDateString();

        // function to grab the image from Open Weather's Api to display
        function iconImage() {
            // uses image constructor
            var img = new Image();
            var iconSource = weather.current.weather[0].icon;
            img.src = 'http://openweathermap.org/img/wn/' + iconSource + '@2x.png';
            // append to h2 element
            document.getElementById('current-city-date').appendChild(img);
        } 

    CurrentDate.innerHTML = "Dallas" + "(" + date + ")";

    var currentTemp = document.getElementById("current-temp");
    currentTemp.innerHTML = 
    "Temp: " + weather.current.temp + " °F" + linebreak +
    "Wind: " + weather.current.wind_speed + "mph" + linebreak +
    "Humidity: " + weather.current.humidity + "%" + linebreak +
    "UV Index: " + weather.current.uvi;
    currentTemp.appendChild(linebreak);

    // Updates 5 day forecase to display Future Weather Date and data

    // Displays Day 1
    var dayOne = document.getElementById("day-one-date");
    var unixDayOne = weather.daily[1].dt;
    var humanFormat1 = new Date(unixDayOne*1000);
    var date1 = humanFormat1.toLocaleDateString();
    dayOne.innerHTML = "(" + date1 + ")";

    var futureDayOne = document.getElementById("dayOne")
    futureDayOne.innerHTML = 
    "Temp: " + weather.daily[1].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[1].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[1].humidity + "%";

    // Displays Day 2
    var dayTwo = document.getElementById("day-two-date");
    var unixDayTwo = weather.daily[2].dt;
    var humanFormat2 = new Date(unixDayTwo*1000);
    var date2 = humanFormat2.toLocaleDateString();
    dayTwo.innerHTML = "(" + date2 + ")";

    var futureDayTwo = document.getElementById("dayTwo")
    futureDayTwo.innerHTML = 
    "Temp: " + weather.daily[2].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[2].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[2].humidity + "%";

    // Displays Day 3
    var dayThree = document.getElementById("day-three-date");
    var unixDayThree = weather.daily[3].dt;
    var humanFormat3 = new Date(unixDayThree*1000);
    var date3 = humanFormat3.toLocaleDateString();
    dayThree.innerHTML = date3;

    var futureDayThree = document.getElementById("dayThree")
    futureDayThree.innerHTML = 
    "Temp: " + weather.daily[3].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[3].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[3].humidity + "%";

    // Displays Day 4
    var dayFour = document.getElementById("day-four-date");
    var unixDayFour = weather.daily[4].dt;
    var humanFormat4 = new Date(unixDayFour*1000);
    var date4 = humanFormat4.toLocaleDateString();
    dayFour.innerHTML = date4;

    var futureDayFour = document.getElementById("dayFour")
    futureDayFour.innerHTML = 
    "Temp: " + weather.daily[4].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[4].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[4].humidity + "%";

    // Displays Day 5
    var dayFive = document.getElementById("day-five-date");
    var unixDayFive = weather.daily[5].dt;
    var humanFormat5 = new Date(unixDayFive*1000);
    var date5 = humanFormat5.toLocaleDateString();
    dayFive.innerHTML = date5;

    var futureDayFive = document.getElementById("dayFive")
    futureDayFive.innerHTML = 
    "Temp: " + weather.daily[5].temp.day + " °F" + linebreak +
    "Wind: " + weather.daily[5].wind_speed + "mph" + linebreak +
    "Humidity: " + weather.daily[5].humidity + "%";


    iconImage();
};}

citySearchEl.addEventListener("submit", citySearchHandler);
   
    // the goal of making the HTML first was to display the user's current location weather first...how do I do this?
     

  