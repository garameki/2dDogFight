modalWindowInput3JS=null;

FR.push(new FileRelative("classModalWindowJS","modalWindowInput3JS"));
FR.push(new FileRelative("libraryJS","modalWindowInput3JS"));//inherits�������Ă�


gAnsModalWindow=true;//null�ȊO//null��modal window�́u�g�p���v������




		//�N���X


//cancel����''��Ԃ�
var ModalWindowInput = function(){

	if(arguments.length!=0)console.error("�����̐����Ⴂ�܂���[ ModalWindowInput");

	var myself=this;//�C�x���g��hoge�̒��Ŏg������




	myself.test=2;

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



	ModalWindow.call(this);

	var colorTextButtonOkOff='#d0d0d0';
	var colorTextButtonOkOn='black';
//	var funcsOnresize="";//window.onresize�C�x���g��eval���s super class�ŏ������ς�

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
	this.eleDiv.appendChild(eleInp);
	eleInp.addEventListener('input',function(event){
console.log("input value=",eleInp.value);
		if(eleInp.value==''){
			eleBtnOk.style.color=colorTextButtonOkOff;
		}else{
			eleBtnOk.style.color=colorTextButtonOkOn;
		};
	});
//	eleInp.addEventListener('mousedown',function(event){
///		event.stopPropagation();
//	});
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
			//Enter���m��̈Ӗ������ꍇ(���{��E���p�Ƃ���)

			//�����Ɏ��s�������X�N���v�g��}�����܂�(���ɂ�����܂�)

			gAnsModalWindow=eleInp.value;			


			myself.vanish();
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
	this.eleDiv.appendChild(eleBR2);


	//	------------------- Button Ok ----------------

	var eleBtnOk;
	eleBtnOk= document.createElement('button');
	eleBtnOk.setAttribute('type','button');
	eleBtnOk.setAttribute('style','margin-left:27px;margin-right:20px;position:relative;left:0px;top:0px;font-size:15px;');
	eleBtnOk.style.color=colorTextButtonOkOff;
	eleBtnOk.innerText='Create';
	this.eleDiv.appendChild(eleBtnOk);
	eleBtnOk.addEventListener('click',function(event){
//console.log("ok");

		if(eleInp.value!='' && eleInp.value!=valueDefault){

			//�l�����͂���Ă���ꍇ



			//�����Ɏ��s�������X�N���v�g��}�����܂�(��ɂ�����܂�)

			gAnsModalWindow=eleInp.value;			

			myself.vanish();
		};


	});


	//	------------------ Button Cancel --------------------

	var eleBtnCancel;
	eleBtnCancel= document.createElement('button');
	eleBtnCancel.setAttribute('type','button');
	eleBtnCancel.setAttribute('style','margin:5px;position:relative;left:0px;top:0px;font-size:15px;');
	eleBtnCancel.innerText='Cancel';
	this.eleDiv.appendChild(eleBtnCancel);
	eleBtnCancel.addEventListener('click',function(event){
//console.log('cancel');

		gAnsModalWindow='';

		myself.vanish();

	});

	//ModalWindow.prototype.appear()�ɂ�����eval���s���邽�߂̕���
	this.eleInp=eleInp;
	this.eleBtnOk=eleBtnOk;
	this.funcsAppear+="myself.eleInp.focus();myself.eleInp.value='"+valueDefault+"';myself.eleInp.style.color='#f0f0f0';myself.eleBtnOk.style.color='#d0d0d0';";



};//function
inherits(ModalWindowInput,ModalWindow);
var mwInput = new ModalWindowInput();
