

// weight*2がangleで使用する分です（*はワイルドカード）

		//  ●   学習(角度)
var AILearnAngle5_1_1 = function(kind){
	//1...強化 -1...弱化
	 //1のときはansを出やすいようにweightを変える
	//-1のときはansを出ないようにweightを変える

//info.text("AILearnAngle   kind="+kind.toString());

	var accum="";
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		this.ww.weight22[ii]+=this.mid12[this.numZenkai][ii]*this.resAngle[this.numZenkai]*kind*this.alphaAngle;
//		accum+=(Math.round(this.ww.weight22[ii]*100)/100).toString()+"  ";
	};
//info.text(this.ww.filename);
//info.text("Angle   "+accum);accum="";
	var mm;
	var sum;
	for(var ii=0;ii<this.ww.Nmid12;ii++){
		mm=this.numIma;
		var count=1;//●
		for(var kk=0;kk<this.NSpan;kk++){
			mm--;//過去の分から->先に置いた
			if(mm<0)mm+=this.NSpan;
			this.ww.weight12[this.numInput[mm]][ii]+=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle/Math.pow(count++,0.6);//●
//info.text(mm);
	};};
};
console.info("aboutAngleLearn5_0.js   ready!");
