
		//�@���@�w�K(���x)
SpeedLearn6_0 = function(kind){
	this.nameSpeedLearn='SpeedLearn6_0';
	this.progressSpeedLearn='res*mid���̗p�BDecide��1 0�Ȃ̂ŁA����ɂ�������Ă��Ȃ�weight�͕ω����Ȃ��B';

	//1...���� -1...�㉻
	 //1�̂Ƃ���ans���o�₷���悤��this.ww.weight��ς���
	//-1�̂Ƃ���ans���o�Ȃ��悤��this.ww.weight��ς���

//info.text("AISpeed  "+kind.toString()+"  "+this.resSpeed[this.numZenkai].toString());

	var dsum=0;//��
	var dd;//��
	for(var ii=0;ii<this.ww.Nmid11;ii++){
		//��start
		dd=this.mid11[this.numZenkai][ii]*this.resSpeed[this.numZenkai]*kind*this.alphaSpeed;
		this.ww.weight21[ii]+=dd;
		dsum+=dd;
		//��end
//��		this.ww.weight21[ii]+=this.mid11[this.numZenkai][ii]*this.resSpeed[this.numZenkai]*kind*this.alphaSpeed;
	};
	var mm;
	for(var ii=0;ii<this.ww.Nmid11;ii++){
		mm=this.numIma;
		for(var kk=0;kk<this.NSpan;kk++){
			mm--;
			if(mm<0)mm+=this.NSpan;


			dd=this.mid11[this.numZenkai][ii]*kind*this.alphaSpeed;
			this.ww.weight11[this.numInput[mm]][ii]+=dd;
			dsum+=dd;
//��			this.ww.weight11[this.numInput[mm]][ii]+=this.mid11[this.numZenkai][ii]*kind*this.alphaSpeed;
			//+ this.mid11[this.numZenkai][ii];//*kind*this.alphaSpeed;
		};
	};
	this.changeWeightSpeed=dsum;
};
console.log("funcSpeedLearn6_0.js");