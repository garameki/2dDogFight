		//  ●  決定(速度)
AIDecideSpeed4_0 = function(){

	var aiself=this;

	for(var ii=0;ii<aiself.mm11[aiself.numKonkai].length;ii++){
		aiself.mm11[aiself.numKonkai][ii]=0;
		for(var kk=0;kk<aiself.input[aiself.numKonkai].length;kk++){
			aiself.mm11[aiself.numKonkai][ii]+=aiself.input[aiself.numKonkai][kk]*weight11[kk][ii];
		};
	};
	aiself.res1=0;
	for(var ii=0;ii<aiself.mm11[aiself.numKonkai].length;ii++){
		aiself.res1+=aiself.mm11[aiself.numKonkai][ii]*weight21[ii];
	};
	if(aiself.res1>0){
		aiself.res1 = 0.1;
	}else if(aiself.res1<0){
		aiself.res1 = -0.1;
	};
	//突然変異を加える
	if(Math.random()<0.2)aiself.res1=-1*aiself.res1;
	return aiself.res1;
};

		//　●　学習(速度)
AILearnSpeed4_0 = function(kind){
	//1...強化 -1...弱化
	 //1のときはansを出やすいようにweightを変える
	//-1のときはansを出ないようにweightを変える

	//aiself.res1側の重みを変える(10%)
//console.log("ai.js   [dSpeed  eva]=",aiself.res1,kind);


	var aiself=this;


	for(var ii=0;ii<weight11.length;ii++){
		for(var kk=0;kk<weight11[ii].length;kk++){
			weight11[ii][kk]+=aiself.res1*kind*aiself.input[aiself.numZenkai][ii];//+0.5*Math.random()-0.25;
	}};
	for(var ii=0;ii<weight21.length;ii++){
		weight21[ii]+=aiself.res1*kind*aiself.mm11[aiself.numZenkai][ii];//+0.5*Math.random()-0.25;
	};
};
