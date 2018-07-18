

	//●自機ビーム



var BeamAI0_0 = function(sName,sNamePlane){

	SpriteF.call(this,sName);

	var cc=this;

	cc.restoreCostume('mybeam','../images/mybeam.gif');
	cc.setCostumeByName('mybeam');
	cc.restoreAudio('shot','../sounds/jikiShot.mp3');
	cc.state=0;
	cc.layerSet(gLayerBeam);
	cc.hide();
	cc.printStatus();

	var num=-1;
	var counter=0;
	var hogeWhile =setInterval(function(){
		counter++;
		num = getSpriteNumber(sNamePlane);
		if(num==-1){
			if(counter>20 || flagStop){
				clearInterval(hogeWhile);
				console.error("ssBeamAI0_0.js     ",sNamePlane,"が見つかりませんでした。");
				stopSprites(cc);
			};
		}else{
			clearInterval(hogeWhile);
			cc.plane = spriteFs[num];
		};
	},100);
};
inherits(BeamAI0_0,SpriteF);
BeamAI0_0.prototype.play = function(){
if(this.flagStopPlay){
	console.error(this._name,".flagStopPlay=",this.flagStopPlay);
};

	var cc=this;


	var aa = cc.plane;//自機
	var center=aa.center;//表示の中心
	var target=aa.target;//敵
	var dist;

	cc.setAlpha(0);
//	cc.layerUp(3);
	cc.direction=0;
	cc.speed=5;
	cc.setAngle(cc.direction);
	cc.x=120;
	cc.y=120;
	cc.hide();
	
	cc.state=0;//0...未発射 1...発射中 2...当たり  3...はずれ

console.info(cc._name,":ready!");
	
	var count=0;
	cc.flagPlaying=true;
	var hogePlay = setInterval(function(){
	
		if(aa.fire){//eventListeners.jsより
			if(cc.state==1){
				cc.x +=cc.speed*Math.cos(-cc.direction*Rad);
				cc.y +=cc.speed*Math.sin(-cc.direction*Rad);
				cc.setXY(cc.x - center.x,cc.y - center.y);


				//ここで当たり判定
				dist = calcDistance(cc.x,cc.y,target.x,target.y);
				if(dist<30){
					cc.state=2;
					cc.hide();
				};

				count++;
				if(count>75){
					cc.increaseAlpha(4);
				};
				if(count>100){
					cc.state=3;
					cc.hide();
				};
			}else if(cc.state==0){
				if(aa.state==1){
					console.log("fire!");
					//初期化
					count=0;
					cc.state=1;
					cc.setAlpha(0);
					cc.direction=aa.direction;
					cc.setAngle(cc.direction);
					cc.x=aa.x;
					cc.y=aa.y;
					cc.show();
					cc.playAudio('shot',0);
				};
			};
		};


		if(cc.flagStopPlay || flagStop){
			aa.fire=false;
			clearInterval(hogePlay);
			cc.flagPlaying=false;
			cc.hide();
			console.info(cc._name," stopped to play");
		};
	},drawSpeed/20);
};
