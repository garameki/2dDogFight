buttonCreate2JS=null;

FR.push(new FileRelative("modalWindowInput3JS","buttonCreate2JS"));
FR.push(new FileRelative("plate5JS","buttonCreate2JS"));

var makeButtonCreate=function(){
	var ele = createButton(
		'CREATE',
		'black',
		'pink',
		'blue'
	);
	ele.style.position='relative';

	ele.addEventListener('click',function(event){
		if(gAnsModalWindow!=null){//modal window���o�Ă��Ă��A�}�E�X�{�^���������ꑱ���Ă���
			mwInput.setMessage('�C�x���g������͂��Ă�������');
			gAnsModalWindow=null;mwInput.appear(event.clientX,event.clientY);//kkk .appear('�C�x���g������͂��Ă�������')�ɂ���

			var hoge = setInterval(function(){
				if(gAnsModalWindow!=null && gAnsModalWindow!=''){
					clearInterval(hoge);
					//������Key������
//��					var a=new Key(gAnsModalWindow);//kkkGC�̑ΏۂɂȂ�Ȃ��̂ł́H
					var plate=new Plate(gAnsModalWindow);//��
					
					eleMenu.appendChild(plate.ctx.canvas);
					eleMenu.appendChild(document.createElement('br'));

				}else if(gAnsModalWindow=='' || gAnsModalWindow!=null){
					clearInterval(hoge);
				};
			},100);
		};
		event.stopPropagation();
		console.log("buttonCreate.click");
	});


	return ele;
};