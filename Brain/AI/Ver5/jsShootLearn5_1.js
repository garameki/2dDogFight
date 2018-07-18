
		//  ●  学習(発射)
var AILearnShoot5_1 = function(kind){


	//1...強化 -1...弱化
	 //1のときはansを出やすいようにthis.ww.weightを変える
	//-1のときはansを出ないようにthis.ww.weightを変える

	//出力側から
	var accum="";
	for(var ii=0;ii<this.ww.Nmid13;ii++){
		this.ww.weight23[ii]+=this.resShoot[this.numZenkai]*kind*this.alphaShoot;
//if(this.plane._name=='fighter')accum+=(Math.round(this.ww.weight23[ii]*100)/100).toString()+" ";
	};
//if(this.plane._name=='fighter')info.text("AILearnShoot5_0    "+accum);
	var mm;
	for(var ii=0;ii<this.ww.Nmid13;ii++){
		mm=this.numIma;
		for(var kk=0;kk<this.NSpan;kk++){
			mm--;//過去分から
			if(mm<0)mm+=this.NSpan;
			this.ww.weight13[this.numInput[mm]][ii]+=kind*this.mid13[this.numZenkai][ii]*this.alphaShoot;
//if(this.plane._name=='fighter')accum+=Math.round(this.numInput[mm]).toString()+" ";
//if(this.plane._name=='fighter')accum+=(Math.round(this.ww.weight13[this.numInput[mm]][ii]*100)/100).toString()+" ";
		};
//accum+=Math.round(this.mid13[this.numZenkai][ii]*100).toString()+" ";
//if(this.plane._name=='fighter')info.text("AILearnShoot5_0    "+accum);accum="";
	};
//info.text("AILearnShoot5_0    "+accum);accum="";
//info.text("AILearnShoot5_0    "+this.alphaShoot.toString()+"  "+kind.toString());


};
console.info("aboutShootLearn5_0.js   ready !");