 // Key storage variable
 var apiKey = "91f9a95536d09a6da3e85f409255652c";
 
 // variable to store reference to city form
 var citySearchEl = document.querySelector("#cityname");
 var currentWeatherEl = document.querySelector("#current-city-weather");
 var currentCityDateEl = document.querySelector("#current-city-date")
 var futureWeatherEl = document.querySelector("#future-city-weather");

 // Variables to store latitude/logitude values
 // current values- Dallas, TX
 var latitude = "32.77";
 var longitude = "-96.80";

/* City Serach functionality- pending function to convert city name to lat/long */
//  // City search function
//  var citySearch = function(event) {
//      event.preventDefault();
//      var cityname = citySearchEl.value.trim();
//      if (cityname) {
//          getCityWeather(cityname);
//         citySearchEl.value = "";
//      }
//      else {
//         alert("please enter a valid City Name");
//      }
//      console.log(event);
//  };

 // function to fetch weather data
 var getCityWeather = function(city) {
    // format weather API
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    // Response object - JSON formats the response
    fetch(apiUrl)
    .then(function(response) {
        response.json().then(function(data) {
            // city parameter may need to be changed
            displayCityWeather (data, city);
            console.log(data);
    })
})
    // set alert for unable to reach the api (connectivity issue alert)
    .catch(function(error) {
        alert("Unable to connect to Open Source Weather");
    });
};

//FIX
    // Clear old content when applicalbe (serach enabled)
    // Once search is enabled- change "Dallas to a city variable"
    // inserts current city name/data into the H2 of Current Weather display

var displayCityWeather = function(weather){
    // inserts current city name/data to console
    var currentDate = "Dallas" + "(" + weather.current.dt + ")";
    var currentTemp = weather.current.temp;
    var currentHumid = weather.current.humidity;
    var currentUv = weather.current.uvi;

    document.getElementById("currentCityDateEl").innerHTML = "Dallas";

    console.log (currentTemp);
    console.log (currentDate);
    console.log (currentHumid);
    console.log (currentUv);
};

//Create function displayCityWeather

getCityWeather();

/*
Relavent information [daily 0 = today]
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

// //variables to store a reference to the show repositories element
// var repoContainerEl = document.querySelector("#repos-container");
// var repoSearchTerm = document.querySelector("#repo-search-term");

/*
Step 3. Create a function to search for cities 
    - return city's current conditions, and 5 day forcast
            6.1.4
            If we assigned this returned object to a variable called response, - to access data:
            console.log(response.location);
            console.log(response.followers);

            cURL offers other capabilities besides just verifying API endpoints. For example, the following command would save the data returned from the /users/octocat endpoint to a local file called octocat.json:
            curl -o octocat.json https://api.github.com/users/octocat

            Response is formatted as JSON consisting of an array of objects
            access to that array in JavaScript

            6.1.5
            Promises have a method called then(). 
            This method is called when the Promise has been fulfilled. EX: 
                fetch("https://api.github.com/users/octocat/repos").then(function(response) {
                console.log("inside", response);});
                console.log("outside");

            You can use a json method + then return method as a callback function to capture data. EX:
                var response = fetch("https://api.github.com/users/octocat/repos").then(function(response) {
                response.json().then(function(data) {    
                console.log("inside", response);});});

                Once we've captured the search input and used it to search for a City, 
                we'll dynamically create more HTML and inject the list of repository data to 
                the search history column.
                    -add the search form (complete)
                    -handle form submission
                        Adding an event listener to the <form> element to execute a function on submission
                            -add variables to store reference to form element (by id)
                            -create a function for form submission
                            -add even listener for form submittion
                        Capturing the form's input data to use elsewhere in the app
                            -filter the information that you would like to recieve/display
                            -(When an api is called, it gives back more info than needed)
                    -display response data on the page
                    -add error handling

    - return UV index with colors for favorable, moderate, or severe (red, green, yellow?)
Step 4. Create an area for storing previously searched cities (under the searchbar)
    - when a city is clicked, it's current weather data/forcast is re-searched/returned from the weather API
*/

/*
Resources 
https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys
https://coding-boot-camp.github.io/full-stack/
https://docs.github.com/en/rest
(API documentation) https://openweathermap.org/api/one-call-api
*/

/*
DONE Step 1: create HTML to match mockup
DONE Step 2: create funtion getCityWeather to fetch data from the 
    weather API and return JSON data to console
Step 3: create function formSubmitHandler to 
    recieve data from form submission and return through getCityWeather
        -create a function? to get lat/long values for the fetch
Step 4: create function displayRepos to display both the repos list and search term
    then create a for loop within the funciton to diplay the results in html
        - will need to display items as strings?
Step 5: add if statements to the getCityWeather function to 
    - check the City name is valid via Open Weather's API (404 response)
    - catch method to check for network errors (conectivity issues)
*/

