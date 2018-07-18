

//改良点

//MaxSpeed,MinSpeedの導入
//DrawStepの導入
//count==?と、それにともなうifを消去


var PlaneMATH0_4 = function(sName,sNameBeam,sNameTarget,sNameCenter,procMATH){//*****
	//procMATH...生のプロシージャ関数   引数はmyself
var filename="ssPlaneMATH0_4prototype.js";//*****

	SpriteF.call(this,sName);

	var myself=this;

	myself.restoreCostume('plane1',HomeFolda+'images\\enemy2.gif');
	myself.setCostumeByName('plane1');
	myself.restoreCostume('explosion',HomeFolda+'images\\explosion.gif');
	myself.restoreAudio('explosion',HomeFolda+'sounds\\jikiExplosion.mp3');
	myself.printStatus();
	myself.layerSet(gLayerPlane);
	myself.hide();

	var counter1=0;
	var num1=-1;
	var hogeWhile1 =setInterval(function(){
		counter1++;
		num1 = getSpriteNumber(sNameTarget);
		if(num1==-1){
			if(counter1>20 || flagStop){
				clearInterval(hogeWhile1);
				console.error(filename,"    ",sNameTarget,"が見つかりませんでした。");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile1);
			myself.target = spriteFs[num1];//global variable as class variable
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
		};
	},100);

	this.procMATH = procMATH;
	this.maxSpeed=MaxSpeed;//●
	this.minSpeed=MinSpeed;//●
};
inherits(PlaneMATH0_4,SpriteF);//*****
PlaneMATH0_4.prototype.play = function(){//*****
var filename="ssPlaneMATH0_4prototype.js";//*****
if(this.flagStopPlay){
	info.caution(filename+" "+this._name+".flagStopPlay="+this.flagStopPlay);
};

	var myself = this;
	var target=myself.target;//自機(プレイヤーという意味ではない。thisのこと)
	var yanBeam = target.beam;//敵のビーム(プレイヤーの敵のビームという意味ではない。thisの敵のビームという意味)
	var center=myself.center;

	myself.motion=true;//if died -->false
	myself.state=1;//0...準備    1...active    -1...dead

	myself.setAlpha(50);


	myself.speed=myself.minSpeed+(myself.maxSpeed-myself.minSpeed)*0.5;//●
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
	info.text(myself._name+": ready!");


		//ここからAI関連

	//setIntervalに渡すプロシージャ群./Plane/headVer*.jsにて生成
	var math = new this.procMATH(myself);//←コンストラクタにて定義
	var motion = new this.procMotion(myself);//←headerで定義
	var collision = new this.procCollision(myself);//←headerで定義

	//角度
	var ans;//MATHからの答え{dBeta,dSpeed}が入っている
	var dBeta=0;
	var dSpeed=0;

	var time;//●
	var dt;//●


	//プレイ
	myself.flagPlaying=true;
	var hogePlay = setInterval(function(){
		time=Date.now();

		if(myself.state==1){

			ans= math();
			dBeta=ans.dBeta; 
			dSpeed = ans.dSpeed;


			motion(dBeta,dSpeed);
			collision();
		};


		if(myself.flagStopPlay || flagStop){
			myself.hide();
			clearInterval(hogePlay);
			myself.flagPlaying=false;
			myself.hide();
			info.text(myself._name+" stopped to play");
		};

		dt=Date.now()-time;
		if(dt>DrawStep){//●
			info.overtime(myself,Date.now()-time);
			myself.drawStep=dt;
		}else{
			myself.drawStep=DrawStep;
		};
	},DrawStep);//●
//〇		if((Date.now()-time)>drawStep*5){
//〇			info.overtime(myself,Date.now()-time);
//〇		};
//〇	},10);

};




console.info("ssPlaneMATH_1.js ready");