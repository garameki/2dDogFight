
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


dragMenuJS=null;

FR.push(new FileRelative('globalEventsJS','dragMenuJS'));



/*
	��
	gBody��append���Ă���div�ɑ΂��ėL��
*/


var appendDragForMenu=function(element){
	console.log("dragMenuJS appendDragForMenu element=",element.className);
	element.onmousedown=function(event){

		event.stopPropagation();

		divx=element.offsetLeft;
		divy=element.offsetTop;
		var newLeft;
		var newTop;
		var hoge=setInterval(function(){
			//mouseup���A�݂͂����̎�������up�B����ȊO�́A�}�E�X�ɘA��Ĉړ�
			if(gMouseDown==false){
				clearInterval(hoge);
			}else{

					//Menu�͉�ʂ���͂ݏo���Ȃ��Btree�͉�ʂ���͂ݏo���Ă��悢(���̕�����)
					//�Ȃ̂ŁAMenu��tree�͋��ʊ֐����ł��Ȃ�

				newLeft=divx+gMouseXMove-gMouseXDown;
				newTop=divy+gMouseYMove-gMouseYDown;

				//�݂͂����Ď�
				var ans=confirmPositionForMenu(element,newLeft,newTop);

/*				//x������
				if((newLeft+element.offsetWidth)>window.innerWidth){
					newLeft=window.innerWidth-element.offsetWidth;
				}else if(newLeft<0){
					newLeft=0;
				};
				//y������
				if((newTop+element.offsetHeight)>window.innerHeight){
					newTop=window.innerHeight-element.offsetHeight;
				}else if(newTop<0){
					newTop=0;
				};
				//�Ĕz�u
				element.style.left=newLeft.toString()+'px';
				element.style.top=newTop.toString()+'px';
*/
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
	if((left+eleTree.offsetWidth)>window.innerWidth){
		left=window.innerWidth-eleTree.offsetWidth;
	}else if(left<0){
		left=0;
	};
	//y������
	if((top+eleTree.offsetHeight)>window.innerHeight){
		top=window.innerHeight-eleTree.offsetHeight;
	}else if(top<0){
		top=0;
	};

	return {
		left:left,
		top:top
	};
};


