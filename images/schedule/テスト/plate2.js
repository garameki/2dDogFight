//ファイルの関係性関連
plate2JS=null;
FR.push(new FileRelative("modalWindowInput2JS","plate2JS"));
FR.push(new FileRelative("modalWindowYesNo2JS","plate2JS"));


var createContext = function(){
	var variables=new Array();//<-return function()の引数
	variables.push("zIndex");
	variables.push("xx");
	variables.push("yy");
	variables.push("ww");
	variables.push("hh");
	variables.push("parent");

	//defaults
	var xx=0;
	var yy=0;
	var ww=window.innerWidth;
	var hh=window.innerHeight;
	var zIndex=2;
	var parent=document.getElementsByTagName('body')[0];
	if(arguments.length>variables.length){
		console.error("globalVariables_2.js 引数の数が多すぎます in createContext");
	}else{
		for(var ii=0;ii<arguments.length;ii++){
//console.log("createContext  ",variables[ii]+"='"+arguments[ii]+"'");
			eval(variables[ii]+"='"+arguments[ii]+"'");
		};
	};

//console.log("zIndex=",zIndex,"xx=",xx,"yy=",yy,"ww=",ww,"hh=",hh);

	canv = document.createElement('canvas');
	canv.setAttribute('width',ww);
	canv.setAttribute('height',hh);
	canv.setAttribute('style','position: absolute; left:'+xx.toString()+'px;top:'+yy.toString()+'px;z-index:'+zIndex.toString()+';');
	parent.appendChild(canv);
//console.log("3parent=",canv.parentNode);
	ctx = canv.getContext('2d');
		return ctx;

};



//Plateクラス関数
var Counter = function(nStart){

	var n=nStart;

	return function(){
		return n++;
	};
};
var Plate_numZindex=new Counter(3);//クラス関数
var Plate_numIdCanvas=new Counter(0);

var Plate_zIndexOrder = function(arr){


	//中央値を決めて左右に分けよう。
	var order = function(arr){
		var len,sum,med;
		var small,large;
		var smalls=new Array();
		var larges=new Array();

		sum=0;
		len=arr.length;
		if(len==1)return arr;
		if(len==0)return [];

		for(var ii=0;ii<len;ii++){
			sum+=arr[ii];
		};
		med=sum/len;

		for(var ii=0;ii<len;ii++){
			if(arr[ii]>med){
				larges.push(arr[ii]);
			}else{
				smalls.push(arr[ii]);
			};
		};
		small=order(smalls);
		large=order(larges);
		small.splice(small.length,0,large);
		return small;
	};

	var res = order(arr);
	return res;
};


var arr=[5,4,6,8,9,3,7,2,1];
console.log("arr=",Plate_zIndexOrder(arr));











