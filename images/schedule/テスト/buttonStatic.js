buttonStaticJS=null;
FR.push(new FileRelative("libraryJS","buttonStaticJS"));






//�{�^��������Ă����Belement��Ԃ�
//�}�E�X�C�x���g�̓L�����Z�����Ă����܂�
//�Ăяo�����ƂŃC�x���g�̐ݒ�����Ă�������
var createButton = function(text,colorBackground,colorBackgroundTag,colorText){

	if(arguments.length!=4)console.error("�����̐����Ⴂ�܂� buttonStatic");


	var rad=3.14/180;
	var xx=0,yy=0,width=180,height=70;
	var rr=35,sizeLetter=40;


	var ele;
	ele=document.createElement('canvas');
	ele.setAttribute('width',width);//canvas��width��ele.width='300px'���ȁH
	ele.setAttribute('height',height);//div��width��ele.style.width='300px'�Ŏw��
	ele.style.position='absolute';
	ele.style.margin='10px';
	ele.style.backgroundColor='rgba(0,0,0)';//colorBackground;
//	ele.style.zIndex=1000;//kkk���ƂŒ����K�v����

	var ctx=ele.getContext('2d');//�����get�������Ƃ�canvas�̑傫����ς���ƁA�g��Ƃ��ɂȂ�

	paintKadomaru(ctx,xx,yy,width,height,rr,colorBackground,colorBackgroundTag);//��

	ctx.font = "bold "+sizeLetter.toString()+"px '�l�r ����'";
	ctx.fillStyle=colorText;
	var widthLetter=ctx.measureText(text).width;
	ctx.fillText(text,(width-widthLetter)/2,(height-sizeLetter)/2+sizeLetter/4*3.2);

/*
	ele.addEventListener('click',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	ele.addEventListener('mousedown',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	ele.addEventListener('mouseup',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	ele.addEventListener('mouseout',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	ele.addEventListener('mousemove',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
*/

	return ele;
};