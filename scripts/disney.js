function sellSkills(){
	let curSkill = varSave["curskill"]
	let maxSkill = redSkill[maxlvl]["skill"];
	let sellSkill = curSkill - maxSkill;
	if (sellSkill < 0) sellSkill = 0;
	updateHTML("sellskill",sellSkill);
	let goldProfit = sellSkill * 4000;
	updateHTML("profitgold",goldProfit);
}
function maxCost(){
	let max = redSkill[maxlvl];
	let current = redSkill[varSave["startlvl"]];
	for (i = 0; i < resList.length; i++){
		res = resList[i];
		let maxRes = max[res] - current[res];
		updateHTML("max"+res,maxRes);
	}
}
function posLvl(){
	for (i = 0; i < resList.length; i++){
		let cur = varSave["cur"+resList[i]];
		for (l = varSave["startlvl"]; l < redSkill.length; l++){
			if (redSkill[l][resList[i]] > cur){
				lows[i] = l;
				break;
			}
		}
	}
	pos = Math.min(...lows);
	updateHTML("poslvl",pos);
}
function getTarSpare(){
	for (i = 0; i < resList.length; i++){
		let res = resList[i];
		if (!!varSave["cur"+res]){
			let tar = parseInt(document.getElementById("tar"+res).innerHTML);
			let spare = varSave["cur"+res] - tar;
			updateHTML("tsp"+res,spare);
		}
	}
}
function getTargetCost(){
	let cost = redSkill[varSave["tarlvl"]];
	let spent = redSkill[varSave["startlvl"]];
	for (i = 0; i < resList.length; i++){
		let res = resList[i];
		let totalRes = cost[res] - spent[res];
		updateHTML("tar"+res,totalRes);
	}
}
function getHTML(field){
	let value = parseInt(document.getElementById(field).value);
	varSave[field] = value;
	updateCookie();
	if (!!varSave["tarlvl"]){
		getTargetCost();
		getTarSpare();
	}
	if (!!varSave["curhero"] && !!varSave["curskill"] && !!varSave["curgold"]){
		posLvl();
		maxCost();
		sellSkills();
	}
}
function updateHTML(field, value){
	if (value === true || value === false){
		document.getElementById(field).checked = value;
	}else{
		let valueFormatted = value.toLocaleString('en-GB');
		if (field.substring(field.length-4) == "gold") valueFormatted = valueFormatted+"g";
		document.getElementById(field).innerHTML = valueFormatted;
	}
	let stylise = document.getElementById(field); 
	if (value < 0) stylise.style.color = "red";
	else stylise.style.color = "green";
}
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
				updateHTML(key, value);
			}
		}
		getTarget();
	}			
}
function updateCookie() {
	cValue = JSON.stringify(varSave)
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = "inputFields=" + cValue + ";" + expires + ";path=/;domain=" + window.location.hostname;
}
let exdays = 182; /*Cookie expire*/
const resList = ["hero","skill","gold"];
let lows = [0,0,0];
let pos = 0;
let start = 0;
let maxlvl = 255;

