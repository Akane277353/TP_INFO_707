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

let Colecteur = class{
	constructor(name){
		this.name = name;
		this.colecteur =  new Worker("./modules/colecteur.js", {workerData: {name: this.name}});


		this.colecteur.on("error", error => {
		  console.log(error);
		});

		this.colecteur.on("exit", exitCode => {
		  console.log(`${this.name} END !`);
		})

		this.colecteur.on("message", result => {
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

module.exports ={
    Capteur:Capteur
}