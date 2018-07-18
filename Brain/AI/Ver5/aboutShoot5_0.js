

		//  ●  決定(発射)
var AIDecideShoot5_0 = function(){

var accum="";
	var mm;
	var sum;
	for(var ii=0;ii<ww5.Nmid13;ii++){
		mm=this.numIma;		
		sum=0;
		for(var kk=0;kk<this.NSpan;kk++){
//info.text("kk="+kk.toString());
			sum+=ww5.weight13[this.numInput[mm]][ii];
			mm--;//現在分から
			if(mm<0)mm+=this.NSpan;
		};
		if(sum>this.thresholdShoot){
			this.mid13[this.numKonkai][ii]=1;
		}else{
			this.mid13[this.numKonkai][ii]=-1;
		};
		accum+=Math.round(sum).toString()+"  "
	};
//info.text("AIDecideShoot5_0    "+accum);accum="";
	var shoot;
	sum=0;
	for(var ii=0;ii<ww5.Nmid13;ii++){
		sum+=this.mid13[this.numKonkai][ii]*ww5.weight23[ii];
	};
	if(sum>this.thresholdShoot){
		this.resShoot[this.numKonkai]=1;
		shoot=1;
	}else{
		this.resShoot[this.numKonkai]=-1;
		shoot=-1;
	};
//info.text("AIDecideShoot5_0  "+(Math.round(this.thresholdShoot*100)/100).toString()+"  "+(Math.round(sum*100)/100).toString());

	//突然変異を加える(勘違いってやつを起こす)
//	if(Math.random()<0.2)shoot=-shoot;

	return shoot;

};


		//  ●  学習(発射)
var AILearnShoot5_0 = function(kind){


	//1...強化 -1...弱化
	 //1のときはansを出やすいようにww5.weightを変える
	//-1のときはansを出ないようにww5.weightを変える

	//出力側から
	var accum="";
	for(var ii=0;ii<ww5.Nmid13;ii++){
		ww5.weight23[ii]+=this.resShoot[this.numZenkai]*kind*this.alphaShoot;
//if(this.plane._name=='fighter')accum+=(Math.round(ww5.weight23[ii]*100)/100).toString()+" ";
	};
//if(this.plane._name=='fighter')info.text("AILearnShoot5_0    "+accum);
	var mm;
	for(var ii=0;ii<ww5.Nmid13;ii++){
		mm=this.numIma;
		for(var kk=0;kk<this.NSpan;kk++){
			mm--;//過去分から
			if(mm<0)mm+=this.NSpan;
			ww5.weight13[this.numInput[mm]][ii]+=kind*this.mid13[this.numZenkai][ii]*this.alphaShoot;
//if(this.plane._name=='fighter')accum+=Math.round(this.numInput[mm]).toString()+" ";
//if(this.plane._name=='fighter')accum+=(Math.round(ww5.weight13[this.numInput[mm]][ii]*100)/100).toString()+" ";
		};
//accum+=Math.round(this.mid13[this.numZenkai][ii]*100).toString()+" ";
//if(this.plane._name=='fighter')info.text("AILearnShoot5_0    "+accum);accum="";
	};
//info.text("AILearnShoot5_0    "+accum);accum="";
//info.text("AILearnShoot5_0    "+this.alphaShoot.toString()+"  "+kind.toString());


};
console.info("aboutShoot5_0.js   ready !");