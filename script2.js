$(document).ready(function () {
	var city = "Miami";
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
			console.log(_forecast);
		}

		// console.log(_response.city.name);
		// console.log(listArray[0].main.temp);
		// console.log(listArray[0].main.temp_min);
		// console.log(listArray[0].main.temp_max);

		// console.log(_response.list);
		// console.log(listArray[0].weather);
	});
});
