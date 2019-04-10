import _css0 from '../css/loading.css';
import _css1 from '../css/fontello.css';
import _css2 from '../css/layout.css';
import _css3 from '../css/look.css';
import {setWeather} from './weather';
setWeather('', true);  // default is geolocation

$('.icon-location').click( () => {
	setWeather('', true);
})

$('form').submit((event) => {
	event.preventDefault();
	setWeather($('form input').val());
	$('form input').val("");
})
$('.icon-search').click(() => {
	setWeather($('form input').val());
	$('form input').val("");
})