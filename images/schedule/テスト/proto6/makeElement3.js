/*

	各html要素をつくるだけ。クラスではないので注意


	ele.__*は独自プロパティーです

*/


/*
開発履歴

//3	elementにidを採用した。zindexをidに使うやり方はやめる
		makeElementにidを自動に割り振ることにした

//2	makeElement()を新設。storageからDOMを再構築するときに、makeCanvasでtextAlignとか設定するの面倒くさいので、cssのクラス独自の設定をするようにした。


*/

var filename='makeElementJS';
var script=(function(){/*

	__FILENAME__=null;
	FR.push(new FileRelative('plateJS','__FILENAME__'));//Plateオブジェクト
	FR.push(new FileRelative('menuJS','__FILENAME__'));//Menuオブジェクト
	FR.push(new FileRelative('treeDragJS','__FILENAME__'));//TreeDragオブジェクト
	FR.push(new FileRelative('treeMakeJS','__FILENAME__'));//TreeMake.create()
	FR.push(new FileRelative('libraryJS','__FILENAME__'));//Counter(),getGlobalPosition(),stopEvent関数
	FR.push(new FileRelative('globalEventsJS','__FILENAME__'));//gMouse*
	FR.push(new FileRelative("makeElementJS","classModalWindowJS"));//NumZindexオブジェクト


*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/__FILENAME__/g,filename);
eval(script);


//global variables

var Relative='relative';
var Absolute='absolute';

var ClassBrighten='bright';//結合部を光らせるためのcanvas
var ClassTree='tree';
var ClassPlate='plate';
var ClassKey='key';
var ClassMenuSensor='menusensor';
var ClassMenu='menu';
var ClassCreate='create';
var ClassRessurect='ressurect';
var ClassHour='hour';
var ClassColon='colon';
var ClassMinute='minute';
var ClassTitle='Title';

var NumId,NumZindex;//関数の中で定義されているので、グローバルとしてはここで設定しておく

var maxId = function(){
	var body=document.getElementsByTagName('body')[0];
	var max=-10;
	var id;
	var trace=function(node){
		for(var ii=0,len=node.children.length;ii<len;ii++){
			trace(node.children[ii]);
		};
		if(node!==body){
			id=node.id;
			if(typeof id==='string')
				if(id.match(/^[0-9]+$/))
					if(Number(id)>max)
						max=Number(id);
		};
	};

	if(max==-10)return 0;
	else return max;

};

gFlagMakeElementFirstCall=true;


//●ここから

//各cssクラスのelementの生成
var makeElement=function(className,title,left,top){

	if(gFlagMakeElementFirstCall){
		NumId=new Counter(maxId()+1);
		NumZindex=new Counter(maxZindex()+10);
		gFlagMakeElementFirstCall=false;
	};



	switch(className){
		case ClassTree:
			if(left==undefined || top==undefined)console.error("makeElement2JS left=",left," top=",top);//left,topを使うcssクラスだから
			break;
		case ClassTitle:
		case ClassHour:
		case ClassMinute:
			if(!title)console.error("makeElement2JS title=",title," class=",className);//titleを使うcssクラスだから
			break;
		case ClassRessurect:
		case ClassCreate:
		case ClassMenuSensor:
		case ClassBrighten:
		case ClassColon:
		case ClassMenu:
		case ClassKey:
		case ClassPlate:
			break;
		default:
			console.error("makeElement2JS 設定されていないcssクラス名を使っています。className=",className);
	};



	var letterHeightPlate=30;

	var ele;
	switch(className){
		case ClassRessurect:
			ele=makeCanvas('削除取消',ClassRessurect,Relative,0,0,300,50,'red',30,'center');
			ele.id='ressurect';
			break;
		case ClassCreate:
			ele=makeCanvas('新規作成',ClassCreate,Relative,0,0,300,50,'red',30,'center');
			ele.id='create';
			break;
		case ClassMenuSensor:
			ele=makeCanvas('メニューセンサー',ClassMenuSensor,Absolute,0,0,window.innerWidth,window.innerHeight,'green',30,'center');
			ele.style.zIndex=2;
			break;
		case ClassBrighten:
			ele=makeCanvas('結合部分が光る',ClassBrighten,Absolute,0,0,window.innerWidth,window.innerHeight,'green',30,'left');
			break;
		case ClassTitle:
			ele=makeCanvas(title,ClassTitle,Relative,0,0,200,letterHeightPlate,'black','auto','center');
			break;
		case ClassHour:
			ele=makeCanvas(title,ClassHour,Relative,0,0,32,letterHeightPlate,'green',30,'left');
			ele.__number=0;
			break;
		case ClassColon:
			ele=makeCanvas(':',ClassColon,Relative,0,0,15,letterHeightPlate,'green',30,'left');
			break;
		case ClassMinute:
			ele=makeCanvas(title,ClassMinute,Relative,0,0,30,letterHeightPlate,'green',30,'left');
			ele.__number=0;
			break;
		case ClassMenu:
			ele=makeDiv(ClassMenu,Relative,0,0);
			ele.id='divmenu';
			ele.style.backgroundColor='yellow';
			break;
		case ClassKey:
			ele=makeDiv(ClassKey,Relative,0,0);
			break;
		case ClassTree:
			ele=makeDiv(ClassTree,Absolute,left,top);//引数left,topを使うのはここだけ
			break;
		case ClassPlate:
			ele=makeDiv(ClassPlate,Relative,0,0);
			break;
		default:
			console.error("makeElement2JS 設定されていないcssクラス名を使っています。className=",className);
	};
	return ele;
};

//●ここまで






//描画	canvasエレメント内に独自propertyの内容で描画
var canvasFillText=function(ele){
	//独自propertyの取得
	ctx=ele.__ctx;
	title=ele.__title;
	width=ele.__width;
	height=ele.__height;
	textColor=ele.__textColor;
	textSize=ele.__textSize;
	textAlign=ele.__textAlign;

	ctx.fillStyle=textColor;
	var widthLetter;
	if(textSize=='auto'){
		textSize=height;
		ctx.font="bold "+textSize.toString()+"px 'ＭＳ 明朝'";
		widthLetter=ctx.measureText(title).width;
//console.log("height",height,"title=",title,"textSize=",textSize,"widthLetter=",widthLetter,"ele.width=",ele.width)
		while(widthLetter>=ele.width){
			textSize-=1;
			ctx.font="bold "+textSize.toString()+"px 'ＭＳ 明朝'";
			widthLetter=ctx.measureText(title).width;
		};
//console.log("widthLetter=",widthLetter);
	}else{
		ctx.font="bold "+textSize.toString()+"px 'ＭＳ 明朝'";
		widthLetter=ctx.measureText(title).width;
	};
	if(textAlign=='left'){
		ctx.fillText(title,0,textSize);
	}else if(textAlign=="center"){
		ctx.fillText(title,(width-widthLetter)/2,(height-textSize)/2+textSize/4*3.7);
	}else if(textAlign=='right'){
		ctx.fillText(title,width-widthLetter,(height-textSize)/2+textSize/4*3.7);
	}else{
		ctx.fillText(title,0,textSize);
	};
};




var makeCanvas=function(title,className,position,xx,yy,width,height,textColor,textSize,textAlign){
	var ele=document.createElement('canvas');

	ele.id=NumId.up().toString();//●
	ele.className=className;//●
	ele.width=width;
	ele.height=height;
	ele.style.left=xx.toString()+'px';
	ele.style.top=yy.toString()+'px';
	ele.style.position=position;
	ele.draggable=false;
	ele.style.zIndex=NumZindex.up();
console.log("id:",ele.id,"makeCanvasJS class=",className,"id=",ele.id,"zindex=",ele.style.zIndex);
	ctx=ele.getContext('2d');

	//独自property
	ele.__ctx=ctx;
	ele.__title=title;
	ele.__width=width;
	ele.__height=height;
	ele.__textColor=textColor;
	ele.__textSize=textSize;
	ele.__textAlign=textAlign;

	//描画(文字)
	canvasFillText(ele);

	ele.addEventListener('click',function(event){
		//for test
		console.info(event.timeStamp,"click "," Canvas=",ele.className,ele.style.zIndex,event);
	},false);
	ele.addEventListener('mousedown',function(event){
		//for test
		console.info(event.timeStamp,"mousedown"," Canvas=",ele.className,ele.style.zIndex,event);
	},false);
	ele.addEventListener('mouseup',function(event){
		//for test
		console.info(event.timeStamp,"mouseup"," Canvas=",ele.className,ele.style.zIndex,event);
	},false);
	ele.ondragstart=function(event){
		//ドラッグ禁止
		event.preventDefault();
		event.stopPropagation();
	};




	//イベント機能の追加
	switch(className){
		case ClassRessurect:
			ele.addEventListener('click',function(event){
console.log("makeElementJS 再生",gElementsDeleted,!gMouseMoveTrace,gElementsDeleted.length!=0);
				if(!gMouseMoveTrace && gElementsDeleted.length!=0){


console.log("makeElementJS 復活",gMouseMoveTrace,gElementsDeleted);
					
					window.addEventListener('mousedown',stopEvent,true);
				
					var ans=getGlobalPosition(Menu.elementRoot);
					var plates=new Array();
					for(var ii=0,len=gElementsDeleted.length;ii<len;ii++){
						plates.push(gElementsDeleted[ii]);
					};
					var tree=TreeMake.create(plates,ans.left+Menu.elementRoot.offsetWidth/2,ans.top+Menu.elementRoot.offsetHeight/2);
					gBody.appendChild(tree);
					gElementsDeleted=[];

					window.removeEventListener('mousedown',stopEvent,true);
				};
			},false);				
			break;
		case ClassBrighten:
			break;
		case ClassMenuSensor:
//			ele.ondragstart=function(event){
//				event.preventDefault();
//			};
			ele.addEventListener('mousedown',function(event){
				event.stopPropagation();//スクロールバーが出ている時につかまれないようにするため(なぜかわからぬがドラッグされる)
				event.preventDefault();
console.log("makeElementJS case ClassMenuSensor mousedown stopped");
			},false);
			ele.onclick=function(event){

				if(gBody.getElementsByClassName(ClassMenu).length==0){
					gBody.appendChild(Menu.elementRoot);
					Menu.elementRoot.style.zIndex=NumZindex.up();
					Menu.elementRoot.style.left=(gMouseXDown-Menu.elementRoot.offsetWidth/2).toString()+'px';
					Menu.elementRoot.style.top=(gMouseYDown-Menu.elementRoot.getElementsByClassName(ClassCreate)[0].offsetHeight).toString()+'px';
				}else{
					Menu.elementRoot.parentNode.removeChild(Menu.elementRoot);
				};

			};
			break;
		case ClassCreate:
			ele.addEventListener('mousedown',function(event){
				//〇event.stopPropagation();//Menu.elementRootをドラッグさせない
			},false);
			ele.addEventListener('click',function(event){
				if(!gMouseMoveTrace){
					Menu.appendKey();
				};
			},false);				
			break;
		case ClassTitle:
			break;
		case ClassHour:
			ele.addEventListener('wheel',function(event){
				event.stopPropagation();
				event.preventDefault();
				ele.__ctx.clearRect(0,0,30,height);
				var delta=abs(event.deltaY);
				ele.__number+=delta;
				if(ele.__number<0){
					ele.__number+=24;
				}else if(ele.__number>23){
					ele.__number-=24;
				};
				var text=ele.__number.toString();
				if(ele.__number<10){
					text='0'+text;
				};
				ele.__title=text;
				canvasFillText(ele);
			},false);
			break;
		case ClassMinute:
			ele.addEventListener('wheel',function(event){
				event.stopPropagation();
				event.preventDefault();
				ele.__ctx.clearRect(0,0,30,height);
				var delta=abs(event.deltaY);
				ele.__number+=delta;
				if(ele.__number<0){
					ele.__number+=60;
				}else if(ele.__number>59){
					ele.__number-=60;
				};
				var text=ele.__number.toString();
				if(ele.__number<10){
					text='0'+text;
				};
				ele.__title=text;
				canvasFillText(ele);
			},false);
			break;
		default:
			//do nothing
	};

	return ele;
};


var makeDiv=function(className,position,left,top){
	var ele=document.createElement('div');
	ele.id=NumId.up();//●
	ele.className=className;//●
	ele.setAttribute('class',className);
	ele.style.width='300px';
	ele.style.position=position;
	ele.draggable=false;
	ele.style.left=left.toString()+'px';
	ele.style.top=top.toString()+'px';
	ele.style.zIndex=NumZindex.up();
console.log("id:",ele.id,"makeDiv class=",className,"id:",ele.id,"zindex:",ele.style.zIndex);

	ele.addEventListener('click',function(event){
		//for test
		console.info(event.timeStamp,"click"," Div=",ele.className,ele.style.zIndex,event);
	},false);
	ele.addEventListener('mousedown',function(event){
		//for test
		console.info(event.timeStamp,"mousedown"," Div=",ele.className,ele.style.zIndex,event);
	},false);
	ele.addEventListener('mouseup',function(event){
		//for test
		console.info(event.timeStamp,"mouseup"," Div=",ele.className,ele.style.zIndex,event);
	},false);

	ele.ondragstart=function(event){
		//ドラッグ禁止
		event.preventDefault();
		event.stopPropagation();
	};


	//idPrefixによるイベント機能の追加
	switch(className){
		case ClassKey:
			ele.addEventListener('mousedown',function(event){

				event.stopPropagation();

				//新しいTreeを作る
				var ct=event.currentTarget;
				var name=ct.getElementsByClassName(ClassTitle)[0].__title;
				var hour=ct.getElementsByClassName(ClassHour)[0].__title;
				var minute=ct.getElementsByClassName(ClassMinute)[0].__title;



				//一人ぼっちのtreeを作り、bodyにappend
				var elePlate=Plate.create(name,hour,minute,0,0);//kkkkkkkk仮

				//ClassKey(bodyのchildのdivのchildのdiv)の位置計算
				var xTree=ct.offsetLeft+ct.parentNode.offsetLeft;
				var yTree=ct.offsetTop+ct.parentNode.offsetTop;

				//treeの作成->dragイベントはtreeに付けられる！！！Plateではありません。
				var eleTree=TreeMake.create([elePlate],xTree,yTree);
				gBody.appendChild(eleTree);

				TreeDrag.moveBrightDelete(eleTree);

			},false);
			break;
		case ClassPlate:
			Plate.addEventDrag(ele);
			break;
		case ClassTree:
			TreeDrag.addEventDrag(ele);
			break;
		case ClassMenu:
			Menu.addEventDrag(ele);
			break;
		default:
			//do nothing
	};


	return ele;

};
