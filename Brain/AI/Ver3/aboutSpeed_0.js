		//  ●  決定(速度)
AI3.prototype.decideSpeed = function(){
	for(var ii=0;ii<this.mm11[this.numKonkai].length;ii++){
		this.mm11[this.numKonkai][ii]=0;
		for(var kk=0;kk<this.input[this.numKonkai].length;kk++){
			this.mm11[this.numKonkai][ii]+=this.input[this.numKonkai][kk]*weight11[kk][ii];
		};
	};
	res1=0;
	for(var ii=0;ii<this.mm11[this.numKonkai].length;ii++){
		res1+=this.mm11[this.numKonkai][ii]*weight21[ii];
	};
	if(res1>0){
		res1 = 0.1;
	}else if(res1<0){
		res1 = -0.1;
	};
	//突然変異を加える
//	if(Math.random()<0.5)res1=-1*res1;
	return res1;
};

		//　●　学習(速度)
AI3.prototype.learnSpeed = function(kind){
	//1...強化 -1...弱化
	 //1のときはansを出やすいようにweightを変える
	//-1のときはansを出ないようにweightを変える

	//res1側の重みを変える(10%)
//console.log("ai.js   [dSpeed  eva]=",res1,kind);
	for(var ii=0;ii<weight11.length;ii++){
		for(var kk=0;kk<weight11[ii].length;kk++){
			weight11[ii][kk]+=res1*kind*this.input[this.numZenkai][ii];//+0.5*Math.random()-0.25;
	}};
	for(var ii=0;ii<weight21.length;ii++){
		weight21[ii]+=res1*kind*this.mm11[this.numZenkai][ii];//+0.5*Math.random()-0.25;
	};
};
