$(document).ready(function () {
	var city = "Atlanta";
	var queryURL =
		"http://api.openweathermap.org/data/2.5/weather?q=atlanta&units=imperial&appid=";
	var key = "73bc46b9424e41f245151d328bfa5a7a";

	var cityInput = $("#searchCity");
	var currentCity = $("#city-weather");
	var _5DayBox = $("#five-day");

	$.ajax({
		url: queryURL + key,

		method: "GET",
	}).then(function (response) {
		console.log(
			"The current forecast is:" + response.weather[0].description
		);
		console.log("The temperature is:" + response.main.temp);
		console.log("Low:" + response.main.temp_min);
		console.log("High:" + response.main.temp_max);
		console.log("Humidity currently at " + response.main.humidity + "%");
		console.log(
			"Wind is moving at a speed of:" + response.wind.speed + "mph"
		);
	});
});
