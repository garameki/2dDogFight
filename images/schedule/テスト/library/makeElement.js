/*

	各html要素をつくるだけ。クラスではないので注意

*/

var filename='makeElementJS';



var script=(function(){/*


	__FILENAME__=null;
	FR.push(new FileRelative('evDragJS','__FILENAME__));//appendDrag();


*/});script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");script=script.replace(/__FILENAME__/g,filename);eval(script);



//global variables

var Relative='relative';
var Absolute='absolute';



var Counter=function(start){
	var num=start;
	return function(){
		return num++;
	};
};
var NumZindex=new Counter(2);


var IDPlate='Plate';
var IDKey='Key';
var IDCreate='Create';

var NumCanvas=new Counter(0);
var makeCanvas=function(idPrefix,position,xx,yy,width,height){
	var ele=document.createElement('canvas');
	ele.setAttribute('id',idPrefix+'Canvas'+NumCanvas().toString());
	ele.width=width;
	ele.height=height;
	ele.style.left=xx.toString()+'px';
	ele.style.top=yy.toString()+'px';
////○	ele.style.position='absolute';
//○	ele.style.position='relative';
	ele.style.position=position;
	ele.draggable=false;
	ele.style.zIndex=NumZindex();
	var ctx=ele.getContext('2d');
	ctx.font="bold 30px 'ＭＳ 明朝'";
	ctx.fillStyle='green';
	ctx.fillText('古今東西',0,30);

	ele.ondragstart=function(event){
		//ドラッグ禁止
		event.preventDefault();
		event.stopPropagation();
	};
	ele.addEventListener('mousedown',function(event){
		gMouseDown=true;
	},false);
	ele.addEventListener('mousemove',function(event){
		gMouseMove=true;
	},false);



	//idPrefixによるイベント機能の追加
	switch(idPrefix){
		case IDPlate:
			ele.addEventListener('mousedown',function(event){
				console.info("makeElement.js hello,this is plate.");
			},false);
			break;
		case IDKey:
			ele.addEventListener('mousedown',function(event){
				console.info("makeElement.js hello,this is key.");
			},false);
			break;
		case IDCreate:
			document.addEventListener('mouseup',function(event){
console.log("down:",gMouseDown,"  move:",gMouseMove);
				if(gMouseMove){

				}else{
					if(gMouseDown){
						//'click'
						addKeyToMenu();

					};
				};
				gMouseDown=false;
				gMouseMove=false;
			},false);				
			break;
		default:
			//do nothing
	};

	return ele;
};

var IDPlates='Plates';
var IDMenu='Menu';

var NumDiv=new Counter(0);
var makeDiv=function(idPrefix,left,top){
	var ele=document.createElement('div');
	ele.setAttribute('id',idPrefix+'Div'+NumCanvas().toString());
	ele.style.position='absolute';
//	ele.style.position='relative';
	ele.draggable=false;
console.log("left=",left);
	ele.style.left=left.toString()+'px';
	ele.style.top=top.toString()+'px';
	ele.style.zIndex=NumZindex();

	ele.onclick=function(event){
		//for test
		console.log("click",ele.id,event);
	};
	ele.ondragstart=function(event){
		//ドラッグ禁止
		event.preventDefault();
		event.stopPropagation();
	};


	//idPrefixによるイベント機能の追加
	switch(idPrefix){
		case IDPlates:
			ele.addEventListener('mousedown',function(event){
				console.info("makeElement.js hello,this is plate.");
			},false);
			break;
		case IDMenu:
//			appendDrag(ele);
			ele.addEventListener('mousedown',function(event){
				console.info("makeElement.js hello,this is key.");
			},false);
			break;
		default:
			//do nothing
	};


	return ele;

};
