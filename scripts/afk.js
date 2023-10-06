let varSave = {
	"xstart":null,
	"xend":null,
	"rstart":null,
	"sthero":null,
	"stguild":null,
	"stlab":null,
	"stchal":null,
	"cuhero":null,
	"cuguild":null,
	"culab":null,
	"cuchal":null,
	"sphero":null,
	"spguild":null,
	"splab":null,
	"spchal":null
};
let rdays = null;
let dayslog = null;
let exdays = 182;

function getCookie() {
	console.log("getCookie triggered");
	let cookie = document.cookie;
	console.log("cookie: "+cookie);
	if (cookie != null && cookie != "") {
		let name = "inputFields=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substing(1);
			}
			if (c.indexOf(name) == 0) {
				console.log("Cookie loaded: "+c.substring(name.length, c.length));
				return c.substring(name.length, c.length);
			} 
		}
	} else {
		console.log("Cookie not found");
		return "";
	}
}
function checkCookie() {
	console.log("checkCookie triggered");
	let valueStr = getCookie();
	console.log("valueStr: "+valueStr);
	if (valueStr != "" && valueStr != undefined) {
		varSave = JSON.parse(valueStr);
		console.log("varSave type: "+ typeof varSave);
		const keys = Object.keys(varSave);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const value = varSave[key]
			if (value != null) {
				console.log(key + ":" + value);
				document.getElementById(key).innerHTML = value;
			}
		}
	}			
}
function updateCookie(id) {
	console.log("updateCookie triggered for: "+id);
	let value = document.getElementById(id).value;
	varSave[id] = value;
	cValue = JSON.stringify(varSave)
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+d.toUTCString();
	console.log("expires: "+expires);
	document.cookie = "inputFields=" + cValue + ";" + expires + ";path=/;domain=" + window.location.hostname;
}
function getTodaysDate() {
	let datestamp = new Date().getTime();
	let today = datestamp - (datestamp % 86400000);
	return today;
}
function getDaysRem() {
	let xend = document.getElementById("xend").value;
	updateCookie('xend');
	let xendint = Math.floor(new Date(xend));
	rdays = (xendint - getTodaysDate()) / 86400000 - 1;
	document.getElementById("rdays").innerHTML = rdays;
}
function getDaysLog() {
	let rstart = document.getElementById("rstart").value;
	updateCookie('rstart');
	let rstartint = Math.floor(new Date(rstart));
	dayslog = (getTodaysDate() - rstartint) / 86400000 + 1;
	document.getElementById("dayslog").innerHTML = dayslog;
}
function updateCoin(id) {
	value = document.getElementById(id).value;
	updateCookie(id);
	let field = id.substring(0, 2);
	let coin = id.substring(2);
	let st = parseInt(document.getElementById('st'+coin).value);
	let cu = parseInt(document.getElementById('cu'+coin).value);
	let sp = parseInt(document.getElementById('sp'+coin).value);
	if ( !!st && !!cu && !!sp && !!dayslog ) {
		x = Math.floor((cu - st + sp) / dayslog);
		document.getElementById('rate'+coin).innerHTML = x;
		if ( !!rdays ) {
			y = Math.floor((x * rdays) + cu);
			document.getElementById('pred'+coin).innerHTML = y;
		}
	}
}
