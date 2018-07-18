	//●自機、敵機

var PlaneMANUAL1_0 = function(sName,sNameBeam,sNameTarget,sNameCenter){
	//objAI...クラスのコンストラクタ。newされたインスタンスではない。
	//引数は二つで(myself,target)

	SpriteF.call(this,sName);

	var myself=this;

	myself.restoreCostume('plane1',HomeFolda+'images\\enemy2.gif');
	myself.setCostumeByName('plane1');
	myself.restoreCostume('explosion',HomeFolda+'images\\explosion.gif');
	myself.restoreAudio('explosion',HomeFolda+'sounds\\jikiExplosion.mp3');
	myself.printStatus();
	myself.layerSet(gLayerPlane);
	myself.hide();

	var foundTarget=false;
	var foundBeam=false;
	var foundCenter=false;


	var counter1=0;
	var num1=-1;
	var hogeWhile1 =setInterval(function(){
		counter1++;
		num1 = getSpriteNumber(sNameTarget);
		if(num1==-1){
			if(counter1>20 || flagStop){
				clearInterval(hogeWhile1);
				console.error("ssPlane.js     ",sNameTarget,"が見つかりませんでした。");
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
				console.error("ssPlane.js     ",sNameBeam,"が見つかりませんでした。");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile2);
			myself.beam = spriteFs[num2];//global variable as class variable
			foundBeam=true;
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
				console.error("ssPlane.js     ",sNameCenter,"が見つかりませんでした。");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile3);
			myself.center = spriteFs[num3];//global variable as class variable
			foundCenter=true;
		};
	},100);

	var hogeReady = setInterval(function(){
		if(flagStop)clearInterval(hogeReady);
		if(foundTarget && foundBeam && foundCenter){
			clearInterval(hogeReady);
			myself.readyConstructor=true;
		};
	},100);

	//○臨時kkkkkkkkkkk
	this.ai={
		ww:function(){
			return {
				_name:'none',
			};
		},
		nameAI:'none',
		alphaAngle:'none',
		alphaSpeed:'none',
		alphaShoot:'none',
		thresholdAngle:'none',
		thresholdSpeed:'none',
		thresholdShoot:'none',
		changeWeightAngle:'none',
		changeWeightSpeed:'none',
		changeWeightShoot:'none'
	};
	//○

};
inherits(PlaneMANUAL1_0,SpriteF);
PlaneMANUAL1_0.prototype.play = function(){
if(this.flagStopPlay){
	console.error(this._name,".flagStopPlay=",this.flagStopPlay);
};

	var myself = this;
	var target=myself.target;//自機(プレイヤーという意味ではない。thisのこと)
	var yanBeam = target.beam;//敵のビーム(プレイヤーの敵のビームという意味ではない。thisの敵のビームという意味)
	var center=myself.center;

	myself.motion=true;//if died -->false
	myself.state=1;//0...準備    1...active    -1...dead

	myself.setAlpha(50);

	//初期速度
	myself.speed=2;

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
	var motion = new this.procMotion(myself);//←headerより
	var collision = new this.procCollision(myself);//←headerより

	//角度
	var dBeta=0;
	var dSpeed=0;

	var count=0;//ある回数ごとに動きを更新


	var dt;
	var time;

	//  ●  プレイ
	myself.flagPlaying=true;
	var hogePlay = setInterval(function(){
		time=Date.now();
		if(myself.state==1){

			count++;
			if(count==1){
				dBeta=gDd;
				dSpeed = gDs;
//console.log("ssPlaneMANUAL_0.js    dBeta=",dBeta," dSpeed=",dSpeed);
			}else if(count==10){
				count=0;
			};			
			motion(dBeta,dSpeed);
			collision();
		};




		if(myself.flagStopPlay || flagStop){
			myself.hide();
			clearInterval(hogePlay);
			myself.flagPlaying=false;
			myself.hide();
			console.info(myself._name," stopped to play");
		};

		dt=Date.now()-time;
		if(dt>DrawStep){
			info.overtime(myself,dt);
			myself.drawStep=dt;
			info.overtime(myself,dt);
		}else{
			myself.drawStep=DrawStep;
		};
	},DrawStep);
};




console.info("ssPlaneMANUAL1_0.js ready");