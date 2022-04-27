/*
Psuedocoding-
Step 1: Create HTML doc with styles to match the mockup provided
Step 2: Create citySearch function to fetch data from Open Weather API and return JSON data to console
        -Step 2.1: API call is make using lat/lon
            - add another API fetch (from documentation) to recieve coordinates based on City Search
        -Step 2.2: This method is called when the Promise has been fulfilled
            - use a json method + then return method as a callback function to capture data
        -Step 2.3: Assigned the returned object to a variable called location
            - (Response (location) is formatted as JSON consisting of an array of objects)
        -Step 2.4: Add if conditional statement to the citySearch function to 
            - check the City name is valid via Open Weather's API (404 response)
        -Step 2.5: Add catch method to check for network errors (conectivity issues)
Step 3: Create function citySearchHandler to recieve data from HTML form submission and pass through citySearch
        -Step 3.2: add an event listener to the <form> element to execute a function on submission
        -Step 3.2: add if conditional statement to confirm the user has input a value (else, alert)
Step 4: Create function displayRepos to display both the repos list and search term (currently in the console)
        -Step 4.1: Create a funciton to diplay the results in html
            - filter the information that you would like to recieve/display through variables
              targeting values in the JSON
            - insert the data with .innerhtml
            - use conditional statements to create UV index with colors for 
              favorable, moderate, or severe (red, green, yellow?)
            - create an image to append to HTML for the icon(s)
            - convert unix timestamp with toLocaleDateString()
Step 5. Create an area for storing previously searched cities (under the searchbar)
        - dynamically create more HTML and inject the list of city data to the search history column.
            - when a city (in history) is clicked, it's current weather data/forcast is re-searched/returned from the weather API
Step 6: Create an array to save cities to local storage
        -Step 6.1: seperate the geolocation fetch and weather fetch to two seperate functions
        -Step 6.2: refactor the create button function (cityStorage)
        -Step 6.3: push items from the create button function to an array. 
            - Add values to local storage
        -Step 6.4: add event listener for buttons
        -Step 6.5: grab information from local storage through event.target
        -Step 6.6: run the openWeatherRequest function to search and display data

Future improvements:
- create an env file and new api key
- refactor displayWeather function
- the goal of making the HTML first was to display the user's current location weather first...
- prevent the user from adding duplicate buttons to the search history
- add styling outside of bootstrap
*/

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
      <div
        class="col-9 d-flex flex-wrap justify-content-center weatherContainer"
      >
        <!-- Section for sample city placeholder-->
        <div class="col-6 todayCard">
          <h1 id="current-city-date" class="cityTitle">Houston</h1>
          <p class="text-center currentDate">04/26/2022</p>
          <div class="d-flex flex-wrap justify-content-center">
            <img src="./assets/images/sun.png" class="col-3 currentIcon" />
            <div class="col-3">
              <p class="currentTemprature">47.79*</p>
              <p class="currentWind">
                Wind: <br />
                Humidity: <br />
                UV Index:
              </p>
            </div>
          </div>
        </div>

        <!-- Section for 5 day forecast-->
        <div class="col-12">
          <p class="text-left ml-4 col-10 forecastTitle">5-Day Forecast</p>
          <div class="d-flex flex-wrap justify-content-around">
            <div class="col-lg-2 text-center forecastCard">
              <p id="day-one-date" class="forecastDate">01/22</p>
              <img src="./assets/images/sun.png" class="forcastIcon" />
              <p id="dayOne">
                <span class="forecastTemp">46.78*</span>
                <br />
                4mph <br />
                78%
              </p>
            </div>
            <div class="col-lg-2 forecastCard">
              <div>
                <h4 id="day-two-date"></h4>
              </div>
              <p id="dayTwo">
                Temp: <br /><br />
                Wind: <br /><br />
                Humidity: <br /><br />
              </p>
            </div>
            <div class="col-lg-2 forecastCard">
              <div>
                <h4 id="day-three-date"></h4>
              </div>
              <p id="dayThree">
                Temp: <br /><br />
                Wind: <br /><br />
                Humidity: <br /><br />
              </p>
            </div>
            <div class="col-lg-2 forecastCard">
              <div>
                <h4 id="day-four-date"></h4>
              </div>
              <p id="dayFour">
                Temp: <br /><br />
                Wind: <br /><br />
                Humidity: <br /><br />
              </p>
            </div>
            <div class="col-lg-2 forecastCard">
              <div>
                <h4 id="day-five-date"></h4>
              </div>
              <p id="dayFive">
                Temp: <br /><br />
                Wind: <br /><br />
                Humidity: <br /><br />
              </p>
            </div>
          </div>
        </div>
        <p class="credits">
          Built with Love, Open Weather API, and
          <span
            ><a href="https://www.flaticon.com/free-icons/cloud"
              >Flaticon</a
            ></span
          >
        </p>
      </div>
*/
