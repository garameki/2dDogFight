modalWindowInput2JS=null;


gAnsModalWindowInput=true;//null�ȊO//null��modal window�́u�g�p���v������



//cancel����''��Ԃ�
var ModalWindowInput = function(){

	if(arguments.length!=0)console.error("�����̐����Ⴂ�܂���[ CreateModalWindowInput");

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
*/

	var colorTextButtonOkOff='#d0d0d0';
	var colorTextButtonOkOn='black';
	var funcsOnresize="";//window.onresize�C�x���g��eval���s

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
	funcsOnresize+="eleBaseOnresize(event);";//window.onresize�Ŏ��s



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
		if(eleDivX+event.clientX-mouseX>0 && eleDivX+rect.width+event.clientX-mouseX<window.innerWidth){//x�͈̔�
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
	ctxSpan.font = "bold "+eleSpanSize.toString()+"px '�l�r ����'";
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
		ctxSpan.font = "bold "+eleSpanSize.toString()+"px '�l�r ����'";
		ctxSpan.fillText(eleSpanText,(eleSpanWidth-eleSpanLengthText)/2-eleSpanSize-5,(eleSpanHeight-eleSpanSize)/2+eleSpanSize*3.2/4);
	};



	//	--------------- BR ---------------------
	var eleBR1;
	eleBR1=document.createElement('br');
	eleDiv.appendChild(eleBR1);

	//	--------------- Input ------------------

	var valueDefault='�C�x���g��';
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

//���{����̓��[�h���L���ȏꍇ��event.keyCode��229�ɂȂ�B
//�u���E�U�ɂ���ĈقȂ�


			//�����Ɏ��s�������X�N���v�g��}�����܂�(���ɂ�����܂�)

			gAnsModalWindowInput=eleInp.value;			


			//modal window����
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





			//�����Ɏ��s�������X�N���v�g��}�����܂�(��ɂ�����܂�)

			gAnsModalWindowInput=eleInp.value;			







			//modal window����
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


		//modal window����
		flagExist=false;
		document.getElementsByTagName('body')[0].removeChild(eleDiv);
		document.getElementsByTagName('body')[0].removeChild(eleBase);
		event.stopPropagation();
	});


	//	------------------�N���[�W��-------------------

	var flagExist=false;//true if modal window were on screen
	return function(message){
		if(!flagExist){
			console.log('modalWindowInput appear');

			flagExist=true;

			//DOM�c���[�̍ŏ��z-index�l�𒲂ׂ�(�[���D��T��)
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


//console.log("�Ȃ�ł��������[���H",0,0,eleSpan.clientWidth,eleSpan.clientHeight);
//�����ł�eleSpan��body�ɃA�^�b�`����Ă��Ȃ��̂�eleSpan.clientWidth��0


			eleBase.setAttribute('width',window.innerWidth);
			eleBase.setAttribute('height',window.innerHeight);
			eleBase.style.zIndex=max+1;
			eleDiv.setAttribute('style',eleDivStyle+'left:'+(window.innerWidth/2).toString()+'px;top:'+(window.innerHeight/2).toString()+'px;z-index:'+(max+2).toString()+';');
			document.getElementsByTagName('body')[0].appendChild(eleBase);
			document.getElementsByTagName('body')[0].appendChild(eleDiv);
			eleInp.focus();

			//eleSpan�̕���������
			ctxSpan.fillStyle=colorDivBackground;
			ctxSpan.fillRect(0,0,eleSpan.clientWidth,eleSpan.clientHeight);
			//�V���ɕ`��
			setText(message);


			//������
			eleInp.value=valueDefault;
			eleInp.style.color='#f0f0f0';
			eleBtnOk.style.color='#d0d0d0';



			//	---------------- events --------------------
			//�ǂ���modalWindow�����J���Ă��Ȃ��̂�����Awindow��onresize�C�x���g��ݒ肵�Ă��܂�->���Ƃō���Ǝv��
			window.onresize=function(event){
console.log("input",funcsOnresize);
				eval(funcsOnresize);
			};


		};
	};//return
};//function
var mwInput = new ModalWindowInput();
