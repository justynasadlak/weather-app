export const setWeather = (cityName, isGeolocation = false) => {
	__loading(); // start of loading
	if (isGeolocation) {
		if ("geolocation" in navigator) {
			// run if geolocation is available in the browser
			navigator.geolocation.getCurrentPosition((position) => {
				// run if success
				const lat = position.coords.latitude;
				const lon = position.coords.longitude

				$.ajax({
					url: `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=bd188a60c6f03b3849a561219f8a7f5d&units=metric&lang=pl`,
					type: "GET",
					dataType: "json",
					success: (data) => __addToHTML(data),
					error: () => {
						alert('Serwer nie odpowiada. Przepraszamy, ale nie możemy znaleźć Twojej lokalizacji.');
						__loading();
					}
				});
			}, () => {
				// run if error occurs
				alert('Przepraszamy, ale nie możemy znaleźć Twojej lokalizacji.');
				__loading();
			});
		} else {
			// run if gelocation is not available
			alert('Przepraszamy, ale Twoja przeglądarka nie wspiera usług geolokacji.');
			__cityWeather();
		}
	} else {
		__cityWeather(cityName);
	}
}
function __loading() {
	const $loader = $('#loading'); 
	if($loader.css('display') === 'none') {
		$loader.css('display', 'flex')
	} else {
		$loader.css('display', 'none');
	}
}
function __cityWeather(cityName = 'Wrocław') {
	$.ajax({
		url: `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=bd188a60c6f03b3849a561219f8a7f5d&units=metric&lang=pl`,
		type: "GET",
		dataType: "jsonp",
		success: (data) => __addToHTML(data),
		error: () => { // if error occurs, set city to Wrocław
			alert('Przepraszamy, ale wystąpił błąd.')
			__loading();
		}
	});
}

function __addToHTML( { city, list } ) {
	__loading(); //end of loading

	const nextDays = __nextFourDays(list);

	document.querySelector(".city ").innerText = city.name;

	document.querySelector(`.day1 .wind span`).innerText = list[0].wind.speed;
	document.querySelector(`.day1 .humidity span`).innerText = list[0].main.humidity;
	document.querySelector(`.day1 .pressure span`).innerText = list[0].main.pressure;
	document.querySelector(`.day1 .temp span`).innerText = Math.round(list[0].main.temp);
	for (let i = 2; i < 6; i++) {
		document.querySelector(`.day${i} .wind span`).innerText = nextDays[i-2].wind;
		document.querySelector(`.day${i} .humidity span`).innerText = nextDays[i-2].humidity;
		document.querySelector(`.day${i} .pressure span`).innerText = nextDays[i-2].pressure;
		document.querySelector(`.day${i} .temp span`).innerText = Math.round(nextDays[i-2].temp);
	}
}

function __nextFourDays(weatherList) {
	const output = [];
	let currentDay = {
		temp: 0,
		wind: 0,
		humidity: 0,
		pressure: 0,
		isNew: true
	};
	let humidityCalc = [0, 0]; // 1 - sum, 2 - n
	for (let i = 0; i < weatherList.length; i++) {
		if (weatherList[i].dt_txt.match(/00:00:00/g)) {
			let {
				isNew,
				...usefulData
			} = currentDay;
			if (humidityCalc[1] === 0) usefulData.humidity = weatherList[i].main.humidity;
			else usefulData.humidity = humidityCalc[0] / humidityCalc[1];
			output.push(usefulData);
			for (let prop in currentDay) currentDay[prop] = 0; // make currentDay empty
			currentDay.isNew = true;
			humidityCalc = [0, 0];
		}
		currentDay.isNew = false;

		if (weatherList[i].dt_txt.match(/1[2,5,8]:00:00|09:00:00/g)) {
			humidityCalc[0] += weatherList[i].main.humidity;
			humidityCalc[1] += 1;
		}
		currentDay.temp = currentDay.temp > weatherList[i].main.temp ?
			currentDay.temp : weatherList[i].main.temp;

		currentDay.pressure = currentDay.pressure > weatherList[i].main.pressure ?
			currentDay.pressure : weatherList[i].main.pressure;

		currentDay.wind = currentDay.wind > weatherList[i].wind.speed ?
			currentDay.wind : weatherList[i].wind.speed;
	}
	if (!currentDay.isNew && output.length == 4) {
		output.push(currentDay);
	}

	return output.slice(1);
}