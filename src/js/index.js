	//przy pobieraniu api dodaj units=metric na końcu url żeby mieć dane w m/s
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
	}



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

		document.querySelector("#city ").innerHTML = name;
		document.querySelector("#wind span").innerHTML = speed;
		document.querySelector("#humidity span").innerHTML = humidity;
		document.querySelector("#pressure span").innerHTML = pressure;
		document.querySelector("#temp span").innerHTML = Math.floor(temp);
		document.querySelector('header input').placeholder = name;
	}

	addToHTML(city);

	//ekran ładowania - jeden div o id loading - po pobraniu api ustaw jego display na none
	function symulateLoading() {
		loading(true)
		setTimeout(() => loading(false), 1000);
	}

	function loading(visible){
		if(visible)
			document.getElementById('loading').style.display = 'flex';
		else
			document.getElementById('loading').style.display = 'none';
	}
	function search(e) {
		e.preventDefault();
		let inputValue = document.querySelector('input[type=text]').value;
		loading(true);

		fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=80f7202c360f25cfb26af089b48da204&units=metric`)
			.then(res => res.json())
			.then(res => {
				addToHTML(res);
				loading(false);
			})
			.catch( () =>{
				loading(false);
				document.querySelector("#city").innerHTML = 'Błędne dane';
		});


	}

	document.querySelector('.icon-location').addEventListener("click", symulateLoading);
	document.querySelector('header form').addEventListener('submit', search);