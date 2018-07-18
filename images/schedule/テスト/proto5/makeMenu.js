makeMenuJS=null;

FR.push(new FileRelative('makeElementJS','makeMenuJS'));//ClassMenu,ClassCreate,makeCanvas(),makeDiv(),IdMenu
FR.push(new FileRelative('makeKeyJS','makeMenuJS'));//makeKey()

var createMenu=function(){
	if('gDivMenu' in window){
		//do nothing
		console.error("menuは一回しかcreateできません。");
	}else{
		createMenuContent();
	};
};

var createMenuContent=function(){

	var body=document.getElementsByTagName('body')[0];

	gDivMenu=makeDiv(ClassMenu,Relative,0,0);
	gDivMenu.style.backgroundColor='yellow';

	var eleCreate=makeCanvas('新規作成',ClassCreate,Relative,0,0,300,50,'red',30,'center');
	gDivMenu.appendChild(eleCreate);


	var key=makeKey('おきる');
	gDivMenu.appendChild(key);

	var key=makeKey('ねる');
	gDivMenu.appendChild(key);


	body.appendChild(gDivMenu);

	//センサーcanvasを一番後面に配置。そこにイベントを設定してmenuの表示・非表示に用いる
	gCanvasMenuSens=makeCanvas('メニューセンサー',ClassMenuSensor,Absolute,0,0,window.innerWidth,window.innerHeight,'green',30,'center');
	body.appendChild(gCanvasMenuSens);
	gCanvasMenuSens.style.zIndex=2;
};



