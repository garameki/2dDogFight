//�t�@�C���̊֌W���֘A
key1JS=null;
FR.push(new FileRelative("libraryJS","key1JS"));
FR.push(new FileRelative("modalWindowInput3JS","key1JS"));
FR.push(new FileRelative("modalWindowYesNo2JS","key1JS"));
FR.push(new FileRelative('plate4JS','key1JS'));//key���h���b�v��������plate�𐶐�����Ƃ��ɕK�v&������plate��attach����Ƃ��ɕK�v



var Key_keys = new Array();//Key�̃N���X�ϐ�//kkk ���Ƃŕϐ����𒼂�
var Key = function(name){

	Ita.call(this,name);
	this.ele.style.position='relative';//��
	this.ele.appendChild(document.createElement('br'));

	Key_keys.push(this);//�N���X�ϐ�

	var myself=this;

//��	myself.name=name;//super class �Œ�`�ς�



//��	myself.mouseDown=false;
//�Z	var mouseX,mouseY;//window.onmousedown��gMouseDownX,Y���`�ς�
	var moveX,moveY;


	//mouse���N���b�N����Ă��鎞�́A�ړ�����̂ŁA����canvas�̊G������


	var ctxF,ctxB,oneself;
	myself.ctx.canvas.onmousedown = function(event){

		if($testevent)console.log("key.mousedown");

		if(event.button==2){//�E�N���b�N
			
			if(gAnsModalWindow!=null){
				gAnsModalWindow=null;

				//MW���o�Ă��鎞��key��eleMenu���h���b�O���ꂽ���Ȃ��̂ŋ֎~
				myself.ctx.canvas.draggable=false;
				myself.ctx.canvas.parentNode.draggable=false;

				mwYesNo.setMessage("�����Ă������ł���?");
				mwYesNo.appear(event.clientX,event.clientY);
				var hoge = setInterval(function(){
	
					if(gAnsModalWindow!=null){
						clearInterval(hoge);
						if(gAnsModalWindow){
							//�֎~���Ă����h���b�O���\�ɖ߂�
							myself.ctx.canvas.draggable=true;
							myself.ctx.canvas.parentNode.draggable=true;

							//canvas�ɔ���BR������
							var childs=myself.ctx.canvas.parentNode.childNodes;
							for(var ii=0,len=childs.length;ii<len;ii++){
								if(childs[ii]==myself.ctx.canvas){
									childs[ii+1].parentNode.removeChild(childs[ii+1]);
								};
							};
							myself.ctx.canvas.parentNode.removeChild(myself.ctx.canvas);



						}else{

							//do nothing
						};
					};
				},100);
			};

			//�E�N���b�N�����܂�

		}else if(event.button==0){//���N���b�N

			//do nothing
		}else{
			console.error("1 nor 2 event.button=",event.button);
		};

		event.stopPropagation();
	};//onmousedown

	//�h���b�O&�h���b�v
	myself.ctx.canvas.ondragstart=function(event){
console.log("key1  dragstart event=",event.dataTransfer.setDragImage);
		var a=new Ita(myself.name);
		event.dataTransfer.setDragImage(a.ctx.canvas, a.ctx.canvas.offsetWidth, a.ctx.canvas.offsetHeight);	
	};

	myself.ctx.canvas.ondrag=function(event){

		//�߂��̃m�[�h�̉����������点��
		var nearest =myself.nearest(moveX,moveY);
		if(nearest!=-1)nearest.drawConnectPoint(ctxB);

		event.stopPropagation();
	};

	var moveX,moveY;
////	myself.ele.ondragstart=function(event){
//		event.stopPropagation();
//	};
	myself.ctx.canvas.ondragend=function(event){

		//eleWork��key.ctx.canvas��attach

		var plate = new Plate(myself.name);
		plate.ele.style.left=(event.clientX-gMouseDownXrel).toString()+'px';
		plate.ele.style.top=(event.clientY-gMouseDownYrel).toString()+'px';
		eleWork.appendChild(plate.ele);

		event.stopPropagation();
console.log("event=",event);

	};

};
inherits(Key,Ita);

Key.prototype.clear = function(ctx){

		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

};
Key.prototype.draw = function(ctx){
//���΍��W�n
//���O
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha,
		lineWidth:ctx.lineWidth
	};

//paintKadomaru=function(ctx,xx,yy,ww,hh,rr,bgcolor,fgcolor){

	//���̕��������������canvas�̕����̂ɂ���΂悢�킯�ł��ˁB
	paintKadomaru(ctx,0,0,ctx.canvas.width,ctx.canvas.height,20,'black','rgb(0,200,0)');
