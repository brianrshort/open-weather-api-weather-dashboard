$( document ).ready(function() {
    var appID = "";

    $(".query_btn").click(function(){

        var query_param = $(this).prev().val();

        var longitude;
        var latitude;

        var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;
        

       

        $.getJSON(weather,function(json){
            $("#city").html(json.name);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#main_weather").html(`Weather: ${json.weather[0].main}`);
            $("#temperature").html(`Temperature: ${json.main.temp} degrees`);
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
                //day image temp humidiy
            $.getJSON(fiveDay, function(json) {
                console.log(json.daily[0].weather);

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