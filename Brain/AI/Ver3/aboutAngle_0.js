
		//  ��  ����(�p�x)
AI3.prototype.decideAngle = function(){
	for(var ii=0;ii<this.mm12[this.numKonkai].length;ii++){
		this.mm12[this.numKonkai][ii]=0;
		for(var kk=0;kk<this.input[this.numKonkai].length;kk++){
			this.mm12[this.numKonkai][ii]+=this.input[this.numKonkai][kk]*weight12[kk][ii];
		};
		//if(this.mm12[this.numKonkai][ii]>threshold){
		//	this.mm12[this.numKonkai][ii]=1;
		//}else if(this.mm12[this.numKonkai][ii]<-threshold){
		//	this.mm12[this.numKonkai][ii]=-1;
		//};
	};
	res2=0;
	for(var ii=0;ii<this.mm12[this.numKonkai].length;ii++){
		res2+=this.mm12[this.numKonkai][ii]*weight22[ii];
	};
	if(res2>0){
		res2 = 0.5;
	}else if(res2<=0){
		res2 = -0.5;
	};

	//�ˑR�ψق�������
//	if(Math.random()<0.1)res2=-1*res2;
	return res2;

};

		//  ��   �w�K(�p�x)
AI3.prototype.learnAngle = function(kind){
	//1...���� -1...�㉻
	 //1�̂Ƃ���ans���o�₷���悤��weight��ς���
	//-1�̂Ƃ���ans���o�Ȃ��悤��weight��ς���

//console.log("res1=",res1,"res2=",res2," kind=",kind);

	//res2���̏d�݂�ς���(10%)
	for(var ii=0;ii<weight12.length;ii++){
		for(var kk=0;kk<weight12[ii].length;kk++){
			weight12[ii][kk]+=res2*kind*this.input[this.numZenkai][ii];//+0.5*Math.random()-0.25;
	}};
	for(var ii=0;ii<weight22.length;ii++){
		weight22[ii]+=res2*kind*this.mm12[this.numZenkai][ii];//+0.5*Math.random()-0.25;
	};
};
