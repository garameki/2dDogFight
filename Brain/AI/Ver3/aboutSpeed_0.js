		//  ��  ����(���x)
AI3.prototype.decideSpeed = function(){
	for(var ii=0;ii<this.mm11[this.numKonkai].length;ii++){
		this.mm11[this.numKonkai][ii]=0;
		for(var kk=0;kk<this.input[this.numKonkai].length;kk++){
			this.mm11[this.numKonkai][ii]+=this.input[this.numKonkai][kk]*weight11[kk][ii];
		};
	};
	res1=0;
	for(var ii=0;ii<this.mm11[this.numKonkai].length;ii++){
		res1+=this.mm11[this.numKonkai][ii]*weight21[ii];
	};
	if(res1>0){
		res1 = 0.1;
	}else if(res1<0){
		res1 = -0.1;
	};
	//�ˑR�ψق�������
//	if(Math.random()<0.5)res1=-1*res1;
	return res1;
};

		//�@���@�w�K(���x)
AI3.prototype.learnSpeed = function(kind){
	//1...���� -1...�㉻
	 //1�̂Ƃ���ans���o�₷���悤��weight��ς���
	//-1�̂Ƃ���ans���o�Ȃ��悤��weight��ς���

	//res1���̏d�݂�ς���(10%)
//console.log("ai.js   [dSpeed  eva]=",res1,kind);
	for(var ii=0;ii<weight11.length;ii++){
		for(var kk=0;kk<weight11[ii].length;kk++){
			weight11[ii][kk]+=res1*kind*this.input[this.numZenkai][ii];//+0.5*Math.random()-0.25;
	}};
	for(var ii=0;ii<weight21.length;ii++){
		weight21[ii]+=res1*kind*this.mm11[this.numZenkai][ii];//+0.5*Math.random()-0.25;
	};
};
