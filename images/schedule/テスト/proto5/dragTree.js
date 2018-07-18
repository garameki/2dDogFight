
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


dragTreeJS=null;

FR.push(new FileRelative('globalEventsJS','dragTreeJS'));
FR.push(new FileRelative('mainHTM','dragTreeJS'));//gBody
FR.push(new FileRelative('makeElementJS','dragTreeJS'));//ClassTree
FR.push(new FileRelative('makeTreeJS','dragTreeJS'));//mergeTree()




/*
	��
	gBody��append���Ă���div�ɑ΂��ėL��
*/
//global variables
var gBrightenNone=-1;//�߂��ɖ����ꍇ
var gBrightenId='bright';
var gBrightenTop='top';
var gBrightenBottom='bottom';
var gBrighten={
	plate:null,//elePlate
	place:null//'top' or 'bottom'
};



var appendDragForTree=function(element){
	console.log("dragTreeJS appendDragForTree() element=",element.className);
	element.onmousedown=function(event){

		event.stopPropagation();
		if(event.currentTarget.className!=ClassTree)console.error("dragTree.js event.currentTarget��tree�ł͂���܂���B");

		//drag����tree���őO�ʂɂ���(���ꂵ�Ȃ��ƁAevent���L���b�`�ł��Ȃ�)
		event.currentTarget.style.zIndex=NumZindex();

		moveAndBright(event.currentTarget);

	};

//mouseup���Ɠ��l�̏�����ClassKey�ŃG�~�����[�g����K�v�͂Ȃ�
	element.onmouseup=function(event){




//0215console.log("event.currentTarget=",event.currentTarget.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("event.target=",event.target.className);




		event.stopPropagation();


		if(gBrighten.plate==gBrightenNone){
			//do nothing
		}else{
			if(gBrighten.place==gBrightenBottom){
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

				var target=event.currentTarget;//�}������tree
				if(target.className!=ClassTree)console.error("dragTreeJS appendDragForTree()�C�x���g��bubble���Ă���element��tree�ł͂���܂���B");

//0215console.log("dragTreeJS stem child=",stem.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("dragTreeJS target child=",target.getElementsByClassName(ClassTitle)[0].__title);
//0215console.log("boolean=",stem==target);

				mergeTree(stem,nextPlate,target);//stem��nextPlate�̑O��target��Plate��}��

				setPosPlates(stem);//�ePlate�̈ʒu�̍Čv�Z

			}else if(gBrighten.place==gBrightenTop){


				//drag����tree��bottom�ƁAbright��Plate��top���Ȃ���
	
				var stem=event.currentTarget;//gBrighten.plate.parentNode;
				if(stem.className!=ClassTree)console.error("�C�x���g��bubble���Ă���element��tree�ł͂���܂���B");			//mouseup���N����element ->tree�̂͂�

				var nextPlate=null;//stem�̖����ɑ}��

				var target=gBrighten.plate.parentNode;//�����Ă�Plate�̑�����tree

				mergeTree(stem,nextPlate,target);//drag����tree�̉��ɂȂ���

				setPosPlates(stem);//�ePlate�̈ʒu�̍Čv�Z


			};
	
		};

	};
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
	if(eleTree.className!=ClassTree)console.error("setPosPlates() eleTree��ClassTree�ł͂���܂���B");

	var children=eleTree.children;
	for(var ii=0,len=children.length;ii<len;ii++){
		children[ii].__centerX=children[ii].parentNode.offsetLeft+children[ii].offsetLeft+children[ii].offsetWidth/2;
		children[ii].__topY=children[ii].offsetTop+children[ii].parentNode.offsetTop;
		children[ii].__bottomY=children[ii].parentNode.offsetTop+children[ii].offsetTop+children[ii].offsetHeight;
//console.log("*********",children[ii]);
//console.log("********",children[ii].__topY,children[ii].__bottomY);
	};
};

