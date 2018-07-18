
//改良点


// weight*2がangleで使用する分です（*はワイルドカード）



		//  ●  決定(角度)
var AIDecideAngle5_0 = function(){

	var sum;
	var mm;
	for(var ii=0;ii<ww5.Nmid12;ii++){
		sum=0;
		mm=this.numIma;
//console.log("aboutAngle  mm=",mm);
		for(var kk=0;kk<this.NSpan;kk++){
			sum+=ww5.weight12[this.numInput[mm]][ii];
			mm--;//今回の分から->後に置く
			if(mm<0)mm+=this.NSpan;
		};
		if(sum>this.thresholdAngle){
			this.mid12[this.numKonkai][ii]=1;
		}else{
			this.mid12[this.numKonkai][ii]=-1;
		};
//info.text("AIDecideAngle5_0   sum="+(Math.round(sum*100)/100).toString());
	};

	var ang;//●
	sum=0;
	for(var ii=0;ii<ww5.Nmid12;ii++){
		sum+=this.mid12[this.numKonkai][ii]*ww5.weight22[ii];
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

	//突然変異を加える(思い違い)
//	if(Math.random()<0.2)ang=-ang;

	return ang;

};

		//  ●   学習(角度)
var AILearnAngle5_0 = function(kind){
	//1...強化 -1...弱化
	 //1のときはansを出やすいようにweightを変える
	//-1のときはansを出ないようにweightを変える

//info.text("AILearnAngle   kind="+kind.toString());

	var accum="";
	for(var ii=0;ii<ww5.Nmid12;ii++){
		ww5.weight22[ii]+=this.resAngle[this.numZenkai]*kind*this.alphaAngle;
		accum+=(Math.round(ww5.weight22[ii]*100)/100).toString()+"  ";
	};
//info.text("Angle   "+accum);accum="";
	var mm;
	var sum;
	for(var ii=0;ii<ww5.Nmid12;ii++){
		mm=this.numIma;
		for(var kk=0;kk<this.NSpan;kk++){
			mm--;//過去の分から->先に置いた
			if(mm<0)mm+=this.NSpan;
			ww5.weight12[this.numInput[mm]][ii]+=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle;
	};};
};
console.info("aboutAngle5_0.js   ready!");
