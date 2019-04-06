const setWeather = (cityName) => {
	if(!cityName){ 
		if ("geolocation" in navigator) {
			// run if geolocation is available in the browser
			navigator.geolocation.getCurrentPosition((position) => {
				// run if success
				const lat = position.coords.latitude;
				const lon = position.coords.longitude

				$.ajax({
					url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=bd188a60c6f03b3849a561219f8a7f5d&units=metric&lang=pl`,
					type: "GET",
					dataType: "json",
					success: (data) => __addToHTML(data),
					error: () => __cityWeather('Wrocław')
				});
			}, () => {
				// run if error occurs
				__cityWeather();
			});
		} else {
			// run if gelocation is not available
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
		success: (data) => __addToHTML(data),
		error: () => setWeather()   // if error occurs, set city to Wrocław
	});
}

function __addToHTML(city) {
	document.querySelector("#city ").innerText = city.name;
	document.querySelector("#wind span").innerText = city.wind.speed;
	document.querySelector("#humidity span").innerText =  city.main.humidity;
	document.querySelector("#pressure span").innerText = city.main.pressure;
	document.querySelector("#temp span").innerText =  Math.round(city.main.temp);
}
setWeather();