//�t�@�C���̊֌W���֘A
ita2JS=null;
FR.push(new FileRelative("libraryJS","ita2JS"));
FR.push(new FileRelative("modalWindowInput3JS","ita2JS"));
FR.push(new FileRelative("modalWindowYesNo2JS","ita2JS"));
FR.push(new FileRelative("plate5JS","ita2JS"));


//����tree��Top�ɋ߂��A�ʂ�tree��node�̉���T���āA����node��Ԃ�
Ita_nearestTopBottom = function(arr,mx,my){


//console.log("TB this=",this);


	var distance;
	var min=1000000;
	var flag,temp,id;
	for(var ii=0;ii<arr.length;ii++){
		if(arr[ii]!=this){
			//�����plate�ł͂Ȃ�
			flag=true;
			temp=this.next;//<-��������ԏゾ����
			while(temp!=null){
				if(arr[ii]==temp){
//console.log("same tree");
					flag=false;
					break;
				};
				temp=temp.next;
			};
			if(flag){
				//�����@�������g�łȂ�
				//�����A������������c���[�łȂ�
				//�𖞂����A������top�Ƒ����bottom�̋������v�Z
				var dist=calcDistance(
					this.ctx.canvas.offsetLeft+this.ctx.canvas.offsetWidth/2+mx+Ita_floatPX,
					this.ctx.canvas.offsetTop+my-Ita_floatPX,
					arr[ii].ctx.canvas.offsetLeft+arr[ii].ctx.canvas.offsetWidth/2,
					arr[ii].ctx.canvas.offsetTop+arr[ii].ctx.canvas.offsetHeight
				);
				if(dist<min){
					min=dist;
					id=ii;
				};
			};
		};
	};


	if(min<50){//������50�ȓ��Ȃ�߂��Ɣ��f
		return {
			dist:min,
			node:arr[id]
		};
	}else{
		return -1;
	};
};


//����tree��Bottom�ɋ߂��A�ʂ�tree��Top��arr�̒�����T���Ă���Top��Ԃ�
Ita_nearestBottomTop = function(arr,mx,my){

	for(var ii=0,len=arr.length;ii>len;ii++){
		arr[ii].checked=false;//�`�F�b�N�������̂��ǂ���
	};


	var bottom;//�����̃c���[�̈�ԉ�
	bottom=this;
	while(bottom.next!=null){
		bottom=bottom.next;
	};

	var distance;
	var min=1000000;
	var flag,temp;
	var top;//����c���[�̈�ԏ�
	for(var ii=0;ii<arr.length;ii++){
		flag=true;
		if(arr[ii]==this){//�����@
			flag=false;
		};
		temp=this.next;//<-��������ԏゾ����
		while(temp!=null && flag){
			if(arr[ii]==temp){//�����A
//console.log("same tree");
				flag=false;
				break;
			};
			temp=temp.next;
		};
		//arr[ii]�̏�������tree�̈�ԏ�̃m�[�h�ɍs��
		top=arr[ii];
		while(top.front!=null && flag){//�����B
			top=top.front;
			//check�ς݂Ȃ炻��tree�̓`�F�b�N�ς݂�����k����΂�
			if(top.checked){
				flag=false;
				break;
			};
		};
		if(flag){
console.log("BT top=",top.name);
console.log("BT bottom=",bottom.name);
			//�����@plates[ii]���������g�łȂ�
			//�����Aplates[ii]��������������c���[�̃m�[�h�łȂ�
			//�����Bplates[ii]�̑�����tree�͂܂��`�F�b�N���Ă��Ȃ�
			//�𖞂����A�����̃c���[��bottom�Ƒ���̃c���[��top�Ƃ̋������v�Z
			var dist=calcDistance(
				bottom.ctx.canvas.offsetLeft+bottom.ctx.canvas.offsetWidth/2+mx+Ita_floatPX,
				bottom.ctx.canvas.offsetTop+bottom.ele.offsetHeight+my-Ita_floatPX,
				top.ctx.canvas.offsetLeft+top.ctx.canvas.offsetWidth/2,
				top.ctx.canvas.offsetTop
			);
			if(dist<min){
				min=dist;
				id=ii;
			};
		};
		arr[ii].checked=true;
	};

//console.log("BT min=",min);
	if(min<50){//������50�ȓ��Ȃ�߂��Ɣ��f

		return {
			node:arr[id],
			dist:min
		};
	}else{
		return -1;
	};
};





