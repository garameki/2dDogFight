var date2 = Date.now();

var count2=0;
var hoge2 = setInterval(function(){
	count2++;
	console.log("interval2  ",count2," time = ",Math.round((Date.now()-date2)/10)/100);	
	if(count2==10)clearInterval(hoge2);
},100);
