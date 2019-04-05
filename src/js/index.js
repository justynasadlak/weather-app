const setWeather = (cityName) => {
	if(!cityName){ 
		if ("geolocation" in navigator) {
			// geolokacja jest dostepna, zczytanie wartosci z szerokosci i wysokosci geograficznych
			navigator.geolocation.getCurrentPosition((position) => {
				const lat = position.coords.latitude;
				const lon = position.coords.longitude;
				$.ajax({
					url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=bd188a60c6f03b3849a561219f8a7f5d&units=metric&lang=pl`,
					type: "GET",
					dataType: "json",
					success: (data) => __addToHTML(data)  
				});
			});
		} else {
			__cityWeather(); 
		}
	} else {
		__cityWeather(cityName);
	}
}

function __cityWeather(cityName = 'Wrocław') {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=bd188a60c6f03b3849a561219f8a7f5d&units=metric&lang=pl`,
		type: "GET",
		dataType: "jsonp",
		success: (data) => __addToHTML(data)
	});
}

function __addToHTML(city) {
	document.querySelector("#city ").innerText = city.name;
	document.querySelector("#wind span").innerText = city.wind.speed;
	document.querySelector("#humidity span").innerText =  city.main.humidity;
	document.querySelector("#pressure span").innerText = city.main.pressure;
	document.querySelector("#temp span").innerText =  Math.round(city.main.temp); // Math.round jest lepsze w tej sytuacji
}
setWeather();
