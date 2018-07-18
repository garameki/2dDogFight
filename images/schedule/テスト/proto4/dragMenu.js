
/*
	divをwindowの枠からはみ出さずにドラッグする
*/


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


dragMenuJS=null;

FR.push(new FileRelative('globalEventsJS','dragMenuJS'));



/*
	例
	gBodyにappendしてあるdivに対して有効
*/


var appendDragForMenu=function(element){
	console.log("dragMenuJS appendDragForMenu element=",element.className);
	element.onmousedown=function(event){

		event.stopPropagation();

		divx=element.offsetLeft;
		divy=element.offsetTop;
		var newLeft;
		var newTop;
		var hoge=setInterval(function(){
			//mouseupか、はみだしの時強制にup。それ以外は、マウスに連れて移動
			if(gMouseDown==false){
				clearInterval(hoge);
			}else{

					//Menuは画面からはみ出さない。treeは画面からはみ出してもよい(正の方向へ)
					//なので、Menuとtreeは共通関数化できない

				newLeft=divx+gMouseXMove-gMouseXDown;
				newTop=divy+gMouseYMove-gMouseYDown;

				//はみだし監視
				var ans=confirmPositionForMenu(element,newLeft,newTop);

/*				//x軸方向
				if((newLeft+element.offsetWidth)>window.innerWidth){
					newLeft=window.innerWidth-element.offsetWidth;
				}else if(newLeft<0){
					newLeft=0;
				};
				//y軸方向
				if((newTop+element.offsetHeight)>window.innerHeight){
					newTop=window.innerHeight-element.offsetHeight;
				}else if(newTop<0){
					newTop=0;
				};
				//再配置
				element.style.left=newLeft.toString()+'px';
				element.style.top=newTop.toString()+'px';
*/
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
	if((left+eleTree.offsetWidth)>window.innerWidth){
		left=window.innerWidth-eleTree.offsetWidth;
	}else if(left<0){
		left=0;
	};
	//y軸方向
	if((top+eleTree.offsetHeight)>window.innerHeight){
		top=window.innerHeight-eleTree.offsetHeight;
	}else if(top<0){
		top=0;
	};

	return {
		left:left,
		top:top
	};
};


