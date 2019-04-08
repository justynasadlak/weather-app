import '../css/fontello.css';
import '../css/layout.css';
import '../css/look.css';
	//przy pobieraniu api dodaj units=metric  i lang=pl na końcu url żeby mieć dane w m/s
	// https://openweathermap.org/current#data
	//PRZYKŁADOWY OBIEKT
	const city = {
		"coord": {
			"lon": 17.03,
			"lat": 51.1
		},
		"weather": [{
			"id": 800,
			"main": "Clear",
			"description": "bezchmurnie",
			"icon": "01n"
		}],
		"base": "stations",
		"main": {
			"temp": 3.24,
			"pressure": 1025,
			"humidity": 44,
			"temp_min": 1.67,
			"temp_max": 5
		},
		"visibility": 10000,
		"wind": {
			"speed": 4.1,
			"deg": 80
		},
		"clouds": {
			"all": 0
		},
		"rain": {
			"1h": 3
		},
		"dt": 1554147933,
		"sys": {
			"type": 1,
			"id": 1715,
			"message": 0.004,
			"country": "PL",
			"sunrise": 1554092905,
			"sunset": 1554139381
		},
		"id": 3081368,
		"name": "Wroclaw",
		"cod": 200
	};

	function addToHTML(recivedData) {

		//destrukturyzacja
		const {
			name,
			wind: {
				speed,
				deg
			},
			main: {
				pressure,
				temp,
				humidity
			}
		} = recivedData;

		document.querySelector("#city ").appendChild(document.createTextNode(name));
		document.querySelector("#wind span").appendChild(document.createTextNode(speed));
		document.querySelector("#humidity span").appendChild(document.createTextNode(humidity));
		document.querySelector("#pressure span").appendChild(document.createTextNode(pressure));
		document.querySelector("#temp span").appendChild(document.createTextNode(Math.floor(temp)));
	}

	addToHTML(city);