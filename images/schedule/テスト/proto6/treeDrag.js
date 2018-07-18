
/*
	div��window�̘g����͂ݏo�����Ƀh���b�O����
*/


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


treeDragJS=null;

FR.push(new FileRelative('libraryJS','TreeDragJS'));//stopEvent�֐�(�R�[���o�b�N�Ƃ��Ďg���Ă���)
FR.push(new FileRelative('globalEventsJS','TreeDragJS'));
FR.push(new FileRelative('mainHTM','TreeDragJS'));//gBody
FR.push(new FileRelative('makeElementJS','TreeDragJS'));//ClassTree,ClassBrighten,NumZindex�I�u�W�F�N�g
FR.push(new FileRelative('treeMakeJS','TreeDragJS'));//TreeMake.merge()
FR.push(new FileRelative('menuJS','TreeDragJS'));//Menu�I�u�W�F�N�g


/*
	��
	gBody��append���Ă���div�ɑ΂��ėL��
*/
//global variables
var gBrightenNone=-1;//�߂��ɖ����ꍇ
var gBrightenId='bright';
var gBrightenTop='top';
var gBrightenBottom='bottom';
var gBrightenMenu='menu';
var gBrighten={
	plate:gBrightenNone,//elePlate
	place:null//'top' or 'bottom'
};
var gBrightenTarget;//��	�������鑤��tree�����ڂ��Ă���


var gElementsDeleted=[];//HTMLcollection�I�u�W�F�N�g�ł͂Ȃ��̂Œ���

var appendDragForTree=function(element){
	if(element.className!=ClassTree)console.error("TreeDragJS appendDragForTree() class=",element.className,"�Ⴄ�N���X�ɃC�x���gDrag��ݒ肵�悤�Ƃ��Ă��܂��B");

	element.onmousedown=function(event){
		//Plate��tree�̐擪�̏ꍇ�Apropagation��cancel����Ȃ��̂ŁAbubblePHASE�ł��������΂��܂�

		event.stopPropagation();
		if(event.currentTarget.className!=ClassTree)console.error("TreeDragJS event.currentTarget��tree�ł͂���܂���Belement=",event.currentTarget);

		moveAndBrightAndDelete(event.currentTarget);//->�C�x���g'mouseup'�܂�hoge��

	};



//mouseup���Ɠ��l�̏�����ClassKey�ŃG�~�����[�g����K�v�͂Ȃ�
//	element.onmouseup=function(event){
//
//
//
//	};




};



/*
	tree
	 ��plate
	    ��title
	    ��hour
	    ��colon
	    ��minute
*/



//element�̏����̈ʒu���v�Z���Ă���(element : body�̎q�m�[�h��div)
var setPosPlates = function(eleTree){
	if(eleTree.className!=ClassTree)console.error("TreeDragJS  setPosPlates() eleTree��ClassTree�ł͂���܂���B");

	var children=eleTree.children;
	for(var ii=0,len=children.length;ii<len;ii++){
		children[ii].__centerX=children[ii].parentNode.offsetLeft+children[ii].offsetLeft+children[ii].offsetWidth/2;
		children[ii].__topY=children[ii].offsetTop+children[ii].parentNode.offsetTop;
		children[ii].__bottomY=children[ii].parentNode.offsetTop+children[ii].offsetTop+children[ii].offsetHeight;
//console.log("*********",children[ii]);
//console.log("********",children[ii].__topY,children[ii].__bottomY);
	};
};




