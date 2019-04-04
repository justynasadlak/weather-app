function setWeatherData(cityName = 'Wrocław') {
	$.ajax({
			url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=bd188a60c6f03b3849a561219f8a7f5d&units=metric&lang=pl`,
			type: "GET",
			dataType: "jsonp",
			success: (data) => addToHTML(data) 
		})      
	}

function addToHTML(city) {
	document.querySelector("#city ").appendChild(document.createTextNode(city.name));
	document.querySelector("#wind span").appendChild(document.createTextNode(city.wind.speed));
	document.querySelector("#humidity span").appendChild(document.createTextNode(city.main.humidity));
	document.querySelector("#pressure span").appendChild(document.createTextNode(city.main.pressure));
	document.querySelector("#temp span").appendChild(document.createTextNode(Math.round(city.main.temp))); // Math.round jest lepsze w tej sytuacji
}

setWeatherData();