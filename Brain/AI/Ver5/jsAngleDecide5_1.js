
//���Ǔ_


		//  ��  ����(�p�x)
var AIDecideAngle5_1 = function(){

	var sum;
	var mm;
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		sum=0;
		mm=this.numIma;
//console.log("aboutAngle  mm=",mm);
		for(var kk=0;kk<this.NSpan;kk++){
			sum+=this.ww.weight12[this.numInput[mm]][ii];
			mm--;//����̕�����->��ɒu��
			if(mm<0)mm+=this.NSpan;
		};
		if(sum>this.thresholdAngle){
			this.mid12[this.numKonkai][ii]=1;
		}else{
			this.mid12[this.numKonkai][ii]=-1;
		};
//info.text("AIDecideAngle5_0   sum="+(Math.round(sum*100)/100).toString());
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
//info.text("Angle  "+(Math.round(this.resAngle[this.numKonkai]*100)/100).toString());
//info.text("Angle  "+(Math.round(sum*100)/100).toString());

	//�ˑR�ψق�������(�v���Ⴂ)
//	if(Math.random()<0.2)ang=-ang;

	return ang;

};
console.info("jsAngleDecide5_1.js   ready!");
