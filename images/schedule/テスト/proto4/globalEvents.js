globalEventsJS=null;

var gMouseDown=false;
var gMouseMove=false;
var gMouseXMove=null,gMouseYMove=null;

var gMouseDownChase=false;
var gMouseMoveChase=false;


//���̏ꏊ�ȊO��gMouse*�̒l��ς��Ă͂����Ȃ�
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
//	var hoge=setInterval(function(){//�Ȃ�������Interval�����ꂽ�̂���
		if(gMouseDown!=gMouseDownChase)console.error("gMouseDown�������ȊO�ŕύX����Ă��܂��B");
		if(gMouseMove!=gMouseMoveChase)console.error("gMouseMove�������ȊO�ŕύX����Ă��܂��B");
		gMouseMove=false;
		gMouseDown=false;
		//��gMouseMoveTrace=false;//����(trace)���c�����߂ɒl��ς��Ȃ�
		gMouseDownChase=false;
		gMouseMoveChase=false;
//		clearInterval(hoge);
//	},50);
},true);

var hogeStatus=setInterval(function(){
	window.status="(X:"+gMouseXMove+" Y:"+gMouseYMove+")  down:"+gMouseDown.toString()+" move:"+gMouseMove.toString();
},10);
