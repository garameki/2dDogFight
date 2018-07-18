/*

	�ehtml�v�f�����邾���B�N���X�ł͂Ȃ��̂Œ���


	ele.__*�͓Ǝ��v���p�e�B�[�ł�

*/


/*
�J������

//3	element��id���̗p�����Bzindex��id�Ɏg�������͂�߂�
		makeElement��id�������Ɋ���U�邱�Ƃɂ���

//2	makeElement()��V�݁Bstorage����DOM���č\�z����Ƃ��ɁAmakeCanvas��textAlign�Ƃ��ݒ肷��̖ʓ|�������̂ŁAcss�̃N���X�Ǝ��̐ݒ������悤�ɂ����B


*/

var filename='makeElementJS';
var script=(function(){/*

	__FILENAME__=null;
	FR.push(new FileRelative('plateJS','__FILENAME__'));//Plate�I�u�W�F�N�g
	FR.push(new FileRelative('menuJS','__FILENAME__'));//Menu�I�u�W�F�N�g
	FR.push(new FileRelative('treeDragJS','__FILENAME__'));//TreeDrag�I�u�W�F�N�g
	FR.push(new FileRelative('treeMakeJS','__FILENAME__'));//TreeMake.create()
	FR.push(new FileRelative('libraryJS','__FILENAME__'));//Counter(),getGlobalPosition(),stopEvent�֐�
	FR.push(new FileRelative('globalEventsJS','__FILENAME__'));//gMouse*
	FR.push(new FileRelative("makeElementJS","classModalWindowJS"));//NumZindex�I�u�W�F�N�g


*/}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/__FILENAME__/g,filename);
eval(script);


//global variables

var Relative='relative';
var Absolute='absolute';

var ClassBrighten='bright';//�����������点�邽�߂�canvas
var ClassTree='tree';
var ClassPlate='plate';
var ClassKey='key';
var ClassMenuSensor='menusensor';
var ClassMenu='menu';
var ClassCreate='create';
var ClassRessurect='ressurect';
var ClassHour='hour';
var ClassColon='colon';
var ClassMinute='minute';
var ClassTitle='Title';

var NumId,NumZindex;//�֐��̒��Œ�`����Ă���̂ŁA�O���[�o���Ƃ��Ă͂����Őݒ肵�Ă���

var maxId = function(){
	var body=document.getElementsByTagName('body')[0];
	var max=-10;
	var id;
	var trace=function(node){
		for(var ii=0,len=node.children.length;ii<len;ii++){
			trace(node.children[ii]);
		};
		if(node!==body){
			id=node.id;
			if(typeof id==='string')
				if(id.match(/^[0-9]+$/))
					if(Number(id)>max)
						max=Number(id);
		};
	};

	if(max==-10)return 0;
	else return max;

};

gFlagMakeElementFirstCall=true;


//����������

