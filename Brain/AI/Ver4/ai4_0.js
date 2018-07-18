


//改良点

// 「クラス名.prototype.関数」でファイルに入っていたものを
//「関数」だけでファイルに入れておき、クラス名が変わっても流用できるようにした。



var AI4_0 = function(myPlane,targetPlane){
	//myPlane...Planeオブジェクトのインスタンス
	//targetPlane...Planeオブジェクトのインスタンス

	this.numZenkai=0;//この0と1の値をスイッチングする
	this.numKonkai=1;

	//入力層前回のものと今回のもの。両方前回になり得て、両方今回になり得る。!!
	this.input = new Array(2);
	this.input[0] = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
	this.input[1] = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
	for(var ii=0;ii<this.input[0].length;ii++)this.input[0][ii]=0;
	for(var ii=0;ii<this.input[1].length;ii++)this.input[1][ii]=0;


	//第一中間層を3個つくる（3つの出力があるため）
	this.mm11 = new Array(2);
	this.mm11[0] = new Array(Nm11);
	this.mm11[1] = new Array(Nm11);
	for(var ii=0;ii<this.mm11[0].length;ii++)this.mm11[0][ii]=0;
	for(var ii=0;ii<this.mm11[1].length;ii++)this.mm11[1][ii]=0;


	this.mm12 = new Array(2);
	this.mm12[0] = new Array(Nm12);
	this.mm12[1] = new Array(Nm12);
	for(var ii=0;ii<this.mm12[0].length;ii++)this.mm12[0][ii]=0;
	for(var ii=0;ii<this.mm12[1].length;ii++)this.mm12[1][ii]=0;

	this.mm13 = new Array(2);
	this.mm13[0] = new Array(Nm13);
	this.mm13[1] = new Array(Nm13);
	for(var ii=0;ii<this.mm13[0].length;ii++)this.mm13[0][ii]=0;
	for(var ii=0;ii<this.mm13[1].length;ii++)this.mm13[1][ii]=0;


	//出力

	this.res1 = 0;//角度
	this.res2 = 0;//速度
	this.resShoot = 0;//発射

	this.target=targetPlane;//インスタンス
	this.myself=myPlane;


};
AI4_0.prototype.version = "4.0";





console.info("ai4_0.js      ready!");