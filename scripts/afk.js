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
	let cookie = document.cookie;
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
				return c.substring(name.length, c.length);
			} 
		}
	} else {
		return "";
	}
}
function checkCookie() {
	let valueStr = getCookie();
	if (valueStr != "" && valueStr != undefined) {
		varSave = JSON.parse(valueStr);
		const keys = Object.keys(varSave);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let value = varSave[key];
			if (value != null) {
				document.getElementById(key).value = value;
			}
		}
		getDaysRem();
		getDaysLog();
		updateCoin();
	}			
}
function updateCookie(id) {
	let value = document.getElementById(id).value;
	varSave[id] = value;
	cValue = JSON.stringify(varSave)
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = "inputFields=" + cValue + ";" + expires + ";path=/;domain=" + window.location.hostname;
}
function getTodaysDate() {
	let datestamp = new Date().getTime();
	let today = datestamp - (datestamp % 86400000);
	return today;
}
function getDaysRem() {
	let xend = document.getElementById("xend").value;
	if ( xend != null && xend != "" ){
		updateCookie('xend');
		let xendint = Math.floor(new Date(xend));
		rdays = (xendint - getTodaysDate()) / 86400000 - 1;
		document.getElementById("rdays").innerHTML = rdays;
	}
}
function getDaysLog() {
	let rstart = document.getElementById("rstart").value;
	if (rstart != null && rstart != "") {
		updateCookie('rstart');
		let rstartint = Math.floor(new Date(rstart));
		dayslog = (getTodaysDate() - rstartint) / 86400000 + 1;
		document.getElementById("dayslog").innerHTML = dayslog;
	}
}
function setCoin(id) {
	updateCookie(id);
	let coin = id.substring(2);
	let st = parseInt(document.getElementById('st'+coin).value);
	let cu = parseInt(document.getElementById('cu'+coin).value);
	let sp = parseInt(document.getElementById('sp'+coin).value);		
	if ( !!st && !!cu && !!dayslog ) {
		let x = Math.floor((cu - st + sp) / dayslog);
		document.getElementById(rateCoin).innerHTML = x;
		if ( !!rdays ) {
			let y = Math.floor((x * rdays) + cu);
			document.getElementById("pred"+coin).innerHTML = y;
		}
	}
}
function updateCoin() {
	let coinsCalc = [
		["sthero","cuhero","sphero"],
		["stguild","cuguild","spguild"],
		["stlab","culab","splab"],
		["stchal","cuchal","spchal"]
	]
	let st = 0;
	let cu = 0;
	let sp = 0;
	for (let i = 0; i < coinsCalc.length; i++){
		for (let j = 0; j < coinsCalc[i].length; j++) {
			let name = coinsCalc[i][j];
			let field = name.substring(0,2);
			let coin = name.substring(2);
			let value = varSave[field+coin];
			console.log(field+ " " +value);
			eval(field + "= value");
			console.log("eval(field)=" +eval(field)+ " field=" +field+ " value=" +value);
			
		}
		console.log("Values: st=" +st+ " cu=" +cu+ " sp=" +sp+ " dayslog=" +dayslog+ " rdays" +rdays);
		if ( !!st && !!cu && !!dayslog ) {
			let x = Math.floor((cu - st + sp) / dayslog);
			console.log("updateCoin x: "+ x);
			document.getElementById('rate'+coin).innerHTML = x;
			if ( !!rdays ) {
				let y = Math.floor((x * rdays) + cu);
				console.log("updateCoin y: "+ y);
				document.getElementById('pred'+coin).innerHTML = y;
			}
		}
	}
}
