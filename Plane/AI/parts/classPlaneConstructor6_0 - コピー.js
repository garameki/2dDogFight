
__version__='6_0';




//改良点
//5_2 prototype.play()にあったprocedure群をコンストラクタに移動
//5_2 専用の小窓にstatusを表示する機能の追加

//5_1
//5_1weightを分けられる、Spanを分けられる（副次効果）
//5_0自分で判断して弾を撃つ
//5_0flagStopのときだけweightをファイルに格納



__timeStamp__=new Date();

script=(function(){/*

//__timeStamp__


var PlaneConstructor__version__ = function(sName,sNameBeam,sNameTarget,sNameCenter,classAI,instanceWeight,nSpan){
var filename="classPlaneConstructor__version__.js";

	SpriteF.call(this,sName);

	//別プロセス用
	var myself=this;//●
	var instanceWeight=instanceWeight;//●
	var nSpan=nSpan;//●

	this.restoreCostume('plane1',HomeFolda+'images\\enemy2.gif');
	this.setCostumeByName('plane1');
	this.restoreCostume('explosion',HomeFolda+'images\\explosion.gif');
	this.restoreAudio('explosion',HomeFolda+'sounds\\jikiExplosion.mp3');
	this.printStatus();
	this.layerSet(gLayerPlane);
	this.hide();

	var foundTarget=false;
	var foundBeam=false;
	var founcCenter=false;
	this.readyConstructor=false;//データのセッティングが終わったらtrue


	var counter1=0;
	var num1=-1;
	var hogeWhile1 =setInterval(function(){
		counter1++;
		num1 = getSpriteNumber(sNameTarget);
		if(num1==-1){
			if(counter1>20 || flagStop){
				clearInterval(hogeWhile1);
				console.error(filename,"     ",sNameTarget,"が見つかりませんでした。");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile1);
			myself.target = spriteFs[num1];//global variable as class variable
			foundTarget=true;
		};
	},100);
	var counter2=0;
	var num2=-1;
	var hogeWhile2 =setInterval(function(){
		counter2++;
		num2 = getSpriteNumber(sNameBeam);
		if(num2==-1){
			if(counter2>20 || flagStop){
				clearInterval(hogeWhile2);
				console.error(filename,"     ",sNameBeam,"が見つかりませんでした。");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile2);
			myself.beam = spriteFs[num2];//global variable as class variable
			foundBeam=true;
var hogehoge = setInterval(function(){
	console.log("classPlaneConstructor6_0.js       myself.target.beam="+myself.target.beam._name);
	clearInterval(hogehoge);
},500);
		};
	},100);
	var counter3=0;
	var num3=-1;
	var hogeWhile3 =setInterval(function(){
		counter3++;
		num3 = getSpriteNumber(sNameCenter);
		if(num3==-1){
			if(counter3>20 || flagStop){
				clearInterval(hogeWhile3);
				console.error(filename,"     ",sNameCenter,"が見つかりませんでした。");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile3);
			myself.center = spriteFs[num3];//global variable as class variable
			foundCenter=true;
		};
	},100);

	var countReadyContrucuntor=0;
	var hogeReadyConstructor = setInterval(function(){
		countReadyConstructor++;
		if(countReadyConstructor>20){
			clearInterval(hogeReadyConstructor);
			console.error("classPlaneConstructor6_0.js      Over time in hogeReadyConstructor");
			flagStop=true;
		};
		if(foundTarget && foundBeam&&foundCenter){
			clearInterval(hogeReadyConstructor);
			myself.readyConstructor=true;
		};
	},100);



	var con;
	var countAccord=0;
	var hogeAccord = setInterval(function(){
		countAccord++;
		if(countAccord>20){
			clearInterval(hogeAccord);
			console.error("classPlaneCOnstructor6_0.js  Over time in hogeAccord");
			flagStop=true;
		};
		con=true;
		for(ii=0;ii<SpriteFs.length;ii++){
			con=con && SpriteFs[ii].readyConstructor;
		};
		if(con){
			clearInterval(hogeAccord);

			myself.ai = new classAI(myself,myself.target,instanceWeight,nSpan);//●
			myself.move = new myself.procMotion(myself);
			myself.collision = new myself.procCollision(myself);//衝突の良し悪し(ビーム含む)ロックオンされるとか
			myself.evaluateAngle = new myself.procAngle(myself);//評価
			myself.evaluateSpeed = new myself.procSpeed(myself);//評価
			myself.status = new myself.procPrintStatus(myself);//●//状態表示
		};
	},100);
};
inherits(PlaneConstructor__version__,SpriteF);
PlaneConstructor__version__.prototype.play = function(){
if(this.flagStopPlay){
	info.caution(this._name+".flagStopPlay="+this.flagStopPlay);
};

	var myself = this;
	var target=myself.target;//自機(プレイヤーという意味ではない。thisのこと)
	var yanBeam = target.beam;//敵のビーム(プレイヤーの敵のビームという意味ではない。thisの敵のビームという意味)
	var center=myself.center;

	var beam = myself.beam;

	myself.motion=true;//if died -->false
	myself.state=1;//0...準備    1...active    -1...dead

	myself.fire=false;//false...発射しない  true...発射

	myself.setAlpha(50);


	myself.speed=3;
	//向きランダム
	myself.direction=0;
	myself.setAngle(myself.direction);

	myself.direction = Math.random()*360;//うまくいかない
	myself.setAngle(myself.direction);//←マイナスいらないかも
	//位置ランダム
	if(center==myself){
		myself.x=0;
		myself.y=0;
	}else{
		var radius =500;
		var theta=Math.random()*2*Math.PI;
		myself.x=radius*Math.cos(-theta)+center.x;
		myself.y=radius*Math.sin(-theta)+center.y;
	};

	//コスチューム
	myself.resize(100);
	myself.setCostumeByName('plane1');
	console.info(myself._name,":ready!");


		//ここからAI関連

	//setIntervalに渡すプロシージャ群./Plane/headVer*.jsにて生成
	//procedureを使う理由。呼ばれる回数が多いので、var によるメモリ確保を毎回したくない。
//○	var ai = new this.classAI(myself,target,this.instanceWeight,this.nSpan);
//○	var motion = new this.procMotion(myself);
//○	var collision = new this.procCollision(myself);//衝突の良し悪し(ビーム含む)ロックオンされるとか
//○	var evaluateAngle = new this.procAngle(myself);//評価
//○	var evaluateSpeed = new this.procSpeed(myself);//評価
//○	var status = new this.procPrintStatus(myself);//●//状態表示
	//角度
	var dBeta=0;//AIからの答え
	var evaAngle=false;//評価関数からの答え

	//速度
	var dSpeed=0;//AIからの答え
	var evaSpeed=false;//評価関数の評価

	//状況
	var evaShoot;//発射の評価
	////
	////


	myself.flagPlaying=true;

	var count=0;//ある回数ごとに学習
	var time;
	var dt;

	var ans;
	var kind;
	var dAngle;

	var dist;
	var minDist=100000;//弾が敵に最も近づいた距離

	//    プレイ&学習
	var hogePlay = setInterval(function(){
		time=Date.now();

		if(myself.state==1){


//5_0より毎回の評価が可能になった。→countの削除

			dBeta = myself.ai.decideAngle();//●
//○			dBeta = ai.decideAngle();
			dSpeed = myself.ai.decideSpeed();//●
//○			dSpeed = ai.decideSpeed();

			if(!myself.fire){
				ans = myself.ai.decideShoot();//●
//○				ans = ai.decideShoot();
				if(ans==1){
					kind=1;
					myself.fire=true;
					myself.beam.setCostumeByName('mybeamDecide');
				}else if(ans==-1){
					dAngle = getAngle(target.x,target.y,myself.x,myself.y) - myself.direction;
					if(dAngle<-180)dAngle+=360;
					if(dAngle>180)dAngle-=360;
					if(Math.abs(dAngle)<15 && myself.state==1 && target.state==1){
						kind=-1;
						myself.fire=true;
						myself.beam.setCostumeByName('mybeam');
					};
				}else{
					info.caution("ansの値が変です010");
					flagStop=true;
				};

			};


			myself.ai.clearInput();//●
//○			ai.clearInput();

			evaAngle = myself.evaluateAngle();//●
//○			evaAngle = evaluateAngle();
			if(evaAngle!=false){
				myself.ai.learnAngle(evaAngle);//●
//○				ai.learnAngle(evaAngle);
			};
			evaSpeed = myself.evaluateSpeed();//●
//○			evaSpeed = evaluateSpeed();
			if(evaSpeed!=false){
				myself.ai.learnSpeed(evaSpeed);//●
//○				ai.learnSpeed(evaSpeed);
			};


			//ビームの当たり判定//要evaluate プロシージャ化
			if(myself.fire){
				dist = calcDistance(beam.x,beam.y,target.x,target.y)
				if(minDist>dist)minDist=dist;

				if(beam.state==2){
//if(kind==1)info.text('hit');
					myself.ai.learnShoot(kind);//●
//○					ai.learnShoot(kind);
//kkkkkk
					myself.fire=false;//発射準備にもどる
					beam.state=0;
					minDist=100000;
				}else if(beam.state==3){
//if(kind==1)info.text('out');
				//	if(minDist>200){
				//		kind=kind*8;
				//	}else if(minDist>100){
				//		kind=kind*3;		
				//	}else if(minDist>50){
				//		kind=-kind*10;
				//	}else{
				///		kind=-kind*15;
				//	};
				//	ai.learnShoot(-kind);
					myself.fire=false;//発射準備に戻る
					beam.state=0;
					minDist=100000;
				};
			};
			myself.move(dBeta,dSpeed);//●
//○			motion(dBeta,dSpeed);

			myself.ai.storeInfo();//●
//○			ai.storeInfo();
			evaSituation = myself.collision();//●
//○			evaSituation = collision();
			if(evaSituation!=0){
				myself.ai.learnAngle(evaSituation);//●
				myself.ai.learnSpeed(evaSituation);//●
//○				ai.learnAngle(evaSituation);
//○				ai.learnSpeed(evaSituation);
			};

			myself.status();//●
		};

	



		if(myself.flagStopPlay || flagStop){
			myself.hide();
			clearInterval(hogePlay);
			info.text(myself._name+" stopped to play");
			myself.flagPlaying=false;
			myself.hide();
			if(flagStop)myself.ai.ww.writeWeight();
//○			ai4_writeWeight();
		};
		dt=Date.now-time;
		if(dt>DrawStep){
			info.overtime(myself,dt);
			myself.drawStep=dt;
		}else{
			myself.drawStep=DrawStep;

		};
	},DrawStep);
};

*/});
script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__version__/g,__version__);
script=script.replace(/__timeStamp__/g,__timeStamp__);



if(true){
var fs = new ActiveXObject("Scripting.FileSystemObject");
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Plane\\AI\\parts\\txtClassPlaneConstructor"+__version__+".txt",ForWriting.toString(16),true);//trueでファイルがないとき新規作成
file.WriteLine(script);
file.close();
};

eval(script);

console.log("classPlaneConstructor"+__version__+".js");
