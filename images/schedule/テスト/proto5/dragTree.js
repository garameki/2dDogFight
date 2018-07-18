
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


dragTreeJS=null;

FR.push(new FileRelative('globalEventsJS','dragTreeJS'));
FR.push(new FileRelative('mainHTM','dragTreeJS'));//gBody
FR.push(new FileRelative('makeElementJS','dragTreeJS'));//ClassTree
FR.push(new FileRelative('makeTreeJS','dragTreeJS'));//mergeTree()




/*
	例
	gBodyにappendしてあるdivに対して有効
*/
//global variables
var gBrightenNone=-1;//近くに無い場合
var gBrightenId='bright';
var gBrightenTop='top';
var gBrightenBottom='bottom';
var gBrighten={
	plate:null,//elePlate
	place:null//'top' or 'bottom'
};



var appendDragForTree=function(element){
	console.log("dragTreeJS appendDragForTree() element=",element.className);
	element.onmousedown=function(event){

		event.stopPropagation();
		if(event.currentTarget.className!=ClassTree)console.error("dragTree.js event.currentTargetがtreeではありません。");

		//drag中のtreeを最前面にする(これしないと、eventがキャッチできない)
		event.currentTarget.style.zIndex=NumZindex();

		moveAndBright(event.currentTarget);

	};

//mouseup内と同様の処理をClassKeyでエミュレートする必要はない
	element.onmouseup=function(event){




//0215console.log("event.currentTarget=",event.currentTarget.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("event.target=",event.target.className);




		event.stopPropagation();


		if(gBrighten.plate==gBrightenNone){
			//do nothing
		}else{
			if(gBrighten.place==gBrightenBottom){
				//drag中のtreeのtopと、brightなPlateのbottomをつなげる

				var stem=gBrighten.plate.parentNode;//挿入を受けるtree

				//光ってるPlateの次のPlateをnextPlateに代入
				var nextPlate=null;
				for(var ii=0,len=stem.children.length;ii<len;ii++){
					if(stem.children[ii]==gBrighten.plate){
						if(ii+1<len){
							nextPlate=stem.children[ii+1];
							break;
						};
					};
				};

				var target=event.currentTarget;//挿入するtree
				if(target.className!=ClassTree)console.error("dragTreeJS appendDragForTree()イベントがbubbleしてきたelementがtreeではありません。");

//0215console.log("dragTreeJS stem child=",stem.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("dragTreeJS target child=",target.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("boolean=",stem==target);

				mergeTree(stem,nextPlate,target);//stemのnextPlateの前にtargetのPlateを挿入

				setPosPlates(stem);//各Plateの位置の再計算

			}else if(gBrighten.place==gBrightenTop){


				//drag中のtreeのbottomと、brightなPlateのtopをつなげる
	
				var stem=event.currentTarget;//gBrighten.plate.parentNode;
				if(stem.className!=ClassTree)console.error("イベントがbubbleしてきたelementがtreeではありません。");			//mouseupが起きたelement ->treeのはず

				var nextPlate=null;//stemの末尾に挿入

				var target=gBrighten.plate.parentNode;//光ってるPlateの属するtree

				mergeTree(stem,nextPlate,target);//drag中のtreeの下につなげる

				setPosPlates(stem);//各Plateの位置の再計算


			};
	
		};

	};
};



/*
	tree
	 ┗plate
	    ┣title
	    ┣hour
	    ┣colon
	    ┗minute
*/



//elementの諸所の位置を計算しておく(element : bodyの子ノードのdiv)
var setPosPlates = function(eleTree){
	if(eleTree.className!=ClassTree)console.error("setPosPlates() eleTreeがClassTreeではありません。");

	var children=eleTree.children;
	for(var ii=0,len=children.length;ii<len;ii++){
		children[ii].__centerX=children[ii].parentNode.offsetLeft+children[ii].offsetLeft+children[ii].offsetWidth/2;
		children[ii].__topY=children[ii].offsetTop+children[ii].parentNode.offsetTop;
		children[ii].__bottomY=children[ii].parentNode.offsetTop+children[ii].offsetTop+children[ii].offsetHeight;
//console.log("*********",children[ii]);
//console.log("********",children[ii].__topY,children[ii].__bottomY);
	};
};

