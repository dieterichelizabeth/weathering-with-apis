# 06 Weathering-With-API's

Challenge 6 Server-Side API: Weather Dashboard

This project is an application (using Javascript, HTML, and CSS) to search for weather data. A user can type a city name into the search bar, and the app will display today's weather, as well as a 5 day forecast. Previous searches are saved under the search bar, and can be used to re-display weather for that city name.
It includes the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api) to retrieve weather data for cities, and `localStorage` to store persistent data.

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Our challenge was to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS based on the following criteria-

```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

Click to view the [deployed application](https://dieterichelizabeth.github.io/weathering-with-apis/)

## Screenshots

![Screen Shot 2022-01-31 at 12 58 44 AM](https://user-images.githubusercontent.com/95142863/151751450-3fdd1d44-1823-4ff1-9820-6f245ec2bca8.png)

## Documentation/Resources

- [API documentation](https://openweathermap.org/api/one-call-api)
- [API city documentation](https://openweathermap.org/current#name)
- [API icons](https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2)
- [UVI Index](<https://www.who.int/news-room/questions-and-answers/item/radiation-the-ultraviolet-(uv)-index>)
- [response.json](https://developer.mozilla.org/en-US/docs/Web/API/Response/json)
- [.querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
- [.innerhtml](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
- [Image Constructor](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
- [Date Constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
- [Local Date String Method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
- [Blog on API key use](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys)

---

© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
