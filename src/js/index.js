import '../css/loading.css';
import '../css/fontello.css';
import '../css/layout.css';
import '../css/look.css';
import {setWeather} from './weather';
setWeather('', true);  // default is geolocation

$('.icon-location').click( () => {
	setWeather('', true);
})

$('form').submit((event) => {
	event.preventDefault();
	setWeather($('form input').val());
})
$('.icon-search').click(() => {
	setWeather($('form input').val());
})