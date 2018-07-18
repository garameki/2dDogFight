
		//　●　学習(速度)
AILearnSpeed5_1 = function(kind){
	//1...強化 -1...弱化
	 //1のときはansを出やすいようにthis.ww.weightを変える
	//-1のときはansを出ないようにthis.ww.weightを変える

//info.text("AISpeed  "+kind.toString()+"  "+this.resSpeed[this.numZenkai].toString());

	for(var ii=0;ii<this.ww.Nmid11;ii++){
		this.ww.weight21[ii]+=this.mid11[this.numZenkai][ii]*this.resSpeed[this.numZenkai]*kind*this.alphaSpeed;
	};
	var mm;
	for(var ii=0;ii<this.ww.Nmid11;ii++){
		mm=this.numIma;
		for(var kk=0;kk<this.NSpan;kk++){
			mm--;
			if(mm<0)mm+=this.NSpan;
			this.ww.weight11[this.numInput[mm]][ii]+=this.mid11[this.numZenkai][ii]*kind*this.alphaSpeed;
			//+ this.mid11[this.numZenkai][ii];//*kind*this.alphaSpeed;
		};
	};
};
console.info("jsSpeedLearn5_1.js   ready !");