//Ita�N���X�֐�

var Ita_floatPX=10;//�h���b�O���̕���

var Ita_Contents=function(name){

	this.name=name;
	this.ctx=createContext(NumZindex(),200,50);
	this.ele=this.ctx.canvas;

	var letterSize,lettersWidth;
	var letterSize=30;
	//�����̑傫�������߂Ă���
	do{
		letterSize--;
		myself.ctx.font = "bold "+letterSize.toString()+"px '�l�r ����'";
		lettersWidth=myself.ctx.measureText(name).width;
	}while(lettersWidth>myself.ctx.canvas.width-5);

	this.letterSize=letterSize;


};

var Ita = function(name){

	var ele=document.createElement('div');
	ele.style.position='absolute';
	ele.draggable=false;
	ele.style.backgroundColor='skyblue';


	var myself=this;

	myself.next=null;//���̂����ꍇ�̎��̃m�[�hkkk
	myself.front=null;

//kkk z-index��t���Ȃ����K�v������B�܂��́A�������ɏグ�Ă����H

	myself.content = new Ita_Contents(name);

	myself.checked=false;//Ita_nearestBottomTop()�Ŏg���Ă���




	myself.mouseDown=false;
	var mouseX,mouseY;
	var moveX,moveY;

	//mouse���N���b�N����Ă��鎞�́A�ړ�����̂ŁA����canvas�̊G������


	myself.draw(myself.ctx);//�ʒu��parent��ǉ����ׂ�





	var ctxF,ctxB,oneself;
	myself.ctx.canvas.onmousedown = function(event){
		event.stopPropagation();

//console.log("event:",myself.name,"mousedown");

		if(event.button==2){
			
//console.log("2parent=",myself.ctx.canvas.parentNode);
//modalWindow�͓��������Ԃ�

			if(gAnsModalWindow!=null){
				gAnsModalWindow=null;
				mwYesNo.setMessage("�����Ă������ł���?");
				mwYesNo.appear(event.clientX,event.clientY);
				var hoge = setInterval(function(){
	
					if(gAnsModalWindow!=null){
						clearInterval(hoge);
						if(gAnsModalWindow){
							//.front��.next�̕t���ւ�
							if(myself.front!=null)myself.front.next=myself.next;
							if(myself.next!=null)myself.next.front=myself.front;

							//element�̕\���̍X�V

							//��ԑO�܂ōs��
							oneself=myself;
							while(oneself.front!=null)oneself=oneself.front;
							var first=oneself;
//console.log("first=",first.name);
							while(oneself.next!=null){
								oneself=oneself.next;
//console.log("oneself=",oneself.name);
//console.log("first.ctx=",first.ctx);
//console.log("oneself.front=",oneself.front);
								if(oneself.front==null){//��������ԑO�̏ꍇ
									//do nothing
								}else{
									oneself.ctx.canvas.setAttribute('style','position:absolute;left:'+(first.ctx.canvas.offsetLeft).toString()+'px;top:'+(oneself.front.ctx.canvas.offsetTop+oneself.front.ctx.canvas.height).toString()+'px;');
									oneself.ctx.canvas.style.zIndex=NumZindex();
								};
							};








							myself.ctx.canvas.parentNode.removeChild(myself.ctx.canvas);
console.log("delete");
						}else{
							//do nothing
						};
					};
				},100);
			};

			//�E�N���b�N�����܂�

		}else if(event.button==0){//���N���b�N

			myself.mouseDown=true;
			mouseX=event.clientX;//�N���b�N���̈ʒu���L��
			mouseY=event.clientY;
			var moveX,moveY;

console.log("��������");
			//mouseDown->�������牺������
			oneself=myself;
			while(oneself!=null){
				oneself.clear();//���ꂼ���canvas�������
				oneself=oneself.next;
			};

console.log("z-index�̍X�V");
			//mouseDown->���������z-index���X�V����
			oneself=myself.front;
			while(oneself!=null){
				oneself.ctx.canvas.style.zIndex=NumZindex();
				oneself=oneself.front;
			};


			//�V����canvas��~���A�����ɃC�x���g���X�i�[��ݒ肷��
			//onmousemove���ɂ͐V����canvas�ɕ`���Ĉړ���������(attribute�𑀍삷��ƒx������)

console.log("ctxF�̐ݒu");
		
			NumZindex();//ctxB�̕���-1�̂���
			ctxF = createContext(NumZindex());//�őO�ʁA��ʂ����ς�(default)

			ctxF.canvas.setAttribute('id','ctxF');//��

console.log("�������牺�𕂂����ĕ`��");
			//�������牺�𕂂����ĕ`��
			myself.drawMove(ctxF,0,0);
			oneself=myself;
			while(oneself.next!=null){
				oneself=oneself.next;
				oneself.drawMove(ctxF,0,0);//���canvas�ɑS���`��
			};
			var top,height;
			top=myself.ctx.canvas.offsetTop;
			height=oneself.ctx.canvas.offsetTop+oneself.ctx.canvas.height-myself.ctx.canvas.offsetTop;
//console.log("ctxF.canvas=",ctxF.canvas.style);


console.log("�e��Halo��`��");
			ctxB = createContext(ctxF.canvas.style.zIndex-1);//�e��Halo��`��
			ctxB.canvas.setAttribute('id','ctxB');//��

			myself.drawHalo(ctxB,0,0,top,height);




//console.log("event=",event.target.offsetLeft,height);


//onmouseout

			//������؂�
			if(myself.front!=null)myself.front.next=null;
			myself.front=null;

			Body.appendChild(ctxF.canvas);//��
			Body.appendChild(ctxB.canvas);//��

//console.log("cut name=",myself.name);


			//�C�x���g�ݒ�


			ctxF.canvas.onmouseup = function(event){
				myself.mouseDown=false;
	
				var oneself;
				var moveX=event.clientX-mouseX;
				var moveY=event.clientY-mouseY;

				//halo�p��canvas�ƈړ����̊G��`��canvas��؂藣��
				ctxF.canvas.parentNode.removeChild(ctxF.canvas);
				ctxF=null;//�������J��
				ctxB.canvas.parentNode.removeChild(ctxB.canvas);
				ctxB=null;

	
				//�ړ����html�𐘂��t���Ȃ���
				var nearest =myself.nearest(moveX,moveY);
if(nearest==-1)console.log("nearest=none");
else console.log("nearest=",nearest.node.name,nearest.ub);
				if(nearest==-1){
					myself.ctx.canvas.setAttribute('style','position:absolute;left:'+(myself.ctx.canvas.offsetLeft+moveX).toString()+'px;top:'+(myself.ctx.canvas.offsetTop+moveY).toString()+'px;');
					myself.ctx.canvas.style.zIndex=NumZindex();
					oneself=myself.next;
					while(oneself!=null){
						oneself.ctx.canvas.setAttribute('style','position:absolute;left:'+(oneself.ctx.canvas.offsetLeft+moveX).toString()+'px;top:'+(oneself.ctx.canvas.offsetTop+moveY).toString()+'px;');
						oneself.ctx.canvas.style.zIndex=NumZindex();
						oneself=oneself.next;
					};


				}else{
					myself.insert(nearest.node,nearest.ub);

				};


				//�����t����html�ɕ`��
				//mouseUp->�������牺��\������
				oneself=myself;
				while(oneself!=null){
					oneself.draw(oneself.ctx);
					oneself=oneself.next;
				};
	
			};//ctxF onmouseup
			
			ctxF.canvas.onmousemove = function(event){
				//�ړ����̊G��`��canvas���N���A
				ctxF.clearRect(0,0,ctxF.canvas.width,ctxF.canvas.height);

				//�N���b�N����Ă���̈ړ�����
				var moveX=event.clientX-mouseX;
				var moveY=event.clientY-mouseY;

				//�����Ƃ��̉���drawMove
				myself.drawMove(ctxF,moveX,moveY);
				var oneself=myself.next;
				while(oneself!=null){
					oneself.drawMove(ctxF,moveX,moveY);
					oneself=oneself.next;
				};

				//�n���[��`��
				myself.drawHalo(ctxB,moveX,moveY,top,height);

				//�߂��̃m�[�h�����点��
				myself.brightenConnectPoint(ctxB,moveX,moveY);
			};//ctxF onmousemove


		}else{
			console.error("1 nor 2 event.button=",event.button);
		};

		event.stopPropagation();
	};//onmousedown

//	myself.ctx.canvas.onmouseup = function(event){
//console.log("event=",event);
//		myself.mouseDown=false;
//console.log("event:",myself.name,"mouseup");
//		ctxF.canvas.parent.removeChild(ctxF.canvas);
//	};
//	myself.ctx.canvas.onmousemove = function(event){
//		if(myself.mouseDown){
//			myself.ctx.canvas.setAttribute('style','position: absolute; left:'+(xx+event.clientX-mouseX).toString()+'px;top:'+(yy+event.clientY-mouseY).toString()+'px;z-index:'+index.toString()+';');
//console.log("event=",event);
//
//		};
//	};
};
Ita.prototype.insert=function(nearest,pos){

	var one=this;

	//�`�F�b�N
	if(this.front!=null)console.error("this��tree�̈�ԏ�̃m�[�h�ł���K�v������܂�");//this�͈�ԏ�łȂ��Ă͂Ȃ�Ȃ�

	if(pos=='bottom'){
		//nearest��nearest.next�̊Ԃ�this��tree���C���T�[�g


		var nextPrevious = nearest.next;//�ꎞ�ۑ�
	
		//nearest��myself���q��
		nearest.next = this;
		this.front = nearest;
	
		//this�̏�������tree�̈�Ԍ������߂�
		var oneBottom=this;
		while(oneBottom.next!=null){
			oneBottom=oneBottom.next;
		};

		//oneBottom�ƌ���nearest.next���q��
		oneBottom.next=nextPrevious;
		if(nextPrevious!=null)nextPrevious.front=oneBottom;


		//nearest����Anearest����ɉ��Ɍ�����node��`���Ă���

		var node=nearest;//�`���Ώ�
		while(node.next!=null){
			node=node.next;
			node.ele.setAttribute('style','position:absolute;left:'+(nearest.ele.offsetLeft).toString()+'px;top:'+(node.front.ele.offsetTop+node.front.ele.height).toString()+'px;');
			node.ele.style.zIndex=NumZindex();
		};

	}else if(pos=='top'){
		//nearest�̏��organ�̈�ԉ����q����Bnearest�͈�ԏ�̂͂�������A����ŏI���B

		//�`�F�b�N
		if(nearest.front!=null)console.error(nearest.name,"��tree�̐擪�ł͂���܂���Bfront=",nearest.front.name);

		//��ԉ���node�����߂�	
		var oneBottom=this;
		while(oneBottom.next!=null){
			oneBottom=oneBottom.next;
		};
		
		//this�̂��Ƃ�nearest���q����
		oneBottom.next=nearest;
		nearest.front=oneBottom;

		//nearest����Anearest����ɏ�Ɍ�������node��`���Ă���

		var node=nearest;
		while(node.front!=null){
			node=node.front;
			node.ele.setAttribute('style','position:absolute;left:'+(nearest.ele.offsetLeft).toString()+'px;top:'+(node.next.ele.offsetTop-node.ele.height).toString()+'px;');
			node.ele.style.zIndex=NumZindex();
		};

	}else{
		console.error("pos�̒l��'top'�ł�'bottom'�ł�����܂���Bpos=",pos);
	};
};
Ita.prototype.brightenConnectPoint=function(ctxB,moveX,moveY){
	//ctxB...����������window.innerWidht�~window.innerHeight

	var myself=this;

	var ansTB=Ita_nearestTopBottom.call(myself,moveX,moveY);
	var ansBT=Ita_nearestBottomTop.call(myself,moveX,moveY);
	if(ansTB==-1){
		if(ansBT==-1){
			//do nothing
		}else{
			ansBT.node.drawConnectPointTop(ctxB);
		};
	}else{
		if(ansBT==-1){
			ansTB.node.drawConnectPointBottom(ctxB);
		}else{
			if(ansTB.dist<ansBT.dist){
				ansTB.node.drawConnectPointBottom(ctxB);
			}else{
				ansBT.node.drawConnectPointTop(ctxB);
			};
		};
	};
if(ansTB!=-1)console.log("distanceTB=",ansTB.dist);
if(ansBT!=-1)console.log("distanceBT=",ansBT.dist);

//��	var nearest =myself.nearest(moveX,moveY);
//��	if(nearest!=-1)nearest.drawConnectPointBottom(ctxB);


};
Ita.prototype.clear = function(){

		this.ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

};
Ita.prototype.draw = function(ctx){
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
Ita.prototype.drawMove= function(ctx,mx,my){
//��΍��W�n
//���O
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha,
		lineWidth:ctx.lineWidth
	};

	//�n��h��
	ctx.globalAlpha=1;
	ctx.shadowBlur=0;
	ctx.fillStyle='rgb(0,200,0)';
	ctx.fillRect(this.ctx.canvas.offsetLeft+Ita_floatPX+mx,this.ctx.canvas.offsetTop-Ita_floatPX+my,this.ctx.canvas.width-1,this.ctx.canvas.height-1);
	//�g�������
	ctx.beginPath();
	ctx.lineWidth=1;
	ctx.strokeRect(this.ctx.canvas.offsetLeft+Ita_floatPX+mx,this.ctx.canvas.offsetTop-Ita_floatPX+my,this.ctx.canvas.width,this.ctx.canvas.height);
	//���O������
	ctx.shadowBlur=0;
	ctx.fillStyle='yellow';
	ctx.font = "bold "+this.letterSize.toString()+"px '�l�r ����'";
	ctx.fillText(this.name,this.ctx.canvas.offsetLeft+Ita_floatPX+mx+this.ctx.canvas.width/2-ctx.measureText(this.name).width/2,this.ctx.canvas.offsetTop-Ita_floatPX+my+this.letterSize);

//console.log("name=",this.name,"index=",ctx.canvas.style.zIndex);
	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;


//	this.draw(this.ctx);//kkkkkkkkk
};
Ita.prototype.drawHalo=function(ctx,mx,my,top,height){
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
	ctx.fillRect(this.ctx.canvas.offsetLeft+mx,top+my,this.ctx.canvas.width,height);

	//�����`��
	ctx.shadowBlur=10;
	ctx.shadowColor='white';
	ctx.fillStyle='black';
	ctx.globalAlpha=1;
	for(var ii=0;ii<5;ii++)	ctx.fillRect(this.ctx.canvas.offsetLeft+mx+Ita_floatPX,top+my-Ita_floatPX,this.ctx.canvas.width,height);


	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;


};
Ita.prototype.drawConnectPointBottom=function(ctx){
//��΍��W�n
//�����\�蕔���i�����j
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

	ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
	//�d�˓h���䩗m�����o��
	for(var ii=0;ii<20;ii++)
		ctx.fillRect(this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop+this.ctx.canvas.height,this.ctx.canvas.width,1);



	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
};
Ita.prototype.drawConnectPointTop=function(ctx){
//��΍��W�n
//�����\�蕔���i�㕔�j
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

	ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
	//�d�˓h���䩗m�����o��
	for(var ii=0;ii<20;ii++)
		ctx.fillRect(this.ctx.canvas.offsetLeft,this.ctx.canvas.offsetTop,this.ctx.canvas.width,1);



	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
};
Ita.prototype.nearest = function(mx,my){
	var distance;
	var min=1000000;
	for(var ii=0;ii<Plate_plates.length;ii++){
		if(Plate_plates[ii]!=this){
			//�����plate�ł͂Ȃ�
			var flag=true;
			var temp=this.next;
			while(temp!=null){
				if(Plate_plates[ii]==temp){
//console.log("same tree");
					flag=false;
					break;
				};
				temp=temp.next;
			};
			if(flag){
				var dist=calcDistance(
					this.ctx.canvas.offsetLeft+this.ctx.canvas.offsetWidth/2+mx+Ita_floatPX,
					this.ctx.canvas.offsetTop+my-Ita_floatPX,
					Plate_plates[ii].ctx.canvas.offsetLeft+Plate_plates[ii].ctx.canvas.offsetWidth/2,
					Plate_plates[ii].ctx.canvas.offsetTop+Plate_plates[ii].ctx.canvas.offsetHeight
				);
				if(dist<min){
					min=dist;
					id=ii;
				};
			};
		};
	};
	if(min<50){
		return Plate_plates[id];
	}else{
		return -1;
	};
};
Ita.prototype.nearest=function(moveX,moveY){

	var ansTB=Ita_nearestTopBottom.call(this,moveX,moveY);
	var ansBT=Ita_nearestBottomTop.call(this,moveX,moveY);
console.log("ansTB=",ansTB);
console.log("ansBT=",ansBT);

	var ans;
	if(ansTB==-1){
		if(ansBT==-1){
			ans= -1;
		}else{
			ans= {node:ansBT.node,ub:'top'};
		};
	}else{
		if(ansBT==-1){
			ans= {node:ansTB.node,ub:'bottom'};
		}else{
			if(ansTB.dist<ansBT.dist){
				ans= {node:ansTB.node,ub:'bottom'};
			}else{
				ans= {node:ansBT.node,ub:'top'};
			};
		};
	};
	return ans;
};

