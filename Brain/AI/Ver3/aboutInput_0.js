		//  ��  ���͑w(�O��)�Ɠ��͑w(����)�����ւ��A�V�E���͑w(����)���N���A
AI3.prototype.clearInput = function(){//���ꂩ����͂��s��input�ϐ��̒��g��0�ɂ���

	//�X�p���ƃX�p���̌p���ڂɓ����
	if(this.numZenkai==0){
		this.numZenkai=1;
		this.numKonkai=0;
	}else{
		this.numZenkai=0;
		this.numKonkai=1;
	};

	for(var ii=0;ii<this.input[this.numKonkai].length;ii++)this.input[this.numKonkai][ii]=0;
};

		//  ��  ���͑w�֓���
AI3.prototype.storeInfo = function(){
//input�͋��L�����Aweight�͋��L����I�I�I�I�I�I
//weight�̓O���[�o���ϐ�

	//�ʎq����̏��
	var qtheta;
	var qlambda;
	var qsp;
	var qdis;

	var alpha=this.myself.direction;
	var beta=getAngle(this.target.x,this.target.y,this.myself.x,this.myself.y);
	var gamma=this.target.direction;

	var theta=beta-alpha;
//	var lambda=gamma-beta;
	var lambda=gamma-alpha;

	while(true){
		if(theta>=360)theta-=360;
		if(theta<0)theta+=360;
		if(theta>=0 && theta<360)break;
	};
	while(true){
		if(lambda>=360)lambda-=360;
		if(lambda<0)lambda+=360;
		if(lambda>=0 && lambda<360)break;
	};

	//�܂��͊e�ʂ�ʎq������
	//theta��qtheta;
	//lambda��qlambda;
	//sp��qsp
	//dis��qdis

	if(theta<45){
		qtheta=0;
	}else if(theta<90){
		qtheta=1;
	}else if(theta<135){
		qtheta=2;
	}else if(theta<180){
		qtheta=3;
	}else if(theta<225){
		qtheta=4;
	}else if(theta<270){
		qtheta=5;
	}else if(theta<315){
		qtheta=6;
	}else if(theta<360){
		qtheta=7;
	}else{
		console.error("ai2.js  �l���ُ�ł��Btheta=",theta);
		stopSrites(this.myself);
	};

	if(lambda<45){
		qlambda=0;
	}else if(lambda<90){
		qlambda=1;
	}else if(lambda<135){
		qlambda=2;
	}else if(lambda<180){
		qlambda=3;
	}else if(lambda<225){
		qlambda=4;
	}else if(lambda<270){
		qlambda=5;
	}else if(lambda<315){
		qlambda=6;
	}else if(lambda<360){
		qlambda=7;
	}else{
		console.error("ai2.js  �l���ُ�ł��Blambda=",lambda);
		stopSrites(this.myself);
	};

	var avx =this.target.speed*Math.cos(-this.target.direction*Rad);
	var avy =this.target.speed*Math.sin(-this.target.direction*Rad)
	var evx=this.myself.speed*Math.cos(-this.myself.direction*Rad);
	var evy=this.myself.speed*Math.sin(-this.myself.direction*Rad);
	var sp=Math.pow((avx-evx)*(avx-evx)+(avy-evy)*(avy-evy),0.5);

	if(sp<-6 || sp>6){
		console.error("ai2.js ���Α��x���m�F���Ă������� target.speed=",this.target.speed," myself.speed=",this.myself.speed);
		stopSprites(this.myself);
	}else if(sp<-3){
		qsp=0;
	}else if(sp<=0){
		qsp=1;
	}else if(sp<=3){
		qsp=2;
	}else if(sp<=6){
		qsp=3;
	}else{
		console.error("ai2.js ���Α��x���m�F���Ă������� target.speed=",this.target.speed," myself.speed=",this.myself.speed);
		stopSprites(this.myself);
	};

	var dis = calcDistance(this.myself.x,this.myself.y,this.target.x,this.target.y);

	if(dis<50){
		qdis=0;
	}else if(dis<100){
		qdis=1;
	}else if(dis<200){
		qdis=2;
	}else if(dis<300){
		qdis=3;
	}else if(dis<400){
		qdis=4;
	}else if(dis<500){
		qdis=5;
	}else if(dis>=500){
		qdis=6;
	}else{
		console.error("ai2.js �l���ُ�ł��Bqdis=",qdis);
		stopSprites(this.myself);
	};

	//�ʎq�������܂�


			//���͑w�ɓ����
//	this.input[qtheta*Ltheta+qlambda*Ltheta+qsp*Lsp+qdis*Ldis+preqtheta*Lpreqtheta+preqlambda*Lpreqlambda+preqsp*Lpreqsp+preqdis*Lpreqdis]+=1;

	this.input[this.numKonkai][qtheta*Ltheta+qlambda*Llambda+qsp*Lsp+qdis*Ldis]+=1;
};

console.info("aboutInput.js      ready!");
