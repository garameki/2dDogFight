


//改良点

// 「クラス名.prototype.関数」でファイルに入っていたものを
//「関数」だけでファイルに入れておき、クラス名が変わっても流用できるようにした。



var AI5_0 = function(myPlane,targetPlane){
	//myPlane...Planeオブジェクトのインスタンス
	//targetPlane...Planeオブジェクトのインスタンス


	this.NSpan = 15+1;//記憶スパン+1は前回の記憶に使うから

	this.numIma=0;//storeInfo用
	this.preNumInput=0;//AIStoreInfo5_0で使用

	this.numZenkai=0;//この0と1の値をスイッチングする
	this.numKonkai=1;

	this.numInput = new Array(this.NSpan);//ONの入力細胞の番号
	for(var ii=0;ii<this.NSpan;ii++)this.numInput[ii]=0;//初期化必要

	//第一中間層を3個つくる（3つの出力があるため）
	this.mid11 = new Array(2);
	this.mid11[0] = new Array(ww5.Nmid11);
	this.mid11[1] = new Array(ww5.Nmid11);
	this.resSpeed=new Array(2);


	this.mid12 = new Array(2);
	this.mid12[0] = new Array(ww5.Nmid12);
	this.mid12[1] = new Array(ww5.Nmid12);
	this.resAngle=new Array(2);
	

//●お蔵入り
//●	this.nMid13s=new Array(2);
//●	this.numMid13s=new Array(2);
//●	this.nMid13s=0;//配列の長さ。最大ww5.Nmid13
//●	this.numMid13s[0]=new Array(ww5.Nmid13);//ONの細胞の番号をしまっておく
//●	this.numMid13s[1]=new Array(ww5.Nmid13);//ONの細胞の番号をしまっておく


	this.mid13 = new Array(2);
	this.mid13[0] = new Array(ww5.Nmid13);
	this.mid13[1] = new Array(ww5.Nmid13);
	this.resShoot = new Array(2);

	//出力



	this.target=targetPlane;//インスタンス
	this.plane=myPlane;//●

	this.thresholdSpeed = this.NSpan;
	this.thresholdAngle = 1;//this.NSpan;//kkkkkkk
	this.thresholdShoot = 1;//this.NSpan;
	this.thresholdSpeed = 1;
	this.alphaSpeed=0.1;
	this.alphaAngle=0.1;//grad(f(w))の係数
	this.alphaShoot=0.1;



};
AI5_0.prototype.version = "5_0";





console.info("ai5_0.js      ready!");