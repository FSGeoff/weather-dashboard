$(document).ready(function () {
	var city = "";
	var currentCity = $("#city-weather");
	var _5DayBox = $("#five-day");

	function getWeatherReport(cityToSearch) {
		$("#searchCity").text("");
		$.ajax({
			url:
				"http://api.openweathermap.org/data/2.5/weather?q=" +
				cityToSearch +
				"&units=imperial&appid=73bc46b9424e41f245151d328bfa5a7a",

			method: "GET",
		}).then(function (response) {
			$("holder").empty();

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
			todayWeatherDiv.attr("id", "today-box");

			var cityHeader = $("<h1>");
			cityHeader.attr("id", "city-head");
			cityHeader.text(cityToSearch);
			todayWeatherDiv.append(cityHeader);

			var temperature = $("<p>");
			temperature.attr("id", "temp");
			temperature.attr("class", "main-box");
			temperature.text(
				"Temperature: " + parseInt(response.main.temp) + "F"
			);
			todayWeatherDiv.append(temperature);

			var humidity = $("<p>");
			humidity.attr("id", "humid");
			humidity.attr("class", "main-box");
			humidity.text("Humidity: " + response.main.humidity + "%");
			todayWeatherDiv.append(humidity);

			var windSpeed = $("<p>");
			windSpeed.attr("id", "wnd-spd");
			windSpeed.attr("class", "main-box");
			windSpeed.text("Wind Speed: " + response.wind.speed + "MPH");
			todayWeatherDiv.append(windSpeed);

			var uvIndex = $("<p>");
			uvIndex.attr("id", "uv-dex");
			uvIndex.attr("class", "main-box");
			uvIndex.text("UV Index: ");
			todayWeatherDiv.append(uvIndex);

			var forecast = $("<p>");
			forecast.attr("id", "for-cst");
			forecast.attr("class", "main-box");
			forecast.text(
				"The current forecast calls for " +
					response.weather[0].description
			);
			todayWeatherDiv.append(forecast);

			$("#city-weather").append(todayWeatherDiv);

			cityList(cityToSearch);
		});
	}

	function cityList(listOfCities) {
		var cityListDiv = $("<div>");
		cityListDiv.attr("id", "past-city-list");

		var lastCityChosen = $("<p>");
		lastCityChosen.attr("class", "past-list");
		lastCityChosen.text(listOfCities);
		cityListDiv.append(lastCityChosen);
		$("#city-list").append(cityListDiv);
	}

	$("#submitCity").on("submit", function (event) {
		$("#city-weather").empty();

		event.preventDefault();
		var city = $("#searchCity").val();
		console.log(city);
		getWeatherReport(city);
	});
});
