
/*
	div��window�̘g����͂ݏo�����Ƀh���b�O����
*/


evDragJS=null;

FR.push(new FileRelation('globalEventsJS','evDragJS'));


var gMouseDown=false;
var gCX,gCY;
var appendDrag=function(element){
	window.addEventListener('mousemove',function(event){
		gCX=event.clientX;
		gCY=event.clientY;
	},true);
	var mousex,mousey;
	element.onmousedown=function(event){
		mousex=event.clientX;
		mousey=event.clientY;

		divx=element.offsetLeft;
		divy=element.offsetTop;
		var newLeft;
		var newTop;
		if(gMouseDown==false){
			var hoge=setInterval(function(){
				//mouseup���A�݂͂����̎�������up�B����ȊO�́A�}�E�X�ɘA��Ĉړ�
				if(gMouseDown==false){
					clearInterval(hoge);
				}else{
						//�݂͂����Ď�
					//x������
					newLeft=divx+gCX-mousex;
					newTop=divy+gCY-mousey;
					if((newLeft+element.offsetWidth)>window.innerWidth){
						newLeft=window.innerWidth-element.offsetWidth;
						//gMouseDown=false;
						//clearInterval(hoge);
					}else if(newLeft<0){
						newLeft=0;
						//gMouseDown=false;
						//clearInterval(hoge);
					};
					//y������
					if((newTop+element.offsetHeight)>window.innerHeight){
						newTop=window.innerHeight-element.offsetHeight;
						//gMouseDown=false;
						//clearInterval(hoge);
					}else if(newTop<0){
						newTop=0;
						//gMouseDown=false;
						//clearInterval(hoge);
					};
					//�Ĕz�u
					element.style.left=newLeft.toString()+'px';
					element.style.top=newTop.toString()+'px';
				};
			},10);
		};
		gMouseDown=true;
	};
//	element.onmouseup=function(){
//		gMouseDown=false;
//	};
	document.addEventListener('mouseup',function(event){//window�̂��ƂŃ{�^���𗣂��Ă������ŕߑ�//�d�����ăC�x���g��ݒ�ł���悤��onmouseup�ł͂Ȃ��āAaddEventListener��p�����Bfalse���킴�킴�w�肵�Ă���̂�IE�̌Â����̂ɑΉ����邽��?(attachEvent�ł͂Ȃ��������H)
		gMouseDown=false;
	},false);

};
