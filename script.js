$(document).ready(function () {
	var city = "";
	var currentCity = $("#city-weather");
	var _5DayBox = $("#five-day");

	function getWeatherReport(cityToSearch) {
		$.ajax({
			url:
				"http://api.openweathermap.org/data/2.5/weather?q=" +
				cityToSearch +
				"&units=imperial&appid=73bc46b9424e41f245151d328bfa5a7a",

			method: "GET",
		}).then(function (response) {
			console.log(response);
			console.log(response.name);
			console.log(
				"The current forecast calls for " +
					response.weather[0].description
			);
			console.log(
				"The current temperature is " + response.main.temp + "F"
			);
			console.log("Low:" + response.main.temp_min + "F");
			console.log("High:" + response.main.temp_max + "F");
			console.log(
				"Humidity currently at " + response.main.humidity + "%"
			);
			console.log(
				"Wind is moving at a speed of:" + response.wind.speed + "mph"
			);

			var todayWeatherDiv = $("<div>");

			var temperature = $("<p>");
			temperature.attr("class", "temp");
			temperature.text("Temp:" + response.main.temp);
			todayWeatherDiv.append(temperature);

			$("#city-weather").append(todayWeatherDiv);
		});
	}

	$("#submitCity").on("submit", function (event) {
		event.preventDefault();
		var city = $("#searchCity").val();
		console.log(city);
		getWeatherReport(city);
	});
});
