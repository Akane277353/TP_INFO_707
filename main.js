/*######################################################
Import
######################################################*/
const {Worker} = require("worker_threads");
let OBJ = require("./modules/objet.js");

let Capteur = OBJ.Capteur;

/*######################################################
Constante
######################################################*/


let lsCap = [];
let capNB = 4;

let lsCol = [];
let colNB = 3;

let lsCon = [];
let conNB = 1;

/*######################################################
Main
######################################################*/





function main(){
	init();
	console.log("Executed in the parent thread");
	setInterval(getval,2000);
}
main()


/*######################################################
Function
######################################################*/

function sleep(s)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < s*1000);
}


function getval() {
	for (var i = 0; i < capNB; i++) {
		lsCap[i].val();
	}
}

 function init(){
	for (var i = 0; i < capNB; i++) {
	lsCap.push(new Capteur("Capteur "+(i+1)));
	}
	for (var i = 0; i < capNB; i++) {
		lsCap[i].start();
	}
 }