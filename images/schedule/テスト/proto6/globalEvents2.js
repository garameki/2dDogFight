/*
開発履歴

2	compressCookieの部分をcookieJSに移動


*/








globalEventsJS=null;

FR.push(new FileRelative('libraryJS','globalEventsJS'));//getUpperElements()
FR.push(new FileRelative('storageJS','globalEventsJS'));//localStorageオブジェクト
FR.push(new FileRelative('cookieJS','globalEventsJS'));//Cookieオブジェクト





var gMouseDown=false;
var gMouseMove=false;
var gMouseXMove=null,gMouseYMove=null;

var gMouseDownChase=false;
var gMouseMoveChase=false;


//この場所以外でgMouse*の値を変えてはいけない
document.addEventListener('mousedown',function(event){
	gMouseDown=true;
	gMouseMove=false;
	gMouseMoveTrace=false;//'mouseup'内にhogeを入れない工夫
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
//〇	var hoge=setInterval(function(){//なぜここでIntervalをいれたのか謎
		if(gMouseDown!=gMouseDownChase)console.error("gMouseDownがここ以外で変更されています。");
		if(gMouseMove!=gMouseMoveChase)console.error("gMouseMoveがここ以外で変更されています。");
		gMouseMove=false;
		gMouseDown=false;
		//●gMouseMoveTrace=false;//痕跡(trace)を残すために値を変えない
		gMouseDownChase=false;
		gMouseMoveChase=false;
//〇		clearInterval(hoge);
//〇	},50);
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
	//event.preventDefault();//これがあると閉じていいか聞いてくる

	var body=document.getElementsByTagName('body')[0];

	//MenuSensorをはずす
	var flagSens = Menu.detachSensor();

	//Menuをはずす
	var flagMenu = Menu.detachMenu();

	//modal windowをはずす

	if(ModalWindow.isExist){
		mwInput.vanish();//->上記のようにやりたい
	};



	Cookie.clear();

	//DOMをクッキーに入れる
	Cookie.storeTree(body);

	//MenuのClassKeyを個々にクッキーに入れる
	var elements=Menu.elementRoot.getElementsByClassName(ClassKey);
	for(var ii=0,len=elements.length;ii<len;ii++){
		Cookie.storeTree(elements[ii]);
	};

	//出ていたelementを元に戻す
	if(flagSens)Menu.attachSensor();//どこにappendChildすればよいのかを保証します
	if(flagMenu)Menu.attachMenu();//どこにappendChildすればよいのかを保証します



};

