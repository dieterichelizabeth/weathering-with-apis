 // Key storage variable
 var apiKey = "91f9a95536d09a6da3e85f409255652c";
 
 // Variables to store latitude/logitude values
 var latitude = "32.77";
 var longitude = "-96.80";

 // function to fetch weather data
 var getCityWeather = function(city) {
    // format weather API
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    // Response object - JSON formats the response
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
          });
    })
}
getCityWeather();

//variables to store a reference to the show repositories element
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

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
*/

/*
DONE Step 1: create funtion getCityWeather to fetch data from the 
    weather API and return JSON data to console
Step 2: create function formSubmitHandler to 
    recieve data from form submission and return through get User Repos
Step 3: create function displayRepos to display both the repos list and search term
    then create a for loop within the funciton to diplay the results in html
Step 4: add if statements to the getUserRepos function to 
    - check the username is valid via Github's API (404 response)
    - check if the user has repositories
    - catch method to check for network errors
*/

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