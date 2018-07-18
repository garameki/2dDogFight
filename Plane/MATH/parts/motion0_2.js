

//改良点
//SpriteF.drawStepの導入(実際の描画間隔)
//DrawStepというグローバル変数の導入
//●スピードの同期をとるためにdrawStepやMaxSpeedを変数にした。
//●関数名からバージョンをとった。


//must use
//ssPlameMATH_4*.js

//*****__version__=0_2


var PlaneMATHMotion0_2 = function(myself){//*****

	var myself=myself;
	var target=myself.target;
	var center=myself.center;

	var flagShow=true;
	var speed=0;//●リアルな速度。（内部ではmax=3,min=1で計算されている）

	return function(dBeta,dSpeed){//基準がMaxSpeed/DrawStep=3(1秒で3000px進む);→量子化も考慮してmy.MaxSp+ene.MaxSp=6以内

//console.log("motion_0.js ---MATH   dBeta=",dBeta," dSpeed=",dSpeed);
		myself.speed+=dSpeed;
		dBeta=dBeta*myself.drawStep/DrawStep;//●
		myself.direction+=dBeta;

		myself.rotateClockwise(dBeta);

		if(myself.direction<0)myself.direction+=360;
		if(myself.direction>=360)myself.direction-=360;

		if(myself.speed<MinSpeed)myself.speed=MinSpeed;//●
		if(myself.speed>MaxSpeed)myself.speed=MaxSpeed;//●
//○		if(myself.speed>10)myself.speed=10;

		speed=myself.speed*myself.drawStep/DrawStep;//●
		myself.x = myself.x+speed*Math.cos(-myself.direction*Rad);
		myself.y = myself.y+speed*Math.sin(-myself.direction*Rad);
//○		myself.x = myself.x+myself.speed*Math.cos(-myself.direction*Rad);
//○		myself.y = myself.y+myself.speed*Math.sin(-myself.direction*Rad);


//○	ratio=1;
	myself.setXY((myself.x - center.x)*Ratio,(myself.y-center.y)*Ratio);//●拡大等を導入
//○	myself.setXY((myself.x - center.x)/ratio,(myself.y-center.y)/ratio);

		//計算後に表示する
		if(flagShow){//●
			myself.show();	
			flagMakePlaneShow=false;
		};
	};
};
