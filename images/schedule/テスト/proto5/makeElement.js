/*

	各html要素をつくるだけ。クラスではないので注意


	ele.__*は独自プロパティーです

*/

var filename='makeElementJS';
var script=(function(){/*

	__FILENAME__=null;
	FR.push(new FileRelative('dragPlateJS','__FILENAME__'));//appendDragForPlate()
	FR.push(new FileRelative('dragMenuJS','__FILENAME__'));//appendDragForMenu();
	FR.push(new FileRelative('dragTreeJS','__FILENAME__'));//appendDragForTree(),setPosPlates(element),nearestPlate(element),moveAndBright()
	FR.push(new FileRelative('libraryJS','__FILENAME__'));//Counter();
	FR.push(new FileRelative('globalEventsJS','__FILENAME__'));//gMouse*
	FR.push(new FileRelative('addKeyToMenuJS','__FILENAME__'));//addKeyToMenu()
	FR.push(new FileRelative('makeTreeJS','__FILENAME__'));//createTree()
	FR.push(new FileRelative('makeMenuJS','__FILENAME__'));//gDivMenu


*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/__FILENAME__/g,filename);
eval(script);


//global variables

var Relative='relative';
var Absolute='absolute';

var ClassTree='tree';
var ClassPlate='plate';
var ClassKey='key';
var ClassMenuSensor='menusensor';
var ClassMenu='menu';
var ClassCreate='create';
var ClassHour='hour';
var ClassColon='colon';
var ClassMinute='minute';
var ClassTitle='Title';

var NumZindex=new Counter(10);



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
	console.log("makeCanvasJS title=",title);
	var ele=document.createElement('canvas');
	ele.setAttribute('class',className);
	ele.width=width;
	ele.height=height;
	ele.style.left=xx.toString()+'px';
	ele.style.top=yy.toString()+'px';
////○	ele.style.position='absolute';
//○	ele.style.position='relative';
	ele.style.position=position;
	ele.draggable=false;
	ele.style.zIndex=NumZindex();
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
		console.info("click Canvas=",ele.className,event);
	},false);
	ele.addEventListener('mousedown',function(event){
		//for test
		console.info("mousedown Canvas=",ele.className,event);
	},false);
	ele.ondragstart=function(event){
		//ドラッグ禁止
		event.preventDefault();
		event.stopPropagation();
	};



	//idPrefixによるイベント機能の追加
	switch(className){
		case ClassMenuSensor:
//			ele.ondragstart=function(event){
//				event.preventDefault();
//			};
			ele.addEventListener('mousedown',function(event){
				event.stopPropagation();//スクロールバーが出ている時につかまれないようにするため
				event.preventDefault();
console.log("stop");
			},false);
			ele.onclick=function(event){

				if(gBody.getElementsByClassName(ClassMenu).length==0){
					gBody.appendChild(gDivMenu);
					gDivMenu.style.zIndex=NumZindex();
					gDivMenu.style.left=(gMouseXDown-gDivMenu.offsetWidth/2).toString()+'px';
					gDivMenu.style.top=(gMouseYDown-gDivMenu.getElementsByClassName(ClassCreate)[0].offsetHeight).toString()+'px';
				}else{
					gDivMenu.parentNode.removeChild(gDivMenu);
				};

			};
			break;
		case ClassCreate:
			ele.addEventListener('mousedown',function(event){
				//〇event.stopPropagation();//gDivMenuをドラッグさせない
			},false);
			ele.addEventListener('click',function(event){
				if(!gMouseMoveTrace){
					addKeyToMenu();
				};
			},false);				
			break;
		case ClassTitle:
			ele.addEventListener('mousedown',function(event){
				console.info("makeElement.js hello,this is canvas ",ele.className);
			},false);
			break;
		case ClassHour:
			ele.addEventListener('mousedown',function(event){
				console.info("makeElement.js hello,this is canvas ",ele.className);
			},false);
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
			ele.addEventListener('mouseup',function(event){
				console.info("makeElement.js hello,this is canvas ",ele.className);
			},false);				
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
	console.log("makeDiv class=",className);
	var ele=document.createElement('div');
	ele.setAttribute('class',className);
	ele.style.width='300px';
	ele.style.position=position;//●
//〇	ele.style.position='absolute';
//〇	ele.style.position='relative';
	ele.draggable=false;
	ele.style.left=left.toString()+'px';
	ele.style.top=top.toString()+'px';
	ele.style.zIndex=NumZindex();

	ele.addEventListener('click',function(event){
		//for test
		console.info("click Div=",ele.className,event);
	},false);
	ele.addEventListener('mousedown',function(event){
		//for test
		console.info("mousedown Div=",ele.className,event);
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
				var elePlate=makePlate(name,hour,minute,0,0);//kkkkkkkk仮

				//ClassKey(bodyのchildのdivのchildのdiv)の位置計算
				var xTree=ct.offsetLeft+ct.parentNode.offsetLeft;
				var yTree=ct.offsetTop+ct.parentNode.offsetTop;

				//treeの作成->dragイベントはtreeに付けられる！！！Plateではありません。
				var eleTree=createTree([elePlate],xTree,yTree);
				gBody.appendChild(eleTree);

				moveAndBright(eleTree);
			},false);
			break;
		case ClassPlate:
			appendDragForPlate(ele);
			break;
		case ClassTree:
			appendDragForTree(ele);
			break;
		case ClassMenu:
			appendDragForMenu(ele);
			break;
		default:
			//do nothing
	};


	return ele;

};
