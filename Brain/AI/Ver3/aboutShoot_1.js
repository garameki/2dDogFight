		//  ��  ����(����)
AI3.prototype.decideShoot = function(){

	for(var ii=0;ii<this.mm13[this.numKonkai].length;ii++){
		this.mm13[this.numKonkai][ii]=0;
		for(var kk=0;kk<this.input[this.numKonkai].length;kk++){
			this.mm13[this.numKonkai][ii]+=this.input[this.numKonkai][kk]*weight13[kk][ii];
		};
		//if(this.mm13[this.numKonkai][ii]>threshold){
		//	this.mm13[this.numKonkai][ii]=1;
		//}else if(this.mm13[this.numKonkai][ii]<-threshold){
		//	this.mm13[this.numKonkai][ii]=-1;
		//};
	};
	resShoot=0;
	for(var ii=0;ii<this.mm13[this.numKonkai].length;ii++){
		res2+=this.mm13[this.numKonkai][ii]*weight23[ii];
	};
	if(resShoot>0){
		resShoot = 1;//�ł�
	}else if(res2<=0){
		resShoot = -1;//�ł��Ȃ�
	};

	//�ˑR�ψق�������
//	if(Math.random()<0.1)resShoot=-1*resShoot;
	return resShoot;

};
		//  ��  �w�K(����)
AI3.prototype.learnShoot = function(){

	//1...���� -1...�㉻
	 //1�̂Ƃ���ans���o�₷���悤��weight��ς���
	//-1�̂Ƃ���ans���o�Ȃ��悤��weight��ς���

//console.log("resShot=",resShot," kind=",kind);

	//resShoot���̏d�݂�ς���(10%)
	for(var ii=0;ii<weight13.length;ii++){
		for(var kk=0;kk<weight13[ii].length;kk++){
			weight13[ii][kk]+=resShot*kind*this.input[this.numZenkai][ii];//+0.5*Math.random()-0.25;
		};
	};
	for(var ii=0;ii<weight23.length;ii++){
		weight23[ii]+=resShot*kind*this.mm13[this.numZenkai][ii];//+0.5*Math.random()-0.25;
	};
};	