var nearestPlate = function(eleTree){
	if(eleTree.className!=ClassTree)console.error("nearestPlate() eleTreeがClassTreeではありません。");


		//自分のtreeのtopのPlateと相手Plateのbottomの処理

	//treeの一番上のplate
	var plateTop=eleTree.children[0];//kkkkkk本当に0でいいのか
//console.log("plateTop=",plateTop.getElementsByClassName(ClassTitle)[0].__title);

	//Class Plateを洗い出す
	var platesAll=gBody.getElementsByClassName(ClassPlate);

	//treeのtopと一番近いPlateのbottomを求める
	var minB=10000000000;
	var iiMinB=gBrightenNone;
	for(var ii=0,len=platesAll.length;ii<len;ii++){
//console.log("platesAll[ii]=",platesAll[ii].getElementsByClassName(ClassTitle)[0].__title);
		if(plateTop!=platesAll[ii] && plateTop.parentNode!=platesAll[ii].parentNode){
			var dist=calcDistance(plateTop.__centerX,plateTop.__topY,platesAll[ii].__centerX,platesAll[ii].__bottomY);
			if(minB>dist){
				minB=dist;
				iiMinB=ii;
			};
		};
	};
	if(minB>20)iiMinB=gBrightenNone;
//if(iiMinB!=gBrightenNone)console.log("nearest Top-Bottom=",platesAll[iiMinB].getElementsByClassName(ClassTitle)[0].__title);






		//自分のtreeの最後のPlateのbottomと相手treeの最初のtop

	//自分のtreeの一番下
	var plateBottom=eleTree.children[eleTree.children.length-1];//kkkkkkkk本当に最後の要素でいいのか
//console.log("eleTreeの下=",plateBottom.getElementsByClassName(ClassTitle)[0].__title);
	//ClassTreeを洗い出す->各treeの最初のPlateを配列に格納する
	var trees=gBody.getElementsByClassName(ClassTree);
	var platesTop=new Array();
	for(var ii=0,len=trees.length;ii<len;ii++){
		platesTop.push(trees[ii].children[0]);//kkkkkkkkk0番目が一番上か？？
//console.log("top child=",trees[ii].children[0].getElementsByClassName(ClassTitle)[0].__title);
	};

	//自分のtreeのbottomと一番近いtreeのtopを求める
	var minT=10000000000;
	var iiMinT=gBrightenNone;
	for(var ii=0,len=platesTop.length;ii<len;ii++){
		if(plateBottom!=platesTop[ii] && plateBottom.parentNode!=platesTop[ii].parentNode){
			var dist=calcDistance(plateBottom.__centerX,plateBottom.__bottomY,platesTop[ii].__centerX,platesTop[ii].__topY);
			if(minT>dist){
				minT=dist;
				iiMinT=ii;
			};
		};
	};
	if(minT>20)iiMinT=gBrightenNone;
//console.log("nearest Bottom-Top=",minT,iiMinT);








	//topかbottomかを選ぶ

	if(iiMinB==gBrightenNone){
		if(iiMinT==gBrightenNone){
			bright.none();
			gBrighten.plate=gBrightenNone;
		}else{
			bright.top(platesTop[iiMinT]);
			gBrighten.plate=platesTop[iiMinT];
			gBrighten.place=gBrightenTop;
		};
	}else{
		if(iiMinT==gBrightenNone){
			bright.bottom(platesAll[iiMinB]);
			gBrighten.plate=platesAll[iiMinB];
			gBrighten.place=gBrightenBottom;
		}else {
			if(minT>minB){
				bright.bottom(platesAll[iiMinB]);
				gBrighten.plate=platesAll[iiMinB];
				gBrighten.place=gBrightenBottom;
			}else{
				bright.top(platesTop[iiMinT]);
				gBrighten.plate=platesTop[iiMinT];
				gBrighten.place=gBrightenTop;
			};
		};
	};
//if(gBrighten.plate!=gBrightenNone)console.log("selected=",gBrighten.plate.getElementsByClassName(ClassTitle)[0].__title,gBrighten.place);
};


//画面からdivがはみ出ないようにする
var confirmPositionForTree=function(eleTree,left,top){
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



///treeを動かしながら近くのPlateを光らせる
var moveAndBright=function(element){
	if(element.className!=ClassTree)console.error("moveAndBright() elementがtreeではありません。");

	divx=element.offsetLeft;
	divy=element.offsetTop;
	var newLeft;
	var newTop;
	var child;
	var hoge=setInterval(function(){
		//mouseupか、はみだしの時強制にup。それ以外は、マウスに連れて移動
		if(gMouseDown==false){
			//brighten用の描画canvasを取り外す
			child=document.getElementById(gBrightenId);
			if(child){

				gBody.removeChild(child);
			};
			clearInterval(hoge);
		}else{

			//新座標
			newLeft=divx+gMouseXMove-gMouseXDown;
			newTop=divy+gMouseYMove-gMouseYDown;

			//はみだし監視
			var ans=confirmPositionForTree(element,newLeft,newTop);

			//位置確定
			element.style.left=ans.left.toString()+'px';
			element.style.top=ans.top.toString()+'px';

			//plates(element.children)の諸所の位置(elementの独自プロパティー)を計算しておく(element : bodyの子ノードのdiv)
			setPosPlates(element);

			//近いPlateの検索
			nearestPlate(element);
		};
	},60);
};


//クロージャ
//Plateの底の結合部分を光らせる光の部分を描くcanvasはここに存在します
var Bright=function(){






	var canvas=document.createElement('canvas');
	canvas.id=gBrightenId;
	canvas.style.position='absolute';
	canvas.style.left='0px';
	canvas.style.top='0px';
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	var ctx=canvas.getContext('2d');
	var prePlate=null;
	var child;
	var draw=function(xx,yy,width){
		ctx.canvas.width=document.documentElement.scrollLeft+window.innerWidth;	
		ctx.canvas.height=document.documentElement.scrollTop+window.innerHeight;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		ctx.shadowBlur=5;
		ctx.shadowColor='black';
		ctx.fillStyle='black';
		ctx.globalAlpha=0.7;
		for(var ii=0;ii<20;ii++)
			ctx.fillRect(xx,yy,width,1);
	};
	return {
		none:function(){
			child=document.getElementById(gBrightenId);
			if(child)gBody.removeChild(child);
			prePlate=null;
		},
		bottom:function(elePlate){
			if(elePlate==prePlate && gMouseDown){
				//do nothing
				child=document.getElementById(gBrightenId);
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=elePlate;
	
				draw(elePlate.offsetLeft+elePlate.parentNode.offsetLeft,elePlate.__bottomY,elePlate.offsetWidth);

			};
		},
		top:function(elePlate){
			if(elePlate==prePlate && gMouseDown){
				//do nothing
				child=document.getElementById(gBrightenId);
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=elePlate;
	
				draw(elePlate.offsetLeft+elePlate.parentNode.offsetLeft,elePlate.__topY,elePlate.offsetWidth);
		
			};
		}
	};//return
};
var bright = new Bright();