		//  ●  決定(速度)
AIDecideSpeed5_0 = function(){

	var accum="";

	var mm;
	var sum;
//info.text("AIDecideSpeed  "+(ww5.Nmid11).toString());
	for(var ii=0;ii<ww5.Nmid11;ii++){
		sum=0;
		mm=this.numIma;
		for(var kk=0;kk<this.NSpan;kk++){
			sum+=ww5.weight11[this.numInput[mm]][ii];
			mm--;
			if(mm<0)mm+=this.NSpan;
		};
		if(sum>this.thresholdSpeed){
			this.mid11[this.numKonkai][ii]=1;
		}else{
			this.mid11[this.numKonkai][ii]=-1;
		};
//		accum+=(Math.round(sum*100)/100).toString()+" ";
	};
//info.text("AIDecideSpeed5_0    "+accum);accum="";

	var speed;
	sum=0;
	for(var ii=0;ii<ww5.Nmid11;ii++){
		sum+=this.mid11[this.numKonkai][ii]*ww5.weight21[ii];
	};
	if(sum>this.thresholdSpeed){
		this.resSpeed[this.numKonkai]=1;
		speed = 0.1;
	}else{
		this.resSpeed[this.numKonkai]=-1;
		speed = -0.1;
	};
//info.text("AIDecideSpeed   "+(Math.round(sum*100)/100).toString());
	//突然変異を加える
//	if(Math.random()<0.2)speed=-speed;

	return speed;
};

		//　●　学習(速度)
AILearnSpeed5_0 = function(kind){
	//1...強化 -1...弱化
	 //1のときはansを出やすいようにww5.weightを変える
	//-1のときはansを出ないようにww5.weightを変える

//info.text("AISpeed  "+kind.toString()+"  "+this.resSpeed[this.numZenkai].toString());

	for(var ii=0;ii<ww5.Nmid11;ii++){
		ww5.weight21[ii]+=this.resSpeed[this.numZenkai]*kind*this.alphaSpeed;
	};
	var mm;
	for(var ii=0;ii<ww5.Nmid11;ii++){
		mm=this.numIma;
		for(var kk=0;kk<this.NStep;kk++){
			mm--;
			if(mm<0)mm+=this.NStep;
			ww5.weight11[this.numInput[mm]][ii]+=this.mid11[this.numZenkai][ii]*kind*this.alphaSpeed;
	}};
};
console.info("aboutSpeed5_0.js   ready !");