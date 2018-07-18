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
		if(gAnsModalWindow!=null){//modal windowが出ていてかつ、マウスボタンが押され続けている
			mwInput.setMessage('イベント名を入力してください');
			gAnsModalWindow=null;mwInput.appear(event.clientX,event.clientY);//kkk .appear('イベント名を入力してください')にする

			var hoge = setInterval(function(){
				if(gAnsModalWindow!=null && gAnsModalWindow!=''){
					clearInterval(hoge);
					//ここでKeyをつくる
//○					var a=new Key(gAnsModalWindow);//kkkGCの対象にならないのでは？
					var plate=new Plate(gAnsModalWindow);//●
					
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