//�ecss�N���X��element�̐���
var makeElement=function(className,title,left,top){

	if(gFlagMakeElementFirstCall){
		NumId=new Counter(maxId()+1);
		NumZindex=new Counter(maxZindex()+10);
		gFlagMakeElementFirstCall=false;
	};



	switch(className){
		case ClassTree:
			if(left==undefined || top==undefined)console.error("makeElement2JS left=",left," top=",top);//left,top���g��css�N���X������
			break;
		case ClassTitle:
		case ClassHour:
		case ClassMinute:
			if(!title)console.error("makeElement2JS title=",title," class=",className);//title���g��css�N���X������
			break;
		case ClassRessurect:
		case ClassCreate:
		case ClassMenuSensor:
		case ClassBrighten:
		case ClassColon:
		case ClassMenu:
		case ClassKey:
		case ClassPlate:
			break;
		default:
			console.error("makeElement2JS �ݒ肳��Ă��Ȃ�css�N���X�����g���Ă��܂��BclassName=",className);
	};



	var letterHeightPlate=30;

	var ele;
	switch(className){
		case ClassRessurect:
			ele=makeCanvas('�폜���',ClassRessurect,Relative,0,0,300,50,'red',30,'center');
			ele.id='ressurect';
			break;
		case ClassCreate:
			ele=makeCanvas('�V�K�쐬',ClassCreate,Relative,0,0,300,50,'red',30,'center');
			ele.id='create';
			break;
		case ClassMenuSensor:
			ele=makeCanvas('���j���[�Z���T�[',ClassMenuSensor,Absolute,0,0,window.innerWidth,window.innerHeight,'green',30,'center');
			ele.style.zIndex=2;
			break;
		case ClassBrighten:
			ele=makeCanvas('��������������',ClassBrighten,Absolute,0,0,window.innerWidth,window.innerHeight,'green',30,'left');
			break;
		case ClassTitle:
			ele=makeCanvas(title,ClassTitle,Relative,0,0,200,letterHeightPlate,'black','auto','center');
			break;
		case ClassHour:
			ele=makeCanvas(title,ClassHour,Relative,0,0,32,letterHeightPlate,'green',30,'left');
			ele.__number=0;
			break;
		case ClassColon:
			ele=makeCanvas(':',ClassColon,Relative,0,0,15,letterHeightPlate,'green',30,'left');
			break;
		case ClassMinute:
			ele=makeCanvas(title,ClassMinute,Relative,0,0,30,letterHeightPlate,'green',30,'left');
			ele.__number=0;
			break;
		case ClassMenu:
			ele=makeDiv(ClassMenu,Relative,0,0);
			ele.id='divmenu';
			ele.style.backgroundColor='yellow';
			break;
		case ClassKey:
			ele=makeDiv(ClassKey,Relative,0,0);
			break;
		case ClassTree:
			ele=makeDiv(ClassTree,Absolute,left,top);//����left,top���g���̂͂�������
			break;
		case ClassPlate:
			ele=makeDiv(ClassPlate,Relative,0,0);
			break;
		default:
			console.error("makeElement2JS �ݒ肳��Ă��Ȃ�css�N���X�����g���Ă��܂��BclassName=",className);
	};
	return ele;
};

//�������܂�






//�`��	canvas�G�������g���ɓƎ�property�̓��e�ŕ`��
var canvasFillText=function(ele){
	//�Ǝ�property�̎擾
	ctx=ele.__ctx;
	title=ele.__title;
	width=ele.__width;
	height=ele.__height;
	textColor=ele.__textColor;
	textSize=ele.__textSize;
	textAlign=ele.__textAlign;

	ctx.fillStyle=textColor;
	var widthLetter;
	if(textSize=='auto'){
		textSize=height;
		ctx.font="bold "+textSize.toString()+"px '�l�r ����'";
		widthLetter=ctx.measureText(title).width;
//console.log("height",height,"title=",title,"textSize=",textSize,"widthLetter=",widthLetter,"ele.width=",ele.width)
		while(widthLetter>=ele.width){
			textSize-=1;
			ctx.font="bold "+textSize.toString()+"px '�l�r ����'";
			widthLetter=ctx.measureText(title).width;
		};
//console.log("widthLetter=",widthLetter);
	}else{
		ctx.font="bold "+textSize.toString()+"px '�l�r ����'";
		widthLetter=ctx.measureText(title).width;
	};
	if(textAlign=='left'){
		ctx.fillText(title,0,textSize);
	}else if(textAlign=="center"){
		ctx.fillText(title,(width-widthLetter)/2,(height-textSize)/2+textSize/4*3.7);
	}else if(textAlign=='right'){
		ctx.fillText(title,width-widthLetter,(height-textSize)/2+textSize/4*3.7);
	}else{
		ctx.fillText(title,0,textSize);
	};
};




