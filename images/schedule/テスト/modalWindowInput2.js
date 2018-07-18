modalWindowInput2JS=null;


gAnsModalWindowInput=true;//null以外//nullはmodal windowの「使用中」を示す



//cancel時は''を返す
var ModalWindowInput = function(){

	if(arguments.length!=0)console.error("引数の数が違いますよー CreateModalWindowInput");

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
*/

	var colorTextButtonOkOff='#d0d0d0';
	var colorTextButtonOkOn='black';
	var funcsOnresize="";//window.onresizeイベントでeval実行

	//	--------------- Base ----------------

	var eleBase;
	eleBase = document.createElement('canvas');
	eleBase.setAttribute('style','position:absolute;left:0px;top:0px;background-color:rgba(255,255,255,0.7);');
	eleBase.setAttribute('width',window.innerWidht);
	eleBase.setAttribute('height',window.innerHeight);
	eleBase.addEventListener('click',function(event){
		console.log("base click");

		gAnsModalWindowInput='';


		flagExist=false;
		document.getElementsByTagName('body')[0].removeChild(eleBase);
		document.getElementsByTagName('body')[0].removeChild(eleDiv);
		event.stopPropagation();
	});
	var eleBaseOnresize = function(event){
		eleBase.setAttribute('width',window.innerWidth);
		eleBase.setAttribute('height',window.innerHeight);
	};
	funcsOnresize+="eleBaseOnresize(event);";//window.onresizeで実行



	//	--------------- Div -------------------

	var colorDivBackground='#D0D0D0';

	var flagMouseDown=false;
	var mouseX;
	var mouseY;
	var eleDivX,eleDivY;
	var eleDiv;
	var eleDivStyle='border-style:solid;border-width:1px;border-color:black;padding:5px;background-color:'+colorDivBackground+';z-index:1000;position:absolute;';
	eleDiv= document.createElement('div');
	eleDiv.setAttribute('width','300');
	eleDiv.setAttribute('style',eleDivStyle+'left:'+(window.innerWidth/2).toString()+'px;top:'+(window.innerHeight/2).toString()+'px;');
	eleDiv.addEventListener('mousedown',function(event){
//console.log("div mousedown");

		flagMouseDown=true;
		mouseX=event.clientX;
		mouseY=event.clientY;
		eleDivX=eleDiv.offsetLeft;
		eleDivY=eleDiv.offsetTop;
	});
	eleDiv.addEventListener('mouseup',function(event){
//console.log('div mouseup');

		flagMouseDown=false;
	});
	eleDiv.addEventListener('mouseout',function(event){
		flagMouseDown=false;
	});
	eleDiv.addEventListener('mousemove',function(event){
//		console.log('div move');
		var rect=eleDiv.getBoundingClientRect();
		if(eleDivX+event.clientX-mouseX>0 && eleDivX+rect.width+event.clientX-mouseX<window.innerWidth){//xの範囲
			if(eleDivY+event.clientY-mouseY>0 && eleDivY+rect.height+event.clientY-mouseY<window.innerHeight){
				if(flagMouseDown){
					eleDiv.setAttribute('style',eleDivStyle+'left:'+(eleDivX+event.clientX-mouseX).toString()+'px;top:'+(eleDivY+event.clientY-mouseY).toString()+'px;');

				};
			};
		};
	});



	//	--------------- Span -----------------
/*
	var eleSpanSize=12;
	var eleSpanWidth=200;
	var eleSpanHeight=eleSpanSize*1.5;
	var eleSpanText=message;
	var eleSpan;
	eleSpan=document.createElement('canvas');
	eleSpan.setAttribute('width',eleSpanWidth);
	eleSpan.setAttribute('height',eleSpanHeight);
	eleSpan.style.position='relative';
	eleSpan.style.backgroundColor=colorDivBackground;
	var ctxSpan=eleSpan.getContext('2d');
	ctxSpan.fillStyle='black';
	var eleSpanLengthText=ctxSpan.measureText(eleSpanText).width;
	ctxSpan.font = "bold "+eleSpanSize.toString()+"px 'ＭＳ 明朝'";
	ctxSpan.fillText(eleSpanText,(eleSpanWidth-eleSpanLengthText)/2-eleSpanSize-5,(eleSpanHeight-eleSpanSize)/2+eleSpanSize*3.2/4);
	eleDiv.appendChild(eleSpan);
*/
	var eleSpanSize=12;
	var eleSpanWidth=200;
	var eleSpanHeight=eleSpanSize*1.5;
	var eleSpan;
	eleSpan=document.createElement('canvas');
	eleSpan.setAttribute('width',eleSpanWidth);
	eleSpan.setAttribute('height',eleSpanHeight);
	eleSpan.style.position='relative';
	eleSpan.style.backgroundColor=colorDivBackground;
	eleDiv.appendChild(eleSpan);
	var ctxSpan=eleSpan.getContext('2d');
	var setText = function(eleSpanText){
//console.log("yesno called");
		ctxSpan.fillStyle='black';
		var eleSpanLengthText=ctxSpan.measureText(eleSpanText).width;
		ctxSpan.font = "bold "+eleSpanSize.toString()+"px 'ＭＳ 明朝'";
		ctxSpan.fillText(eleSpanText,(eleSpanWidth-eleSpanLengthText)/2-eleSpanSize-5,(eleSpanHeight-eleSpanSize)/2+eleSpanSize*3.2/4);
	};



	//	--------------- BR ---------------------
	var eleBR1;
	eleBR1=document.createElement('br');
	eleDiv.appendChild(eleBR1);

	//	--------------- Input ------------------

	var valueDefault='イベント名';
	var eleInpColor='gray';
	var eleInp;
	eleInp= document.createElement('input');
	eleInp.style.position='relative';
	eleInp.style.marginLeft='5px';
	eleInp.setAttribute('type','text');
	eleInp.setAttribute('style','margin:5px;position:relative;left:0px;top:0px;font-size:20px;');
	eleInp.setAttribute('maxlength','20');
	eleInp.setAttribute('value',valueDefault);
	eleInp.style.color=eleInpColor;
	eleDiv.appendChild(eleInp);
//	eleInp.addEventListener('input',function(event){
//console.log("input value=",eleInp.value);
//		if(eleInp.value==''){
//			eleBtnOk.style.color=colorTextButtonOkOff;
//		}else{
//			eleBtnOk.style.color=colorTextButtonOkOn;
//		};
//	});
	eleInp.addEventListener('mousedown',function(event){
		event.stopPropagation();
	});
	eleInp.addEventListener('focus',function(event){
		if(eleInp.value==valueDefault){
			eleInp.value='';
		};
		eleInp.style.color='black';
		event.stopPropagation();
	});
	eleInp.addEventListener('blur',function(event){
		if(eleInp.value==''){
			eleInp.value=valueDefault;
			eleInp.style.color=colorTextButtonOkOff;
		};
	});
	eleInp.addEventListener('keydown',function(event){

		if(event.key=='Backspace' && eleInp.value.length==1){
			eleBtnOk.style.color=colorTextButtonOkOff;
		}else if(event.keyCode!=229 &&  event.key=='Enter' && eleInp.value.length!=0){

//日本語入力モードが有効な場合はevent.keyCodeが229になる。
//ブラウザによって異なる


			//ここに実行したいスクリプトを挿入します(下にもあります)

			gAnsModalWindowInput=eleInp.value;			


			//modal window消す
			flagExist=false;
			document.getElementsByTagName('body')[0].removeChild(eleDiv);
			document.getElementsByTagName('body')[0].removeChild(eleBase);
		}else{
			if(eleInp.value=='' || eleInp.value==valueDefault){
				eleBtnOk.style.color=colorTextButtonOkOff;
			}else{
				eleBtnOk.style.color=colorTextButtonOkOn;
			};
		};
	});


	//	------------------ BR -------------------

	var eleBR2;
	eleBR2=document.createElement('br');
	eleDiv.appendChild(eleBR2);


	//	------------------- Button Ok ----------------

	var eleBtnOk;
	eleBtnOk= document.createElement('button');
	eleBtnOk.setAttribute('type','button');
	eleBtnOk.setAttribute('style','margin-left:27px;margin-right:20px;position:relative;left:0px;top:0px;font-size:15px;');
	eleBtnOk.style.color=colorTextButtonOkOff;
	eleBtnOk.innerText='Create';
	eleDiv.appendChild(eleBtnOk);
	eleBtnOk.addEventListener('click',function(){
//console.log("ok");

		if(eleInp.value!='' && eleInp.value!=valueDefault){





			//ここに実行したいスクリプトを挿入します(上にもあります)

			gAnsModalWindowInput=eleInp.value;			







			//modal window消す
			flagExist=false;
			document.getElementsByTagName('body')[0].removeChild(eleDiv);
			document.getElementsByTagName('body')[0].removeChild(eleBase);
		};
	});


	//	------------------ Button Cancel --------------------

	var eleBtnCancel;
	eleBtnCancel= document.createElement('button');
	eleBtnCancel.setAttribute('type','button');
	eleBtnCancel.setAttribute('style','margin:5px;position:relative;left:0px;top:0px;font-size:15px;');
	eleBtnCancel.innerText='Cancel';
	eleDiv.appendChild(eleBtnCancel);
	eleBtnCancel.addEventListener('click',function(event){
//console.log('cancel');

		gAnsModalWindowInput='';


		//modal window消す
		flagExist=false;
		document.getElementsByTagName('body')[0].removeChild(eleDiv);
		document.getElementsByTagName('body')[0].removeChild(eleBase);
		event.stopPropagation();
	});


	//	------------------クロージャ-------------------

	var flagExist=false;//true if modal window were on screen
	return function(message){
		if(!flagExist){
			console.log('modalWindowInput appear');

			flagExist=true;

			//DOMツリーの最上位z-index値を調べる(深さ優先探索)
			var max=0;
			var searchChildren = function(parent){
				console.log("parent=",parent);
				var children=parent.childNodes;
				for(var ii=0,len=children.length;ii<len;ii++){
					if(children[ii].nodeType==1){
//console.log("children[",ii,"]=",children[ii].style.zIndex);
						if(max<children[ii].style.zIndex)max=children[ii].style.zIndex;
						searchChildren(children[ii]);
					};
				};
			};
			searchChildren(document.getElementsByTagName('body')[0]);
//console.log("maxZindex=",max);


//console.log("なんでこっちがゼロ？",0,0,eleSpan.clientWidth,eleSpan.clientHeight);
//ここではeleSpanはbodyにアタッチされていないのでeleSpan.clientWidthは0


			eleBase.setAttribute('width',window.innerWidth);
			eleBase.setAttribute('height',window.innerHeight);
			eleBase.style.zIndex=max+1;
			eleDiv.setAttribute('style',eleDivStyle+'left:'+(window.innerWidth/2).toString()+'px;top:'+(window.innerHeight/2).toString()+'px;z-index:'+(max+2).toString()+';');
			document.getElementsByTagName('body')[0].appendChild(eleBase);
			document.getElementsByTagName('body')[0].appendChild(eleDiv);
			eleInp.focus();

			//eleSpanの文字を消す
			ctxSpan.fillStyle=colorDivBackground;
			ctxSpan.fillRect(0,0,eleSpan.clientWidth,eleSpan.clientHeight);
			//新たに描く
			setText(message);


			//初期化
			eleInp.value=valueDefault;
			eleInp.style.color='#f0f0f0';
			eleBtnOk.style.color='#d0d0d0';



			//	---------------- events --------------------
			//どうせmodalWindowしか開いていないのだから、windowにonresizeイベントを設定してしまう->あとで困ると思う
			window.onresize=function(event){
console.log("input",funcsOnresize);
				eval(funcsOnresize);
			};


		};
	};//return
};//function
var mwInput = new ModalWindowInput();
