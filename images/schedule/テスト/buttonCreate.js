buttonCreateJS=null;

FR.push(new FileRelative("modalWindowInput3JS","buttonCreateJS"));

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
					var a=new Key(gAnsModalWindow);//kkkGC�̑ΏۂɂȂ�Ȃ��̂ł́H
					
					eleMenu.appendChild(a.ctx.canvas);
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