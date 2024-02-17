'use strict';
var to_save_on_cookie = [];
const events_to_track = ['click'];
const els_to_track = document.querySelectorAll('button, a, input');

import './components/button-wc.js';
import './components/header-separator.js';
import './styles.scss';
events_to_track.forEach( evt => els_to_track.forEach(el => { el.addEventListener(evt, (e) => trackAction(e));}));

function trackAction(e){
	const title = e.target.title;
	const tag = e.target.tagName.toLowerCase();

	const action = {
		evt: e.type,
		el: tag,
		name: title
	};

	setCookie(action);
}

var timer = null;
var scroll_data = {};
const scroll_els = document.querySelectorAll('.scrollable');

window.addEventListener('scroll', (e) => trackScroll(e, true));
scroll_els.forEach(el => el.addEventListener('scroll', (e) => trackScroll(e, false)));

function trackScroll(e, is_window){
	if(timer !== null) clearTimeout(timer);

	if (!scroll_data['sY']) scroll_data['sY'] = window.pageYOffset;

	timer = setTimeout(function() {

		scroll_data['eY'] = window.pageYOffset;
		var distanceY = scroll_data.eY - scroll_data.sY;
		var distanceX = scroll_data.eX - scroll_data.sX;
		const title = e.target.title; 
		if(Math.abs(distanceY) > 20 || Math.abs(distanceX) > 20){
			const action = {
				evt: e.type,
				el: is_window ? 'window' :  e.target.tagName,
				name: title,
				sY: scroll_data.sY,
				sX:scroll_data.sX,
				eY: scroll_data.eY,
				eX: scroll_data.eX,
			};

			setCookie(action);
		}
		scroll_data = {};
				
				
	}, 150);
}

function setCookie(cvalue) {
	to_save_on_cookie.push(cvalue);
	document.cookie = 'actions=' + JSON.stringify(to_save_on_cookie) + ';expires=39999999;path=/;samesite=strict';
}