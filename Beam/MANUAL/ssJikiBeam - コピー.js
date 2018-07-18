
var jikiBeamInitialize =function(sName,sNameJiki){




	//●自機ビーム


	var cc = makeSprite('mybeam');
	cc.restoreCostume('mybeam','../images/mybeam.gif');
	cc.setCostumeByName('mybeam');
	cc.restoreAudio('shot','../sounds/jikiShot.mp3');
	cc.state=0;
	cc.hide();
	cc.printStatus();

	var num=-1;
	var hogeWhile =setInterval(function(){
		num = getSpriteNumber(sNameJiki);
		if(num!=-1 || flagStop){
			clearInterval(hogeWhile);
			cc.plane = sprites[num];
		};
	},100);

	return cc;
};

var jikiBeamPlay = function(cc){


	var aa = cc.plane;//自機

	cc.setAlpha(0);
//	cc.layerUp(3);
	cc.direction=0;
	cc.speed=10;
	cc.setAngle(cc.direction);
	cc.x=120;
	cc.y=120;
	cc.hide();

	cc.state=0;//0...未発射 1...発射中

console.info(cc._name,":ready!");

	cc.count=0;
	var hogePlay = setInterval(function(){

		if(gMissile){//eventListeners.jsより
			if(cc.state==1){
				cc.x +=cc.speed*Math.cos(-cc.direction*Rad);
				cc.y +=cc.speed*Math.sin(-cc.direction*Rad);
				cc.setX(cc.x - aa.x);
				cc.setY(cc.y - aa.y);
				cc.count++;
				if(cc.count>50){
					gMissile=false;
					cc.state=0;
					cc.hide();
				};
			}else{
				if(aa.state==1){
					console.log("fire!");
					//初期化
					cc.count=0;
					cc.state=1;
					cc.direction=aa.direction;
					cc.setAngle(cc.direction);
					cc.x=aa.x;
					cc.y=aa.y;
					cc.show();
					cc.playAudio('shot');
				};
			};
		};


		if(cc.flagStopPlay || flagStop){
			gMissile=false;
			clearInterval(hogePlay);
			console.info(cc._name," stopped to play");
		};
	},drawSpeed/20);
};