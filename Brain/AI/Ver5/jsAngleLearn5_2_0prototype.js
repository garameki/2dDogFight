

//���Ǔ_

//5_2_0	�ω��ʂ�this.weightChangeAngle�Ƃ����B��AIPlane�ŕ\���ł���



// weight*2��angle�Ŏg�p���镪�ł��i*�̓��C���h�J�[�h�j

		//  ��   �w�K(�p�x)
var AILearnAngle5_2_0 = function(kind){
	//1...���� -1...�㉻
	 //1�̂Ƃ���ans���o�₷���悤��weight��ς���
	//-1�̂Ƃ���ans���o�Ȃ��悤��weight��ς���

//info.text("AILearnAngle   kind="+kind.toString());

	var sumWC=0;
	var value;

//	var accum="";
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		value=this.mid12[this.numZenkai][ii]*this.resAngle[this.numZenkai]*kind*this.alphaAngle;//��
		sumWC+=value;//��
		this.ww.weight22[ii]+=value;//��
//��		this.ww.weight22[ii]+=this.mid12[this.numZenkai][ii]*this.resAngle[this.numZenkai]*kind*this.alphaAngle;

//		accum+=(Math.round(this.ww.weight22[ii]*100)/100).toString()+"  ";
	};
//info.text(this.ww.filename);
//info.text("Angle   "+accum);accum="";
	var mm;
	var sum;
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		mm=this.numIma;
		var count=1;
		for(var kk=0;kk<this.NSpan;kk++){
			mm--;//�ߋ��̕�����->��ɒu����
			if(mm<0)mm+=this.NSpan;

			value=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle/Math.pow(count++,0.6);//��
			sumWC+=value;//��
			this.ww.weight12[this.numInput[mm]][ii]+=value;//��
//��			this.ww.weight12[this.numInput[mm]][ii]+=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle/Math.pow(count++,0.6);
//info.text(mm);
	};};
	this.weightChangeAngle=sumWC;//��
};
console.info("aboutAngleLearn5_2.js   ready!");
