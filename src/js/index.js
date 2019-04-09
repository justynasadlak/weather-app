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