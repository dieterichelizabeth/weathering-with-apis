 // API key storage
 var apiKey = "91f9a95536d09a6da3e85f409255652c";
 
 // City search form storage
 var citySearchEl = document.querySelector("#city-form");
 var cityNameEl = document.querySelector("#city-name");

// Input validator function
var citySearchHandler = function(event) {
    event.preventDefault();
    var cityname = cityNameEl.value.trim();
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
    // https request to the open weather API
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
        // if there is no response (invalid city)
        else {
            alert("City not found")
        }
    })
    
    // notice: unable to connect to the API
    .catch(function(error) {
        alert("Unable to connect to Open Source Weather");
    });


// function to console.log data (turn into HTML Step 4)
var displayCityWeather = function(weather){
    // select array object value to save as a variable
    // find converter from unix time to human time
    var currentDate = cityNameEl.value + "(" + weather.current.dt + ")";
    var currentTemp = weather.current.temp;
    var currentHumid = weather.current.humidity;
    var currentUv = weather.current.uvi;

    console.log (currentTemp + " degrees");
    console.log (currentDate);
    console.log (currentHumid + " % humidity");
    console.log (currentUv);
};}

citySearchEl.addEventListener("submit", citySearchHandler);

/*
Relavent information from the API to display in the HTML
    [daily 0 = today]
    City name (date: current.dt) (weather icon: current.weather.icon)
    temperature: current.temp
    wind: current.wind_speed?
    humidity: current.humidity
    uv index: current.uvi

    5 day forecast
    date: daily.dt [1, 2, 3, 4]
    icon: daily.weather.icon [1, 2, 3, 4]
    temp: daily.temp [1, 2, 3, 4]
    wind: daily.wind_speed [1, 2, 3, 4]
    humidity: daily.humidity [1, 2, 3, 4]
*/

/*
Psuedocoding-
DONE Step 1: Create HTML doc with styles to match the mockup provided
DONE Step 2: Create citySearch function to fetch data from Open Weather API and return JSON data to console
        -Step 2.1: API call is make using lat/lon
            - add another API fetch (from documentation) to recieve coordinates based on City Search
        -Step 2.2: This method is called when the Promise has been fulfilled
            - use a json method + then return method as a callback function to capture data
        -Step 2.3: Assigned the returned object to a variable called location
            - (Response (location) is formatted as JSON consisting of an array of objects)
        -Step 2.4: Add if conditional statement to the citySearch function to 
            - check the City name is valid via Open Weather's API (404 response)
        -Step 2.5: Add catch method to check for network errors (conectivity issues)
DONE Step 3: Create function citySearchHandler to recieve data from HTML form submission and pass through citySearch
        -Step 3.2: add an event listener to the <form> element to execute a function on submission
        -Step 3.2: add if conditional statement to confirm the user has input a value (else, alert)
Step 4: Create function displayRepos to display both the repos list and search term (currently in the console)
        -Step 4.1: Create a for loop within the funciton to diplay the results in html
            - will need to display items as strings?
            - filter the information that you would like to recieve/display
            - clear old data before displaying new data to HTML
            - display response data on the page
            - create UV index with colors for favorable, moderate, or severe (red, green, yellow?)
            - how to display an icon?
Step 5. Create an area for storing previously searched cities (under the searchbar)
        - dynamically create more HTML and inject the list of city data to the search history column.
            - when a city (in history) is clicked, it's current weather data/forcast is re-searched/returned from the weather API
Step 6: VERY IMPORTANT- CREATE ENV FILE AND NEW API KEY! DELETE OLD KEY FOR SECURITY PURPOSES 
BUG: UNABLE TO USE CITYNAME ELEMENT TO CONSOLE DATE        
*/

/*
Resources 
    (Blog on API key use) https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
    (API documentation) https://openweathermap.org/api/one-call-api
    (API city documentation) https://openweathermap.org/current#name
    (documentation for response.json) https://developer.mozilla.org/en-US/docs/Web/API/Response/json
    (documentation for .querySelector) https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
*/