var Plate_plates = new Array();//Plateのクラス変数
var Plate = function(name){

	var myself=this;

	myself.name=name;

	myself.next=null;//合体した場合の次のノードkkk
	myself.front=null;

//kkk z-indexを付けなおす必要がある。まずは、生成順に上げていく？

	myself.ctx=createContext(Plate_numZindex(),100,100,200,50);

//ダメ	myself.ctx.canvas.sytle.marginBottom=1;
//ダメ	myself.ctx.canvas.id=Plate_numIdCanvas();
	myself.ctx.canvas.setAttribute('id','Plate'+Plate_numIdCanvas().toString());
	console.log("id=",myself.ctx.canvas.id);
	Plate_plates.push(myself);//クラス変数
	var letterSize,lettersWidth;
	var letterSize=30;
	//文字の大きさを決めておく
	do{
		letterSize--;
		myself.ctx.font = "bold "+letterSize.toString()+"px 'ＭＳ 明朝'";
		lettersWidth=myself.ctx.measureText(name).width;
	}while(lettersWidth>myself.ctx.canvas.width-5);
	this.letterSize=letterSize;


	myself.mouseDown=false;
	var mouseX,mouseY;
	var moveX,moveY;
	var dd=5;


	//mouseがクリックされている時は、移動するので、このcanvasの絵を消す


	myself.draw(myself.ctx);//位置とparentを追加すべし





	var ctxF,ctxB,oneself;
	myself.ctx.canvas.onmousedown = function(event){

//console.log("event:",myself.name,"mousedown");

		if(event.button==2){
			
//console.log("2parent=",myself.ctx.canvas.parentNode);
//modalWindowは答えだけ返す

			if(gAnsModalWindow!=null){
				gAnsModalWindow=null;
				mwYesNo.setMessage("消してもいいですか?");
				mwYesNo.appear();
				var hoge = setInterval(function(){
	
					if(gAnsModalWindow!=null){
						clearInterval(hoge);
						if(gAnsModalWindow){
							//.frontと.nextの付け替え
							if(myself.front!=null)myself.front.next=myself.next;
							if(myself.next!=null)myself.next.front=myself.front;

							//elementの表示の更新

							//一番前まで行く
							oneself=myself;
							while(oneself.front!=null)oneself=oneself.front;
							var first=oneself;
//console.log("first=",first.name);
							while(oneself.next!=null){
								oneself=oneself.next;
//console.log("oneself=",oneself.name);
//console.log("first.ctx=",first.ctx);
//console.log("oneself.front=",oneself.front);
								if(oneself.front==null){//自分が一番前の場合
									//do nothing
								}else{
									oneself.ctx.canvas.setAttribute('style','position:absolute;left:'+(first.ctx.canvas.offsetLeft).toString()+'px;top:'+(oneself.front.ctx.canvas.offsetTop+oneself.front.ctx.canvas.height).toString()+'px;');
									oneself.ctx.canvas.style.zIndex=Plate_numZindex();
								};
							};








							myself.ctx.canvas.parentNode.removeChild(myself.ctx.canvas);
console.log("delete");
						}else{
							//do nothing
						};
					};
				},100);
			};

			//右クリックここまで

		}else if(event.button==0){//左クリック

			myself.mouseDown=true;
			mouseX=event.clientX;//クリック時の位置を記憶
			mouseY=event.clientY;
			var moveX,moveY;

			//mouseDown->自分から下を消す
			oneself=myself;
			while(oneself!=null){
				oneself.clear(oneself.ctx);//それぞれのcanvasから消す
				oneself=oneself.next;
			};


			//mouseDown->自分より上のz-indexを更新する
			oneself=myself.front;
			while(oneself!=null){
				oneself.ctx.canvas.style.zIndex=Plate_numZindex();
				oneself=oneself.front;
			};


			//新しいcanvasを敷き、そこにイベントリスナーを設定する
			//onmousemove時には新しいcanvasに描いて移動をさせる(attributeを操作すると遅いから)

			ctxF = createContext(Plate_numZindex());//index=100、画面いっぱい(default)
	
			//自分から下を浮かせて描く
			myself.drawMove(ctxF,0,0);
			oneself=myself;
			while(oneself.next!=null){
				oneself=oneself.next;
				oneself.drawMove(ctxF,0,0);//一つのcanvasに全部描く
			};
			var top,height;
			top=myself.ctx.canvas.offsetTop;
			height=oneself.ctx.canvas.offsetTop+oneself.ctx.canvas.height-myself.ctx.canvas.offsetTop;
//console.log("ctxF.canvas=",ctxF.canvas.style);
			ctxB = createContext(ctxF.canvas.style.zIndex-1);//影とHaloを描く
			myself.drawHalo(ctxB,0,0,top,height);


//onmouseout




			ctxF.canvas.onmouseup = function(event){
				myself.mouseDown=false;
	
				var oneself;
				var moveX=event.clientX-mouseX;
				var moveY=event.clientY-mouseY;

				//htmlからの切り離し
				ctxF.canvas.parentElement.removeChild(ctxF.canvas);
				ctxF=null;//メモリ開放
				ctxB.canvas.parentElement.removeChild(ctxB.canvas);
				ctxB=null;

	
				//移動先にhtmlを据え付けなおす
				var nearest =myself.nearest(moveX,moveY);
if(nearest==-1)console.log("nearest=none");
else console.log("nearest=",nearest.name);
				if(nearest==-1){
					myself.ctx.canvas.setAttribute('style','position:absolute;left:'+(myself.ctx.canvas.offsetLeft+moveX).toString()+'px;top:'+(myself.ctx.canvas.offsetTop+moveY).toString()+'px;');
					myself.ctx.canvas.style.zIndex=Plate_numZindex();
					oneself=myself.next;
					while(oneself!=null){
						oneself.ctx.canvas.setAttribute('style','position:absolute;left:'+(oneself.ctx.canvas.offsetLeft+moveX).toString()+'px;top:'+(oneself.ctx.canvas.offsetTop+moveY).toString()+'px;');
						oneself.ctx.canvas.style.zIndex=Plate_numZindex();
						oneself=oneself.next;
					};
				}else{
					myself.ctx.canvas.setAttribute('style','position:absolute;left:'+(nearest.ctx.canvas.offsetLeft).toString()+'px;top:'+(nearest.ctx.canvas.offsetTop+nearest.ctx.canvas.height+1).toString()+'px;');
					myself.ctx.canvas.style.zIndex=Plate_numZindex();





					//一時保存
					var next = nearest.next;
	
					//nearestとmyselfを繋ぐ
					nearest.next = myself;
					myself.front = nearest;
	
					//myselfの列の一番後ろとnearest.nextを繋ぐ
					oneself=myself;
					while(oneself.next!=null){
						oneself=oneself.next;
					};
					oneself.next=next;
					if(next!=null)next.front=oneself;

					//nearestの後ろからタグの位置を修正**もしnestがあるようになったら、nestDistにインデントの幅をnestの数だけたしていけばいい。
					oneself=nearest;
					while(oneself.next!=null){
						oneself=oneself.next;
						oneself.ctx.canvas.setAttribute('style','position:absolute;left:'+(nearest.ctx.canvas.offsetLeft).toString()+'px;top:'+(oneself.front.ctx.canvas.offsetTop+oneself.front.ctx.canvas.height).toString()+'px;');
						oneself.ctx.canvas.style.zIndex=Plate_numZindex();
					};
				};

				//据え付けたhtmlに描く
				//mouseUp->自分から下を表示する
				oneself=myself;
				while(oneself!=null){
					oneself.draw(oneself.ctx);
					oneself=oneself.next;
				};
	
			};//ctxF onmouseup
			
			ctxF.canvas.onmousemove = function(event){
				ctxF.clearRect(0,0,ctxF.canvas.width,ctxF.canvas.height);

				var moveX=event.clientX-mouseX;
				var moveY=event.clientY-mouseY;

				myself.drawMove(ctxF,moveX,moveY);
				var oneself=myself.next;
				while(oneself!=null){
					oneself.drawMove(ctxF,moveX,moveY);
					oneself=oneself.next;
				};
				myself.drawHalo(ctxB,moveX,moveY,top,height);

				//近くのノードの下部分を光らせる
				var nearest =myself.nearest(moveX,moveY);
				if(nearest!=-1)nearest.drawConnectPoint(ctxB);
			};//ctxF onmousemove


			//結合を切る
			if(myself.front!=null)myself.front.next=null;
			myself.front=null;
//console.log("cut name=",myself.name);
		}else{
			console.error("1 nor 2 event.button=",event.button);
		};
	};//onmousedown

//	myself.ctx.canvas.onmouseup = function(event){
//console.log("event=",event);
//		myself.mouseDown=false;
//console.log("event:",myself.name,"mouseup");
//		ctxF.canvas.parent.removeChild(ctxF.canvas);
//	};
//	myself.ctx.canvas.onmousemove = function(event){
//		if(myself.mouseDown){
//			myself.ctx.canvas.setAttribute('style','position: absolute; left:'+(xx+event.clientX-mouseX).toString()+'px;top:'+(yy+event.clientY-mouseY).toString()+'px;z-index:'+index.toString()+';');
//console.log("event=",event);
//
//		};
//	};
};

