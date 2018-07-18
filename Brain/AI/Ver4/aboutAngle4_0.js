
		//  ●  決定(角度)
var AIDecideAngle4_0 = function(){


	var aiself=this;

	for(var ii=0;ii<aiself.mm12[aiself.numKonkai].length;ii++){
		aiself.mm12[aiself.numKonkai][ii]=0;
		for(var kk=0;kk<aiself.input[aiself.numKonkai].length;kk++){
			aiself.mm12[aiself.numKonkai][ii]+=aiself.input[aiself.numKonkai][kk]*weight12[kk][ii];
		};
		//if(aiself.mm12[aiself.numKonkai][ii]>threshold){
		//	aiself.mm12[aiself.numKonkai][ii]=1;
		//}else if(aiself.mm12[aiself.numKonkai][ii]<-threshold){
		//	aiself.mm12[aiself.numKonkai][ii]=-1;
		//};
	};
	aiself.res2=0;
	for(var ii=0;ii<aiself.mm12[aiself.numKonkai].length;ii++){
		aiself.res2+=aiself.mm12[aiself.numKonkai][ii]*weight22[ii];
	};
	if(aiself.res2>0){
		aiself.res2 = 0.5;
	}else if(aiself.res2<=0){
		aiself.res2 = -0.5;
	};

	//突然変異を加える
//	if(Math.random()<0.1)aiself.res2=-1*aiself.res2;
	return aiself.res2;

};

		//  ●   学習(角度)
var AILearnAngle4_0 = function(kind){
	//1...強化 -1...弱化
	 //1のときはansを出やすいようにweightを変える
	//-1のときはansを出ないようにweightを変える

//console.log("res1=",res1,"res2=",aiself.res2," kind=",kind);


	var aiself=this;

	//aiself.res2側の重みを変える(10%)
	for(var ii=0;ii<weight12.length;ii++){
		for(var kk=0;kk<weight12[ii].length;kk++){
			weight12[ii][kk]+=aiself.res2*kind*aiself.input[aiself.numZenkai][ii];//+0.5*Math.random()-0.25;
	}};
	for(var ii=0;ii<weight22.length;ii++){
		weight22[ii]+=aiself.res2*kind*aiself.mm12[aiself.numZenkai][ii];//+0.5*Math.random()-0.25;
	};
};
