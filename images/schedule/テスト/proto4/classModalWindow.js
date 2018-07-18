classModalWindowJS=null;
FR.push(new FileRelative("libraryJS","classModalWindowJS"));//maxZindex()
FR.push(new FileRelative("mainHTM","classModalWindowJS"));//gBody


gAnsModalWindow=true;//null�ȊO//null��modal window�́u�g�p���v������
gExistModalWindow=false;//modal window���o�Ă��鎞true�B�d�����ďo�����Ƃ��Ď�


//cancel����''��Ԃ�
var ModalWindow = function(){

	var myself=this;//for event or hoge






	if(arguments.length!=0)console.error("�����̐����Ⴂ�܂���[ ModalWindowInput");

/*
canvas�ŉ�ʂ𕢂��B
���̏��div�ȉ���tree��append
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

	button�������ꂽ��window�ɑk��A��������capturePhase���n�܂�
		window----false
		div--------false
			input------stopPropagation
			button-----stopPropagation
	canvas�������ꂽ��window�ɑk��A��������capturePhase���n�܂邩��
		window----false
		canvas----stopPropagation


	���ʂ�capture��off�ɂȂ��Ă���bubble��on�ɂȂ��Ă���
	addEventListener�̑�O������true�ɂ����capturePhase�ŃC�x���g����������悤�ɂȂ�
*/

//	var colorTextButtonOkOff='#d0d0d0';
//	var colorTextButtonOkOn='black';


	funcsOnresize="";//window.onresize�C�x���g��eval���s
	funcsAppear="";//.prototype.appear()����eval����X�N���v�g������



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

	//window.onresize�Ŏ��s
	funcsOnresize+="myself.eleBase.setAttribute('width',window.innerWidth);";//event�̂Ȃ��Ŏg�����߂Ɋ֐��̒���var myself=this;�ƁA�Ē�`���Ă��܂��B
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
		event.stopPropagation();//CREATE plate��������̂�h��//div��child�̕����ׂĂ������Ŏ󂯎~�߂�

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
		if(eleDivX+event.clientX-mouseX>0 && eleDivX+rect.width+event.clientX-mouseX<window.innerWidth){//x�͈̔�
			if(eleDivY+event.clientY-mouseY>0 && eleDivY+rect.height+event.clientY-mouseY<window.innerHeight){
				if(flagMouseDown){
					eleDiv.setAttribute('style',eleDivStyle+'left:'+(eleDivX+event.clientX-mouseX).toString()+'px;top:'+(eleDivY+event.clientY-mouseY).toString()+'px;');

				};
			};
		};
	});


	//	--------------- Span -----------------//<span>�ł͂Ȃ�<canvas>�Ŏ���
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

	//------ DIV�ɓ���钆�g�͊e�p����̎q�N���X�̃R���X�g���N�^���ōs���Ă�������------


				// after ModalWindow.call();
				// something to do



	//�p������ϐ�->sub class�Ŏg�����
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



//�Z	this.setWindowEvent();//�q�N���X�ł��Ō�ɂ�������s���邱�ƁI�I
};
ModalWindow.prototype.setMessage = function(eleSpanText){
	this.ctxSpan.fillStyle='black';
	var eleSpanLengthText=ctxSpan.measureText(eleSpanText).width;
	this.ctxSpan.font = "bold "+this.eleSpanSize.toString()+"px '�l�r ����'";
	this.ctxSpan.fillText(eleSpanText,(this.eleSpanWidth-eleSpanLengthText)/2-this.eleSpanSize-5,(this.eleSpanHeight-this.eleSpanSize)/2+this.eleSpanSize*3.2/4);
};
ModalWindow.prototype.appear = function(absoluteX,absoluteY){
	if(!gExistModalWindow){
		console.log('modalWindow appear');

		gExistModalWindow=true;

		//DOM�c���[�̍ŏ��z-index�l�𒲂ׂ�(�[���D��T��)
		var max=maxZindex();
//console.log("maxZindex=",max);


//console.log("�Ȃ�ł��������[���H",0,0,eleSpan.clientWidth,eleSpan.clientHeight);
//�����ł�eleSpan��body�ɃA�^�b�`����Ă��Ȃ��̂�eleSpan.clientWidth��0


		gBody.appendChild(this.eleBase);//���append���Ă����ƁAwidth�Ȃǂ�property�̒l�������ĕ֗�
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

		var searchWord = function(word,sVariable){//this��T��->���K�\���g�����
			for(var ii=0,len=sVariable.length;ii<len-word.length;ii++){
				if(sVariable.substr(ii,word.length)==word)console.error("funcsOnresize��this���܂܂�Ă��܂�",ii,sVariable.substr(ii));
			};
		};


		//	- events -	�ǂ���modalWindow�����J���Ă��Ȃ��̂�����Awindow��onresize�C�x���g��ݒ肵�Ă��܂�->���Ƃō���Ǝv��
		//���g�ɂ�this.���g�킸��myself.���g���Ă�������
//�Z		for(var ii=0,len=this.funcsOnresize.length;ii<len-4;ii++){
//�Z			if(this.funcsOnresize.substr(ii,4)=='this')console.error("funcsOnresize��this���܂܂�Ă��܂�",this.funcsOnresize.substr(ii));
//�Z		};
		searchWord('this',this.funcsOnresize);//��

		var myself=this;
		window.onresize=function(event){
console.log(myself.funcsOnresize);
			eval(myself.funcsOnresize);
		};


		//prototype.appear()�̂Ƃ��ɃI�[�o�[���C�h����قǂł��Ȃ����߂����s
		searchWord('this',this.funcsAppear);
		eval(myself.funcsAppear);





	};
};
ModalWindow.prototype.vanish = function(){
	//���̏���
	this.ctxSpan.fillStyle=this.colorDivBackground;
	this.ctxSpan.fillRect(0,0,this.eleSpan.clientWidth,this.eleSpan.clientHeight);
//console.log("pp=",eleSpan.clientWidth,event);

console.log("name=",this.name);
console.log("vanish",this.eleBase.parentNode,this.eleDiv.parentNode);
	//modal window����

	this.eleBase.parentNode.removeChild(this.eleBase);
	this.eleDiv.parentNode.removeChild(this.eleDiv);
	gExistModalWindow=false;
	window.onresize=null;

};
ModalWindow.prototype.initialize = function(){
//�b��
	//eleSpan�̕���������
	ctxSpan.fillStyle=colorDivBackground;
	ctxSpan.fillRect(0,0,eleSpan.clientWidth,eleSpan.clientHeight);


	//������
//	eleInp.value=valueDefault;
//	eleInp.style.color='#f0f0f0';
//	eleBtnOk.style.color='#d0d0d0';
};
ModalWindow.prototype.setWindowEvent = function(){

};