let varSave = {
	"startlvl":0,
	"tarlvl":0,
	"sellskills":0,
	"curhero":0,
	"curskill":0,
	"curgold":0
};
var redSkill = [
	 {
	   "hero": 0,
	   "skill": 0,
	   "gold": 0
	 },
	 {
	   "hero": 25,
	   "skill": 125,
	   "gold": 10000000
	 },
	 {
	   "hero": 30,
	   "skill": 135,
	   "gold": 10238800
	 },
	 {
	   "hero": 35,
	   "skill": 145,
	   "gold": 10484800
	 },
	 {
	   "hero": 40,
	   "skill": 155,
	   "gold": 10738000
	 },
	 {
	   "hero": 45,
	   "skill": 165,
	   "gold": 10998400
	 },
	 {
	   "hero": 50,
	   "skill": 175,
	   "gold": 11266000
	 },
	 {
	   "hero": 55,
	   "skill": 190,
	   "gold": 11540800
	 },
	 {
	   "hero": 60,
	   "skill": 205,
	   "gold": 11822800
	 },
	 {
	   "hero": 65,
	   "skill": 220,
	   "gold": 12112000
	 },
	 {
	   "hero": 70,
	   "skill": 235,
	   "gold": 12408400
	 },
	 {
	   "hero": 75,
	   "skill": 250,
	   "gold": 12712000
	 },
	 {
	   "hero": 81,
	   "skill": 270,
	   "gold": 13022800
	 },
	 {
	   "hero": 87,
	   "skill": 290,
	   "gold": 13340800
	 },
	 {
	   "hero": 93,
	   "skill": 310,
	   "gold": 13666000
	 },
	 {
	   "hero": 99,
	   "skill": 330,
	   "gold": 13998400
	 },
	 {
	   "hero": 105,
	   "skill": 350,
	   "gold": 14338000
	 },
	 {
	   "hero": 111,
	   "skill": 375,
	   "gold": 14684800
	 },
	 {
	   "hero": 117,
	   "skill": 400,
	   "gold": 15038800
	 },
	 {
	   "hero": 123,
	   "skill": 425,
	   "gold": 15400000
	 },
	 {
	   "hero": 129,
	   "skill": 450,
	   "gold": 15768400
	 },
	 {
	   "hero": 135,
	   "skill": 475,
	   "gold": 16144000
	 },
	 {
	   "hero": 142,
	   "skill": 505,
	   "gold": 16526800
	 },
	 {
	   "hero": 149,
	   "skill": 535,
	   "gold": 16916800
	 },
	 {
	   "hero": 156,
	   "skill": 565,
	   "gold": 17314000
	 },
	 {
	   "hero": 163,
	   "skill": 595,
	   "gold": 17718400
	 },
	 {
	   "hero": 170,
	   "skill": 625,
	   "gold": 18130000
	 },
	 {
	   "hero": 177,
	   "skill": 660,
	   "gold": 18548800
	 },
	 {
	   "hero": 184,
	   "skill": 695,
	   "gold": 18974800
	 },
	 {
	   "hero": 191,
	   "skill": 730,
	   "gold": 19408000
	 },
	 {
	   "hero": 198,
	   "skill": 765,
	   "gold": 19848400
	 },
	 {
	   "hero": 205,
	   "skill": 800,
	   "gold": 20296000
	 },
	 {
	   "hero": 213,
	   "skill": 840,
	   "gold": 20750800
	 },
	 {
	   "hero": 221,
	   "skill": 880,
	   "gold": 21212800
	 },
	 {
	   "hero": 229,
	   "skill": 920,
	   "gold": 21682000
	 },
	 {
	   "hero": 237,
	   "skill": 960,
	   "gold": 22158400
	 },
	 {
	   "hero": 245,
	   "skill": 1000,
	   "gold": 22642000
	 },
	 {
	   "hero": 253,
	   "skill": 1045,
	   "gold": 23132800
	 },
	 {
	   "hero": 261,
	   "skill": 1090,
	   "gold": 23630800
	 },
	 {
	   "hero": 269,
	   "skill": 1135,
	   "gold": 24136000
	 },
	 {
	   "hero": 277,
	   "skill": 1180,
	   "gold": 24648400
	 },
	 {
	   "hero": 285,
	   "skill": 1225,
	   "gold": 25168000
	 },
	 {
	   "hero": 294,
	   "skill": 1275,
	   "gold": 25694800
	 },
	 {
	   "hero": 303,
	   "skill": 1325,
	   "gold": 26228800
	 },
	 {
	   "hero": 312,
	   "skill": 1375,
	   "gold": 26770000
	 },
	 {
	   "hero": 321,
	   "skill": 1425,
	   "gold": 27318400
	 },
	 {
	   "hero": 330,
	   "skill": 1475,
	   "gold": 27874000
	 },
	 {
	   "hero": 339,
	   "skill": 1530,
	   "gold": 28436800
	 },
	 {
	   "hero": 348,
	   "skill": 1585,
	   "gold": 29006800
	 },
	 {
	   "hero": 357,
	   "skill": 1640,
	   "gold": 29584000
	 },
	 {
	   "hero": 366,
	   "skill": 1695,
	   "gold": 30168400
	 },
	 {
	   "hero": 375,
	   "skill": 1750,
	   "gold": 30760000
	 },
	 {
	   "hero": 385,
	   "skill": 1810,
	   "gold": 31358800
	 },
	 {
	   "hero": 395,
	   "skill": 1870,
	   "gold": 31964800
	 },
	 {
	   "hero": 405,
	   "skill": 1930,
	   "gold": 32578000
	 },
	 {
	   "hero": 415,
	   "skill": 1990,
	   "gold": 33198400
	 },
	 {
	   "hero": 425,
	   "skill": 2050,
	   "gold": 33826000
	 },
	 {
	   "hero": 435,
	   "skill": 2115,
	   "gold": 34460800
	 },
	 {
	   "hero": 445,
	   "skill": 2180,
	   "gold": 35102800
	 },
	 {
	   "hero": 455,
	   "skill": 2245,
	   "gold": 35752000
	 },
	 {
	   "hero": 465,
	   "skill": 2310,
	   "gold": 36408400
	 },
	 {
	   "hero": 475,
	   "skill": 2375,
	   "gold": 37072000
	 },
	 {
	   "hero": 486,
	   "skill": 2445,
	   "gold": 37742800
	 },
	 {
	   "hero": 497,
	   "skill": 2515,
	   "gold": 38420800
	 },
	 {
	   "hero": 508,
	   "skill": 2585,
	   "gold": 39106000
	 },
	 {
	   "hero": 519,
	   "skill": 2655,
	   "gold": 39798400
	 },
	 {
	   "hero": 530,
	   "skill": 2725,
	   "gold": 40498000
	 },
	 {
	   "hero": 541,
	   "skill": 2800,
	   "gold": 41204800
	 },
	 {
	   "hero": 552,
	   "skill": 2875,
	   "gold": 41918800
	 },
	 {
	   "hero": 563,
	   "skill": 2950,
	   "gold": 42640000
	 },
	 {
	   "hero": 574,
	   "skill": 3025,
	   "gold": 43368400
	 },
	 {
	   "hero": 585,
	   "skill": 3100,
	   "gold": 44104000
	 },
	 {
	   "hero": 597,
	   "skill": 3180,
	   "gold": 44846800
	 },
	 {
	   "hero": 609,
	   "skill": 3260,
	   "gold": 45596800
	 },
	 {
	   "hero": 621,
	   "skill": 3340,
	   "gold": 46354000
	 },
	 {
	   "hero": 633,
	   "skill": 3420,
	   "gold": 47118400
	 },
	 {
	   "hero": 645,
	   "skill": 3500,
	   "gold": 47890000
	 },
	 {
	   "hero": 657,
	   "skill": 3585,
	   "gold": 48668800
	 },
	 {
	   "hero": 669,
	   "skill": 3670,
	   "gold": 49454800
	 },
	 {
	   "hero": 681,
	   "skill": 3755,
	   "gold": 50248000
	 },
	 {
	   "hero": 693,
	   "skill": 3840,
	   "gold": 51048400
	 },
	 {
	   "hero": 705,
	   "skill": 3925,
	   "gold": 51856000
	 },
	 {
	   "hero": 718,
	   "skill": 4015,
	   "gold": 52670800
	 },
	 {
	   "hero": 731,
	   "skill": 4105,
	   "gold": 53492800
	 },
	 {
	   "hero": 744,
	   "skill": 4195,
	   "gold": 54322000
	 },
	 {
	   "hero": 757,
	   "skill": 4285,
	   "gold": 55158400
	 },
	 {
	   "hero": 770,
	   "skill": 4375,
	   "gold": 56002000
	 },
	 {
	   "hero": 783,
	   "skill": 4470,
	   "gold": 56852800
	 },
	 {
	   "hero": 796,
	   "skill": 4565,
	   "gold": 57710800
	 },
	 {
	   "hero": 809,
	   "skill": 4660,
	   "gold": 58576000
	 },
	 {
	   "hero": 822,
	   "skill": 4755,
	   "gold": 59448400
	 },
	 {
	   "hero": 835,
	   "skill": 4850,
	   "gold": 60328000
	 },
	 {
	   "hero": 849,
	   "skill": 4950,
	   "gold": 61214800
	 },
	 {
	   "hero": 863,
	   "skill": 5050,
	   "gold": 62108800
	 },
	 {
	   "hero": 877,
	   "skill": 5150,
	   "gold": 63010000
	 },
	 {
	   "hero": 891,
	   "skill": 5250,
	   "gold": 63918400
	 },
	 {
	   "hero": 905,
	   "skill": 5350,
	   "gold": 64834000
	 },
	 {
	   "hero": 919,
	   "skill": 5455,
	   "gold": 65756800
	 },
	 {
	   "hero": 933,
	   "skill": 5560,
	   "gold": 66686800
	 },
	 {
	   "hero": 947,
	   "skill": 5665,
	   "gold": 67624000
	 },
	 {
	   "hero": 961,
	   "skill": 5770,
	   "gold": 68568400
	 },
	 {
	   "hero": 975,
	   "skill": 5875,
	   "gold": 69520000
	 },
	 {
	   "hero": 990,
	   "skill": 5985,
	   "gold": 70478800
	 },
	 {
	   "hero": 1005,
	   "skill": 6095,
	   "gold": 71444800
	 },
	 {
	   "hero": 1020,
	   "skill": 6205,
	   "gold": 72418000
	 },
	 {
	   "hero": 1035,
	   "skill": 6315,
	   "gold": 73398400
	 },
	 {
	   "hero": 1050,
	   "skill": 6425,
	   "gold": 74386000
	 },
	 {
	   "hero": 1065,
	   "skill": 6540,
	   "gold": 75380800
	 },
	 {
	   "hero": 1080,
	   "skill": 6655,
	   "gold": 76382800
	 },
	 {
	   "hero": 1095,
	   "skill": 6770,
	   "gold": 77392000
	 },
	 {
	   "hero": 1110,
	   "skill": 6885,
	   "gold": 78402000
	 },
	 {
	   "hero": 1125,
	   "skill": 7000,
	   "gold": 79422000
	 },
	 {
	   "hero": 1141,
	   "skill": 7120,
	   "gold": 80452000
	 },
	 {
	   "hero": 1157,
	   "skill": 7240,
	   "gold": 81482000
	 },
	 {
	   "hero": 1173,
	   "skill": 7360,
	   "gold": 82522000
	 },
	 {
	   "hero": 1189,
	   "skill": 7480,
	   "gold": 83572000
	 },
	 {
	   "hero": 1205,
	   "skill": 7600,
	   "gold": 84622000
	 },
	 {
	   "hero": 1221,
	   "skill": 7725,
	   "gold": 85682000
	 },
	 {
	   "hero": 1237,
	   "skill": 7850,
	   "gold": 86752000
	 },
	 {
	   "hero": 1253,
	   "skill": 7975,
	   "gold": 87832000
	 },
	 {
	   "hero": 1269,
	   "skill": 8100,
	   "gold": 88912000
	 },
	 {
	   "hero": 1285,
	   "skill": 8225,
	   "gold": 90002000
	 },
	 {
	   "hero": 1302,
	   "skill": 8355,
	   "gold": 91102000
	 },
	 {
	   "hero": 1319,
	   "skill": 8485,
	   "gold": 92212000
	 },
	 {
	   "hero": 1336,
	   "skill": 8615,
	   "gold": 93322000
	 },
	 {
	   "hero": 1353,
	   "skill": 8745,
	   "gold": 94442000
	 },
	 {
	   "hero": 1370,
	   "skill": 8875,
	   "gold": 95572000
	 },
	 {
	   "hero": 1387,
	   "skill": 9010,
	   "gold": 96702000
	 },
	 {
	   "hero": 1404,
	   "skill": 9145,
	   "gold": 97842000
	 },
	 {
	   "hero": 1421,
	   "skill": 9280,
	   "gold": 98992000
	 },
	 {
	   "hero": 1438,
	   "skill": 9415,
	   "gold": 100152000
	 },
	 {
	   "hero": 1455,
	   "skill": 9550,
	   "gold": 101312000
	 },
	 {
	   "hero": 1473,
	   "skill": 9690,
	   "gold": 102482000
	 },
	 {
	   "hero": 1491,
	   "skill": 9830,
	   "gold": 103662000
	 },
	 {
	   "hero": 1509,
	   "skill": 9970,
	   "gold": 104842000
	 },
	 {
	   "hero": 1527,
	   "skill": 10110,
	   "gold": 106032000
	 },
	 {
	   "hero": 1545,
	   "skill": 10250,
	   "gold": 107232000
	 },
	 {
	   "hero": 1563,
	   "skill": 10390,
	   "gold": 108442000
	 },
	 {
	   "hero": 1581,
	   "skill": 10530,
	   "gold": 109652000
	 },
	 {
	   "hero": 1599,
	   "skill": 10670,
	   "gold": 110872000
	 },
	 {
	   "hero": 1617,
	   "skill": 10810,
	   "gold": 112102000
	 },
	 {
	   "hero": 1635,
	   "skill": 10950,
	   "gold": 113342000
	 },
	 {
	   "hero": 1654,
	   "skill": 11100,
	   "gold": 114602000
	 },
	 {
	   "hero": 1673,
	   "skill": 11250,
	   "gold": 115872000
	 },
	 {
	   "hero": 1692,
	   "skill": 11400,
	   "gold": 117152000
	 },
	 {
	   "hero": 1711,
	   "skill": 11550,
	   "gold": 118442000
	 },
	 {
	   "hero": 1730,
	   "skill": 11700,
	   "gold": 119752000
	 },
	 {
	   "hero": 1749,
	   "skill": 11855,
	   "gold": 121092000
	 },
	 {
	   "hero": 1768,
	   "skill": 12010,
	   "gold": 122452000
	 },
	 {
	   "hero": 1787,
	   "skill": 12165,
	   "gold": 123822000
	 },
	 {
	   "hero": 1806,
	   "skill": 12320,
	   "gold": 125212000
	 },
	 {
	   "hero": 1826,
	   "skill": 12480,
	   "gold": 126642000
	 },
	 {
	   "hero": 1846,
	   "skill": 12640,
	   "gold": 128102000
	 },
	 {
	   "hero": 1866,
	   "skill": 12800,
	   "gold": 129592000
	 },
	 {
	   "hero": 1886,
	   "skill": 12960,
	   "gold": 131122000
	 },
	 {
	   "hero": 1906,
	   "skill": 13120,
	   "gold": 132682000
	 },
	 {
	   "hero": 1926,
	   "skill": 13285,
	   "gold": 134292000
	 },
	 {
	   "hero": 1946,
	   "skill": 13450,
	   "gold": 135952000
	 },
	 {
	   "hero": 1966,
	   "skill": 13615,
	   "gold": 137652000
	 },
	 {
	   "hero": 1986,
	   "skill": 13780,
	   "gold": 139402000
	 },
	 {
	   "hero": 2006,
	   "skill": 13945,
	   "gold": 141202000
	 },
	 {
	   "hero": 2027,
	   "skill": 14115,
	   "gold": 143052000
	 },
	 {
	   "hero": 2048,
	   "skill": 14285,
	   "gold": 144952000
	 },
	 {
	   "hero": 2069,
	   "skill": 14455,
	   "gold": 146902000
	 },
	 {
	   "hero": 2090,
	   "skill": 14625,
	   "gold": 148902000
	 },
	 {
	   "hero": 2111,
	   "skill": 14795,
	   "gold": 150942000
	 },
	 {
	   "hero": 2132,
	   "skill": 14970,
	   "gold": 153032000
	 },
	 {
	   "hero": 2153,
	   "skill": 15145,
	   "gold": 155172000
	 },
	 {
	   "hero": 2174,
	   "skill": 15320,
	   "gold": 157362000
	 },
	 {
	   "hero": 2195,
	   "skill": 15495,
	   "gold": 159602000
	 },
	 {
	   "hero": 2216,
	   "skill": 15670,
	   "gold": 161892000
	 },
	 {
	   "hero": 2238,
	   "skill": 15850,
	   "gold": 164232000
	 },
	 {
	   "hero": 2260,
	   "skill": 16030,
	   "gold": 166622000
	 },
	 {
	   "hero": 2282,
	   "skill": 16210,
	   "gold": 169052000
	 },
	 {
	   "hero": 2304,
	   "skill": 16390,
	   "gold": 171532000
	 },
	 {
	   "hero": 2326,
	   "skill": 16570,
	   "gold": 174062000
	 },
	 {
	   "hero": 2348,
	   "skill": 16755,
	   "gold": 176642000
	 },
	 {
	   "hero": 2370,
	   "skill": 16940,
	   "gold": 179272000
	 },
	 {
	   "hero": 2392,
	   "skill": 17125,
	   "gold": 181952000
	 },
	 {
	   "hero": 2414,
	   "skill": 17310,
	   "gold": 184682000
	 },
	 {
	   "hero": 2436,
	   "skill": 17495,
	   "gold": 187452000
	 },
	 {
	   "hero": 2459,
	   "skill": 17685,
	   "gold": 190272000
	 },
	 {
	   "hero": 2482,
	   "skill": 17875,
	   "gold": 193142000
	 },
	 {
	   "hero": 2505,
	   "skill": 18065,
	   "gold": 196062000
	 },
	 {
	   "hero": 2528,
	   "skill": 18255,
	   "gold": 199032000
	 },
	 {
	   "hero": 2551,
	   "skill": 18445,
	   "gold": 202052000
	 },
	 {
	   "hero": 2574,
	   "skill": 18640,
	   "gold": 205122000
	 },
	 {
	   "hero": 2597,
	   "skill": 18835,
	   "gold": 208232000
	 },
	 {
	   "hero": 2620,
	   "skill": 19030,
	   "gold": 211392000
	 },
	 {
	   "hero": 2643,
	   "skill": 19225,
	   "gold": 214602000
	 },
	 {
	   "hero": 2666,
	   "skill": 19420,
	   "gold": 217862000
	 },
	 {
	   "hero": 2690,
	   "skill": 19620,
	   "gold": 221172000
	 },
	 {
	   "hero": 2714,
	   "skill": 19820,
	   "gold": 224532000
	 },
	 {
	   "hero": 2738,
	   "skill": 20020,
	   "gold": 227942000
	 },
	 {
	   "hero": 2762,
	   "skill": 20220,
	   "gold": 231392000
	 },
	 {
	   "hero": 2786,
	   "skill": 20420,
	   "gold": 234892000
	 },
	 {
	   "hero": 2810,
	   "skill": 20625,
	   "gold": 238442000
	 },
	 {
	   "hero": 2834,
	   "skill": 20830,
	   "gold": 242042000
	 },
	 {
	   "hero": 2858,
	   "skill": 21035,
	   "gold": 245692000
	 },
	 {
	   "hero": 2882,
	   "skill": 21240,
	   "gold": 249392000
	 },
	 {
	   "hero": 2906,
	   "skill": 21445,
	   "gold": 253142000
	 },
	 {
	   "hero": 2931,
	   "skill": 21655,
	   "gold": 256932000
	 },
	 {
	   "hero": 2956,
	   "skill": 21865,
	   "gold": 260772000
	 },
	 {
	   "hero": 2981,
	   "skill": 22075,
	   "gold": 264662000
	 },
	 {
	   "hero": 3006,
	   "skill": 22285,
	   "gold": 268602000
	 },
	 {
	   "hero": 3031,
	   "skill": 22495,
	   "gold": 272592000
	 },
	 {
	   "hero": 3056,
	   "skill": 22710,
	   "gold": 276632000
	 },
	 {
	   "hero": 3081,
	   "skill": 22925,
	   "gold": 280722000
	 },
	 {
	   "hero": 3106,
	   "skill": 23140,
	   "gold": 284852000
	 },
	 {
	   "hero": 3131,
	   "skill": 23355,
	   "gold": 289032000
	 },
	 {
	   "hero": 3156,
	   "skill": 23570,
	   "gold": 293262000
	 },
	 {
	   "hero": 3182,
	   "skill": 23790,
	   "gold": 297542000
	 },
	 {
	   "hero": 3208,
	   "skill": 24010,
	   "gold": 301872000
	 },
	 {
	   "hero": 3234,
	   "skill": 24230,
	   "gold": 306252000
	 },
	 {
	   "hero": 3260,
	   "skill": 24450,
	   "gold": 310682000
	 },
	 {
	   "hero": 3286,
	   "skill": 24670,
	   "gold": 315152000
	 },
	 {
	   "hero": 3312,
	   "skill": 24895,
	   "gold": 319672000
	 },
	 {
	   "hero": 3338,
	   "skill": 25120,
	   "gold": 324242000
	 },
	 {
	   "hero": 3364,
	   "skill": 25345,
	   "gold": 328862000
	 },
	 {
	   "hero": 3390,
	   "skill": 25570,
	   "gold": 333532000
	 },
	 {
	   "hero": 3416,
	   "skill": 25795,
	   "gold": 338252000
	 },
	 {
	   "hero": 3443,
	   "skill": 26025,
	   "gold": 343022000
	 },
	 {
	   "hero": 3470,
	   "skill": 26255,
	   "gold": 347842000
	 },
	 {
	   "hero": 3497,
	   "skill": 26485,
	   "gold": 352702000
	 },
	 {
	   "hero": 3524,
	   "skill": 26715,
	   "gold": 357612000
	 },
	 {
	   "hero": 3551,
	   "skill": 26945,
	   "gold": 362572000
	 },
	 {
	   "hero": 3578,
	   "skill": 27180,
	   "gold": 367582000
	 },
	 {
	   "hero": 3605,
	   "skill": 27415,
	   "gold": 372642000
	 },
	 {
	   "hero": 3632,
	   "skill": 27650,
	   "gold": 377752000
	 },
	 {
	   "hero": 3659,
	   "skill": 27885,
	   "gold": 382912000
	 },
	 {
	   "hero": 3686,
	   "skill": 28120,
	   "gold": 388112000
	 },
	 {
	   "hero": 3714,
	   "skill": 28360,
	   "gold": 393362000
	 },
	 {
	   "hero": 3742,
	   "skill": 28600,
	   "gold": 398662000
	 },
	 {
	   "hero": 3770,
	   "skill": 28840,
	   "gold": 404012000
	 },
	 {
	   "hero": 3798,
	   "skill": 29080,
	   "gold": 409412000
	 },
	 {
	   "hero": 3826,
	   "skill": 29320,
	   "gold": 414862000
	 },
	 {
	   "hero": 3854,
	   "skill": 29565,
	   "gold": 420362000
	 },
	 {
	   "hero": 3882,
	   "skill": 29810,
	   "gold": 425902000
	 },
	 {
	   "hero": 3910,
	   "skill": 30055,
	   "gold": 431492000
	 },
	 {
	   "hero": 3938,
	   "skill": 30300,
	   "gold": 437132000
	 },
	 {
	   "hero": 3966,
	   "skill": 30545,
	   "gold": 442822000
	 },
	 {
	   "hero": 3995,
	   "skill": 30795,
	   "gold": 448562000
	 },
	 {
	   "hero": 4024,
	   "skill": 31045,
	   "gold": 454352000
	 },
	 {
	   "hero": 4053,
	   "skill": 31295,
	   "gold": 460192000
	 },
	 {
	   "hero": 4082,
	   "skill": 31545,
	   "gold": 466072000
	 },
	 {
	   "hero": 4111,
	   "skill": 31795,
	   "gold": 472002000
	 },
	 {
	   "hero": 4140,
	   "skill": 32050,
	   "gold": 477982000
	 },
	 {
	   "hero": 4169,
	   "skill": 32305,
	   "gold": 484012000
	 },
	 {
	   "hero": 4198,
	   "skill": 32560,
	   "gold": 490092000
	 },
	 {
	   "hero": 4227,
	   "skill": 32815,
	   "gold": 496222000
	 },
	 {
	   "hero": 4256,
	   "skill": 33070,
	   "gold": 502402000
	 },
	 {
	   "hero": 4286,
	   "skill": 33330,
	   "gold": 508622000
	 },
	 {
	   "hero": 4316,
	   "skill": 33590,
	   "gold": 514892000
	 },
	 {
	   "hero": 4346,
	   "skill": 33850,
	   "gold": 521212000
	 },
	 {
	   "hero": 4376,
	   "skill": 34110,
	   "gold": 527582000
	 },
	 {
	   "hero": 4406,
	   "skill": 34370,
	   "gold": 534002000
	 }
	];
