

		//  ●  決定(発射)
var ShootDecide6_0 = function(){
	this.nameShootDecide='ShootDecide6_0';
	this.progressShootDecide='+1 -1を採用。';

var accum="";
	var mm;
	var sum;
	for(var ii=0;ii<this.ww.Nmid13;ii++){
		mm=this.numIma;		
		sum=0;
		for(var kk=0;kk<this.NSpan;kk++){
//info.text("kk="+kk.toString());
			sum+=this.ww.weight13[this.numInput[mm]][ii];
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
	for(var ii=0;ii<this.ww.Nmid13;ii++){
		sum+=this.mid13[this.numKonkai][ii]*this.ww.weight23[ii];
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
console.log("funcShootDecide6_0.js");