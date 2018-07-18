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
		if(gAnsModalWindow!=null && (mousedownMenu)){//modal windowが出ていてかつ、マウスボタンが押され続けている
			mwInput.setMessage('イベント名を入力してください');
			gAnsModalWindow=null;mwInput.appear();

			var hoge = setInterval(function(){
				if(gAnsModalWindow!=null && gAnsModalWindow!=''){
					clearInterval(hoge);
					//ここでKeyをつくる
					var a=new Key(gAnsModalWindow);//kkkGCの対象にならないのでは？
					a=null;//クラス変数内の配列に保存済み
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
			mousedownMenu=false;//一回動いたら、mouseupイベントでcreateさせない
console.log("$=",eleMenu.style.left);
			left=xMenu+event.clientX-mouseX;
			top=yMenu+event.clientY-mouseY;
			setMenu(left,top);
		};
	
		//event.stopPropagation();//文字の選択につかわれないようにする？→失敗
	});		

	return ele;
};