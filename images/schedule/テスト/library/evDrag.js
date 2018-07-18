
/*
	divをwindowの枠からはみ出さずにドラッグする
*/


evDragJS=null;

FR.push(new FileRelation('globalEventsJS','evDragJS'));


var gMouseDown=false;
var gCX,gCY;
var appendDrag=function(element){
	window.addEventListener('mousemove',function(event){
		gCX=event.clientX;
		gCY=event.clientY;
	},true);
	var mousex,mousey;
	element.onmousedown=function(event){
		mousex=event.clientX;
		mousey=event.clientY;

		divx=element.offsetLeft;
		divy=element.offsetTop;
		var newLeft;
		var newTop;
		if(gMouseDown==false){
			var hoge=setInterval(function(){
				//mouseupか、はみだしの時強制にup。それ以外は、マウスに連れて移動
				if(gMouseDown==false){
					clearInterval(hoge);
				}else{
						//はみだし監視
					//x軸方向
					newLeft=divx+gCX-mousex;
					newTop=divy+gCY-mousey;
					if((newLeft+element.offsetWidth)>window.innerWidth){
						newLeft=window.innerWidth-element.offsetWidth;
						//gMouseDown=false;
						//clearInterval(hoge);
					}else if(newLeft<0){
						newLeft=0;
						//gMouseDown=false;
						//clearInterval(hoge);
					};
					//y軸方向
					if((newTop+element.offsetHeight)>window.innerHeight){
						newTop=window.innerHeight-element.offsetHeight;
						//gMouseDown=false;
						//clearInterval(hoge);
					}else if(newTop<0){
						newTop=0;
						//gMouseDown=false;
						//clearInterval(hoge);
					};
					//再配置
					element.style.left=newLeft.toString()+'px';
					element.style.top=newTop.toString()+'px';
				};
			},10);
		};
		gMouseDown=true;
	};
//	element.onmouseup=function(){
//		gMouseDown=false;
//	};
	document.addEventListener('mouseup',function(event){//windowのそとでボタンを離してもここで捕捉//重複してイベントを設定できるようにonmouseupではなくて、addEventListenerを用いた。falseをわざわざ指定しているのはIEの古いものに対応するため?(attachEventではなかったか？)
		gMouseDown=false;
	},false);

};
