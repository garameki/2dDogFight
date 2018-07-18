var date = Date.now();

var count=0;
var hoge = setInterval(function(){
	count++;
	console.log("interval1  ",count," time = ",Math.round((Date.now()-date)/10)/100);	
	for(var ii=0;ii<10000000;ii++);
	if(count==10)clearInterval(hoge);
},100);
