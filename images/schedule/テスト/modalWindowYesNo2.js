modalWindowYesNo2JS=null;

FR.push(new FileRelative("classModalWindowJS","modalWindowYesNo2JS"));
FR.push(new FileRelative("libraryJS","modalWindowYesNo2JS"));//inheritsが入ってる

var ModalWindowYesNo = function(){

	myself=this;//イベントやhogeの中で使うため


/*
canvasで画面を覆う。
その上にdiv以下のtreeをappend
	html
	 l
	body
	 l-------canvas←全体を覆う
	 l-------div
		 l------span
		 l------br
		 l------buttonYes
		 l------buttonNo

	buttonが押されたらwindowに遡り、そこからcapturePhaseが始まる
		window----false
		div--------false
			input------stopPropagation
			button-----stopPropagation
	canvasが押されたらwindowに遡り、そこからcapturePhaseが始まるから
		window----false
		canvas----stopPropagation


	普通はcaptureはoffになっていてbubbleがonになっている
*/

	ModalWindow.call(this);



	var colorTextButtonOkOff='#d0d0d0';
	var colorTextButtonOkOn='black';
//	var funcsOnresize="";//親クラスで初期化済み




	//	------------------- Button Ok ----------------

	var eleBtnOk;
	eleBtnOk= document.createElement('button');
	eleBtnOk.setAttribute('type','button');
	eleBtnOk.setAttribute('style','margin-left:27px;margin-right:20px;position:relative;left:0px;top:0px;font-size:15px;');
	eleBtnOk.style.color=colorTextButtonOkOn;//初期値
//	eleBtnOk.innerText='YES';//〇IEのみ使えます
	eleBtnOk.textContent='YES';//テスト
	this.eleDiv.appendChild(eleBtnOk);
	eleBtnOk.addEventListener('click',function(){
//console.log("ok");

		//ここが答え
	
		gAnsModalWindow=true;



		myself.vanish();//thisじゃだめかなー
		event.stopPropagation();
	});


	//	------------------ Button Cancel --------------------

	var eleBtnCancel;
	eleBtnCancel= document.createElement('button');
	eleBtnCancel.setAttribute('type','button');
	eleBtnCancel.setAttribute('style','margin:5px;position:relative;left:0px;top:0px;font-size:15px;');
//	eleBtnCancel.innerText='NO';//○IEのみ使用可
	eleBtnCancel.textContent='NO';//テスト
	this.eleDiv.appendChild(eleBtnCancel);
	eleBtnCancel.addEventListener('click',function(event){
//console.log('cancel');


		//返す答え
		gAnsModalWindow=false;

		myself.vanish();
		event.stopPropagation();
	});

	this.funcsAppear+='';//とりあえず何もない

};
inherits(ModalWindowYesNo,ModalWindow);
var mwYesNo = new ModalWindowYesNo();



