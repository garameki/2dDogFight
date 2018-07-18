		//  ●  決定(発射)
var AIDecideShoot4_0 = function(){

	var aiself=this;

	var sum=0;

	for(var ii=0;ii<aiself.mm13[aiself.numKonkai].length;ii++){
		aiself.mm13[aiself.numKonkai][ii]=0;
		for(var kk=0;kk<aiself.input[aiself.numKonkai].length;kk++){
			aiself.mm13[aiself.numKonkai][ii]+=aiself.input[aiself.numKonkai][kk]*weight13[kk][ii];
		};
		//if(aiself.mm13[aiself.numKonkai][ii]>threshold){
		//	aiself.mm13[aiself.numKonkai][ii]=1;
		//}else if(aiself.mm13[aiself.numKonkai][ii]<-threshold){
		//	aiself.mm13[aiself.numKonkai][ii]=-1;
		//};
	};

	for(var ii=0;ii<aiself.mm13[aiself.numKonkai].length;ii++){
		sum+=aiself.mm13[aiself.numKonkai][ii]*weight23[ii];
	};


	if(sum>=0){
		aiself.resShoot = 1;//打つ
	}else{
		aiself.resShoot = -1;//打たない
	};

	//突然変異を加える
//	if(Math.random()<0.1)aiself.resShoot=-1*aiself.resShoot;
	return aiself.resShoot;

};
		//  ●  学習(発射)
var AILearnShoot4_0 = function(kind){


	//1...強化 -1...弱化
	 //1のときはansを出やすいようにweightを変える
	//-1のときはansを出ないようにweightを変える

//console.log("resShot=",aiself.resShot," kind=",kind);

	var aiself=this;

	//resShoot側の重みを変える(10%)
	for(var ii=0;ii<weight13.length;ii++){
		for(var kk=0;kk<weight13[ii].length;kk++){
			weight13[ii][kk]+=aiself.resShoot*kind*aiself.input[aiself.numZenkai][ii];//+0.5*Math.random()-0.25;
		};
	};
	for(var ii=0;ii<weight23.length;ii++){
		weight23[ii]+=aiself.resShoot*kind*aiself.mm13[aiself.numZenkai][ii];//+0.5*Math.random()-0.25;
	};
};	