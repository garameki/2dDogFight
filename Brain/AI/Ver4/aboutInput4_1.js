		//  ●  入力層(前回)と入力層(今回)を入れ替え、新・入力層(今回)をクリア
var AIClearInput4_0 = function(){//これから入力を行うinput変数の中身を0にする

	var aiself=this;


	//スパンとスパンの継ぎ目に入れる
	if(aiself.numZenkai==0){
		aiself.numZenkai=1;
		aiself.numKonkai=0;
	}else{
		aiself.numZenkai=0;
		aiself.numKonkai=1;
	};

	for(var ii=0;ii<aiself.input[aiself.numKonkai].length;ii++)aiself.input[aiself.numKonkai][ii]=0;
};

		//  ●  入力層へ入力
var AIStoreInfo4_1 = function(){
//inputは共有せず、weightは共有する！！！！！！
//weightはグローバル変数


	var filename="aboutInput4_1prototype.js";//*** do not forget to change here after copy


	var aiself=this;


	//量子化後の状態
	var qtheta;
	var qlambda;
	var qsp;
	var qdis;

	var alpha=aiself.myself.direction;
	var beta=getAngle(aiself.target.x,aiself.target.y,aiself.myself.x,aiself.myself.y);
	var gamma=aiself.target.direction;

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
		stopSrites(aiself.myself);
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
		stopSrites(aiself.myself);
	};

	var avx =aiself.target.speed*Math.cos(-aiself.target.direction*Rad);
	var avy =aiself.target.speed*Math.sin(-aiself.target.direction*Rad);
	var evx=aiself.myself.speed*Math.cos(-aiself.myself.direction*Rad);
	var evy=aiself.myself.speed*Math.sin(-aiself.myself.direction*Rad);
	var sp=Math.pow((avx-evx)*(avx-evx)+(avy-evy)*(avy-evy),0.5);
aiself.target.speed.toString();
aiself.myself.speed.toString();

	if(sp<-6 || sp>6){
		info.caution(filename,"相対速度を確認してください1");
		info.caution(filename+" MaxSpeed="+MaxSpeed.toString()+" MinSpeed="+MinSpeed.toString());
		info.caution(filename+"target.speed="+aiself.target.speed.toString()+" myself.speed="+aiself.myself.speed.toString());
//○		console.error("ai2.js 相対速度を確認してください target.speed=",aiself.target.speed," myself.speed=",aiself.myself.speed);
		stopSprites(aiself.myself);
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
		info.caution(filename+"target.speed="+aiself.target.speed.toString()+" myself.speed="+aiself.myself.speed.toString());
		stopSprites(aiself.myself);
	};

	var dis = calcDistance(aiself.myself.x,aiself.myself.y,aiself.target.x,aiself.target.y);

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
		stopSprites(aiself.myself);
	};

	//量子化ここまで


			//入力層に入れる
//	aiself.input[qtheta*Ltheta+qlambda*Ltheta+qsp*Lsp+qdis*Ldis+preqtheta*Lpreqtheta+preqlambda*Lpreqlambda+preqsp*Lpreqsp+preqdis*Lpreqdis]+=1;

	aiself.input[aiself.numKonkai][qtheta*Ltheta+qlambda*Llambda+qsp*Lsp+qdis*Ldis]+=1;
//info.text(qtheta.toString()+" "+qlambda.toString()+" "+qsp.toString()+" "+qdis.toString());
};

console.info("aboutInput.js      ready!");
