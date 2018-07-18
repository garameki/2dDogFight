//ファイルの関係性関連
key1JS=null;
FR.push(new FileRelative("libraryJS","key1JS"));
FR.push(new FileRelative("modalWindowInput3JS","key1JS"));
FR.push(new FileRelative("modalWindowYesNo2JS","key1JS"));
FR.push(new FileRelative('plate4JS','key1JS'));//keyをドロップした時にplateを生成するときに必要&既存のplateにattachするときに必要



var Key_keys = new Array();//Keyのクラス変数//kkk あとで変数名を直す
var Key = function(name){

	Ita.call(this,name);
	this.ele.style.position='relative';//●
	this.ele.appendChild(document.createElement('br'));

	Key_keys.push(this);//クラス変数

	var myself=this;

//○	myself.name=name;//super class で定義済み



//○	myself.mouseDown=false;
//〇	var mouseX,mouseY;//window.onmousedownでgMouseDownX,Yを定義済み
	var moveX,moveY;


	//mouseがクリックされている時は、移動するので、このcanvasの絵を消す


	var ctxF,ctxB,oneself;
	myself.ctx.canvas.onmousedown = function(event){

		if($testevent)console.log("key.mousedown");

		if(event.button==2){//右クリック
			
			if(gAnsModalWindow!=null){
				gAnsModalWindow=null;

				//MWが出ている時にkeyやeleMenuがドラッグされたくないので禁止
				myself.ctx.canvas.draggable=false;
				myself.ctx.canvas.parentNode.draggable=false;

				mwYesNo.setMessage("消してもいいですか?");
				mwYesNo.appear(event.clientX,event.clientY);
				var hoge = setInterval(function(){
	
					if(gAnsModalWindow!=null){
						clearInterval(hoge);
						if(gAnsModalWindow){
							//禁止していたドラッグを可能に戻す
							myself.ctx.canvas.draggable=true;
							myself.ctx.canvas.parentNode.draggable=true;

							//canvasに伴うBRを消す
							var childs=myself.ctx.canvas.parentNode.childNodes;
							for(var ii=0,len=childs.length;ii<len;ii++){
								if(childs[ii]==myself.ctx.canvas){
									childs[ii+1].parentNode.removeChild(childs[ii+1]);
								};
							};
							myself.ctx.canvas.parentNode.removeChild(myself.ctx.canvas);



						}else{

							//do nothing
						};
					};
				},100);
			};

			//右クリックここまで

		}else if(event.button==0){//左クリック

			//do nothing
		}else{
			console.error("1 nor 2 event.button=",event.button);
		};

		event.stopPropagation();
	};//onmousedown

	//ドラッグ&ドロップ
	myself.ctx.canvas.ondragstart=function(event){
console.log("key1  dragstart event=",event.dataTransfer.setDragImage);
		var a=new Ita(myself.name);
		event.dataTransfer.setDragImage(a.ctx.canvas, a.ctx.canvas.offsetWidth, a.ctx.canvas.offsetHeight);	
	};

	myself.ctx.canvas.ondrag=function(event){

		//近くのノードの下部分を光らせる
		var nearest =myself.nearest(moveX,moveY);
		if(nearest!=-1)nearest.drawConnectPoint(ctxB);

		event.stopPropagation();
	};

	var moveX,moveY;
////	myself.ele.ondragstart=function(event){
//		event.stopPropagation();
//	};
	myself.ctx.canvas.ondragend=function(event){

		//eleWorkにkey.ctx.canvasをattach

		var plate = new Plate(myself.name);
		plate.ele.style.left=(event.clientX-gMouseDownXrel).toString()+'px';
		plate.ele.style.top=(event.clientY-gMouseDownYrel).toString()+'px';
		eleWork.appendChild(plate.ele);

		event.stopPropagation();
console.log("event=",event);

	};

};
inherits(Key,Ita);

Key.prototype.clear = function(ctx){

		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

};
Key.prototype.draw = function(ctx){
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
Key.prototype.drawMove= function(ctx,mx,my){
//絶対座標系
//名前
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha,
		lineWidth:ctx.lineWidth
	};

	console.log("left=",this.ele.offsetLeft+parseInt(eleMenu.style.left));
	console.log("top=",parseInt(eleMenu.style.left));


	//地を塗る
	ctx.globalAlpha=1;
	ctx.shadowBlur=0;
	ctx.fillStyle='rgb(0,200,0)';
	ctx.fillRect(parseInt(eleMenu.style.left)+this.ele.offsetLeft+10+mx,parseInt(eleMenu.style.top)+this.ele.offsetTop-10+my,this.ele.width-1,this.ele.height-1);
	//枠を縁取る
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeRect(parseInt(eleMenu.style.left)+this.ele.offsetLeft+10+mx,parseInt(eleMenu.style.top)+this.ele.offsetTop-10+my,this.ele.width,this.ele.height);
	//名前を書く
	ctx.shadowBlur=10;
	ctx.fillStyle='yellow';
	ctx.font = "bold "+this.letterSize.toString()+"px 'ＭＳ 明朝'";
	ctx.fillText(this.name,parseInt(eleMenu.style.left)+this.ele.offsetLeft+10+mx+this.ele.width/2-ctx.measureText(this.name).width/2,parseInt(eleMenu.style.top)+this.ele.offsetTop-10+my+this.letterSize);

//console.log("name=",this.name,"index=",ctx.canvas.style.zIndex);
	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;
};
Key.prototype.drawHalo=function(ctx,mx,my,top,height){
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
	ctx.fillRect(parseInt(eleMenu.style.left)+this.ele.offsetLeft+mx,parseInt(eleMenu.style.top)+top+my,this.ele.width,height);

	//後光を描く
	ctx.shadowBlur=10;
	ctx.shadowColor='white';
	ctx.fillStyle='black';
	ctx.globalAlpha=1;
	for(var ii=0;ii<5;ii++)	ctx.fillRect(parseInt(eleMenu.style.left)+this.ele.offsetLeft+mx+10,parseInt(eleMenu.style.top)+top+my-10,this.ele.width,height);


	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;


};
Key.prototype.drawConnectPoint=function(ctx){
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

	ctx.clearRect(0,0,this.ele.width,this.ele.height);
	for(var ii=0;ii<20;ii++)
		ctx.fillRect(this.ele.offsetLeft,this.ele.offsetTop+this.ele.height,this.ele.width,1);


	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
};
Key.prototype.nearest = function(mx,my){
	var distance;
	var min=1000000;
	for(var ii=0;ii<Key_keys.length;ii++){
		if(Key_keys[ii]!=this){
			//同一のplateではない
			var flag=true;
			var temp=this.next;
			while(temp!=null){
				if(Key_keys[ii]==temp){
//console.log("same tree");
					flag=false;
					break;
				};
				temp=temp.next;
			};
			if(flag){
				var dist=calcDistance(
					this.ele.offsetLeft+this.ele.offsetWidth/2+mx,
					this.ele.offsetTop+my,
					Key_keys[ii].ctx.canvas.offsetLeft+Key_keys[ii].ctx.canvas.offsetWidth/2,
					Key_keys[ii].ctx.canvas.offsetTop+Key_keys[ii].ctx.canvas.offsetHeight
				);
				if(dist<min){
					min=dist;
					id=ii;
				};
			};
		};
	};
	if(min<50){
		return Key_keys[id];
	}else{
		return -1;
	};
};
