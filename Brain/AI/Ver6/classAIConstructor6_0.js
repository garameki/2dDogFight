


//改良点

// 「クラス名.prototype.関数」でファイルに入っていたものを
//「関数」だけでファイルに入れておき、クラス名が変わっても流用できるようにした。

var AIConstructor6_0 = function(plane,target,ww,nSpan){
	this.nameAIConstructor='AIConstructor6_0';
	this.progressAIConstructor='中間層一つ30セル';
	//Planeのなかでnewして使います。
	//myPlane...Planeオブジェクトのインスタンス
	//targetPlane...Planeオブジェクトのインスタンス
	//instanceWeightはファイル名を指定する関係上、new してから渡されています！！AI5_0自身はPlaneのなかでnewしないとmyPlaneがわからない

	this.plane = plane;//自分
	this.target = plane.target;//敵
	this.ww = ww;//weight//weight30のinstance
	this.NSpan= nSpan;//経験の反映数





	this.NSpan+=1;//●this.Zenkai用に1つ多くする

	this.numIma=0;//storeInfo用
	this.preNumInput=0;//AIStoreInfo5_0で使用

	this.numZenkai=0;//この0と1の値をスイッチングする
	this.numKonkai=1;

	this.numInput = new Array(this.NSpan);//ONの入力細胞の番号
	for(var ii=0;ii<this.NSpan;ii++)this.numInput[ii]=0;//初期化必要

	//第一中間層を3個つくる（3つの出力があるため）
	this.mid11 = new Array(2);
	this.mid11[0] = new Array(this.ww.Nmid11);
	this.mid11[1] = new Array(this.ww.Nmid11);
	this.resSpeed=new Array(2);


	this.mid12 = new Array(2);
	this.mid12[0] = new Array(this.ww.Nmid12);
	this.mid12[1] = new Array(this.ww.Nmid12);
	this.resAngle=new Array(2);
	
	this.mid13 = new Array(2);
	this.mid13[0] = new Array(this.ww.Nmid13);
	this.mid13[1] = new Array(this.ww.Nmid13);
	this.resShoot = new Array(2);

	//出力

	this.thresholdSpeed = 1;//this.NSpan;
	this.thresholdAngle = 1;//this.NSpan;//kkkkkkk
	this.thresholdShoot = 1;//this.NSpan;
	this.thresholdSpeed = 1;
	this.alphaSpeed=0.1;
	this.alphaAngle=0.1;//grad(f(w))の係数
	this.alphaShoot=0.1;



};





console.log("classAIConstructor6_0.js");