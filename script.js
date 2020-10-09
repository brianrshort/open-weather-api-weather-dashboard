$( document ).ready(function() {
    var appID = "330bdacad723effeefd38103fc953d4e";

    $(".query_btn").click(function(){

        var query_param = $(this).prev().val();

        var longitude;
        var latitude;

        var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;
        
        //${Math.floor( * 9 / 5 - 459.67)
       

        $.getJSON(weather,function(json){
            $("#city").html(json.name);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#main_weather").html(`Weather: ${json.weather[0].main}`);
            $("#temperature").html(`Temperature: ${Math.floor(json.main.temp * 9 / 5 - 459.67)} degrees`);
            $("#humidity").html(`Humidity: ${json.main.humidity}%`);
            longitude = json.coord.lon;
            console.log(longitude);
            latitude = json.coord.lat;
            console.log(latitude);              
           
            var uvi = `http://api.openweathermap.org/data/2.5/uvi/forecast?lat=${latitude}&lon=${longitude}&appid=${appID}`;

            $.getJSON(uvi, function(json) {
                $("#uvi").html(`UVI: <span id="uvi-color">${json[0].value}</span>`);
                console.log(json[0].value);
                if (json[0].value <= 2) {
                    $("#uvi-color").addClass("green");
                } else if (json[0].value <= 5) {
                    $("#uvi-color").addClass("yellow");
                } else if (json[0].value <= 7) {
                    $("#uvi-color").addClass("orange");
                } else if (json[0].value <= 10) {
                    $("#uvi-color").addClass("red");
                }

            var fiveDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${appID}`;
            console.log(fiveDay);
                //day image temp humidity
            $.getJSON(fiveDay, function(json) {
                console.log(json.daily[0]);
                $("#dateOne").html(json.daily[0].weather[0].main);
                $("#imageOne").attr("src", "http://openweathermap.org/img/w/" + json.daily[0].weather[0].icon + ".png");
                $("#humidityOne").html(`Humidity: ${json.daily[0].humidity}%`);
                $("#tempOne").html(`${Math.floor(json.daily[0].temp.day * 9 / 5 - 459.67)} degrees`);

                $("#dateTwo").html(json.daily[1].weather[0].main);
                $("#imageTwo").attr("src", "http://openweathermap.org/img/w/" + json.daily[1].weather[0].icon + ".png");
                $("#humidityTwo").html(`Humidity: ${json.daily[1].humidity}%`);
                $("#tempTwo").html(`${Math.floor(json.daily[1].temp.day * 9 / 5 - 459.67)} degrees`);

                $("#dateThree").html(json.daily[2].weather[0].main);
                $("#imageThree").attr("src", "http://openweathermap.org/img/w/" + json.daily[2].weather[0].icon + ".png");
                $("#humidityThree").html(`Humidity: ${json.daily[2].humidity}%`);
                $("#tempThree").html(`${Math.floor(json.daily[2].temp.day * 9 / 5 - 459.67)} degrees`);

                $("#dateFour").html(json.daily[3].weather[0].main);
                $("#imageFour").attr("src", "http://openweathermap.org/img/w/" + json.daily[3].weather[0].icon + ".png");
                $("#humidityFour").html(`Humidity: ${json.daily[3].humidity}%`);
                $("#tempFour").html(`${Math.floor(json.daily[3].temp.day * 9 / 5 - 459.67)} degrees`);

                $("#dateFive").html(json.daily[4].weather[0].main);
                $("#imageFive").attr("src", "http://openweathermap.org/img/w/" + json.daily[4].weather[0].icon + ".png");
                $("#humidityFive").html(`Humidity: ${json.daily[4].humidity}%`);
                $("#tempFive").html(`${Math.floor(json.daily[4].temp.day * 9 / 5 - 459.67)} degrees`);
            })

            })
        
        });

    })




    // Optional Code for temperature conversion
    var fahrenheit = true;

    $("#convertToCelsius").click(function() {
        if (fahrenheit) {
            $("#temperature").text(((($("#temperature").text() - 32) * 5) / 9));
        }
        fahrenheit = false;
    });

    $("#convertToFahrenheit").click(function() {
        if (fahrenheit == false) {
            $("#temperature").text((($("#temperature").text() * (9/5)) + 32));
        }
        fahrenheit = true;
    });
});