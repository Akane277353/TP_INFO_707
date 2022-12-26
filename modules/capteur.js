let valeur = Math.floor(Math.random()*100);
const {parentPort, workerData} = require("worker_threads");
let id = workerData.name


function sleep(s)
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < s*1000);
}


parentPort.on("message", data => {
	if (data.do == "ON") {
		parentPort.postMessage({res:"start"});		
	}
	if (data.do == "VAL") {
		parentPort.postMessage({res:"val",val: valeur});
	}
	parentPort.postMessage({res:"error"});
});


function main() {
	valeur = valeur+1;
	let txt = id + " => "+valeur+"°C";

	
	
	sleep(0.5);
	//main();
	
}

setInterval(main, 10);




