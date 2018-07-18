


/*
	main.htm�ɒ����ł��B
	offsetTop��offsetLeft�͑��̎q�v�f�Ɋ֘A����v���p�e�B�[�ł��B
	position:relative;��append����Ă���Z�v�f������ꍇ�A
	element.style.top��element.offsetTop�Ɉ�v���܂���

	����̊��S�ȉ����́A�Z�v�f���c�v�f�̎�������ɗ���relative�ȗv�f��
	offsetTop�̑��a�����߂�K�v�����肻���ł��B

	�ȈՓI�ɖ�����������ɂ́A�����������Z�v�f���c�v�f��S��
	position:absolute;�ɂ��Abody�v�f��offsetTop��0�ɂ��邱�Ƃł��B
*/


menuJS=null;

FR.push(new FileRelative('globalEventsJS','menuJS'));//gMouseXMove,gMouseYMove
FR.push(new FileRelative('makeElementJS','menuJS'));//ClassRessurect,ClassMenu,ClassCreate,NumZindex�I�u�W�F�N�g
FR.push(new FileRelative('keyJS','menuJS'));//Key�I�u�W�F�N�g
FR.push(new FileRelative('modalWindowInputJS','menuJS'));
FR.push(new FileRelative('mainHTM','menuJS'));//Menu.elementRoot






//--------------------------------------------------------------------------------------------------------------------


/*
	div��window�̘g����͂ݏo�����Ƀh���b�O����
	gBody��append���Ă���div�ɑ΂��ėL��
*/
var appendDragForMenu=function(element){
	console.log("menuJS appendDragForMenu element=",element.className);
	element.onmousedown=function(event){

		event.stopPropagation();

		var divx=element.offsetLeft;
		var divy=element.offsetTop;
		var newLeft;
		var newTop;

		//drag�n�߂�O�ɍőO�ʉ�
		element.style.zIndex=NumZindex.up();

		var hoge=setInterval(function(){
			//mouseup���A�݂͂����̎�������up�B����ȊO�́A�}�E�X�ɘA��Ĉړ�
			if(gMouseDown==false){
				clearInterval(hoge);
			}else{


					//Menu�͉�ʂ���͂ݏo���Ȃ��Btree�͉�ʂ���͂ݏo���Ă��悢(���̕�����)
					//�Ȃ̂ŁAMenu��tree�͋��ʊ֐����ł��Ȃ�

				newLeft=divx+gMouseClientXMove-gMouseClientXDown;
				newTop=divy+gMouseClientYMove-gMouseClientYDown;

				//�݂͂����Ď�
				var ans=confirmPositionForMenu(element,newLeft,newTop);

				//�Ĕz�u
				element.style.left=ans.left.toString()+'px';
				element.style.top=ans.top.toString()+'px';
			};
		},60);

	};

};



//��ʂ���div���͂ݏo�Ȃ��悤�ɂ���
var confirmPositionForMenu=function(eleTree,left,top){
	//left,top.....���݂̈ʒu

		//�݂͂����Ď�
	//x������
	if(left<0){
		left=0;
	};
	//y������
	if(top<0){
		top=0;
	};

	return {
		left:left,
		top:top
	};
};

//--------------------------------------------------------------------------------------------------------------------------------------

var createMenu=function(){

	if(Menu.elementRoot!=null){
		//do nothing
		console.error("menu�͈�񂵂�create�ł��܂���B");
	}else{
		var body=document.getElementsByTagName('body')[0];
		Menu.elementRoot=makeElement(ClassMenu);
		Menu.elementRoot.style.backgroundColor='yellow';

		body.appendChild(Menu.elementRoot);

		//�Z���T�[canvas����Ԍ�ʂɔz�u�B�����ɃC�x���g��ݒ肵��menu�̕\���E��\���ɗp����
		Menu.elementSensor=makeElement(ClassMenuSensor,'���j���[�Z���T�[');
		body.appendChild(Menu.elementSensor);

		createMenuContent();
	};
};

