//Let's get started
$( document ).ready(function() {

    //Open weather authentication ID
    var appID = "166a433c57516f51dfab1f7edaed8413";

    //Pull last search from local storage, if there is one
    if (localStorage.getItem("city") !== undefined) {
        $("#city").html(localStorage.getItem("city"));
        getCoordinates(localStorage.getItem("city"));
    }

    //Using Luxon to get date
    let DateTime = luxon.DateTime; 

    //Variable for counting how many items in the search box element
    let query_count = 0; 

    //The One Call API from Open Weather has all of our information in it, but you need to longitude and latitude.
    //This function grabs the longitude and latitude and then calls our getWeather function to fill in the page. 
    function getCoordinates(query_param){

        //The basic API request URL
        var coords = "https://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;
        var longitude;
        var latitude;

        //Here's the API request to Open Weather that gives us our longitude and latitude coordinates
        $.ajax({
            url: coords,
            method: "GET"
          }).then(function(response) {
            longitude = response.coord.lon;
            latitude = response.coord.lat;
            getWeather(longitude, latitude);
        });

    //This gets the weather information from the One Call API from Open Weather and populates the page with it
    function getWeather(longitude, latitude) {
        var weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${appID}`;

            //Here's the API request
            $.ajax({
                url: weather,
                method: "GET"
            }).then(function(response) {

                //This section populates the current weather section of the HTML
                $("#weather_image").attr("src", "https://openweathermap.org/img/w/" + response.current.weather[0].icon + ".png");
                $("#main_weather").html(`Weather: ${response.current.weather[0].main}`);
                $("#temperature").html(`Temperature: ${Math.floor(response.current.temp * 9 / 5 - 459.67)}F`);
                $("#humidity").html(`Humidity: ${response.current.humidity}%`);
                $("#uvi").html(`UVI: <span id="uvi-color" class="badge">${response.current.uvi}</span>`);

                //If/else if statement to change the badge color based on the UVI index
                if (response.current.uvi <= 2) {
                    $("#uvi-color").addClass("badge-info");
                } else if (response.current.uvi <= 5) {
                    $("#uvi-color").addClass("badge-primary");
                } else if (response.current.uvi <= 7) {
                    $("#uvi-color").addClass("badge-warning");
                } else if (response.current.uvi <= 10) {
                    $("#uvi-color").addClass("badge-danger");
                }


                //Creates and fill the first day forecasted weather information
                let image1 = $("<img>");
                let image2  = $("<img>");
                let image3 = $("<img>");
                let image4 = $("<img>");
                let image5 = $("<img>");

                $("#dateOne").html(DateTime.local().toLocaleString());
                image1.attr("src", "https://openweathermap.org/img/w/" + response.daily[0].weather[0].icon + ".png");
                image1.attr("alt" , "weather icon");
                $("#imageOne").html(image1);
                $("#humidityOne").html(`${response.daily[0].humidity}% hum`);
                $("#tempOne").html(`${Math.floor(response.daily[0].temp.day * 9 / 5 - 459.67)}F`);

                //Creates and fill the second day forecasted weather information
                $("#dateTwo").html(DateTime.local().plus({days: 1}).toLocaleString());
                image2.attr("src", "https://openweathermap.org/img/w/" + response.daily[1].weather[0].icon + ".png");
                image2.attr("alt" , "weather icon");
                $("#imageTwo").html(image2);
                $("#humidityTwo").html(`${response.daily[1].humidity}% hum`);
                $("#tempTwo").html(`${Math.floor(response.daily[1].temp.day * 9 / 5 - 459.67)}F`);

                //Creates and fill the third day forecasted weather information
                $("#dateThree").html(DateTime.local().plus({days: 2}).toLocaleString());
                image3.attr("src", "https://openweathermap.org/img/w/" + response.daily[2].weather[0].icon + ".png");
                image3.attr("alt" , "weather icon");
                $("#imageThree").html(image3);
                $("#humidityThree").html(`${response.daily[2].humidity}% hum`);
                $("#tempThree").html(`${Math.floor(response.daily[2].temp.day * 9 / 5 - 459.67)}F`);

                //Creates and fill the fourth day forecasted weather information
                $("#dateFour").html(DateTime.local().plus({days: 3}).toLocaleString());
                image4.attr("src", "https://openweathermap.org/img/w/" + response.daily[3].weather[0].icon + ".png");
                image4.attr("alt" , "weather icon");
                $("#imageFour").html(image4);
                $("#humidityFour").html(`${response.daily[3].humidity}% hum`);
                $("#tempFour").html(`${Math.floor(response.daily[3].temp.day * 9 / 5 - 459.67)}F`);

                //Creates and fill the fifth day forecasted weather information                
                $("#dateFive").html(DateTime.local().plus({days: 4}).toLocaleString());
                image5.attr("src", "https://openweathermap.org/img/w/" + response.daily[4].weather[0].icon + ".png");
                image5.attr("alt" , "weather icon");
                $("#imageFive").html(image5);
                $("#humidityFive").html(`${response.daily[4].humidity}% hum`);
                $("#tempFive").html(`${Math.floor(response.daily[4].temp.day * 9 / 5 - 459.67)}F`);

            });
        }

    }

    //Here's the listener event for the query button, which begins a new search
    $(".query_btn").click(function(){

        //Grabs the value of the search box
        query_param = $(this).prev().val();
        localStorage.setItem("city" , query_param);
        $("#city").html(query_param);
        getCoordinates(query_param);


        //This logs our search requests below the search box in a history search list; the list is limited to ten items for
        //the sake of space
        if (query_count < 10) {
            query_count++;
            let queryBreak = $("<hr>");
            let queryEl = $("<div>");
            queryEl.text(query_param);
            queryEl.attr("data-name" , query_param);
            $(".search-box").append(queryBreak , queryEl);
            queryEl.on("click" , function() {
                var searchCity = $(this).attr("data-name");
                    $("#city").html(searchCity);
                    getCoordinates(searchCity);
                });
            }
        });
});

