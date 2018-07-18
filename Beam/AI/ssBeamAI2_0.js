
	//AIの判断で発射


var BeamAI2_0 = function(sName,sNamePlane){

	var filename="ssBeamAI2_0.js";//●


	SpriteF.call(this,sName);

	var cc=this;

	cc.restoreCostume('mybeam','../images/mybeam.gif');
	cc.restoreCostume('mybeamDecide','../images/decideBeam.gif');
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
				console.error(filename,"     ",sNamePlane,"が見つかりませんでした。");//●
				stopSprites(cc);
			};
		}else{
			clearInterval(hogeWhile);
			cc.plane = spriteFs[num];
		};
	},100);
};
inherits(BeamAI2_0,SpriteF);
BeamAI2_0.prototype.play = function(){
	if(this.flagStopPlay){
		info.caution(this._name+".flagStopPlay="+this.flagStopPlay);//●
	};

	var cc=this;


	var aa = cc.plane;//自機
	var center=aa.center;//表示の中心
	var target=aa.target;//敵
	var dist;

	cc.setAlpha(0);
//	cc.layerUp(3);
	cc.direction=0;
	cc.speed=MaxSpeed*2;//●
	cc.setAngle(cc.direction);
	cc.x=120;
	cc.y=120;
	cc.hide();
	
	cc.state=0;//0...未発射 1...発射中 2...当たり  3...はずれ

console.info(cc._name,":ready!");

	var time;//●drawStepの計測用
	var dt;//●

	var count=0;
	cc.flagPlaying=true;
	var hogePlay = setInterval(function(){

		time=Date.now();//●

		if(aa.fire){//aa.fireはこのあと、cc.state==2 or 3となり、その後cc.state==0になると同時にaa.fire==falseとなる
			//この中でcc.state=0にしない。
			//するのはPlaneAI.play()の中

			if(cc.state==1){
				speed=cc.speed*cc.drawStep/DrawStep;//●
//info.text("flagStop="+flagStop.toString());
//info.text("speed="+speed.toString());
//info.text("cc.speed="+cc.speed.toString());
//info.text("DrawStep="+DrawStep.toString());
//info.text("cc.drawStep="+cc.drawStep.toString());
				cc.x +=speed*Math.cos(-cc.direction*Rad);//●
				cc.y +=speed*Math.sin(-cc.direction*Rad);//●
				cc.setXY((cc.x - center.x)*Ratio,(cc.y - center.y)*Ratio);//●Ratio


				//ここで当たり判定
				if(cc.hit){//●cc.hitは当たった飛行機側でtrueにされます
					cc.state=2;//planeAIで評価した後に.fireと.stateがfalseと0に戻る
					cc.hide();
				}else{
					count++;
					if(count>75){
						cc.increaseAlpha(4);
					};
					if(count>100){
						cc.state=3;//planeAIで評価した後に.fireと.stateがfalseと0に戻る
						cc.hide();
					};
				};
			}else if(cc.state==0){
				if(aa.state==1){
					//初期化
					count=0;
					cc.state=1;
					cc.hit=false;//●敵がtrueにしてくれる
					cc.setAlpha(0);
					cc.direction=aa.direction;
					cc.setAngle(cc.direction);
					cc.x=aa.x;
					cc.y=aa.y;
					cc.setXY((cc.x - center.x)*Ratio,(cc.y - center.y)*Ratio);//●Ratio
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
		dt=Date.now()-time;
		if(dt>DrawStep){//●
			info.overtime(cc,dt);
			cc.drawStep=dt;
		}else{
			cc.drawStep=DrawStep;
		};
	},DrawStep);//●
};

console.info("'BeamAI2_0'が使えます！");
