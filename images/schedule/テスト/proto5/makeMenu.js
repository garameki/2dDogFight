makeMenuJS=null;

FR.push(new FileRelative('makeElementJS','makeMenuJS'));//ClassMenu,ClassCreate,makeCanvas(),makeDiv(),IdMenu
FR.push(new FileRelative('makeKeyJS','makeMenuJS'));//makeKey()

var createMenu=function(){
	if('gDivMenu' in window){
		//do nothing
		console.error("menu�͈�񂵂�create�ł��܂���B");
	}else{
		createMenuContent();
	};
};

var createMenuContent=function(){

	var body=document.getElementsByTagName('body')[0];

	gDivMenu=makeDiv(ClassMenu,Relative,0,0);
	gDivMenu.style.backgroundColor='yellow';

	var eleCreate=makeCanvas('�V�K�쐬',ClassCreate,Relative,0,0,300,50,'red',30,'center');
	gDivMenu.appendChild(eleCreate);


	var key=makeKey('������');
	gDivMenu.appendChild(key);

	var key=makeKey('�˂�');
	gDivMenu.appendChild(key);


	body.appendChild(gDivMenu);

	//�Z���T�[canvas����Ԍ�ʂɔz�u�B�����ɃC�x���g��ݒ肵��menu�̕\���E��\���ɗp����
	gCanvasMenuSens=makeCanvas('���j���[�Z���T�[',ClassMenuSensor,Absolute,0,0,window.innerWidth,window.innerHeight,'green',30,'center');
	body.appendChild(gCanvasMenuSens);
	gCanvasMenuSens.style.zIndex=2;
};



