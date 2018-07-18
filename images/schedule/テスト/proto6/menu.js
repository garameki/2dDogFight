


/*
	main.htmに注文です。
	offsetTopやoffsetLeftは他の子要素に関連するプロパティーです。
	position:relative;でappendされている兄要素がある場合、
	element.style.topはelement.offsetTopに一致しません

	これの完全な解消は、兄要素や先祖要素の自分より上に来るrelativeな要素の
	offsetTopの総和を求める必要がありそうです。

	簡易的に問題を解消するには、そういった兄要素や先祖要素を全て
	position:absolute;にし、body要素のoffsetTopを0にすることです。
*/


menuJS=null;

FR.push(new FileRelative('globalEventsJS','menuJS'));//gMouseXMove,gMouseYMove
FR.push(new FileRelative('makeElementJS','menuJS'));//ClassRessurect,ClassMenu,ClassCreate,NumZindexオブジェクト
FR.push(new FileRelative('keyJS','menuJS'));//Keyオブジェクト
FR.push(new FileRelative('modalWindowInputJS','menuJS'));
FR.push(new FileRelative('mainHTM','menuJS'));//Menu.elementRoot






//--------------------------------------------------------------------------------------------------------------------


/*
	divをwindowの枠からはみ出さずにドラッグする
	gBodyにappendしてあるdivに対して有効
*/
var appendDragForMenu=function(element){
	console.log("menuJS appendDragForMenu element=",element.className);
	element.onmousedown=function(event){

		event.stopPropagation();

		var divx=element.offsetLeft;
		var divy=element.offsetTop;
		var newLeft;
		var newTop;

		//drag始める前に最前面化
		element.style.zIndex=NumZindex.up();

		var hoge=setInterval(function(){
			//mouseupか、はみだしの時強制にup。それ以外は、マウスに連れて移動
			if(gMouseDown==false){
				clearInterval(hoge);
			}else{


					//Menuは画面からはみ出さない。treeは画面からはみ出してもよい(正の方向へ)
					//なので、Menuとtreeは共通関数化できない

				newLeft=divx+gMouseClientXMove-gMouseClientXDown;
				newTop=divy+gMouseClientYMove-gMouseClientYDown;

				//はみだし監視
				var ans=confirmPositionForMenu(element,newLeft,newTop);

				//再配置
				element.style.left=ans.left.toString()+'px';
				element.style.top=ans.top.toString()+'px';
			};
		},60);

	};

};



//画面からdivがはみ出ないようにする
var confirmPositionForMenu=function(eleTree,left,top){
	//left,top.....現在の位置

		//はみだし監視
	//x軸方向
	if(left<0){
		left=0;
	};
	//y軸方向
	if(top<0){
		top=0;
	};

	return {
		left:left,
		top:top
	};
};

//--------------------------------------------------------------------------------------------------------------------------------------

var createMenu=function(){

	if(Menu.elementRoot!=null){
		//do nothing
		console.error("menuは一回しかcreateできません。");
	}else{
		var body=document.getElementsByTagName('body')[0];
		Menu.elementRoot=makeElement(ClassMenu);
		Menu.elementRoot.style.backgroundColor='yellow';

		body.appendChild(Menu.elementRoot);

		//センサーcanvasを一番後面に配置。そこにイベントを設定してmenuの表示・非表示に用いる
		Menu.elementSensor=makeElement(ClassMenuSensor,'メニューセンサー');
		body.appendChild(Menu.elementSensor);

		createMenuContent();
	};
};

var createMenuContent=function(){

	var eleRessurection=makeElement(ClassRessurect,'削除取消');
	Menu.elementRoot.appendChild(eleRessurection);

	var eleCreate=makeElement(ClassCreate,'新規作成');
	Menu.elementRoot.appendChild(eleCreate);


//	var key=Key.create('おきる');
//	Menu.elementRoot.appendChild(key);

//	var key=Key.create('ねる');
//	Menu.elementRoot.appendChild(key);


};


//------------------------------------------------------------------------------------------------------------------------

var addKeyToMenu=function(eleDiv){

	gAnsModalWindow=null;
	mwInput.setMessage('イベント名を入力してください');
	mwInput.appear(gMouseXMove,gMouseYMove);
	var hoge = setInterval(function(){
		if(gAnsModalWindow!=null){
			clearInterval(hoge);
			if(gAnsModalWindow){
				//script to do
console.log("menuJS  ans=",gAnsModalWindow);
				var eleKey=Key.create(gAnsModalWindow);
				Menu.elementRoot.appendChild(eleKey);
			}else{
				//returned nothing and nothing to do
			};
		};
	},100);
};

//---------------------------------------------------------------------------------------------------------------------------


var detachSensor = function(){
	var sens=document.getElementsByClassName(ClassMenuSensor)[0];
	if(sens){
		sens.parentNode.removeChild(sens);
		return true;//成功
	}else{
		return false;//失敗
	};
};

var attachSensor = function(){
	var sens=document.getElementsByClassName(ClassMenuSensor)[0];
	if(!sens){
		document.getElementsByTagName('body')[0].appendChild(Menu.elementSensor);
	};
};

var detachMenu = function(){
	var menu=document.getElementsByClassName(ClassMenu)[0];
	if(menu){
		menu.parentNode.removeChild(menu);
		return true;//成功
	}else{
		return false;//失敗
	};
};

var attachMenu = function(){
	var menu=document.getElementsByClassName(ClassMenu)[0];
	if(!menu){
		Menu.elementParent.appendChild(Menu.elementRoot);
	};
};


//---------------------------------------------------------------------------------------------















Menu={ };
var countMenuElementParent=0;
var hogeMenuElementParent = setInterval(function(){
	if('document' in window){
		clearInterval(hogeMenuElementParent);

		Menu.elementParent=document.getElementsByTagName('body')[0];//Menuがくっつく親
	}else{
		if(++countMenuElementParent>1000){
			clearInterval(hogeMenuElementParent);
			console.error("menuJS  documentが1秒以内に読み込まれていません");
		};
	};
},1);

Object.defineProperty(Menu,'elementRoot',{value:null,writable:true,enumerable:true,configurable:true});//Menuのノードそのもの
Object.defineProperty(Menu,'elementSensor',{value:null,writable:true,enumerable:true,configurable:true});//MenuSensorのノード

Object.defineProperty(Menu,'create',{value:createMenu,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'addEventDrag',{value:appendDragForMenu,writable:false,enumerable:true,configurable:false});//makeElementで使用
Object.defineProperty(Menu,'appendKey',{value:addKeyToMenu,writable:false,enumerable:true,configurable:false});//makeElementで使用

Object.defineProperty(Menu,'detachSensor',{value:detachSensor,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'attachSensor',{value:attachSensor,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'detachMenu',{value:detachMenu,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'attachMenu',{value:attachMenu,writable:false,enumerable:true,configurable:false});



Object.defineProperty(Menu,'where',{value:'menuJS',writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'has',{value:function(){
	console.log("-------------------------------------------");
	for(var key in Menu){
		console.log("Menu has ...");
		console.log(key);
	};
	console.log("-------------------------------------------");
},writable:false,enumerable:true,configurable:false});


