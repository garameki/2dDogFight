
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


//evDragJS=null;

FR.push(new FileRelative('globalEventsJS','evDragJS'));



/*
	��
	gBody��append���Ă���div�ɑ΂��ėL��
*/


var appendDrag=function(element){
	element.onmousedown=function(event){

		event.stopPropagation();








		//�e��Z�̃I�t�Z�b�g��݌v���āA������������΂����B���̌v�Z�B(�ڍ�)
		var sumOffsetLeft=0;
		var sumOffsetTop=0;
		var parent=element.parentNode;
		for(var ii=0,len=parent.children.length;ii<len;ii++){
			if(event.target==parent.children[ii])break;
			
		};
			






		divx=element.offsetLeft;
		divy=element.offsetTop;
		var newLeft;
		var newTop;
		var hoge=setInterval(function(){
			//mouseup���A�݂͂����̎�������up�B����ȊO�́A�}�E�X�ɘA��Ĉړ�
			if(gMouseDown==false){
				clearInterval(hoge);
			}else{
					//�݂͂����Ď�
				//x������
				newLeft=divx+gMouseXMove-gMouseXDown;
				newTop=divy+gMouseYMove-gMouseYDown;
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
			};
		},60);

	};

};
