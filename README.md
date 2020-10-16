# open-weather-api-weather-dashboard
This project gives users an opportunity to select a city and quickly see the current weather
in that city and to see a quick 5-day forecast in a snapshot, easy-to-read format.

To complete this project I further developed my skills in javascript, jQuery, html, and CSS, and 
began using API GET methods for the first time. 

Over the course of this project, I also moved away from using nested functions becuase of the difficulties 
of trying to retrieve data from those nested functions. I also spend more attention to initializing my
javascript before starting it up. 

Repo: https://github.com/brianrshort/open-weather-api-weather-dashboard

Deployed web page: https://brianrshort.github.io/open-weather-api-weather-dashboard/ 

Image/gif: ![Moving gif of website in action](/assets/Weather-Dashboard.gif)

Here's the original assignment:
Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.
Use the OpenWeather API to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use localStorage to store any persistent data.

User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast