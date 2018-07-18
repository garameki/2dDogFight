		//  œ  Œˆ’è(‘¬“x)
AIDecideSpeed5_1 = function(){

	var accum="";

	var mm;
	var sum;
//info.text("AIDecideSpeed  "+(this.ww.Nmid11).toString());
	for(var ii=0;ii<this.ww.Nmid11;ii++){
		sum=0;
		mm=this.numIma;
		for(var kk=0;kk<this.NSpan;kk++){
			sum+=this.ww.weight11[this.numInput[mm]][ii];
			mm--;
			if(mm<0)mm+=this.NSpan;
		};
//info.text("sum="+sum.toString());
		if(sum>this.thresholdSpeed){
			this.mid11[this.numKonkai][ii]=1;
		}else{
			this.mid11[this.numKonkai][ii]=0;
		};
//info.text(this.mid11[this.numKonkai].toString());
//		accum+=(Math.round(sum*100)/100).toString()+" ";
	};
//info.text("AIDecideSpeed5_0    "+accum);accum="";

	var speed;
	sum=0;
	for(var ii=0;ii<this.ww.Nmid11;ii++){
		sum+=this.mid11[this.numKonkai][ii]*this.ww.weight21[ii];
	};
	if(sum>this.thresholdSpeed){
		this.resSpeed[this.numKonkai]=1;
		speed = 0.1;
	}else{
		this.resSpeed[this.numKonkai]=-1;
		speed = -0.1;
	};
//info.text("AIDecideSpeed   "+(Math.round(sum*100)/100).toString());
	//“Ë‘R•ÏˆÙ‚ğ‰Á‚¦‚é
//	if(Math.random()<0.2)speed=-speed;

	return speed;
};

console.info("jsSpeedDecide5_1.js   ready !");