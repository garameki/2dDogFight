buttonCreateJS=null;

var makeButtonCreate=function(){
	var ele = createButton(
		'CREATE',
		'black',
		'pink',
		'blue'
	);
	ele.style.position='relative';

	var mousedownMenu=false;
	var mousemoveMenu=false;
	var mouseX,mouseY;
	var left=xMenu,top=yMenu;
	ele.addEventListener('mouseup',function(event){
		if(gAnsModalWindow!=null && (mousedownMenu)){//modal window���o�Ă��Ă��A�}�E�X�{�^���������ꑱ���Ă���
			mwInput.setMessage('�C�x���g������͂��Ă�������');
			gAnsModalWindow=null;mwInput.appear();

			var hoge = setInterval(function(){
				if(gAnsModalWindow!=null && gAnsModalWindow!=''){
					clearInterval(hoge);
					//������Key������
					var a=new Key(gAnsModalWindow);//kkkGC�̑ΏۂɂȂ�Ȃ��̂ł́H
					a=null;//�N���X�ϐ����̔z��ɕۑ��ς�
				}else if(gAnsModalWindow=='' || gAnsModalWindow!=null){
					clearInterval(hoge);
				};
			},100);
		};
		mousedownMenu=false;
		mousemoveMenu=false;
	});

	ele.addEventListener('mousemove',function(event){
		
		if(mousedownMenu || mousemoveMenu){
			mousemoveMenu=true;
			mousedownMenu=false;//��񓮂�����Amouseup�C�x���g��create�����Ȃ�
console.log("$=",eleMenu.style.left);
			left=xMenu+event.clientX-mouseX;
			top=yMenu+event.clientY-mouseY;
			setMenu(left,top);
		};
	
		//event.stopPropagation();//�����̑I���ɂ����Ȃ��悤�ɂ���H�����s
	});		

	return ele;
};