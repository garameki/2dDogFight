trushCan1JS=null;

//FR.push(new FileRelative("modalWindowInput3JS","trushCan1JS"));

var trushCan=function(){
	var ele = createButton(
		'TRUSH CAN',
		'black',
		'pink',
		'blue'
	);
	ele.style.position='relative';



	ele.ondragenter=function(event){

		console.log("trushCan.ondragenter event=",event);

	};
	ele.ondragleave=function(event){

		console.log("trushCan.ondragleave event=",event);

	};
	ele.onmouseup=function(event){

		console.log("trushCan.onmouseup event=",event);

	};

/*
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
*/

	return ele;
};