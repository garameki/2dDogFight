globalEventsJS=null;

var gMouseDown=false;
var gMouseMove=false;
var gMouseXMove=null,gMouseYMove=null;

var gMouseDownChase=false;
var gMouseMoveChase=false;


//この場所以外でgMouse*の値を変えてはいけない
document.addEventListener('mousedown',function(event){
	gMouseDown=true;
	gMouseMove=false;
	gMouseMoveTrace=false;
	gMouseDownChase=true;
	gMouseMoveChase=false;
	gMouseXDown=event.clientX;
	gMouseYDown=event.clientY;

},true);
document.addEventListener('mousemove',function(event){
	gMouseMove=true;
	gMouseMoveTrace=true;
	gMouseMoveChase=true;
	gMouseXMove=event.clientX;
	gMouseYMove=event.clientY;
},true);
document.addEventListener('mouseup',function(event){
//	var hoge=setInterval(function(){//なぜここでIntervalをいれたのか謎
		if(gMouseDown!=gMouseDownChase)console.error("gMouseDownがここ以外で変更されています。");
		if(gMouseMove!=gMouseMoveChase)console.error("gMouseMoveがここ以外で変更されています。");
		gMouseMove=false;
		gMouseDown=false;
		//●gMouseMoveTrace=false;//痕跡(trace)を残すために値を変えない
		gMouseDownChase=false;
		gMouseMoveChase=false;
//		clearInterval(hoge);
//	},50);
},true);

var hogeStatus=setInterval(function(){
	window.status="(X:"+gMouseXMove+" Y:"+gMouseYMove+")  down:"+gMouseDown.toString()+" move:"+gMouseMove.toString();
},10);