Plate.prototype.clear = function(ctx){

		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

};
Plate.prototype.draw = function(ctx){
//相対座標系
//名前
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha,
		lineWidth:ctx.lineWidth
	};

//paintKadomaru=function(ctx,xx,yy,ww,hh,rr,bgcolor,fgcolor){

	//この部分をたくさんのcanvasの複合体にすればよいわけですね。
	paintKadomaru(ctx,0,0,ctx.canvas.width,ctx.canvas.height,20,'black','rgb(0,200,0)');
//	ctx.fillStyle='rgb(0,200,0)';
//	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.fillStyle='yellow';
	ctx.fillText(this.name,ctx.canvas.width/2-ctx.measureText(this.name).width/2,this.letterSize);
//	ctx.beginPath();
//	ctx.lineWidth=1;
//	ctx.strokeRect(0,0,ctx.canvas.width,ctx.canvas.height);



	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;
};
Plate.prototype.drawMove= function(ctx,mx,my){
//絶対座標系
//名前
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha,
		lineWidth:ctx.lineWidth
	};

	//地を塗る
	ctx.globalAlpha=1;
	ctx.shadowBlur=0;
	ctx.fillStyle='rgb(0,200,0)';
	ctx.fillRect(this.ctx.canvas.offsetLeft+10+mx,this.ctx.canvas.offsetTop-10+my,this.ctx.canvas.width-1,this.ctx.canvas.height-1);
	//枠を縁取る
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeRect(this.ctx.canvas.offsetLeft+10+mx,this.ctx.canvas.offsetTop-10+my,this.ctx.canvas.width,this.ctx.canvas.height);
	//名前を書く
	ctx.shadowBlur=0;
	ctx.fillStyle='yellow';
	ctx.font = "bold "+this.letterSize.toString()+"px 'ＭＳ 明朝'";
	ctx.fillText(this.name,this.ctx.canvas.offsetLeft+10+mx+this.ctx.canvas.width/2-ctx.measureText(this.name).width/2,this.ctx.canvas.offsetTop-10+my+this.letterSize);