//	ctx.fillStyle='rgb(0,200,0)';
//	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
	ctx.fillStyle='yellow';
	ctx.fillText(this.name,ctx.canvas.width/2-ctx.measureText(this.name).width/2,this.letterSize);
//	ctx.beginPath();
//	ctx.lineWidth=1;
//	ctx.strokeRect(0,0,ctx.canvas.width,ctx.canvas.height);



	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;
};
Key.prototype.drawMove= function(ctx,mx,my){
//��΍��W�n
//���O
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha,
		lineWidth:ctx.lineWidth
	};

	console.log("left=",this.ele.offsetLeft+parseInt(eleMenu.style.left));
	console.log("top=",parseInt(eleMenu.style.left));


	//�n��h��
	ctx.globalAlpha=1;
	ctx.shadowBlur=0;
	ctx.fillStyle='rgb(0,200,0)';
	ctx.fillRect(parseInt(eleMenu.style.left)+this.ele.offsetLeft+10+mx,parseInt(eleMenu.style.top)+this.ele.offsetTop-10+my,this.ele.width-1,this.ele.height-1);
	//�g�������
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeRect(parseInt(eleMenu.style.left)+this.ele.offsetLeft+10+mx,parseInt(eleMenu.style.top)+this.ele.offsetTop-10+my,this.ele.width,this.ele.height);
	//���O������
	ctx.shadowBlur=10;
	ctx.fillStyle='yellow';
	ctx.font = "bold "+this.letterSize.toString()+"px '�l�r ����'";
	ctx.fillText(this.name,parseInt(eleMenu.style.left)+this.ele.offsetLeft+10+mx+this.ele.width/2-ctx.measureText(this.name).width/2,parseInt(eleMenu.style.top)+this.ele.offsetTop-10+my+this.letterSize);

//console.log("name=",this.name,"index=",ctx.canvas.style.zIndex);
	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;
};
Key.prototype.drawHalo=function(ctx,mx,my,top,height){
//��΍��W�n
//���
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha
	};

	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

	//�e��`��
	ctx.shadowBlur=5;
	ctx.shadowColor='black';
	ctx.fillStyle='black';
	ctx.globalAlpha=0.2;
	ctx.fillRect(parseInt(eleMenu.style.left)+this.ele.offsetLeft+mx,parseInt(eleMenu.style.top)+top+my,this.ele.width,height);

	//�����`��
	ctx.shadowBlur=10;
	ctx.shadowColor='white';
	ctx.fillStyle='black';
	ctx.globalAlpha=1;
	for(var ii=0;ii<5;ii++)	ctx.fillRect(parseInt(eleMenu.style.left)+this.ele.offsetLeft+mx+10,parseInt(eleMenu.style.top)+top+my-10,this.ele.width,height);


	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;


};
Key.prototype.drawConnectPoint=function(ctx){
//��΍��W�n
//�����\�蕔��
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha
	};

	ctx.shadowBlur=5;
	ctx.shadowColor='yellow';
	ctx.fillStyle='yellow';
	ctx.globalAlpha=0.7;

	ctx.clearRect(0,0,this.ele.width,this.ele.height);
	for(var ii=0;ii<20;ii++)
		ctx.fillRect(this.ele.offsetLeft,this.ele.offsetTop+this.ele.height,this.ele.width,1);


	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
};
Key.prototype.nearest = function(mx,my){
	var distance;
	var min=1000000;
	for(var ii=0;ii<Key_keys.length;ii++){
		if(Key_keys[ii]!=this){
			//�����plate�ł͂Ȃ�
			var flag=true;
			var temp=this.next;
			while(temp!=null){
				if(Key_keys[ii]==temp){
//console.log("same tree");
					flag=false;
					break;
				};
				temp=temp.next;
			};
			if(flag){
				var dist=calcDistance(
					this.ele.offsetLeft+this.ele.offsetWidth/2+mx,
					this.ele.offsetTop+my,
					Key_keys[ii].ctx.canvas.offsetLeft+Key_keys[ii].ctx.canvas.offsetWidth/2,
					Key_keys[ii].ctx.canvas.offsetTop+Key_keys[ii].ctx.canvas.offsetHeight
				);
				if(dist<min){
					min=dist;
					id=ii;
				};
			};
		};
	};
	if(min<50){
		return Key_keys[id];
	}else{
		return -1;
	};
};
