
		//　●　学習(速度)
SpeedLearn6_0 = function(kind){
	this.nameSpeedLearn='SpeedLearn6_0';
	this.progressSpeedLearn='res*midを採用。Decideが1 0なので、決定にかかわっていないweightは変化しない。';

	//1...強化 -1...弱化
	 //1のときはansを出やすいようにthis.ww.weightを変える
	//-1のときはansを出ないようにthis.ww.weightを変える

//info.text("AISpeed  "+kind.toString()+"  "+this.resSpeed[this.numZenkai].toString());

	var dsum=0;//●
	var dd;//●
	for(var ii=0;ii<this.ww.Nmid11;ii++){
		//●start
		dd=this.mid11[this.numZenkai][ii]*this.resSpeed[this.numZenkai]*kind*this.alphaSpeed;
		this.ww.weight21[ii]+=dd;
		dsum+=dd;
		//●end
//○		this.ww.weight21[ii]+=this.mid11[this.numZenkai][ii]*this.resSpeed[this.numZenkai]*kind*this.alphaSpeed;
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
//○			this.ww.weight11[this.numInput[mm]][ii]+=this.mid11[this.numZenkai][ii]*kind*this.alphaSpeed;
			//+ this.mid11[this.numZenkai][ii];//*kind*this.alphaSpeed;
		};
	};
	this.changeWeightSpeed=dsum;
};
console.log("funcSpeedLearn6_0.js");