//ファイルの関係性関連
ita2JS=null;
FR.push(new FileRelative("libraryJS","ita2JS"));
FR.push(new FileRelative("modalWindowInput3JS","ita2JS"));
FR.push(new FileRelative("modalWindowYesNo2JS","ita2JS"));
FR.push(new FileRelative("plate5JS","ita2JS"));


//あるtreeのTopに近い、別のtreeのnodeの下を探して、そのnodeを返す
Ita_nearestTopBottom = function(arr,mx,my){


//console.log("TB this=",this);


	var distance;
	var min=1000000;
	var flag,temp,id;
	for(var ii=0;ii<arr.length;ii++){
		if(arr[ii]!=this){
			//同一のplateではない
			flag=true;
			temp=this.next;//<-自分が一番上だから
			while(temp!=null){
				if(arr[ii]==temp){
//console.log("same tree");
					flag=false;
					break;
				};
				temp=temp.next;
			};
			if(flag){
				//条件①自分自身でない
				//条件②自分が属するツリーでない
				//を満たす、自分のtopと相手のbottomの距離を計算
				var dist=calcDistance(
					this.ctx.canvas.offsetLeft+this.ctx.canvas.offsetWidth/2+mx+Ita_floatPX,
					this.ctx.canvas.offsetTop+my-Ita_floatPX,
					arr[ii].ctx.canvas.offsetLeft+arr[ii].ctx.canvas.offsetWidth/2,
					arr[ii].ctx.canvas.offsetTop+arr[ii].ctx.canvas.offsetHeight
				);
				if(dist<min){
					min=dist;
					id=ii;
				};
			};
		};
	};


	if(min<50){//距離が50以内なら近いと判断
		return {
			dist:min,
			node:arr[id]
		};
	}else{
		return -1;
	};
};


//あるtreeのBottomに近い、別のtreeのTopをarrの中から探してそのTopを返す
Ita_nearestBottomTop = function(arr,mx,my){

	for(var ii=0,len=arr.length;ii>len;ii++){
		arr[ii].checked=false;//チェックしたものかどうか
	};


	var bottom;//自分のツリーの一番下
	bottom=this;
	while(bottom.next!=null){
		bottom=bottom.next;
	};

	var distance;
	var min=1000000;
	var flag,temp;
	var top;//相手ツリーの一番上
	for(var ii=0;ii<arr.length;ii++){
		flag=true;
		if(arr[ii]==this){//条件①
			flag=false;
		};
		temp=this.next;//<-自分が一番上だから
		while(temp!=null && flag){
			if(arr[ii]==temp){//条件②
//console.log("same tree");
				flag=false;
				break;
			};
			temp=temp.next;
		};
		//arr[ii]の所属するtreeの一番上のノードに行く
		top=arr[ii];
		while(top.front!=null && flag){//条件③
			top=top.front;
			//check済みならそのtreeはチェック済みだから遡りを飛ばす
			if(top.checked){
				flag=false;
				break;
			};
		};
		if(flag){
console.log("BT top=",top.name);
console.log("BT bottom=",bottom.name);
			//条件①plates[ii]が自分自身でない
			//条件②plates[ii]が自分が属するツリーのノードでない
			//条件③plates[ii]の属するtreeはまだチェックしていない
			//を満たす、自分のツリーのbottomと相手のツリーのtopとの距離を計算
			var dist=calcDistance(
				bottom.ctx.canvas.offsetLeft+bottom.ctx.canvas.offsetWidth/2+mx+Ita_floatPX,
				bottom.ctx.canvas.offsetTop+bottom.ele.offsetHeight+my-Ita_floatPX,
				top.ctx.canvas.offsetLeft+top.ctx.canvas.offsetWidth/2,
				top.ctx.canvas.offsetTop
			);
			if(dist<min){
				min=dist;
				id=ii;
			};
		};
		arr[ii].checked=true;
	};

//console.log("BT min=",min);
	if(min<50){//距離が50以内なら近いと判断

		return {
			node:arr[id],
			dist:min
		};
	}else{
		return -1;
	};
};





//Itaクラス関数

var Ita_floatPX=10;//ドラッグ時の浮き

