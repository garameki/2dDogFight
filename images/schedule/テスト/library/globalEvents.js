eventsJS=null;




//この場所以外でgMouse*の値を変えてはいけない
document.addEventListener('mousedown',function(event){
	gMouseDown=true;
},true);
document.addEventListener('mousemove',function(event){
	gMouseMove=true;
},true);
document.addEventListener('mouseup',function(event){
	var hoge=setInterval(function(){
		gMouseMove=false;
		gMouseDown=false;
	},50);
},true);
