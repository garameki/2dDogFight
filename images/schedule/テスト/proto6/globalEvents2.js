/*
�J������

2	compressCookie�̕�����cookieJS�Ɉړ�


*/








globalEventsJS=null;

FR.push(new FileRelative('libraryJS','globalEventsJS'));//getUpperElements()
FR.push(new FileRelative('storageJS','globalEventsJS'));//localStorage�I�u�W�F�N�g
FR.push(new FileRelative('cookieJS','globalEventsJS'));//Cookie�I�u�W�F�N�g





var gMouseDown=false;
var gMouseMove=false;
var gMouseXMove=null,gMouseYMove=null;

var gMouseDownChase=false;
var gMouseMoveChase=false;


//���̏ꏊ�ȊO��gMouse*�̒l��ς��Ă͂����Ȃ�
document.addEventListener('mousedown',function(event){
	gMouseDown=true;
	gMouseMove=false;
	gMouseMoveTrace=false;//'mouseup'����hoge�����Ȃ��H�v
	gMouseDownChase=true;
	gMouseMoveChase=false;
	if(event.pageX<2000){
		gMouseXDown=event.pageX;
		gMouseClientXDown=event.clientX;
	};
	if(event.pageY<2000){
		gMouseYDown=event.pageY;
		gMouseClientYDown=event.clientY;
	};

},true);
document.addEventListener('mousemove',function(event){
	gMouseMove=true;
	gMouseMoveTrace=true;
	gMouseMoveChase=true;
	if(event.pageX<2000){
		gMouseXMove=event.pageX;
		gMouseClientXMove=event.clientX;
	};
	if(event.pageY<2000){
		gMouseYMove=event.pageY;
		gMouseClientYMove=event.clientY;
	};
},true);
document.addEventListener('mouseup',function(event){
//�Z	var hoge=setInterval(function(){//�Ȃ�������Interval�����ꂽ�̂���
		if(gMouseDown!=gMouseDownChase)console.error("gMouseDown�������ȊO�ŕύX����Ă��܂��B");
		if(gMouseMove!=gMouseMoveChase)console.error("gMouseMove�������ȊO�ŕύX����Ă��܂��B");
		gMouseMove=false;
		gMouseDown=false;
		//��gMouseMoveTrace=false;//����(trace)���c�����߂ɒl��ς��Ȃ�
		gMouseDownChase=false;
		gMouseMoveChase=false;
//�Z		clearInterval(hoge);
//�Z	},50);
},true);
window.addEventListener('scroll',function(event){
	var xnew=document.documentElement.scrollLeft+window.innerWidth;
	var ynew=document.documentElement.scrollTop+window.innerHeight;
	if(Menu.elementSensor.offsetWidth<xnew && xnew>2000){
		event.preventDefault();
	}else{
		Menu.elementSensor.width=document.documentElement.scrollLeft+window.innerWidth;
	};
	if(Menu.elementSensor.offsetHeight<ynew && ynew>2000){
		event.preventDefault();
	}else{
		Menu.elementSensor.height=document.documentElement.scrollTop+window.innerHeight;
	};	
},true);

var hogeStatusWait=setInterval(function(){
	if('gMouseClientXMove' in window){
		clearInterval(hogeStatusWait);
		var hogeStatus=setInterval(function(){
			window.status="(X:"+gMouseClientXMove+" Y:"+gMouseClientYMove+")  down:"+gMouseDown.toString()+" move:"+gMouseMove.toString()+"  page(x:"+gMouseXMove+" y:"+gMouseYMove+") scroll(X:"+document.documentElement.scrollLeft+" Y:"+document.documentElement.scrollTop+")";
		},10);
	};
},500);


window.addEventListener('mouseup',getUpperElements,true);
window.addEventListener('mousedown',getUpperElements,true);


window.onbeforeunload=function(event){
	//event.preventDefault();//���ꂪ����ƕ��Ă����������Ă���

	var body=document.getElementsByTagName('body')[0];

	//MenuSensor���͂���
	var flagSens = Menu.detachSensor();

	//Menu���͂���
	var flagMenu = Menu.detachMenu();

	//modal window���͂���

	if(ModalWindow.isExist){
		mwInput.vanish();//->��L�̂悤�ɂ�肽��
	};



	Cookie.clear();

	//DOM���N�b�L�[�ɓ����
	Cookie.storeTree(body);

	//Menu��ClassKey���X�ɃN�b�L�[�ɓ����
	var elements=Menu.elementRoot.getElementsByClassName(ClassKey);
	for(var ii=0,len=elements.length;ii<len;ii++){
		Cookie.storeTree(elements[ii]);
	};

	//�o�Ă���element�����ɖ߂�
	if(flagSens)Menu.attachSensor();//�ǂ���appendChild����΂悢�̂���ۏ؂��܂�
	if(flagMenu)Menu.attachMenu();//�ǂ���appendChild����΂悢�̂���ۏ؂��܂�



};

