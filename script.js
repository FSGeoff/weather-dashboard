$(document).ready(function () {
	var date = moment().format("L");

	var getCity = JSON.parse(localStorage.getItem("city"));
	if (getCity) {
		getWeatherReport(getCity);
	}

	function getWeatherReport(cityToSearch) {
		$("#searchCity").val("");
		$("#city-weather").empty();

		$.ajax({
			url:
				"https://api.openweathermap.org/data/2.5/weather?q=" +
				cityToSearch +
				"&units=imperial&appid=73bc46b9424e41f245151d328bfa5a7a",

			method: "GET",
		}).then(function (response) {
			var longitude = response.coord.lon;
			var latitude = response.coord.lat;

			var todayWeatherDiv = $("<div>");
			todayWeatherDiv.attr("id", "today-box");

			var cityHeader = $("<h3>");
			cityHeader.attr("id", "city-head");
			cityHeader.text(cityToSearch + " (" + date + ")");
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
			uVIndex(longitude, latitude);
		});
	}

	function uVIndex(lon, lat) {
		$.ajax({
			url:
				"https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
				lat +
				"&lon=" +
				lon +
				"&appid=73bc46b9424e41f245151d328bfa5a7a",
			method: "GET",
		}).then(function (response) {
			var uVRating = response[0].value;

			var uvi = $("<p>");
			var uvScore = parseInt(Math.round(uVRating));

			switch (uvScore) {
				case (uvScore = 0):
				case (uvScore = 1):
				case (uvScore = 2):
					uvi.css("background-color", "green");
					break;
				case (uvScore = 3):
				case (uvScore = 4):
				case (uvScore = 5):
					uvi.css("background-color", "yellow");
					break;
				case (uvScore = 6):
				case (uvScore = 7):
				case (uvScore = 8):
					uvi.css("background-color", "orange");
					break;
				default:
					uvi.css("background-color", "red");
			}

			uvi.attr("class", "uv-rate");
			uvi.css("width", "15%");
			uvi.text("UV Index: " + uVRating);

			$("#city-weather").append(uvi);
		});
	}

	function cityList(listOfCities) {
		var cityListDiv = $("<div>");
		cityListDiv.attr("id", "past-city-list");
		cityListDiv.css("height", "35px");
		cityListDiv.css("background-color", "#f7f7f7");
		cityListDiv.css("font-size", "22px");
		cityListDiv.css("border", "solid grey 1px");

		var lastCityChosen = $("<p>");
		lastCityChosen.attr("class", "past-list");
		lastCityChosen.text(listOfCities);
		cityListDiv.append(lastCityChosen);
		$("#city-list").append(cityListDiv);
	}

	function _5day(city) {
		var _key = "73bc46b9424e41f245151d328bfa5a7a";
		var _queryURL =
			"https://api.openweathermap.org/data/2.5/forecast?q=" +
			city +
			"&units=imperial&appid=";
		$("#five-day").empty();

		$.ajax({
			url: _queryURL + _key,
			method: "GET",
		}).then(function (_response) {
			var listArray = _response.list;
			var _forecast = listArray.slice(0, 5);
			console.log(listArray[0].main.feels_like);

			for (let i = 0; i < _forecast.length; i++) {
				var day = _forecast[i];
				var humidity = day.main.humidity;
				var temp = day.main.temp;
				var _dayDiv = $("<div>");
				_dayDiv.attr("class", "day-box");
				_dayDiv.attr("id", "five-day");
				_dayDiv.css("height", "180px");
				_dayDiv.css("width", "150px");
				_dayDiv.css("font-size", "13px");
				_dayDiv.css("border-radius", "10px");

				var dateDisplay = $("<p>");
				dateDisplay.text(moment().add([i], "days").calendar());
				_dayDiv.append(dateDisplay);

				var _4castTemp = $("<p>");
				_4castTemp.attr("class", "info");
				_4castTemp.attr("id", "cast-temp");
				_4castTemp.text("Temp: " + parseInt(temp) + "F");
				_dayDiv.append(_4castTemp);

				var feelsLike = $("<p>");
				feelsLike.attr("class", "info");
				feelsLike.attr("id", "feel");
				feelsLike.text(
					"Feels like: " + Math.round(listArray[i].main.feels_like)
				);
				_dayDiv.append(feelsLike);

				var _humidity = $("<p>");
				_humidity.attr("class", "info");
				_humidity.attr("id", "humidity-box");
				_humidity.text("Humidity: " + humidity + "%");
				_dayDiv.append(_humidity);

				$("#five-day").append(_dayDiv);
			}
		});
	}

	$("#start-search").on("click", function (event) {
		event.preventDefault();

		var city = $("#searchCity").val();
		if (!city) {
			alert("Please enter a valid city");
		} else {
			localStorage.setItem("city", JSON.stringify(city));
			getWeatherReport(city);
			_5day(city);
		}
	});
});