//�߂��̂��̂����点��
var nearestPlate = function(eleTree){
	if(eleTree.className!=ClassTree)console.error("nearestPlate() eleTree��ClassTree�ł͂���܂���B");


	//---- ������tree��top��Plate�Ƒ���Plate��bottom�̏��� ---

	//tree�̈�ԏ��plate
	var plateTop=eleTree.children[0];//kkkkkk�{����0�ł����̂�

//console.log("TreeDragJS nearestPlate() plateTop=",plateTop,"  eleTree=",eleTree);

	//Class Plate��􂢏o��
	var platesAll=gBody.getElementsByClassName(ClassPlate);



	//tree��top�ƈ�ԋ߂�Plate��bottom�����߂�
	var minB=10000000000;
	var iiMinB=gBrightenNone;
	for(var ii=0,len=platesAll.length;ii<len;ii++){
		if(plateTop!=platesAll[ii] && plateTop.parentNode!=platesAll[ii].parentNode){
			var dist=calcDistance(plateTop.__centerX,plateTop.__topY,platesAll[ii].__centerX,platesAll[ii].__bottomY);
			if(minB>dist){
				minB=dist;
				iiMinB=ii;
			};
		};
	};
	if(minB>20)iiMinB=gBrightenNone;




	//--- ������tree�̍Ō��Plate��bottom�Ƒ���tree�̍ŏ���top ---

	//������tree�̈�ԉ�
	var plateBottom=eleTree.children[eleTree.children.length-1];//kkkkkkkk�{���ɍŌ�̗v�f�ł����̂�
	//ClassTree��􂢏o��->�etree�̍ŏ���Plate��z��Ɋi�[����
	var trees=gBody.getElementsByClassName(ClassTree);
	var platesTop=new Array();
	for(var ii=0,len=trees.length;ii<len;ii++){
		platesTop.push(trees[ii].children[0]);//kkkkkkkkk0�Ԗڂ���ԏォ�H�H
	};

	//������tree��bottom�ƈ�ԋ߂�tree��top�����߂�
	var minT=10000000000;
	var iiMinT=gBrightenNone;
	for(var ii=0,len=platesTop.length;ii<len;ii++){
		if(plateBottom!=platesTop[ii] && plateBottom.parentNode!=platesTop[ii].parentNode){
			var dist=calcDistance(plateBottom.__centerX,plateBottom.__bottomY,platesTop[ii].__centerX,platesTop[ii].__topY);
			if(minT>dist){
				minT=dist;
				iiMinT=ii;
			};
		};
	};
	if(minT>20)iiMinT=gBrightenNone;


	//--- drag���̃}�E�X�|�C���^�̈ʒu��Menu�ɏd�Ȃ��Ă�����AMenu������悤�ɂ��� ---

	var eles=getUpperElements(gMouseXMove,gMouseYMove);		
	if(elementExist(eles,Menu.elementRoot)){
		//Menu��I��
		bright.surround(Menu.elementRoot)
		gBrighten.plate=Menu.elementRoot;
	}else{

		//top��bottom����I��

		if(iiMinB==gBrightenNone){
			if(iiMinT==gBrightenNone){
				bright.none();
				gBrighten.plate=gBrightenNone;
			}else{
					bright.top(platesTop[iiMinT]);
				gBrighten.plate=platesTop[iiMinT];
				gBrighten.place=gBrightenTop;
			};
		}else{
			if(iiMinT==gBrightenNone){
				bright.bottom(platesAll[iiMinB]);
				gBrighten.plate=platesAll[iiMinB];
				gBrighten.place=gBrightenBottom;
			}else {
				if(minT>minB){
					bright.bottom(platesAll[iiMinB]);
					gBrighten.plate=platesAll[iiMinB];
					gBrighten.place=gBrightenBottom;
				}else{
					bright.top(platesTop[iiMinT]);
					gBrighten.plate=platesTop[iiMinT];
					gBrighten.place=gBrightenTop;
				};
			};
		};
	};
//if(gBrighten.plate!=gBrightenNone)console.log("selected=",gBrighten.plate.getElementsByClassName(ClassTitle)[0].__title,gBrighten.place);

};


