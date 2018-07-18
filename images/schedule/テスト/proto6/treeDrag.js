
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


treeDragJS=null;

FR.push(new FileRelative('libraryJS','TreeDragJS'));//stopEvent関数(コールバックとして使っている)
FR.push(new FileRelative('globalEventsJS','TreeDragJS'));
FR.push(new FileRelative('mainHTM','TreeDragJS'));//gBody
FR.push(new FileRelative('makeElementJS','TreeDragJS'));//ClassTree,ClassBrighten,NumZindexオブジェクト
FR.push(new FileRelative('treeMakeJS','TreeDragJS'));//TreeMake.merge()
FR.push(new FileRelative('menuJS','TreeDragJS'));//Menuオブジェクト


/*
	例
	gBodyにappendしてあるdivに対して有効
*/
//global variables
var gBrightenNone=-1;//近くに無い場合
var gBrightenId='bright';
var gBrightenTop='top';
var gBrightenBottom='bottom';
var gBrightenMenu='menu';
var gBrighten={
	plate:gBrightenNone,//elePlate
	place:null//'top' or 'bottom'
};
var gBrightenTarget;//●	くっつける側のtreeをおぼえておく


var gElementsDeleted=[];//HTMLcollectionオブジェクトではないので注意

var appendDragForTree=function(element){
	if(element.className!=ClassTree)console.error("TreeDragJS appendDragForTree() class=",element.className,"違うクラスにイベントDragを設定しようとしています。");

	element.onmousedown=function(event){
		//Plateがtreeの先頭の場合、propagationはcancelされないので、bubblePHASEでここが発火します

		event.stopPropagation();
		if(event.currentTarget.className!=ClassTree)console.error("TreeDragJS event.currentTargetがtreeではありません。element=",event.currentTarget);

		moveAndBrightAndDelete(event.currentTarget);//->イベント'mouseup'までhogeる

	};



//mouseup内と同様の処理をClassKeyでエミュレートする必要はない
//	element.onmouseup=function(event){
//
//
//
//	};




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
	if(eleTree.className!=ClassTree)console.error("TreeDragJS  setPosPlates() eleTreeがClassTreeではありません。");

	var children=eleTree.children;
	for(var ii=0,len=children.length;ii<len;ii++){
		children[ii].__centerX=children[ii].parentNode.offsetLeft+children[ii].offsetLeft+children[ii].offsetWidth/2;
		children[ii].__topY=children[ii].offsetTop+children[ii].parentNode.offsetTop;
		children[ii].__bottomY=children[ii].parentNode.offsetTop+children[ii].offsetTop+children[ii].offsetHeight;
//console.log("*********",children[ii]);
//console.log("********",children[ii].__topY,children[ii].__bottomY);
	};
};




