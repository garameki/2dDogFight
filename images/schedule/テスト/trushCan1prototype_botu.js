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
		if(gAnsModalWindow!=null){//modal windowが出ていてかつ、マウスボタンが押され続けている
			mwInput.setMessage('イベント名を入力してください');
			gAnsModalWindow=null;mwInput.appear(event.clientX,event.clientY);//kkk .appear('イベント名を入力してください')にする

			var hoge = setInterval(function(){
				if(gAnsModalWindow!=null && gAnsModalWindow!=''){
					clearInterval(hoge);
					//ここでKeyをつくる
					var a=new Key(gAnsModalWindow);//kkkGCの対象にならないのでは？
					
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