

// weight*2��angle�Ŏg�p���镪�ł��i*�̓��C���h�J�[�h�j

		//  ��   �w�K(�p�x)





var AngleLearn6_1 = function(kind){






	this.nameAngleLearn='AngleLearn6_1';
	this.progressAngleLearn='�ߋ�NSpan���B1/NSpan^2�Ŋw�K�B';











//info.text("AILearnAngle   kind="+kind.toString());

//	var accum="";
	var dsum=0;
	var dd;
	for(var ii=0;ii<this.ww.Nmid12;ii++){

		//��start
		dd=this.mid12[this.numZenkai][ii]*this.resAngle[this.numZenkai]*kind*this.alphaAngle;
		this.ww.weight22[ii]+=dd;
		dsum+=dd;
		//��end


//��		this.ww.weight22[ii]+=this.mid12[this.numZenkai][ii]*this.resAngle[this.numZenkai]*kind*this.alphaAngle;
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
			//����start
			dd=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle/Math.pow(count++,0.6);//��
			this.ww.weight12[this.numInput[mm]][ii]+=dd;
			dsum+=dd;
			//����end


//��			this.ww.weight12[this.numInput[mm]][ii]+=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle/Math.pow(count++,0.6);//��
//info.text(mm);
	};};

	this.changeWeightAngle=dsum;

};
console.log("funcAngleLearn6_2.js");
