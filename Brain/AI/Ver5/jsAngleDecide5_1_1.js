
//���Ǔ_

//�Â��o���ق�p�l��1/x^2�ɂ����B


//�}�C�i�[�}�C�i�[�`�F���W�͌����\�B�l��ς��������A�܂��̓A���S���Y����ς�������

		//  ��  ����(�p�x)
var AIDecideAngle5_1_1 = function(){

	var sum;
	var mm;
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		sum=0;
		mm=this.numIma;
		var count=1;//��
		for(var kk=0;kk<this.NSpan;kk++){
			sum+=this.ww.weight12[this.numInput[mm]][ii]/Math.pow(count++,0.6);//��
			mm--;//����̕�����->��ɒu��
			if(mm<0)mm+=this.NSpan;
		};
		if(sum>this.thresholdAngle){
			this.mid12[this.numKonkai][ii]=1;
		}else{
			this.mid12[this.numKonkai][ii]=0;
		};
	};

	var ang;//��
	sum=0;
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		sum+=this.mid12[this.numKonkai][ii]*this.ww.weight22[ii];
	};
	if(sum>this.thresholdAngle){
		this.resAngle[this.numKonkai]=1;
		ang=0.5;
	}else{
		this.resAngle[this.numKonkai]=-1;
		ang=-0.5;
	};
	//�ˑR�ψق�������(�v���Ⴂ)
//	if(Math.random()<0.2)ang=-ang;

	return ang;

};
console.info("jsAngleDecide5_1.js   ready!");