var createMenuContent=function(){

	var eleRessurection=makeElement(ClassRessurect,'�폜���');
	Menu.elementRoot.appendChild(eleRessurection);

	var eleCreate=makeElement(ClassCreate,'�V�K�쐬');
	Menu.elementRoot.appendChild(eleCreate);


//	var key=Key.create('������');
//	Menu.elementRoot.appendChild(key);

//	var key=Key.create('�˂�');
//	Menu.elementRoot.appendChild(key);


};


//------------------------------------------------------------------------------------------------------------------------

var addKeyToMenu=function(eleDiv){

	gAnsModalWindow=null;
	mwInput.setMessage('�C�x���g������͂��Ă�������');
	mwInput.appear(gMouseXMove,gMouseYMove);
	var hoge = setInterval(function(){
		if(gAnsModalWindow!=null){
			clearInterval(hoge);
			if(gAnsModalWindow){
				//script to do
console.log("menuJS  ans=",gAnsModalWindow);
				var eleKey=Key.create(gAnsModalWindow);
				Menu.elementRoot.appendChild(eleKey);
			}else{
				//returned nothing and nothing to do
			};
		};
	},100);
};

//---------------------------------------------------------------------------------------------------------------------------


var detachSensor = function(){
	var sens=document.getElementsByClassName(ClassMenuSensor)[0];
	if(sens){
		sens.parentNode.removeChild(sens);
		return true;//����
	}else{
		return false;//���s
	};
};

var attachSensor = function(){
	var sens=document.getElementsByClassName(ClassMenuSensor)[0];
	if(!sens){
		document.getElementsByTagName('body')[0].appendChild(Menu.elementSensor);
	};
};

var detachMenu = function(){
	var menu=document.getElementsByClassName(ClassMenu)[0];
	if(menu){
		menu.parentNode.removeChild(menu);
		return true;//����
	}else{
		return false;//���s
	};
};

var attachMenu = function(){
	var menu=document.getElementsByClassName(ClassMenu)[0];
	if(!menu){
		Menu.elementParent.appendChild(Menu.elementRoot);
	};
};


//---------------------------------------------------------------------------------------------















Menu={ };
var countMenuElementParent=0;
var hogeMenuElementParent = setInterval(function(){
	if('document' in window){
		clearInterval(hogeMenuElementParent);

		Menu.elementParent=document.getElementsByTagName('body')[0];//Menu���������e
	}else{
		if(++countMenuElementParent>1000){
			clearInterval(hogeMenuElementParent);
			console.error("menuJS  document��1�b�ȓ��ɓǂݍ��܂�Ă��܂���");
		};
	};
},1);

Object.defineProperty(Menu,'elementRoot',{value:null,writable:true,enumerable:true,configurable:true});//Menu�̃m�[�h���̂���
Object.defineProperty(Menu,'elementSensor',{value:null,writable:true,enumerable:true,configurable:true});//MenuSensor�̃m�[�h

Object.defineProperty(Menu,'create',{value:createMenu,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'addEventDrag',{value:appendDragForMenu,writable:false,enumerable:true,configurable:false});//makeElement�Ŏg�p
Object.defineProperty(Menu,'appendKey',{value:addKeyToMenu,writable:false,enumerable:true,configurable:false});//makeElement�Ŏg�p

Object.defineProperty(Menu,'detachSensor',{value:detachSensor,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'attachSensor',{value:attachSensor,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'detachMenu',{value:detachMenu,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'attachMenu',{value:attachMenu,writable:false,enumerable:true,configurable:false});



Object.defineProperty(Menu,'where',{value:'menuJS',writable:false,enumerable:true,configurable:false});
Object.defineProperty(Menu,'has',{value:function(){
	console.log("-------------------------------------------");
	for(var key in Menu){
		console.log("Menu has ...");
		console.log(key);
	};
	console.log("-------------------------------------------");
},writable:false,enumerable:true,configurable:false});