var nearestPlate = function(eleTree){
	if(eleTree.className!=ClassTree)console.error("nearestPlate() eleTree��ClassTree�ł͂���܂���B");


		//������tree��top��Plate�Ƒ���Plate��bottom�̏���

	//tree�̈�ԏ��plate
	var plateTop=eleTree.children[0];//kkkkkk�{����0�ł����̂�
//console.log("plateTop=",plateTop.getElementsByClassName(ClassTitle)[0].__title);

	//Class Plate��􂢏o��
	var platesAll=gBody.getElementsByClassName(ClassPlate);

	//tree��top�ƈ�ԋ߂�Plate��bottom�����߂�
	var minB=10000000000;
	var iiMinB=gBrightenNone;
	for(var ii=0,len=platesAll.length;ii<len;ii++){
//console.log("platesAll[ii]=",platesAll[ii].getElementsByClassName(ClassTitle)[0].__title);
		if(plateTop!=platesAll[ii] && plateTop.parentNode!=platesAll[ii].parentNode){
			var dist=calcDistance(plateTop.__centerX,plateTop.__topY,platesAll[ii].__centerX,platesAll[ii].__bottomY);
			if(minB>dist){
				minB=dist;
				iiMinB=ii;
			};
		};
	};
	if(minB>20)iiMinB=gBrightenNone;
//if(iiMinB!=gBrightenNone)console.log("nearest Top-Bottom=",platesAll[iiMinB].getElementsByClassName(ClassTitle)[0].__title);






		//������tree�̍Ō��Plate��bottom�Ƒ���tree�̍ŏ���top

	//������tree�̈�ԉ�
	var plateBottom=eleTree.children[eleTree.children.length-1];//kkkkkkkk�{���ɍŌ�̗v�f�ł����̂�
//console.log("eleTree�̉�=",plateBottom.getElementsByClassName(ClassTitle)[0].__title);
	//ClassTree��􂢏o��->�etree�̍ŏ���Plate��z��Ɋi�[����
	var trees=gBody.getElementsByClassName(ClassTree);
	var platesTop=new Array();
	for(var ii=0,len=trees.length;ii<len;ii++){
		platesTop.push(trees[ii].children[0]);//kkkkkkkkk0�Ԗڂ���ԏォ�H�H
//console.log("top child=",trees[ii].children[0].getElementsByClassName(ClassTitle)[0].__title);
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
//console.log("nearest Bottom-Top=",minT,iiMinT);








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
var moveAndBright=function(element){
	if(element.className!=ClassTree)console.error("moveAndBright() element��tree�ł͂���܂���B");

	divx=element.offsetLeft;
	divy=element.offsetTop;
	var newLeft;
	var newTop;
	var child;
	var hoge=setInterval(function(){
		//mouseup���A�݂͂����̎�������up�B����ȊO�́A�}�E�X�ɘA��Ĉړ�
		if(gMouseDown==false){
			//brighten�p�̕`��canvas�����O��
			child=document.getElementById(gBrightenId);
			if(child){

				gBody.removeChild(child);
			};
			clearInterval(hoge);
		}else{

			//�V���W
			newLeft=divx+gMouseXMove-gMouseXDown;
			newTop=divy+gMouseYMove-gMouseYDown;

			//�݂͂����Ď�
			var ans=confirmPositionForTree(element,newLeft,newTop);

			//�ʒu�m��
			element.style.left=ans.left.toString()+'px';
			element.style.top=ans.top.toString()+'px';

			//plates(element.children)�̏����̈ʒu(element�̓Ǝ��v���p�e�B�[)���v�Z���Ă���(element : body�̎q�m�[�h��div)
			setPosPlates(element);

			//�߂�Plate�̌���
			nearestPlate(element);
		};
	},60);
};


//�N���[�W��
//Plate�̒�̌������������点����̕�����`��canvas�͂����ɑ��݂��܂�
var Bright=function(){






	var canvas=document.createElement('canvas');
	canvas.id=gBrightenId;
	canvas.style.position='absolute';
	canvas.style.left='0px';
	canvas.style.top='0px';
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	var ctx=canvas.getContext('2d');
	var prePlate=null;
	var child;
	var draw=function(xx,yy,width){
		ctx.canvas.width=document.documentElement.scrollLeft+window.innerWidth;	
		ctx.canvas.height=document.documentElement.scrollTop+window.innerHeight;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		ctx.shadowBlur=5;
		ctx.shadowColor='black';
		ctx.fillStyle='black';
		ctx.globalAlpha=0.7;
		for(var ii=0;ii<20;ii++)
			ctx.fillRect(xx,yy,width,1);
	};
	return {
		none:function(){
			child=document.getElementById(gBrightenId);
			if(child)gBody.removeChild(child);
			prePlate=null;
		},
		bottom:function(elePlate){
			if(elePlate==prePlate && gMouseDown){
				//do nothing
				child=document.getElementById(gBrightenId);
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=elePlate;
	
				draw(elePlate.offsetLeft+elePlate.parentNode.offsetLeft,elePlate.__bottomY,elePlate.offsetWidth);

			};
		},
		top:function(elePlate){
			if(elePlate==prePlate && gMouseDown){
				//do nothing
				child=document.getElementById(gBrightenId);
				if(!child)gBody.appendChild(ctx.canvas);
			}else if(gMouseDown){
				gBody.appendChild(ctx.canvas);
				prePlate=elePlate;
	
				draw(elePlate.offsetLeft+elePlate.parentNode.offsetLeft,elePlate.__topY,elePlate.offsetWidth);
		
			};
		}
	};//return
};
var bright = new Bright();