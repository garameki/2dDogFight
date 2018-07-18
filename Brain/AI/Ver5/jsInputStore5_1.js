
		//  ●  入力層へ入力
var AIStoreInfo5_1 = function(){
//inputは共有せず、weightは共有する！！！！！！
//weightはグローバル変数


	var filename="aboutInput5_0.js";//***** do not forget to change



	//量子化後の状態
	var qtheta;
	var qlambda;
	var qsp;
	var qdis;

	var alpha;
	var beta;
	var gamma;
	var theta;
	var lambda;

	var avx;
	var avy;
	var evx;
	var evy;
	var sp;

	var dis;

	alpha=this.plane.direction;
	beta=getAngle(this.target.x,this.target.y,this.plane.x,this.plane.y);
	gamma=this.target.direction;

	theta=beta-alpha;
//	lambda=gamma-beta;
	lambda=gamma-alpha;

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

	//まずは各量を量子化する
	//theta→qtheta;
	//lambda→qlambda;
	//sp→qsp
	//dis→qdis

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
	
		info.text(filename+"  値が異常です。theta="+theta.toString());
//○		console.error("ai2.js  値が異常です。theta=",theta);
		stopSrites(this.plane);
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
		info.caution(filename+"  値が異常です。lambda="+lambda.toString());
//○		console.error("ai2.js  値が異常です。lambda=",lambda);
		stopSrites(this.plane);
	};

	avx =this.target.speed*Math.cos(-this.target.direction*Rad);
	avy =this.target.speed*Math.sin(-this.target.direction*Rad);
	evx=this.plane.speed*Math.cos(-this.plane.direction*Rad);
	evy=this.plane.speed*Math.sin(-this.plane.direction*Rad);
	sp=Math.pow((avx-evx)*(avx-evx)+(avy-evy)*(avy-evy),0.5);

	if(sp<-6 || sp>6){
		info.caution(filename,"相対速度を確認してください1");
		info.caution(filename+" MaxSpeed="+MaxSpeed.toString()+" MinSpeed="+MinSpeed.toString());
		info.caution(filename+"target.speed="+this.target.speed.toString()+" plane.speed="+this.plane.speed.toString());
//○		console.error("ai2.js 相対速度を確認してください target.speed=",this.target.speed," plane.speed=",this.plane.speed);
		stopSprites(this.plane);
	}else if(sp<-3){
		qsp=0;
	}else if(sp<=0){
		qsp=1;
	}else if(sp<=3){
		qsp=2;
	}else if(sp<=6){
		qsp=3;
	}else{
		info.caution(filename,"相対速度を確認してください2");
		info.caution(filename+" MaxSpeed="+MaxSpeed.toString()+" MinSpeed="+MinSpeed.toString());
		info.caution(filename+"target.speed="+this.target.speed.toString()+" plane.speed="+this.plane.speed.toString());
		stopSprites(this.plane);
	};

	dis = calcDistance(this.plane.x,this.plane.y,this.target.x,this.target.y);

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
		info.caution(filename+" 値が異常です。qdis="+qdis.toString());
//○		console.error("ai2.js 値が異常です。qdis=",qdis);
		stopSprites(this.plane);
	};

	//量子化ここまで


			//入力層に入れる

//○	aiself.input[aiself.numKonkai][qtheta*Ltheta+qlambda*Llambda+qsp*Lsp+qdis*Ldis]+=1;
//info.text("AIstoreInfo   "+qtheta.toString()+" "+qlambda.toString()+" "+qsp.toString()+" "+qdis.toString());
	

	var num=qtheta*Ltheta+qlambda*Llambda+qsp*Lsp+qdis*Ldis;
	if(num!=this.preNumInput){//●
		this.numInput[this.numIma]=num;
		this.preNumInput = num;
//if(this.plane._name=='fighter')info.text("AIInput     "+(this.numInput[this.numIma]).toString());

	}else{
		if(--this.numIma<0)this.numIma+=this.NSpan;
	};


//if(this.plane._name=='fighter')info.text("AIInput     this.numIma="+this.numIma.toString());

};

console.info("jsInputStore5_1.js      ready!");
