
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


//evDragJS=null;

FR.push(new FileRelative('globalEventsJS','evDragJS'));



/*
	例
	gBodyにappendしてあるdivに対して有効
*/


var appendDrag=function(element){
	element.onmousedown=function(event){

		event.stopPropagation();








		//親や兄のオフセットを累計して、自分から引けばいい。その計算。(頓挫)
		var sumOffsetLeft=0;
		var sumOffsetTop=0;
		var parent=element.parentNode;
		for(var ii=0,len=parent.children.length;ii<len;ii++){
			if(event.target==parent.children[ii])break;
			
		};
			






		divx=element.offsetLeft;
		divy=element.offsetTop;
		var newLeft;
		var newTop;
		var hoge=setInterval(function(){
			//mouseupか、はみだしの時強制にup。それ以外は、マウスに連れて移動
			if(gMouseDown==false){
				clearInterval(hoge);
			}else{
					//はみだし監視
				//x軸方向
				newLeft=divx+gMouseXMove-gMouseXDown;
				newTop=divy+gMouseYMove-gMouseYDown;
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
			};
		},60);

	};

};
