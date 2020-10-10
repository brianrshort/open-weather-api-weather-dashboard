//Let's get started
$( document ).ready(function() {

    console.log(localStorage.getItem("city"));

    var query_param;

    //Using Luxon to get date
    let DateTime = luxon.DateTime;

    //Open weather authentication ID
    var appID = "330bdacad723effeefd38103fc953d4e";

    //Variable for counting how many items in the search box element
    let query_count = 0; 

    //Variables to grab latitude and longitude coordinates from Open Weather that can then be resubmitted for other queries
    var longitude;
    var latitude;

    //The basic API request URL
    var weather = "http://api.openweathermap.org/data/2.5/weather?q=" + query_param + "&APPID=" + appID;

    //Creating the five-day forecast API request URL
    var fiveDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${appID}`;

    //The UVI API request URL
    var uvi = `http://api.openweathermap.org/data/2.5/uvi/forecast?lat=${latitude}&lon=${longitude}&appid=${appID}`;

    
       
    
        
    //Our big function to get data through Open Weather API and append it to our HTML
    function populate() {

         //Grabs the value of the search box
        query_param = $(this).prev().val();
        localStorage.setItem("city" , query_param);
        console.log(query_param);
        
        //Increases the query count, appends the search item below the search box, adds event listener for items
        //below the search box, populates the result boxes and five-day forecast boxes based on clicked item
        if (query_count < 10) {
            query_count++;
            let queryBreak = $("<hr>");
            let queryEl = $("<div>");
            queryEl.text(query_param);
            $(".search-box").append(queryBreak , queryEl);
            queryEl.on("click" , function() {
                    populate();
                })
        }    
        
        //Our API request
        $.getJSON(weather,function(json){
            
            //Filling the results box with information from the API JSON
            $("#city").html(json.name);
            $("#weather_image").attr("src", "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png");
            $("#main_weather").html(`Weather: ${json.weather[0].main}`);
            $("#temperature").html(`Temperature: ${Math.floor(json.main.temp * 9 / 5 - 459.67)}F`);
            $("#humidity").html(`Humidity: ${json.main.humidity}%`);

            //Setting our variables to the coordinates retrieved from the first search; our user is searching
            //via city name, not longitude/latitude coordinates, so we need to get these coordinates from 
            //Open Weather to then make more refined requests to Open Weather based on long/lat
            longitude = json.coord.lon;
            latitude = json.coord.lat;         
           
            

            //Our UVI API request
            $.getJSON(uvi, function(json) {
                //Creating our UVI element
                $("#uvi").html(`UVI: <span id="uvi-color" class="badge">${json[0].value}</span>`);
                //If/else if statement to change the backgroudn color based on the UVI index
                if (json[0].value <= 2) {
                    $("#uvi-color").addClass("badge-info");
                } else if (json[0].value <= 5) {
                    $("#uvi-color").addClass("badge-primary");
                } else if (json[0].value <= 7) {
                    $("#uvi-color").addClass("badge-warning");
                } else if (json[0].value <= 10) {
                    $("#uvi-color").addClass("badge-danger");
                }

            //The five-day forecast API request
            $.getJSON(fiveDay, function(json) {

                //Creates and fill the first day forecasted weather information
                $("#dateOne").html(DateTime.local().toLocaleString());
                $("#imageOne").attr("src", "http://openweathermap.org/img/w/" + json.daily[0].weather[0].icon + ".png");
                $("#humidityOne").html(`${json.daily[0].humidity}% hum`);
                $("#tempOne").html(`${Math.floor(json.daily[0].temp.day * 9 / 5 - 459.67)}F`);

                //Creates and fill the second day forecasted weather information
                $("#dateTwo").html(DateTime.local().plus({days: 1}).toLocaleString());
                $("#imageTwo").attr("src", "http://openweathermap.org/img/w/" + json.daily[1].weather[0].icon + ".png");
                $("#humidityTwo").html(`${json.daily[1].humidity}% hum`);
                $("#tempTwo").html(`${Math.floor(json.daily[1].temp.day * 9 / 5 - 459.67)}F`);

                //Creates and fill the third day forecasted weather information
                $("#dateThree").html(DateTime.local().plus({days: 2}).toLocaleString());
                $("#imageThree").attr("src", "http://openweathermap.org/img/w/" + json.daily[2].weather[0].icon + ".png");
                $("#humidityThree").html(`${json.daily[2].humidity}% hum`);
                $("#tempThree").html(`${Math.floor(json.daily[2].temp.day * 9 / 5 - 459.67)}F`);

                //Creates and fill the fourth day forecasted weather information
                $("#dateFour").html(DateTime.local().plus({days: 3}).toLocaleString());
                $("#imageFour").attr("src", "http://openweathermap.org/img/w/" + json.daily[3].weather[0].icon + ".png");
                $("#humidityFour").html(`${json.daily[3].humidity}% hum`);
                $("#tempFour").html(`${Math.floor(json.daily[3].temp.day * 9 / 5 - 459.67)}F`);

                //Creates and fill the fifth day forecasted weather information                
                $("#dateFive").html(DateTime.local().plus({days: 4}).toLocaleString());
                $("#imageFive").attr("src", "http://openweathermap.org/img/w/" + json.daily[4].weather[0].icon + ".png");
                $("#humidityFive").html(`${json.daily[4].humidity}% hum`);
                $("#tempFive").html(`${Math.floor(json.daily[4].temp.day * 9 / 5 - 459.67)}F`);
            })

        })
        
    });
    
    //Event listener for the search buttons
    $(".query_btn").click(function(){
        populate();
    })
}
})