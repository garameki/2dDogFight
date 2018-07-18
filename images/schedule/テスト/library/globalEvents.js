eventsJS=null;




//‚±‚ÌêŠˆÈŠO‚ÅgMouse*‚Ì’l‚ğ•Ï‚¦‚Ä‚Í‚¢‚¯‚È‚¢
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