var makeCanvas=function(title,className,position,xx,yy,width,height,textColor,textSize,textAlign){
	var ele=document.createElement('canvas');

	ele.id=NumId.up().toString();//��
	ele.className=className;//��
	ele.width=width;
	ele.height=height;
	ele.style.left=xx.toString()+'px';
	ele.style.top=yy.toString()+'px';
	ele.style.position=position;
	ele.draggable=false;
	ele.style.zIndex=NumZindex.up();
console.log("id:",ele.id,"makeCanvasJS class=",className,"id=",ele.id,"zindex=",ele.style.zIndex);
	ctx=ele.getContext('2d');

	//�Ǝ�property
	ele.__ctx=ctx;
	ele.__title=title;
	ele.__width=width;
	ele.__height=height;
	ele.__textColor=textColor;
	ele.__textSize=textSize;
	ele.__textAlign=textAlign;

	//�`��(����)
	canvasFillText(ele);

	ele.addEventListener('click',function(event){
		//for test
		console.info(event.timeStamp,"click "," Canvas=",ele.className,ele.style.zIndex,event);
	},false);
	ele.addEventListener('mousedown',function(event){
		//for test
		console.info(event.timeStamp,"mousedown"," Canvas=",ele.className,ele.style.zIndex,event);
	},false);
	ele.addEventListener('mouseup',function(event){
		//for test
		console.info(event.timeStamp,"mouseup"," Canvas=",ele.className,ele.style.zIndex,event);
	},false);
	ele.ondragstart=function(event){
		//�h���b�O�֎~
		event.preventDefault();
		event.stopPropagation();
	};




	//�C�x���g�@�\�̒ǉ�
	switch(className){
		case ClassRessurect:
			ele.addEventListener('click',function(event){
console.log("makeElementJS �Đ�",gElementsDeleted,!gMouseMoveTrace,gElementsDeleted.length!=0);
				if(!gMouseMoveTrace && gElementsDeleted.length!=0){


console.log("makeElementJS ����",gMouseMoveTrace,gElementsDeleted);
					
					window.addEventListener('mousedown',stopEvent,true);
				
					var ans=getGlobalPosition(Menu.elementRoot);
					var plates=new Array();
					for(var ii=0,len=gElementsDeleted.length;ii<len;ii++){
						plates.push(gElementsDeleted[ii]);
					};
					var tree=TreeMake.create(plates,ans.left+Menu.elementRoot.offsetWidth/2,ans.top+Menu.elementRoot.offsetHeight/2);
					gBody.appendChild(tree);
					gElementsDeleted=[];

					window.removeEventListener('mousedown',stopEvent,true);
				};
			},false);				
			break;
		case ClassBrighten:
			break;
		case ClassMenuSensor:
//			ele.ondragstart=function(event){
//				event.preventDefault();
//			};
			ele.addEventListener('mousedown',function(event){
				event.stopPropagation();//�X�N���[���o�[���o�Ă��鎞�ɂ��܂�Ȃ��悤�ɂ��邽��(�Ȃ����킩��ʂ��h���b�O�����)
				event.preventDefault();
console.log("makeElementJS case ClassMenuSensor mousedown stopped");
			},false);
			ele.onclick=function(event){

				if(gBody.getElementsByClassName(ClassMenu).length==0){
					gBody.appendChild(Menu.elementRoot);
					Menu.elementRoot.style.zIndex=NumZindex.up();
					Menu.elementRoot.style.left=(gMouseXDown-Menu.elementRoot.offsetWidth/2).toString()+'px';
					Menu.elementRoot.style.top=(gMouseYDown-Menu.elementRoot.getElementsByClassName(ClassCreate)[0].offsetHeight).toString()+'px';
				}else{
					Menu.elementRoot.parentNode.removeChild(Menu.elementRoot);
				};

			};
			break;
		case ClassCreate:
			ele.addEventListener('mousedown',function(event){
				//�Zevent.stopPropagation();//Menu.elementRoot���h���b�O�����Ȃ�
			},false);
			ele.addEventListener('click',function(event){
				if(!gMouseMoveTrace){
					Menu.appendKey();
				};
			},false);				
			break;
		case ClassTitle:
			break;
		case ClassHour:
			ele.addEventListener('wheel',function(event){
				event.stopPropagation();
				event.preventDefault();
				ele.__ctx.clearRect(0,0,30,height);
				var delta=abs(event.deltaY);
				ele.__number+=delta;
				if(ele.__number<0){
					ele.__number+=24;
				}else if(ele.__number>23){
					ele.__number-=24;
				};
				var text=ele.__number.toString();
				if(ele.__number<10){
					text='0'+text;
				};
				ele.__title=text;
				canvasFillText(ele);
			},false);
			break;
		case ClassMinute:
			ele.addEventListener('wheel',function(event){
				event.stopPropagation();
				event.preventDefault();
				ele.__ctx.clearRect(0,0,30,height);
				var delta=abs(event.deltaY);
				ele.__number+=delta;
				if(ele.__number<0){
					ele.__number+=60;
				}else if(ele.__number>59){
					ele.__number-=60;
				};
				var text=ele.__number.toString();
				if(ele.__number<10){
					text='0'+text;
				};
				ele.__title=text;
				canvasFillText(ele);
			},false);
			break;
		default:
			//do nothing
	};

	return ele;
};


