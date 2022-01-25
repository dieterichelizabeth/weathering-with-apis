/*
Step 1. Build the HTML/stylesheet for the dashboard with form inputs
    - include: 
        -search bar for the cities
        -dashboard header
        -jumbotron to display the city searched (city, date, temp, wind, humidity, uv index)
        -5 day forcast with five widgets (date, weather icon, temp, wind, humidity)

Step 2. link serverside api to javascript
Step 3. Create a function to search for cities 
            var getCity = function() {
            console.log("function was called");};

            getCity();
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