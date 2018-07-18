



//要件
//__evaluateCollision0_1__



//前方±15°で自動発射

var BeamAuto2_0 = function(sName,sNamePlane){
var filename="ssBeamAuto_2.js";//●


	SpriteF.call(this,sName);

	var myself = this;
	myself.restoreCostume('beam1','../images/hisbeam.gif');
	myself.setCostumeByName('beam1');
	myself.restoreAudio('shot','../sounds/tekkiShot.mp3');
	myself.show();
	myself.hide();
	myself.state=0;//0...未発射 1...発射中
	myself.layerSet(gLayerBeam);
	myself.printStatus();

	//●ユーザー
	var counter=0;
	var num=-1;
	var hogeWhile =setInterval(function(){
		counter++;
		num = getSpriteNumber(sNamePlane);
		if(num==-1){
			if(counter>20 || flagStop){
				clearInterval(hogeWhile);
				console.error(filename,"     ",sNamePlane,"が見つかりませんでした。");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile);
			myself.plane = spriteFs[num];
		};
	},100);

	this.drawStep=100;//hogeのリアルな間隔

};
inherits(BeamAuto2_0,SpriteF);
BeamAuto2_0.prototype.play = function() {
if(this.flagStopPlay){
	info.caution(this._name+".flagStopPlay="+this.flagStopPlay);//●
};
var filename="ssBeamAuto_2.js";//●



	var myself = this;
	var myPlane = myself.plane;
	var target = myPlane.target;
	var center = myPlane.center;


	myself.setAlpha(0);
//	myself.layerUp(2);
	myself.speed=6;
	myself.hide();
	myself.state=0;//未発射

console.info(myself._name,":ready!");

	var flagFire=false;//発射の合図

	var count=0;
	var dist=0;//自機との距離
	var angle=0;//自機との角度

	var time=0;//●
	var speed=0;//●リアル速度

	myself.flagPlaying=true;
	//敵機ビーム
	var hogePlay = setInterval(function(){
		time=Date.now();

		

		var dAngle = getAngle(target.x,target.y,myPlane.x,myPlane.y) - myPlane.direction;
		if(dAngle<-180)dAngle+=360;
		if(dAngle>180)dAngle-=360;
//console.log("angle=",dAngle);

		if(Math.abs(dAngle)<15 && myPlane.state==1 && target.state==1)flagFire=true;
		if(flagFire){
			if(myself.state==1){
				speed=myself.speed*myself.drawStep/DrawStep;//●
//info.text("speed="+speed.toString());
//info.text("DrawStep="+DrawStep.toString());
//info.text("myself.drawStep="+myself.drawStep.toString());
				myself.x +=speed*Math.cos(-myself.direction*Rad);//●
				myself.y +=speed*Math.sin(-myself.direction*Rad);//●
				if(myself.hit){//●
					count=10000;
				}else{
					myself.setXY((myself.x - center.x)*Ratio,(myself.y - center.y)*Ratio);//●
					count++;
				};
				if(count>100){
					flagFire=false;
					myself.state=0;
					myself.hide();
				};
			}else{
				//初期化
				count=0;
				myself.state=1;
				myself.hit=false;//●敵がtrueにしてくれる
				myself.direction=myPlane.direction;
				myself.setAngle(myself.direction);
				myself.x=myPlane.x;
				myself.y=myPlane.y;
				myself.show();
				//myself.stopAudio('shot');
				myself.playAudio('shot',0);
				
			};
		};
		if(myself.flagStopPlay || flagStop){
			myself.hide();
			clearInterval(hogePlay);
			myself.flagPlaying=false;
			myself.hide();
			console.info(myself._name," stopped to play");
		};
		if(Date.now()-time>DrawStep){//●
			info.overtime(myself,Date.now()-time);
			myself.drawStep=Date.now()-time;//●
		}else{
			myself.drawStep=DrawStep
		};
	},DrawStep);//●
//〇	},drawSpeed/20):
};