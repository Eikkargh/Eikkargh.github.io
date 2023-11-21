let varSave = {
	"xstart":null,
	"xend":null,
	"xtar":null,
	"xaim":null,
	"dubdim":null,
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

function dubDim() {
	let dubDim = document.getElementById("dubdim").checked;
	let coins = ["hero", "guild", "chal", "lab"];
	if (dubDim) {
		for (c = 0; c < coins.length; c++) {
			coin = coins[c];
			maxTok = parseInt(document.getElementById("maxtok"+coin).innerHTML);
			maxCost = parseInt(document.getElementById("max"+coin).innerHTML);
			maxTok = maxTok * 2;
			maxCost = maxCost * 2;
			document.getElementById("maxtok"+coin).innerHTML = maxTok;
			document.getElementById("max"+coin).innerHTML = maxCost;
			updateCoin();
		}
	} else {
		for (c = 0; c < coins.length; c++) {
			coin = coins[c];
			maxTok = parseInt(document.getElementById("maxtok"+coin).innerHTML);
			maxCost = parseInt(document.getElementById("max"+coin).innerHTML);
			maxTok = maxTok / 2;
			maxCost = maxCost / 2;
			document.getElementById("maxtok"+coin).innerHTML = maxTok;
			document.getElementById("max"+coin).innerHTML = maxCost;
			updateCoin();
		}
		
	}
}
function getCookie() {
	let cookie = document.cookie;
	if (cookie != null && cookie != "") {
		let name = "inputFieldsAFK=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				console.log(c);
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
			if (key == "xaim" || key == "dubdim") {
				document.getElementById(key).checked = value;
			} else {
				if (value != null) {
					document.getElementById(key).value = value;
				}
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
	document.cookie = "inputFieldsAFK=" + cValue + ";" + expires + ";path=/;domain=" + window.location.hostname;
}
function getTodaysDate() {
	let datestamp = new Date().getTime();
	let today = datestamp - (datestamp % 86400000);
	return today;
}
function getDaysRem() {
	let xaim = document.getElementById("xaim").checked;
	let xtar = "";
	if (xaim) {
		xtar = document.getElementById("xstart").value;
	} else {
		xtar = document.getElementById("xend").value;
	}
	if ( xtar != null && xtar != "" ){
		updateCookie('xstart');
		updateCookie('xend');
		updateCookie('xaim');
		let xtarint = Math.floor(new Date(xtar));
		rdays = (xtarint - getTodaysDate()) / 86400000 - 1;
		document.getElementById("rdays").innerHTML = rdays;
		updateCoin();
	}
}
function getDaysLog() {
	let rstart = document.getElementById("rstart").value;
	if (rstart != null && rstart != "") {
		updateCookie('rstart');
		let rstartint = Math.floor(new Date(rstart));
		dayslog = (getTodaysDate() - rstartint) / 86400000 + 1;
		document.getElementById("dayslog").innerHTML = dayslog;
		getDaysRem();
	}
}
function setCoin(id) {
	updateCookie(id);
	let coin = id.substring(2);
	let st = parseInt(document.getElementById('st'+coin).value);
	let cu = parseInt(document.getElementById('cu'+coin).value);
	let sp = parseInt(document.getElementById('sp'+coin).value);		
	if ( !!st && !!cu && !!dayslog ) {
		let x = parseInt((cu - st + sp) / dayslog);
		document.getElementById("rate"+coin).innerHTML = x;
		if ( !!rdays ) {
			let y = parseInt((x * rdays) + cu);
			document.getElementById("pred"+coin).innerHTML = y;
			let max = parseInt(document.getElementById("max"+coin).innerHTML);
			let z = parseInt(y - max);
			document.getElementById("rem"+coin).innerHTML = z;			
			let cost = parseInt(document.getElementById("cost"+coin).innerHTML)
			let maxtok = parseInt(document.getElementById("maxtok"+coin).innerHTML);
			let pos = parseInt(y / cost)
			if (pos > maxtok) {
				pos = maxtok;
			}
			document.getElementById("pos"+coin).innerHTML = pos;
			let curtok = parseInt(cu / cost);
			if (curtok > maxtok) {
				curtok = maxtok;
			}
			document.getElementById("tok"+coin).innerHTML = curtok;
		}
	}
}
function updateCoin() {
	let coinsCalc = ["sthero","stguild","stchal","stlab"]
	for (let i = 0; i < coinsCalc.length; i++){
		setCoin(coinsCalc[i]);		
	}
}
