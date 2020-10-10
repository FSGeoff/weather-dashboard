$(document).ready(function () {
	var city = "New York";
	var queryURL =
		"http://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&units=imperial&appid=";
	var key = "73bc46b9424e41f245151d328bfa5a7a";

	var cityInput = $("#searchCity");
	var currentCity = $("#city-weather");
	var _5DayBox = $("#five-day");

	$.ajax({
		url: queryURL + key,

		method: "GET",
	}).then(function (response) {
		console.log(
			"The current forecast calls for " + response.weather[0].description
		);
		console.log(response.main);
		console.log("The current temperature is " + response.main.temp + "F");
		console.log("Low:" + response.main.temp_min + "F");
		console.log("High:" + response.main.temp_max + "F");
		console.log("Humidity currently at " + response.main.humidity + "%");
		console.log(
			"Wind is moving at a speed of:" + response.wind.speed + "mph"
		);
	});
});
