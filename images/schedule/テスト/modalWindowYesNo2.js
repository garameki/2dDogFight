modalWindowYesNo2JS=null;

FR.push(new FileRelative("classModalWindowJS","modalWindowYesNo2JS"));
FR.push(new FileRelative("libraryJS","modalWindowYesNo2JS"));//inherits�������Ă�

var ModalWindowYesNo = function(){

	myself=this;//�C�x���g��hoge�̒��Ŏg������


/*
canvas�ŉ�ʂ𕢂��B
���̏��div�ȉ���tree��append
	html
	 l
	body
	 l-------canvas���S�̂𕢂�
	 l-------div
		 l------span
		 l------br
		 l------buttonYes
		 l------buttonNo

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
//	var funcsOnresize="";//�e�N���X�ŏ������ς�




	//	------------------- Button Ok ----------------

	var eleBtnOk;
	eleBtnOk= document.createElement('button');
	eleBtnOk.setAttribute('type','button');
	eleBtnOk.setAttribute('style','margin-left:27px;margin-right:20px;position:relative;left:0px;top:0px;font-size:15px;');
	eleBtnOk.style.color=colorTextButtonOkOn;//�����l
//	eleBtnOk.innerText='YES';//�ZIE�̂ݎg���܂�
	eleBtnOk.textContent='YES';//�e�X�g
	this.eleDiv.appendChild(eleBtnOk);
	eleBtnOk.addEventListener('click',function(){
//console.log("ok");

		//����������
	
		gAnsModalWindow=true;



		myself.vanish();//this���Ⴞ�߂��ȁ[
		event.stopPropagation();
	});


	//	------------------ Button Cancel --------------------

	var eleBtnCancel;
	eleBtnCancel= document.createElement('button');
	eleBtnCancel.setAttribute('type','button');
	eleBtnCancel.setAttribute('style','margin:5px;position:relative;left:0px;top:0px;font-size:15px;');
//	eleBtnCancel.innerText='NO';//��IE�̂ݎg�p��
	eleBtnCancel.textContent='NO';//�e�X�g
	this.eleDiv.appendChild(eleBtnCancel);
	eleBtnCancel.addEventListener('click',function(event){
//console.log('cancel');


		//�Ԃ�����
		gAnsModalWindow=false;

		myself.vanish();
		event.stopPropagation();
	});

	this.funcsAppear+='';//�Ƃ肠���������Ȃ�

};
inherits(ModalWindowYesNo,ModalWindow);
var mwYesNo = new ModalWindowYesNo();



