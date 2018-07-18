classModalWindowJS=null;
FR.push(new FileRelative("libraryJS","classModalWindowJS"));//maxZindex()
FR.push(new FileRelative("mainHTM","classModalWindowJS"));//gBody


gAnsModalWindow=true;//null以外//nullはmodal windowの「使用中」を示す
gExistModalWindow=false;//modal windowが出ている時true。重複して出すことを監視


//cancel時は''を返す
var ModalWindow = function(){

	var myself=this;//for event or hoge






	if(arguments.length!=0)console.error("引数の数が違いますよー ModalWindowInput");

/*
canvasで画面を覆う。
その上にdiv以下のtreeをappend
	html
	 l
	body
	 l-------canvas
	 l-------div
		 l------canvas
		 l------br
		 l------input
		 l------br
		 l------buttonOk
		 l------buttonCancel

	buttonが押されたらwindowに遡り、そこからcapturePhaseが始まる
		window----false
		div--------false
			input------stopPropagation
			button-----stopPropagation
	canvasが押されたらwindowに遡り、そこからcapturePhaseが始まるから
		window----false
		canvas----stopPropagation


	普通はcaptureはoffになっていてbubbleがonになっている
	addEventListenerの第三引数をtrueにするとcapturePhaseでイベントが発生するようになる
*/

//	var colorTextButtonOkOff='#d0d0d0';
//	var colorTextButtonOkOn='black';


	funcsOnresize="";//window.onresizeイベントでeval実行
	funcsAppear="";//.prototype.appear()内でevalするスクリプトを入れる



	//	--------------- Base ----------------

	var eleBase;
	eleBase = document.createElement('canvas');
	eleBase.setAttribute('id','mwBASE');
	eleBase.setAttribute('style','position:absolute;left:0px;top:0px;background-color:rgba(255,255,255,0.7);');
	eleBase.setAttribute('width',window.innerWidht);
	eleBase.setAttribute('height',window.innerHeight);
	eleBase.addEventListener('click',function(event){
		console.log("base click");

		gAnsModalWindow='';
console.log("classMW",myself.test);
		myself.vanish();
		event.stopPropagation();
	});

	//window.onresizeで実行
	funcsOnresize+="myself.eleBase.setAttribute('width',window.innerWidth);";//eventのなかで使うために関数の中でvar myself=this;と、再定義しています。
	funcsOnresize+="myself.eleBase.setAttribute('height',window.innerHeight);";



	//	--------------- Div -------------------

	var colorDivBackground='#D0D0D0';

	var flagMouseDown=false;
	var mouseX;
	var mouseY;
	var eleDivX,eleDivY;
	var eleDiv;
	var eleDivStyle='border-style:solid;border-width:1px;border-color:black;padding:5px;background-color:'+colorDivBackground+';z-index:1000;position:absolute;';
	eleDiv= document.createElement('div');
	eleDiv.setAttribute('id','mwDiv');
	eleDiv.setAttribute('width','300');
	eleDiv.setAttribute('style',eleDivStyle+'left:'+(window.innerWidth/2).toString()+'px;top:'+(window.innerHeight/2).toString()+'px;');
	eleDiv.addEventListener('mousedown',function(event){
if($testevent)console.log("mw.div.mousedown");

		flagMouseDown=true;
		mouseX=event.clientX;
		mouseY=event.clientY;
		eleDivX=eleDiv.offsetLeft;
		eleDivY=eleDiv.offsetTop;
		event.stopPropagation();//CREATE plateが消えるのを防ぐ//divのchildの分すべてをここで受け止める

	});
	eleDiv.addEventListener('mouseup',function(event){
		if($testevent)console.log('mw.div.mouseup');

		flagMouseDown=false;
		event.stopPropagation();
	});
	eleDiv.addEventListener('click',function(event){
		if($testevent)console.log('mw.div.click',event);
		event.stopPropagation();
	});
	
	eleDiv.addEventListener('mouseout',function(event){
		flagMouseDown=false;
	});
	eleDiv.addEventListener('mousemove',function(event){
		if($testevent)console.log('mw.div.move');
		var rect=eleDiv.getBoundingClientRect();
		if(eleDivX+event.clientX-mouseX>0 && eleDivX+rect.width+event.clientX-mouseX<window.innerWidth){//xの範囲
			if(eleDivY+event.clientY-mouseY>0 && eleDivY+rect.height+event.clientY-mouseY<window.innerHeight){
				if(flagMouseDown){
					eleDiv.setAttribute('style',eleDivStyle+'left:'+(eleDivX+event.clientX-mouseX).toString()+'px;top:'+(eleDivY+event.clientY-mouseY).toString()+'px;');

				};
			};
		};
	});


	//	--------------- Span -----------------//<span>ではなく<canvas>で実装
	eleSpanSize=12;
	eleSpanWidth=200;
	eleSpanHeight=eleSpanSize*1.5;
	var eleSpan;
	eleSpan=document.createElement('canvas');
	eleSpan.setAttribute('width',eleSpanWidth);
	eleSpan.setAttribute('height',eleSpanHeight);
	eleSpan.style.position='relative';
	eleSpan.style.backgroundColor=colorDivBackground;
	eleDiv.appendChild(eleSpan);
	ctxSpan=eleSpan.getContext('2d');


	//	--------------- BR ---------------------
	var eleBR1;
	eleBR1=document.createElement('br');
	eleDiv.appendChild(eleBR1);

	//------ DIVに入れる中身は各継承後の子クラスのコンストラクタ内で行ってください------


				// after ModalWindow.call();
				// something to do



	//継承する変数->sub classで使うやつ
	this.funcsOnresize=funcsOnresize;
	this.funcsAppear=funcsAppear;
	this.eleBase=eleBase;
	this.eleSpanSize=eleSpanSize;
	this.eleSpanWidth=eleSpanWidth;
	this.eleSpanHeight=eleSpanHeight;
	this.eleSpan=eleSpan;
	this.colorDivBackground=colorDivBackground;
	this.eleDiv=eleDiv;
	this.eleDivStyle=eleDivStyle;
	this.ctxSpan=ctxSpan;



//〇	this.setWindowEvent();//子クラスでも最後にこれを実行すること！！
};
ModalWindow.prototype.setMessage = function(eleSpanText){
	this.ctxSpan.fillStyle='black';
	var eleSpanLengthText=ctxSpan.measureText(eleSpanText).width;
	this.ctxSpan.font = "bold "+this.eleSpanSize.toString()+"px 'ＭＳ 明朝'";
	this.ctxSpan.fillText(eleSpanText,(this.eleSpanWidth-eleSpanLengthText)/2-this.eleSpanSize-5,(this.eleSpanHeight-this.eleSpanSize)/2+this.eleSpanSize*3.2/4);
};
ModalWindow.prototype.appear = function(absoluteX,absoluteY){
	if(!gExistModalWindow){
		console.log('modalWindow appear');

		gExistModalWindow=true;

		//DOMツリーの最上位z-index値を調べる(深さ優先探索)
		var max=maxZindex();
//console.log("maxZindex=",max);


//console.log("なんでこっちがゼロ？",0,0,eleSpan.clientWidth,eleSpan.clientHeight);
//ここではeleSpanはbodyにアタッチされていないのでeleSpan.clientWidthは0


		gBody.appendChild(this.eleBase);//先にappendしておくと、widthなどのpropertyの値が得られて便利
		gBody.appendChild(this.eleDiv);

		this.eleBase.setAttribute('width',window.innerWidth);
		this.eleBase.setAttribute('height',window.innerHeight);
		this.eleBase.style.zIndex=max+1;
		this.eleDiv.setAttribute('style',this.eleDivStyle+'left:'+(absoluteX-this.eleDiv.clientWidth/2).toString()+'px;top:'+(absoluteY-this.eleDiv.clientHeight/2).toString()+'px;z-index:'+(max+2).toString()+';');
var mm=this;
var hoge=setInterval(function(){
	clearInterval(hoge);
	console.log(mm.eleDiv.id,"'s parent =",mm.eleDiv.parentNode);
},100);
//		eleInp.focus();

		var searchWord = function(word,sVariable){//thisを探す->正規表現使えるな
			for(var ii=0,len=sVariable.length;ii<len-word.length;ii++){
				if(sVariable.substr(ii,word.length)==word)console.error("funcsOnresizeにthisが含まれています",ii,sVariable.substr(ii));
			};
		};


		//	- events -	どうせmodalWindowしか開いていないのだから、windowにonresizeイベントを設定してしまう->あとで困ると思う
		//中身にはthis.を使わずにmyself.を使ってください
//〇		for(var ii=0,len=this.funcsOnresize.length;ii<len-4;ii++){
//〇			if(this.funcsOnresize.substr(ii,4)=='this')console.error("funcsOnresizeにthisが含まれています",this.funcsOnresize.substr(ii));
//〇		};
		searchWord('this',this.funcsOnresize);//●

		var myself=this;
		window.onresize=function(event){
console.log(myself.funcsOnresize);
			eval(myself.funcsOnresize);
		};


		//prototype.appear()のときにオーバーライドするほどでもない命令を実行
		searchWord('this',this.funcsAppear);
		eval(myself.funcsAppear);





	};
};
ModalWindow.prototype.vanish = function(){
	//次の準備
	this.ctxSpan.fillStyle=this.colorDivBackground;
	this.ctxSpan.fillRect(0,0,this.eleSpan.clientWidth,this.eleSpan.clientHeight);
//console.log("pp=",eleSpan.clientWidth,event);

console.log("name=",this.name);
console.log("vanish",this.eleBase.parentNode,this.eleDiv.parentNode);
	//modal window消す

	this.eleBase.parentNode.removeChild(this.eleBase);
	this.eleDiv.parentNode.removeChild(this.eleDiv);
	gExistModalWindow=false;
	window.onresize=null;

};
ModalWindow.prototype.initialize = function(){
//暫定
	//eleSpanの文字を消す
	ctxSpan.fillStyle=colorDivBackground;
	ctxSpan.fillRect(0,0,eleSpan.clientWidth,eleSpan.clientHeight);


	//初期化
//	eleInp.value=valueDefault;
//	eleInp.style.color='#f0f0f0';
//	eleBtnOk.style.color='#d0d0d0';
};
ModalWindow.prototype.setWindowEvent = function(){

};


