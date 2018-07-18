modalWindowInput3JS=null;

FR.push(new FileRelative("classModalWindowJS","modalWindowInput3JS"));
FR.push(new FileRelative("libraryJS","modalWindowInput3JS"));//inheritsが入ってる


gAnsModalWindow=true;//null以外//nullはmodal windowの「使用中」を示す




		//クラス


//cancel時は''を返す
var ModalWindowInput = function(){

	if(arguments.length!=0)console.error("引数の数が違いますよー ModalWindowInput");

	var myself=this;//イベントやhogeの中で使うため




	myself.test=2;

/*
canvasで画面を覆う。
その上にdiv以下のtreeをappend
	html
	 l
	body
	 l-------canvas
	 l-------div
		 l------canvas
		 l------br
		 l------input
		 l------br
		 l------buttonOk
		 l------buttonCancel

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
//	var funcsOnresize="";//window.onresizeイベントでeval実行 super classで初期化済み

	//	--------------- Input ------------------

	var valueDefault='イベント名';
	var eleInpColor='gray';
	var eleInp;
	eleInp= document.createElement('input');
	eleInp.style.position='relative';
	eleInp.style.marginLeft='5px';
	eleInp.setAttribute('type','text');
	eleInp.setAttribute('style','margin:5px;position:relative;left:0px;top:0px;font-size:20px;');
	eleInp.setAttribute('maxlength','20');
	eleInp.setAttribute('value',valueDefault);
	eleInp.style.color=eleInpColor;
	this.eleDiv.appendChild(eleInp);
	eleInp.addEventListener('input',function(event){
console.log("input value=",eleInp.value);
		if(eleInp.value==''){
			eleBtnOk.style.color=colorTextButtonOkOff;
		}else{
			eleBtnOk.style.color=colorTextButtonOkOn;
		};
	});
//	eleInp.addEventListener('mousedown',function(event){
///		event.stopPropagation();
//	});
	eleInp.addEventListener('focus',function(event){
		if(eleInp.value==valueDefault){
			eleInp.value='';
		};
		eleInp.style.color='black';
		event.stopPropagation();
	});
	eleInp.addEventListener('blur',function(event){
		if(eleInp.value==''){
			eleInp.value=valueDefault;
			eleInp.style.color=colorTextButtonOkOff;
		};
	});
	eleInp.addEventListener('keydown',function(event){

		if(event.key=='Backspace' && eleInp.value.length==1){
			eleBtnOk.style.color=colorTextButtonOkOff;
		}else if(event.keyCode!=229 &&  event.key=='Enter' && eleInp.value.length!=0){

//日本語入力モードが有効な場合はevent.keyCodeが229になる。
//ブラウザによって異なる
			//Enterが確定の意味を持つ場合(日本語・半角ともに)

			//ここに実行したいスクリプトを挿入します(下にもあります)

			gAnsModalWindow=eleInp.value;			


			myself.vanish();
		}else{
			if(eleInp.value=='' || eleInp.value==valueDefault){
				eleBtnOk.style.color=colorTextButtonOkOff;
			}else{
				eleBtnOk.style.color=colorTextButtonOkOn;
			};
		};
	});


	//	------------------ BR -------------------

	var eleBR2;
	eleBR2=document.createElement('br');
	this.eleDiv.appendChild(eleBR2);


	//	------------------- Button Ok ----------------

	var eleBtnOk;
	eleBtnOk= document.createElement('button');
	eleBtnOk.setAttribute('type','button');
	eleBtnOk.setAttribute('style','margin-left:27px;margin-right:20px;position:relative;left:0px;top:0px;font-size:15px;');
	eleBtnOk.style.color=colorTextButtonOkOff;
	eleBtnOk.innerText='Create';
	this.eleDiv.appendChild(eleBtnOk);
	eleBtnOk.addEventListener('click',function(event){
//console.log("ok");

		if(eleInp.value!='' && eleInp.value!=valueDefault){

			//値が入力されている場合



			//ここに実行したいスクリプトを挿入します(上にもあります)

			gAnsModalWindow=eleInp.value;			

			myself.vanish();
		};


	});


	//	------------------ Button Cancel --------------------

	var eleBtnCancel;
	eleBtnCancel= document.createElement('button');
	eleBtnCancel.setAttribute('type','button');
	eleBtnCancel.setAttribute('style','margin:5px;position:relative;left:0px;top:0px;font-size:15px;');
	eleBtnCancel.innerText='Cancel';
	this.eleDiv.appendChild(eleBtnCancel);
	eleBtnCancel.addEventListener('click',function(event){
//console.log('cancel');

		gAnsModalWindow='';

		myself.vanish();

	});

	//ModalWindow.prototype.appear()においてeval実行するための方略
	this.eleInp=eleInp;
	this.eleBtnOk=eleBtnOk;
	this.funcsAppear+="myself.eleInp.focus();myself.eleInp.value='"+valueDefault+"';myself.eleInp.style.color='#f0f0f0';myself.eleBtnOk.style.color='#d0d0d0';";



};//function
inherits(ModalWindowInput,ModalWindow);
var mwInput = new ModalWindowInput();