//console.log("name=",this.name,"index=",ctx.canvas.style.zIndex);
	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;
};
Plate.prototype.drawHalo=function(ctx,mx,my,top,height){
//絶対座標系
//後光
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha
	};

	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

	//影を描く
	ctx.shadowBlur=5;
	ctx.shadowColor='black';
	ctx.fillStyle='black';
	ctx.globalAlpha=0.2;
	ctx.fillRect(this.ctx.canvas.offsetLeft+mx,top+my,this.ctx.canvas.width,height);

	//後光を描く
	ctx.shadowBlur=10;
	ctx.shadowColor='white';
	ctx.fillStyle='black';
	ctx.globalAlpha=1;
	for(var ii=0;ii<5;ii++)	ctx.fillRect(this.ctx.canvas.offsetLeft+mx+10,top+my-10,this.ctx.canvas.width,height);


	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;


};
Plate.prototype.drawConnectPoint=function(ctx){
//絶対座標系
//結合予定部分
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha
	};

	ctx.shadowBlur=5;
	ctx.shadowColor='yellow';
	ctx.fillStyle='yellow';
	ctx.globalAlpha=0.7;

	ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
	for(var ii=0;ii<20;ii++)
		ctx.fillRect(this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop+this.ctx.canvas.height,this.ctx.canvas.width,1);


	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
};
Plate.prototype.nearest = function(mx,my){
	var distance;
	var min=1000000;
	for(var ii=0;ii<Plate_plates.length;ii++){
		if(Plate_plates[ii]!=this){
			//同一のplateではない
			var flag=true;
			var temp=this.next;
			while(temp!=null){
				if(Plate_plates[ii]==temp){
//console.log("same tree");
					flag=false;
					break;
				};
				temp=temp.next;
			};
			if(flag){
				var dist=calcDistance(
					this.ctx.canvas.offsetLeft+this.ctx.canvas.offsetWidth/2+mx,
					this.ctx.canvas.offsetTop+my,
					Plate_plates[ii].ctx.canvas.offsetLeft+Plate_plates[ii].ctx.canvas.offsetWidth/2,
					Plate_plates[ii].ctx.canvas.offsetTop+Plate_plates[ii].ctx.canvas.offsetHeight
				);
				if(dist<min){
					min=dist;
					id=ii;
				};
			};
		};
	};
	if(min<50){
		return Plate_plates[id];
	}else{
		return -1;
	};
};