var makeDiv=function(className,position,left,top){
	var ele=document.createElement('div');
	ele.id=NumId.up();//��
	ele.className=className;//��
	ele.setAttribute('class',className);
	ele.style.width='300px';
	ele.style.position=position;
	ele.draggable=false;
	ele.style.left=left.toString()+'px';
	ele.style.top=top.toString()+'px';
	ele.style.zIndex=NumZindex.up();
console.log("id:",ele.id,"makeDiv class=",className,"id:",ele.id,"zindex:",ele.style.zIndex);

	ele.addEventListener('click',function(event){
		//for test
		console.info(event.timeStamp,"click"," Div=",ele.className,ele.style.zIndex,event);
	},false);
	ele.addEventListener('mousedown',function(event){
		//for test
		console.info(event.timeStamp,"mousedown"," Div=",ele.className,ele.style.zIndex,event);
	},false);
	ele.addEventListener('mouseup',function(event){
		//for test
		console.info(event.timeStamp,"mouseup"," Div=",ele.className,ele.style.zIndex,event);
	},false);

	ele.ondragstart=function(event){
		//�h���b�O�֎~
		event.preventDefault();
		event.stopPropagation();
	};


	//idPrefix�ɂ��C�x���g�@�\�̒ǉ�
	switch(className){
		case ClassKey:
			ele.addEventListener('mousedown',function(event){

				event.stopPropagation();

				//�V����Tree�����
				var ct=event.currentTarget;
				var name=ct.getElementsByClassName(ClassTitle)[0].__title;
				var hour=ct.getElementsByClassName(ClassHour)[0].__title;
				var minute=ct.getElementsByClassName(ClassMinute)[0].__title;



				//��l�ڂ�����tree�����Abody��append
				var elePlate=Plate.create(name,hour,minute,0,0);//kkkkkkkk��

				//ClassKey(body��child��div��child��div)�̈ʒu�v�Z
				var xTree=ct.offsetLeft+ct.parentNode.offsetLeft;
				var yTree=ct.offsetTop+ct.parentNode.offsetTop;

				//tree�̍쐬->drag�C�x���g��tree�ɕt������I�I�IPlate�ł͂���܂���B
				var eleTree=TreeMake.create([elePlate],xTree,yTree);
				gBody.appendChild(eleTree);

				TreeDrag.moveBrightDelete(eleTree);

			},false);
			break;
		case ClassPlate:
			Plate.addEventDrag(ele);
			break;
		case ClassTree:
			TreeDrag.addEventDrag(ele);
			break;
		case ClassMenu:
			Menu.addEventDrag(ele);
			break;
		default:
			//do nothing
	};


	return ele;

};