//近くのものを光らせる
var nearestPlate = function(eleTree){
	if(eleTree.className!=ClassTree)console.error("nearestPlate() eleTreeがClassTreeではありません。");


	//---- 自分のtreeのtopのPlateと相手Plateのbottomの処理 ---

	//treeの一番上のplate
	var plateTop=eleTree.children[0];//kkkkkk本当に0でいいのか

//console.log("TreeDragJS nearestPlate() plateTop=",plateTop,"  eleTree=",eleTree);

	//Class Plateを洗い出す
	var platesAll=gBody.getElementsByClassName(ClassPlate);



	//treeのtopと一番近いPlateのbottomを求める
	var minB=10000000000;
	var iiMinB=gBrightenNone;
	for(var ii=0,len=platesAll.length;ii<len;ii++){
		if(plateTop!=platesAll[ii] && plateTop.parentNode!=platesAll[ii].parentNode){
			var dist=calcDistance(plateTop.__centerX,plateTop.__topY,platesAll[ii].__centerX,platesAll[ii].__bottomY);
			if(minB>dist){
				minB=dist;
				iiMinB=ii;
			};
		};
	};
	if(minB>20)iiMinB=gBrightenNone;




	//--- 自分のtreeの最後のPlateのbottomと相手treeの最初のtop ---

	//自分のtreeの一番下
	var plateBottom=eleTree.children[eleTree.children.length-1];//kkkkkkkk本当に最後の要素でいいのか
	//ClassTreeを洗い出す->各treeの最初のPlateを配列に格納する
	var trees=gBody.getElementsByClassName(ClassTree);
	var platesTop=new Array();
	for(var ii=0,len=trees.length;ii<len;ii++){
		platesTop.push(trees[ii].children[0]);//kkkkkkkkk0番目が一番上か？？
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


	//--- drag中のマウスポインタの位置がMenuに重なっていたら、Menuが光るようにする ---

	var eles=getUpperElements(gMouseXMove,gMouseYMove);		
	if(elementExist(eles,Menu.elementRoot)){
		//Menuを選択
		bright.surround(Menu.elementRoot)
		gBrighten.plate=Menu.elementRoot;
	}else{

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
var moveAndBrightAndDelete=function(element){
	if(element.className!=ClassTree)console.error("TreeDragJS  moveAndBrightAndDelete() elementがtreeではありません。element=",element);


	gBrightenTarget=element;//●
	divx=element.offsetLeft;
	divy=element.offsetTop;
	var newLeft;
	var newTop;
	var child;
	var flagRemoving=false;//子要素を分離中のときtrue

	//drag中のtreeを最前面にする(これしないと、eventがキャッチできない)
	element.style.zIndex=NumZindex.up();//呼び出し元で最前面化をする必要なし


	var hoge=setInterval(function(){


//console.log("gBrighten.plate=",gBrighten.plate);
		//'mouseup'イベントか、はみだしの時強制にup。それ以外は、マウスに連れて移動
		if(gMouseDown==false){

			//--------------- Treeのドロップ部分 ここから---------------------------

			//brighten用の描画canvasを取り外す
			child=document.getElementsByClassName(ClassBrighten)[0];
			if(child){

				gBody.removeChild(child);
			};


		/*
			merge or deleteここから
		*/


			//〇event.stopPropagation();

//console.log("gBrighten.plate=",gBrighten.plate.className);

			if(false){
				//to make this style of indent being well-eqquipped
			}else if(gBrighten.plate==gBrightenNone){
				//do nothing
			}else if(gBrighten.plate==Menu.elementRoot){
				//ClassCreateの上にドロップでtreeの存在を削除(復活可)することができます
				console.log("TreeDragJS moveAndBrightAndDelete() delete class=",element.className);


				gElementsDeleted=[];
				var child=element.getElementsByClassName(ClassPlate);//その文書ツリーに現れる順番で得られます
				for(var ii=0,len=child.length;ii<len;ii++){
					gElementsDeleted.push(child[ii]);
				};

	
				//削除中の'mousedown'を阻害
				window.addEventListener('mousedown',stopEvent,true);

				
				if(!flagRemoving){
					flagRemoving=true;
					//子要素を自分からゆっくり分離
					var hogeRemove=setInterval(function(){
						if(element.children.length>0){
							element.removeChild(element.children[0]);
						}else{
							clearInterval(hogeRemove);
							element.parentNode.removeChild(element);//tree自身の切り離し
							window.removeEventListener('mousedown',stopEvent,true);//●ここでなくちゃ
						};
					},50);

				};

			}else if(gBrighten.place==gBrightenBottom){
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

				var target=gBrightenTarget;////●
//○				var target=event.currentTarget;//挿入するtree
			


				if(target.className!=ClassTree)console.error("TreeDragJS appendDragForTree()イベントがbubbleしてきたelementがtreeではありません。");

//0215console.log("TreeDragJS stem child=",stem.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("TreeDragJS target child=",target.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("boolean=",stem==target);

				TreeMake.merge(stem,nextPlate,target);//stemのnextPlateの前にtargetのPlateを挿入

				setPosPlates(stem);//各Plateの位置の再計算


			}else if(gBrighten.place==gBrightenTop){

				//drag中のtreeのbottomと、brightなPlateのtopをつなげる

				var stem=gBrightenTarget;//●	
//○				var stem=event.currentTarget;//gBrighten.plate.parentNode;



				if(stem.className!=ClassTree)console.error("イベントがbubbleしてきたelementがtreeではありません。");			//mouseupが起きたelement ->treeのはず

				var nextPlate=null;//stemの末尾に挿入

				var target=gBrighten.plate.parentNode;//光ってるPlateの属するtree




				TreeMake.merge(stem,nextPlate,target);//drag中のtreeの下につなげる

				setPosPlates(stem);//各Plateの位置の再計算

			};
		/*
			merge or deleteここまで
		*/



			clearInterval(hoge);
			gBrighten.plate=gBrightenNone;



			//--------------- Treeのドロップ部分 ここまで---------------------------






		}else{

			//移動させる

			//新座標
			newLeft=divx+gMouseXMove-gMouseXDown;
			newTop=divy+gMouseYMove-gMouseYDown;

			//はみだし監視
			var ans=confirmPositionForTree(element,newLeft,newTop);

			//位置確定->これが遅い!!!!現在のマウスの位置と必ずしも一致しない
			element.style.left=ans.left.toString()+'px';
			element.style.top=ans.top.toString()+'px';

			//plates(element.children)の諸所の位置(elementの独自プロパティー)を計算しておく(element : bodyの子ノードのdiv)
			setPosPlates(element);

			//近いPlateの検索
			nearestPlate(element);
		};
	},60);
};


//クロージャ。外部関数としてmakeElementを用いています。
//Plateの底の結合部分を光らせる光の部分を描くcanvas、contextはここに存在します
var Bright=function(){



	var canvas=makeElement(ClassBrighten,'結合部分が光る',0,0);
	var ctx=canvas.__ctx;

/*
	var canvas=document.createElement('canvas');
	canvas.class=ClassBrighten;
	canvas.style.position='absolute';
	canvas.style.left='0px';
	canvas.style.top='0px';
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	canvas.style.zIndex=NumZindex.up();
	var ctx=canvas.getContext('2d');
*/
	var prePlate=null;
	var child;
	var draw=function(xx,yy,width,height){
		ctx.canvas.width=document.documentElement.scrollLeft+window.innerWidth;	
		ctx.canvas.height=document.documentElement.scrollTop+window.innerHeight;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		ctx.shadowBlur=5;
		ctx.shadowColor='black';
		ctx.fillStyle='black';
		ctx.globalAlpha=0.7;
		for(var ii=0;ii<20;ii++)
			ctx.fillRect(xx,yy,width,height);
	};
	return {
		none:function(){
			child=document.getElementsByClassName(ClassBrighten)[0];
			if(child)gBody.removeChild(child);
			prePlate=null;
		},
		bottom:function(elePlate){


//console.log("TreeDragJS Bright bottom=",elePlate.parentNode.className,elePlate.parentNode.style.zIndex);
			if(elePlate==prePlate && gMouseDown){
				//do nothing
				child=document.getElementsByClassName(ClassBrighten)[0];
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=elePlate;
	
				draw(elePlate.offsetLeft+elePlate.parentNode.offsetLeft,elePlate.__bottomY,elePlate.offsetWidth,1);

			};
		},
		top:function(elePlate){
//console.log("TreeDragJS Bright top tree=",elePlate.parentNode.className,elePlate.parentNode.style.zIndex);
			if(elePlate==prePlate && gMouseDown){
				//do nothing
				child=document.getElementsByClassName(ClassBrighten)[0];
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=elePlate;
	
				draw(elePlate.offsetLeft+elePlate.parentNode.offsetLeft,elePlate.__topY,elePlate.offsetWidth,1);
		
			};
		},
		surround:function(eleMenu){
//console.log("TreeDragJS Bright surround menu=",eleMenu.className,eleMenu.style.zIndex);
			if(eleMenu==prePlate && gMouseDown){
				child=document.getElementsByClassName(ClassBrighten)[0];
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=eleMenu;

				draw(eleMenu.offsetLeft,eleMenu.offsetTop,eleMenu.offsetWidth,eleMenu.offsetHeight);
			};
		}
	};//return
};
//Brightのオブジェクト化
var countBright=0;
var hogeBright=setInterval(function(){
	if('makeElement' in window){
		clearInterval(hogeBright);
		bright = new Bright();//●●●global function
	};
	if(++countBright>2000){
		clearInterval(hogeBright);
		console.errror("TreeDragJS  'makeElement'が定義されません");
	};
},10);







TreeDrag= { };
Object.defineProperty(TreeDrag,'moveBrightDelete',{value:moveAndBrightAndDelete,writable:false,enumerable:false,configurable:false});
Object.defineProperty(TreeDrag,'addEventDrag',{value:appendDragForTree,writable:false,enumerable:false,configurable:false});
Object.defineProperty(TreeDrag,'setPosPlates',{value:setPosPlates,writable:false,enumerable:false,configurable:false});

