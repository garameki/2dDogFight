itaJS=null;

///FR.push(new FileRelative("libraryJS","itaJS"));
//FR.push(new FileRelative("modalWindowInput3JS","itaJS"));
//FR.push(new FileRelative("modalWindowYesNo2JS","itaJS"));


var Ita=function(name){

	/*
		draggable�Ȕ����
	*/


	this.name=name;

	var ctx=createContext(NumZindex(),200,50);
	var ele=ctx.canvas;
	//ele.style.position='absolute';//sub class�őI��
	//ele.style.position='relative';//
	ele.draggable=true;

	var letterSize,lettersWidth;
	var letterSize=30;
	//�����̑傫�������߂Ă���
	do{
		letterSize--;
		ctx.font = "bold "+letterSize.toString()+"px '�l�r ����'";
		lettersWidth=ctx.measureText(name).width;
	}while(lettersWidth>ele.width-5);

	//�o�b�N�A�b�v�ϐ��̗p��
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha,
		lineWidth:ctx.lineWidth
	};

	//���g�̕`��	���̕��������������canvas�̕����̂ɂ���
	//�o�b�N�̘g
	paintKadomaru(ctx,0,0,ele.width,ele.height,20,'black','rgb(0,200,0)');
	//����
	ctx.font = "bold "+letterSize.toString()+"px '�l�r ����'";
	ctx.fillStyle='yellow';
	ctx.fillText(name,ele.width/2-ctx.measureText(name).width/2,letterSize);

	//�ޔ����Ă������l�����ɖ߂�
	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;


	this.name=name;
	this.ele=ele;	
	this.ctx=ctx;
};





