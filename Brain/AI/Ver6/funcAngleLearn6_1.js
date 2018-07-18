

// weight*2がangleで使用する分です（*はワイルドカード）

		//  ●   学習(角度)





var AngleLearn6_1 = function(kind){






	this.nameAngleLearn='AngleLearn6_1';
	this.progressAngleLearn='過去NSpan分。1/NSpan^2で学習。';











//info.text("AILearnAngle   kind="+kind.toString());

//	var accum="";
	var dsum=0;
	var dd;
	for(var ii=0;ii<this.ww.Nmid12;ii++){

		//●start
		dd=this.mid12[this.numZenkai][ii]*this.resAngle[this.numZenkai]*kind*this.alphaAngle;
		this.ww.weight22[ii]+=dd;
		dsum+=dd;
		//●end


//○		this.ww.weight22[ii]+=this.mid12[this.numZenkai][ii]*this.resAngle[this.numZenkai]*kind*this.alphaAngle;
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
			//●●start
			dd=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle/Math.pow(count++,0.6);//●
			this.ww.weight12[this.numInput[mm]][ii]+=dd;
			dsum+=dd;
			//●●end


//○			this.ww.weight12[this.numInput[mm]][ii]+=this.mid12[this.numZenkai][ii]*kind*this.alphaAngle/Math.pow(count++,0.6);//●
//info.text(mm);
	};};

	this.changeWeightAngle=dsum;

};
console.log("funcAngleLearn6_2.js");
