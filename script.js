$(document).ready(function () {
	var currentCity = $("#city-weather");
	var _5DayBox = $("#five-day");

	var getCity = JSON.parse(localStorage.getItem("city"));
	if (getCity) {
		getWeatherReport(getCity);
	}

	function getWeatherReport(cityToSearch) {
		$("#searchCity").val("");
		$("#city-weather").empty();

		$.ajax({
			url:
				"http://api.openweathermap.org/data/2.5/weather?q=" +
				cityToSearch +
				"&units=imperial&appid=73bc46b9424e41f245151d328bfa5a7a",

			method: "GET",
		}).then(function (response) {
			$("holder").empty();

			// console.log(response);
			// console.log(response.name);
			// console.log(
			// 	"The current forecast calls for " +
			// 		response.weather[0].description
			// );
			// console.log(
			// 	"The current temperature is " + response.main.temp + "F"
			// );
			// console.log("Low:" + response.main.temp_min + "F");
			// console.log("High:" + response.main.temp_max + "F");
			// console.log(
			// 	"Humidity currently at " + response.main.humidity + "%"
			// );
			// console.log(
			// 	"Wind is moving at a speed of:" + response.wind.speed + "mph"
			// );

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

	function _5day(city) {
		var _key = "73bc46b9424e41f245151d328bfa5a7a";
		var _queryURL =
			"http://api.openweathermap.org/data/2.5/forecast?q=" +
			city +
			"&units=imperial&appid=";

		$.ajax({
			url: _queryURL + _key,
			method: "GET",
		}).then(function (_response) {
			var listArray = _response.list;
			var _forecast = listArray.slice(0, 5);
			for (let i = 0; i < _forecast.length; i++) {
				console.log(_forecast[i]);
				var day = _forecast[i];
				var humidity = day.main.humidity;
				var temp = day.main.temp;
				var _dayDiv = $("<div>");
				_dayDiv.attr("class", "day-box");
				_dayDiv.attr("id", "_boxForecast");

				var _4castTemp = $("<p>");
				_4castTemp.attr("class", "info");
				_4castTemp.attr("id", "cast-temp");
				_4castTemp.text(temp);
				_dayDiv.append(_4castTemp);

				var _humidity = $("<p>");
				_humidity.attr("class", "humid");
				_humidity.attr("id", "humidity-box");
				_humidity.text(humidity);
				_dayDiv.append(_humidity);

				$("#five-day").append(_dayDiv);
			}

			// console.log(_response.city.name);
			// console.log(listArray[0].main.temp);
			// console.log(listArray[0].main.temp_min);
			// console.log(listArray[0].main.temp_max);

			// console.log(_response.list);
			// console.log(listArray[0].weather);
		});
	}

	$("#start-search").on("click", function (event) {
		event.preventDefault();

		var city = $("#searchCity").val();
		if (!city) {
			alert("Please enter a valid city");
		} else {
			localStorage.setItem("city", JSON.stringify(city));
			console.log(city);
			getWeatherReport(city);
			_5day(city);
		}
	});
});