//��ʂ���div���͂ݏo�Ȃ��悤�ɂ���
var confirmPositionForTree=function(eleTree,left,top){
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



///tree�𓮂����Ȃ���߂���Plate�����点��
var moveAndBrightAndDelete=function(element){
	if(element.className!=ClassTree)console.error("TreeDragJS  moveAndBrightAndDelete() element��tree�ł͂���܂���Belement=",element);


	gBrightenTarget=element;//��
	divx=element.offsetLeft;
	divy=element.offsetTop;
	var newLeft;
	var newTop;
	var child;
	var flagRemoving=false;//�q�v�f�𕪗����̂Ƃ�true

	//drag����tree���őO�ʂɂ���(���ꂵ�Ȃ��ƁAevent���L���b�`�ł��Ȃ�)
	element.style.zIndex=NumZindex.up();//�Ăяo�����ōőO�ʉ�������K�v�Ȃ�


	var hoge=setInterval(function(){


//console.log("gBrighten.plate=",gBrighten.plate);
		//'mouseup'�C�x���g���A�݂͂����̎�������up�B����ȊO�́A�}�E�X�ɘA��Ĉړ�
		if(gMouseDown==false){

			//--------------- Tree�̃h���b�v���� ��������---------------------------

			//brighten�p�̕`��canvas�����O��
			child=document.getElementsByClassName(ClassBrighten)[0];
			if(child){

				gBody.removeChild(child);
			};


		/*
			merge or delete��������
		*/


			//�Zevent.stopPropagation();

//console.log("gBrighten.plate=",gBrighten.plate.className);

			if(false){
				//to make this style of indent being well-eqquipped
			}else if(gBrighten.plate==gBrightenNone){
				//do nothing
			}else if(gBrighten.plate==Menu.elementRoot){
				//ClassCreate�̏�Ƀh���b�v��tree�̑��݂��폜(������)���邱�Ƃ��ł��܂�
				console.log("TreeDragJS moveAndBrightAndDelete() delete class=",element.className);


				gElementsDeleted=[];
				var child=element.getElementsByClassName(ClassPlate);//���̕����c���[�Ɍ���鏇�Ԃœ����܂�
				for(var ii=0,len=child.length;ii<len;ii++){
					gElementsDeleted.push(child[ii]);
				};

	
				//�폜����'mousedown'��j�Q
				window.addEventListener('mousedown',stopEvent,true);

				
				if(!flagRemoving){
					flagRemoving=true;
					//�q�v�f���������������蕪��
					var hogeRemove=setInterval(function(){
						if(element.children.length>0){
							element.removeChild(element.children[0]);
						}else{
							clearInterval(hogeRemove);
							element.parentNode.removeChild(element);//tree���g�̐؂藣��
							window.removeEventListener('mousedown',stopEvent,true);//�������łȂ�����
						};
					},50);

				};

			}else if(gBrighten.place==gBrightenBottom){
				//drag����tree��top�ƁAbright��Plate��bottom���Ȃ���


				var stem=gBrighten.plate.parentNode;//�}�����󂯂�tree

				//�����Ă�Plate�̎���Plate��nextPlate�ɑ��
				var nextPlate=null;
				for(var ii=0,len=stem.children.length;ii<len;ii++){
					if(stem.children[ii]==gBrighten.plate){
						if(ii+1<len){
							nextPlate=stem.children[ii+1];
							break;
						};
					};
				};

				var target=gBrightenTarget;////��
//��				var target=event.currentTarget;//�}������tree
			


				if(target.className!=ClassTree)console.error("TreeDragJS appendDragForTree()�C�x���g��bubble���Ă���element��tree�ł͂���܂���B");

//0215console.log("TreeDragJS stem child=",stem.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("TreeDragJS target child=",target.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("boolean=",stem==target);

				TreeMake.merge(stem,nextPlate,target);//stem��nextPlate�̑O��target��Plate��}��

				setPosPlates(stem);//�ePlate�̈ʒu�̍Čv�Z


			}else if(gBrighten.place==gBrightenTop){

				//drag����tree��bottom�ƁAbright��Plate��top���Ȃ���

				var stem=gBrightenTarget;//��	
//��				var stem=event.currentTarget;//gBrighten.plate.parentNode;



				if(stem.className!=ClassTree)console.error("�C�x���g��bubble���Ă���element��tree�ł͂���܂���B");			//mouseup���N����element ->tree�̂͂�

				var nextPlate=null;//stem�̖����ɑ}��

				var target=gBrighten.plate.parentNode;//�����Ă�Plate�̑�����tree




				TreeMake.merge(stem,nextPlate,target);//drag����tree�̉��ɂȂ���

				setPosPlates(stem);//�ePlate�̈ʒu�̍Čv�Z

			};
		/*
			merge or delete�����܂�
		*/



			clearInterval(hoge);
			gBrighten.plate=gBrightenNone;



			//--------------- Tree�̃h���b�v���� �����܂�---------------------------






		}else{

			//�ړ�������

			//�V���W
			newLeft=divx+gMouseXMove-gMouseXDown;
			newTop=divy+gMouseYMove-gMouseYDown;

			//�݂͂����Ď�
			var ans=confirmPositionForTree(element,newLeft,newTop);

			//�ʒu�m��->���ꂪ�x��!!!!���݂̃}�E�X�̈ʒu�ƕK��������v���Ȃ�
			element.style.left=ans.left.toString()+'px';
			element.style.top=ans.top.toString()+'px';

			//plates(element.children)�̏����̈ʒu(element�̓Ǝ��v���p�e�B�[)���v�Z���Ă���(element : body�̎q�m�[�h��div)
			setPosPlates(element);

			//�߂�Plate�̌���
			nearestPlate(element);
		};
	},60);
};


//�N���[�W���B�O���֐��Ƃ���makeElement��p���Ă��܂��B
//Plate�̒�̌������������点����̕�����`��canvas�Acontext�͂����ɑ��݂��܂�
var Bright=function(){



	var canvas=makeElement(ClassBrighten,'��������������',0,0);
	var ctx=canvas.__ctx;

/*
	var canvas=document.createElement('canvas');
	canvas.class=ClassBrighten;
	canvas.style.position='absolute';
	canvas.style.left='0px';
	canvas.style.top='0px';
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	canvas.style.zIndex=NumZindex.up();
	var ctx=canvas.getContext('2d');
*/
	var prePlate=null;
	var child;
	var draw=function(xx,yy,width,height){
		ctx.canvas.width=document.documentElement.scrollLeft+window.innerWidth;	
		ctx.canvas.height=document.documentElement.scrollTop+window.innerHeight;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		ctx.shadowBlur=5;
		ctx.shadowColor='black';
		ctx.fillStyle='black';
		ctx.globalAlpha=0.7;
		for(var ii=0;ii<20;ii++)
			ctx.fillRect(xx,yy,width,height);
	};
	return {
		none:function(){
			child=document.getElementsByClassName(ClassBrighten)[0];
			if(child)gBody.removeChild(child);
			prePlate=null;
		},
		bottom:function(elePlate){


//console.log("TreeDragJS Bright bottom=",elePlate.parentNode.className,elePlate.parentNode.style.zIndex);
			if(elePlate==prePlate && gMouseDown){
				//do nothing
				child=document.getElementsByClassName(ClassBrighten)[0];
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=elePlate;
	
				draw(elePlate.offsetLeft+elePlate.parentNode.offsetLeft,elePlate.__bottomY,elePlate.offsetWidth,1);

			};
		},
		top:function(elePlate){
//console.log("TreeDragJS Bright top tree=",elePlate.parentNode.className,elePlate.parentNode.style.zIndex);
			if(elePlate==prePlate && gMouseDown){
				//do nothing
				child=document.getElementsByClassName(ClassBrighten)[0];
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=elePlate;
	
				draw(elePlate.offsetLeft+elePlate.parentNode.offsetLeft,elePlate.__topY,elePlate.offsetWidth,1);
		
			};
		},
		surround:function(eleMenu){
//console.log("TreeDragJS Bright surround menu=",eleMenu.className,eleMenu.style.zIndex);
			if(eleMenu==prePlate && gMouseDown){
				child=document.getElementsByClassName(ClassBrighten)[0];
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=eleMenu;

				draw(eleMenu.offsetLeft,eleMenu.offsetTop,eleMenu.offsetWidth,eleMenu.offsetHeight);
			};
		}
	};//return
};
//Bright�̃I�u�W�F�N�g��
var countBright=0;
var hogeBright=setInterval(function(){
	if('makeElement' in window){
		clearInterval(hogeBright);
		bright = new Bright();//������global function
	};
	if(++countBright>2000){
		clearInterval(hogeBright);
		console.errror("TreeDragJS  'makeElement'����`����܂���");
	};
},10);







TreeDrag= { };
Object.defineProperty(TreeDrag,'moveBrightDelete',{value:moveAndBrightAndDelete,writable:false,enumerable:false,configurable:false});
Object.defineProperty(TreeDrag,'addEventDrag',{value:appendDragForTree,writable:false,enumerable:false,configurable:false});
Object.defineProperty(TreeDrag,'setPosPlates',{value:setPosPlates,writable:false,enumerable:false,configurable:false});

