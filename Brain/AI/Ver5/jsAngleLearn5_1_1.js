

// weight*2��angle�Ŏg�p���镪�ł��i*�̓��C���h�J�[�h�j

		//  ��   �w�K(�p�x)
var AILearnAngle5_1_1 = function(kind){
	//1...���� -1...�㉻
	 //1�̂Ƃ���ans���o�₷���悤��weight��ς���
	//-1�̂Ƃ���ans���o�Ȃ��悤��weight��ς���

//info.text("AILearnAngle   kind="+kind.toString());

	var accum="";
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		this.ww.weight22[ii]+=this.mid12[this.numZenkai][ii]*this.resAngle[this.numZenkai]*kind*this.alphaAngle;
//		accum+=(Math.round(this.ww.weight22[ii]*100)/100).toString()+"  ";
	};
//info.text(this.ww.filename);
//info.text("Angle   "+accum);accum="";
	var mm;
	var sum;
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		mm=this.numIma;
		var count=1;//��
		for(var kk=0;kk<this.NSpan;kk++){
			mm--;//�ߋ��̕�����->��ɒu����
			if(mm<0)mm+=this.NSpan;
			this.ww.weight12[this.numInput[mm]][ii]+=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle/Math.pow(count++,0.6);//��
//info.text(mm);
	};};
};
console.info("aboutAngleLearn5_0.js   ready!");
