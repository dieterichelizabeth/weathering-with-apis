# Weathering-With-API's ☔️

Weathering With APi's is a weather dashboard where users can search for weather data based on city name. A user can search for a city such as "San Francisco" and the app will display the current weather, as well as a 5 day forecast. Previous searches are saved under the search bar, and can be used to re-display weather for that city.

Weathering With API's uses the [Open Weather Map API](https://openweathermap.org/) and features dynamically updated HTML and CSS through Javascript. This project uses Node.js and Express.js to create a server for handling requests to the API.

[Click to view the deployed application](https://fast-scrubland-73567.herokuapp.com/)

Built with: Javascript, HTML, CSS, and Node.js.

## Screenshots

<img width="1223" alt="Screen Shot 2022-09-15 at 1 05 57 AM" src="https://user-images.githubusercontent.com/95142863/190487394-5675f968-60ed-4fdb-9a39-e14f36f54ab2.png">

## Lessons Learned

One of the learning oportunities I ran into while completing this project was protecting the API key. After completing the first version (which can be viewed on branch: "version-1.0"), I recieved notifications from pushing my key into the repo. To keep this new version as close to the original as possible (since the point of the project was to build a fully functioning Weather App using vanilla JavaScript), the updates to Weathering With API's contain the previous files in the public folder, and server to serve the public files.

The first challenge I ran into was the JavaScript in script.js did not understand process.env.apiKey. As a result, I used [dotenv](https://www.npmjs.com/package/dotenv) to store a reference to the apiKey in the .env file when run locally, and created a route to the server which would handle the API requests.

```
// CITY VALIDATOR
var citySearchHandler = async function (cityname) {
  // Request to the server for Open Weather API Geolocation
  const response = await fetch("/city", {
    method: "post",
    body: JSON.stringify({
      cityname,
    }),
    headers: { "Content-Type": "application/json" },
  })
  ...
```

The second challenge I ran into was using the fetch request in Node.js (version 16.13.2). This project now uses [Node Fetch](https://www.npmjs.com/package/node-fetch#post-with-form-parameters) package library to complete the requests and send the data back to the "script.js" file as follows:

```
// Fetch the City Coodinates from Open Weather API
app.post("/city", async (req, res, next) => {
 const city = req.body.cityname;
 const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.apiKey}`;
 // console.log(url);
 const response = await fetch(url)
   .then((response) => response.json())
   .then((data) => res.json(data))
   .catch((err) => console.log(err));
});
```

## User Story

This application was developed based on the following Criteria.

User Story:

```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```

Criteria:

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

## Technologies Used

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /> 
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> 
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />   
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />

## Documentation/Resources

- [Open Weather documentation](https://openweathermap.org/api/one-call-api)
- [Open Weather city documentation](https://openweathermap.org/current#name)
- [Open Weather icons](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
- [UVI Index](<https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index>)
- [response.json](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
- [.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [.innerhtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
- [Image Constructor](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
- [Date Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
- [Local Date String Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
- [Blog on Open Weather use](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys)

---

Made with Love