var Ita_Contents=function(name){

	this.name=name;
	this.ctx=createContext(NumZindex(),200,50);
	this.ele=this.ctx.canvas;

	var letterSize,lettersWidth;
	var letterSize=30;
	//文字の大きさを決めておく
	do{
		letterSize--;
		myself.ctx.font = "bold "+letterSize.toString()+"px 'ＭＳ 明朝'";
		lettersWidth=myself.ctx.measureText(name).width;
	}while(lettersWidth>myself.ctx.canvas.width-5);

	this.letterSize=letterSize;


};

var Ita = function(name){

	var ele=document.createElement('div');
	ele.style.position='absolute';
	ele.draggable=false;
	ele.style.backgroundColor='skyblue';


	var myself=this;

	myself.next=null;//合体した場合の次のノードkkk
	myself.front=null;

//kkk z-indexを付けなおす必要がある。まずは、生成順に上げていく？

	myself.content = new Ita_Contents(name);

	myself.checked=false;//Ita_nearestBottomTop()で使っている




	myself.mouseDown=false;
	var mouseX,mouseY;
	var moveX,moveY;

	//mouseがクリックされている時は、移動するので、このcanvasの絵を消す


	myself.draw(myself.ctx);//位置とparentを追加すべし





	var ctxF,ctxB,oneself;
	myself.ctx.canvas.onmousedown = function(event){
		event.stopPropagation();

//console.log("event:",myself.name,"mousedown");

		if(event.button==2){
			
//console.log("2parent=",myself.ctx.canvas.parentNode);
//modalWindowは答えだけ返す

			if(gAnsModalWindow!=null){
				gAnsModalWindow=null;
				mwYesNo.setMessage("消してもいいですか?");
				mwYesNo.appear(event.clientX,event.clientY);
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
									oneself.ctx.canvas.style.zIndex=NumZindex();
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

console.log("下を消す");
			//mouseDown->自分から下を消す
			oneself=myself;
			while(oneself!=null){
				oneself.clear();//それぞれのcanvasから消す
				oneself=oneself.next;
			};

console.log("z-indexの更新");
			//mouseDown->自分より上のz-indexを更新する
			oneself=myself.front;
			while(oneself!=null){
				oneself.ctx.canvas.style.zIndex=NumZindex();
				oneself=oneself.front;
			};


			//新しいcanvasを敷き、そこにイベントリスナーを設定する
			//onmousemove時には新しいcanvasに描いて移動をさせる(attributeを操作すると遅いから)

console.log("ctxFの設置");
		
			NumZindex();//ctxBの分が-1のため
			ctxF = createContext(NumZindex());//最前面、画面いっぱい(default)

			ctxF.canvas.setAttribute('id','ctxF');//●

console.log("自分から下を浮かせて描く");
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


console.log("影とHaloを描く");
			ctxB = createContext(ctxF.canvas.style.zIndex-1);//影とHaloを描く
			ctxB.canvas.setAttribute('id','ctxB');//●

			myself.drawHalo(ctxB,0,0,top,height);




//console.log("event=",event.target.offsetLeft,height);


//onmouseout

			//結合を切る
			if(myself.front!=null)myself.front.next=null;
			myself.front=null;

			Body.appendChild(ctxF.canvas);//●
			Body.appendChild(ctxB.canvas);//●

//console.log("cut name=",myself.name);


			//イベント設定


			ctxF.canvas.onmouseup = function(event){
				myself.mouseDown=false;
	
				var oneself;
				var moveX=event.clientX-mouseX;
				var moveY=event.clientY-mouseY;

				//halo用のcanvasと移動中の絵を描くcanvasを切り離す
				ctxF.canvas.parentNode.removeChild(ctxF.canvas);
				ctxF=null;//メモリ開放
				ctxB.canvas.parentNode.removeChild(ctxB.canvas);
				ctxB=null;

	
				//移動先にhtmlを据え付けなおす
				var nearest =myself.nearest(moveX,moveY);
if(nearest==-1)console.log("nearest=none");
else console.log("nearest=",nearest.node.name,nearest.ub);
				if(nearest==-1){
					myself.ctx.canvas.setAttribute('style','position:absolute;left:'+(myself.ctx.canvas.offsetLeft+moveX).toString()+'px;top:'+(myself.ctx.canvas.offsetTop+moveY).toString()+'px;');
					myself.ctx.canvas.style.zIndex=NumZindex();
					oneself=myself.next;
					while(oneself!=null){
						oneself.ctx.canvas.setAttribute('style','position:absolute;left:'+(oneself.ctx.canvas.offsetLeft+moveX).toString()+'px;top:'+(oneself.ctx.canvas.offsetTop+moveY).toString()+'px;');
						oneself.ctx.canvas.style.zIndex=NumZindex();
						oneself=oneself.next;
					};


				}else{
					myself.insert(nearest.node,nearest.ub);

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
				//移動中の絵を描くcanvasをクリア
				ctxF.clearRect(0,0,ctxF.canvas.width,ctxF.canvas.height);

				//クリックされてからの移動距離
				var moveX=event.clientX-mouseX;
				var moveY=event.clientY-mouseY;

				//自分とその下をdrawMove
				myself.drawMove(ctxF,moveX,moveY);
				var oneself=myself.next;
				while(oneself!=null){
					oneself.drawMove(ctxF,moveX,moveY);
					oneself=oneself.next;
				};

				//ハローを描く
				myself.drawHalo(ctxB,moveX,moveY,top,height);

				//近くのノードを光らせる
				myself.brightenConnectPoint(ctxB,moveX,moveY);
			};//ctxF onmousemove


		}else{
			console.error("1 nor 2 event.button=",event.button);
		};

		event.stopPropagation();
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
Ita.prototype.insert=function(nearest,pos){

	var one=this;

	//チェック
	if(this.front!=null)console.error("thisはtreeの一番上のノードである必要があります");//thisは一番上でなくてはならない

	if(pos=='bottom'){
		//nearestとnearest.nextの間にthisのtreeをインサート


		var nextPrevious = nearest.next;//一時保存
	
		//nearestとmyselfを繋ぐ
		nearest.next = this;
		this.front = nearest;
	
		//thisの所属するtreeの一番後ろを求める
		var oneBottom=this;
		while(oneBottom.next!=null){
			oneBottom=oneBottom.next;
		};

		//oneBottomと元のnearest.nextを繋ぐ
		oneBottom.next=nextPrevious;
		if(nextPrevious!=null)nextPrevious.front=oneBottom;


		//nearestから、nearestを基準に下に向けてnodeを描いていく

		var node=nearest;//描く対象
		while(node.next!=null){
			node=node.next;
			node.ele.setAttribute('style','position:absolute;left:'+(nearest.ele.offsetLeft).toString()+'px;top:'+(node.front.ele.offsetTop+node.front.ele.height).toString()+'px;');
			node.ele.style.zIndex=NumZindex();
		};

	}else if(pos=='top'){
		//nearestの上にorganの一番下を繋げる。nearestは一番上のはずだから、これで終わり。

		//チェック
		if(nearest.front!=null)console.error(nearest.name,"はtreeの先頭ではありません。front=",nearest.front.name);

		//一番下のnodeを求める	
		var oneBottom=this;
		while(oneBottom.next!=null){
			oneBottom=oneBottom.next;
		};
		
		//thisのあとにnearestを繋げる
		oneBottom.next=nearest;
		nearest.front=oneBottom;

		//nearestから、nearestを基準に上に向かってnodeを描いていく

		var node=nearest;
		while(node.front!=null){
			node=node.front;
			node.ele.setAttribute('style','position:absolute;left:'+(nearest.ele.offsetLeft).toString()+'px;top:'+(node.next.ele.offsetTop-node.ele.height).toString()+'px;');
			node.ele.style.zIndex=NumZindex();
		};

	}else{
		console.error("posの値が'top'でも'bottom'でもありません。pos=",pos);
	};
};
Ita.prototype.brightenConnectPoint=function(ctxB,moveX,moveY){
	//ctxB...おおきさはwindow.innerWidht×window.innerHeight

	var myself=this;

	var ansTB=Ita_nearestTopBottom.call(myself,moveX,moveY);
	var ansBT=Ita_nearestBottomTop.call(myself,moveX,moveY);
	if(ansTB==-1){
		if(ansBT==-1){
			//do nothing
		}else{
			ansBT.node.drawConnectPointTop(ctxB);
		};
	}else{
		if(ansBT==-1){
			ansTB.node.drawConnectPointBottom(ctxB);
		}else{
			if(ansTB.dist<ansBT.dist){
				ansTB.node.drawConnectPointBottom(ctxB);
			}else{
				ansBT.node.drawConnectPointTop(ctxB);
			};
		};
	};
if(ansTB!=-1)console.log("distanceTB=",ansTB.dist);
if(ansBT!=-1)console.log("distanceBT=",ansBT.dist);

//○	var nearest =myself.nearest(moveX,moveY);
//○	if(nearest!=-1)nearest.drawConnectPointBottom(ctxB);


};
Ita.prototype.clear = function(){

		this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

};
Ita.prototype.draw = function(ctx){
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
Ita.prototype.drawMove= function(ctx,mx,my){
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
	ctx.fillRect(this.ctx.canvas.offsetLeft+Ita_floatPX+mx,this.ctx.canvas.offsetTop-Ita_floatPX+my,this.ctx.canvas.width-1,this.ctx.canvas.height-1);
	//枠を縁取る
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeRect(this.ctx.canvas.offsetLeft+Ita_floatPX+mx,this.ctx.canvas.offsetTop-Ita_floatPX+my,this.ctx.canvas.width,this.ctx.canvas.height);
	//名前を書く
	ctx.shadowBlur=0;
	ctx.fillStyle='yellow';
	ctx.font = "bold "+this.letterSize.toString()+"px 'ＭＳ 明朝'";
	ctx.fillText(this.name,this.ctx.canvas.offsetLeft+Ita_floatPX+mx+this.ctx.canvas.width/2-ctx.measureText(this.name).width/2,this.ctx.canvas.offsetTop-Ita_floatPX+my+this.letterSize);

//console.log("name=",this.name,"index=",ctx.canvas.style.zIndex);
	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;


//	this.draw(this.ctx);//kkkkkkkkk
};
Ita.prototype.drawHalo=function(ctx,mx,my,top,height){
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
	for(var ii=0;ii<5;ii++)	ctx.fillRect(this.ctx.canvas.offsetLeft+mx+Ita_floatPX,top+my-Ita_floatPX,this.ctx.canvas.width,height);


	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;


};
Ita.prototype.drawConnectPointBottom=function(ctx){
//絶対座標系
//結合予定部分（下部）
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
	//重ね塗りで茫洋感を出す
	for(var ii=0;ii<20;ii++)
		ctx.fillRect(this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop+this.ctx.canvas.height,this.ctx.canvas.width,1);



	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
};
Ita.prototype.drawConnectPointTop=function(ctx){
//絶対座標系
//結合予定部分（上部）
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
	//重ね塗りで茫洋感を出す
	for(var ii=0;ii<20;ii++)
		ctx.fillRect(this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop,this.ctx.canvas.width,1);



	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
};
Ita.prototype.nearest = function(mx,my){
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
					this.ctx.canvas.offsetLeft+this.ctx.canvas.offsetWidth/2+mx+Ita_floatPX,
					this.ctx.canvas.offsetTop+my-Ita_floatPX,
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
Ita.prototype.nearest=function(moveX,moveY){

	var ansTB=Ita_nearestTopBottom.call(this,moveX,moveY);
	var ansBT=Ita_nearestBottomTop.call(this,moveX,moveY);
console.log("ansTB=",ansTB);
console.log("ansBT=",ansBT);

	var ans;
	if(ansTB==-1){
		if(ansBT==-1){
			ans= -1;
		}else{
			ans= {node:ansBT.node,ub:'top'};
		};
	}else{
		if(ansBT==-1){
			ans= {node:ansTB.node,ub:'bottom'};
		}else{
			if(ansTB.dist<ansBT.dist){
				ans= {node:ansTB.node,ub:'bottom'};
			}else{
				ans= {node:ansBT.node,ub:'top'};
			};
		};
	};
	return ans;
};

