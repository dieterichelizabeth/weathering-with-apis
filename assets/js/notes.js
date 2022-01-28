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
            - convert unix timestamp
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