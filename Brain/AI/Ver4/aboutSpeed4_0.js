		//  ��  ����(���x)
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
	//�ˑR�ψق�������
	if(Math.random()<0.2)aiself.res1=-1*aiself.res1;
	return aiself.res1;
};

		//�@���@�w�K(���x)
AILearnSpeed4_0 = function(kind){
	//1...���� -1...�㉻
	 //1�̂Ƃ���ans���o�₷���悤��weight��ς���
	//-1�̂Ƃ���ans���o�Ȃ��悤��weight��ς���

	//aiself.res1���̏d�݂�ς���(10%)
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
