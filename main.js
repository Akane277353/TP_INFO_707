/*######################################################
Import
######################################################*/
const {Worker} = require("worker_threads");

let Capteur = class{
	constructor(name){
		this.name = name;
		this.capteur =  new Worker("./modules/capteur.js", {workerData: {name: this.name}});


		this.capteur.on("error", error => {
		  console.log(error);
		});

		this.capteur.on("exit", exitCode => {
		  console.log(`${this.name} END !`);
		})

		this.capteur.on("message", result => {
			if (result.res == "start") {
				 console.log(`${this.name} => Start !`);
			}

			if (result.res == "val") {
				 console.log(`${this.name} => ${result.val}°C`);
			}

			//console.log(result);
		 
		});

	}
	start(){
		this.capteur.postMessage({do:"ON"});
	}
	val(){
		this.capteur.postMessage({do:"VAL"})
	}
}

/*######################################################
Main
######################################################*/


let lsCap = [];
let capNB = 3;
for (var i = 0; i < capNB; i++) {
	lsCap.push(new Capteur("Capteur "+(i+1)));
}
for (var i = 0; i < capNB; i++) {
	lsCap[i].start();
}

function sleep(s)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < s*1000);
}

console.log("Executed in the parent thread");
function getval() {
	for (var i = 0; i < capNB; i++) {
		lsCap[i].val();
	}
}

setInterval(getval,2000);