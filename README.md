# 06 Weathering-With-API's

Challenge 6 Server-Side API: Weather Dashboard

Weathering With APi's is a weather dashboard where users can search for weather data based on city name. A user can search for a city such as "San Francisco" and the app will display the current weather, as well as a 5 day forecast. Previous searches are saved under the search bar, and can be used to re-display weather for that city. This project using the [Open Weather Map](https://openweathermap.org/) featuring dynamically updated HTML and CSS with Javascript.

[Click to view the deployed application](https://dieterichelizabeth.github.io/weathering-with-apis/)

## Screenshots

<img width="1369" alt="Screen Shot 2022-04-27 at 1 07 52 AM" src="https://user-images.githubusercontent.com/95142863/165452437-e580b805-b2f1-4f7e-99f0-147e7a3981e6.png">

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
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```

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

© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
