

	//���G�@�r�[��


var BeamAutoVer0 = function(sName,sNamePlane){
	SpriteF.call(this,sName);

	var myself = this;
	myself.restoreCostume('beam1','../images/hisbeam.gif');
	myself.setCostumeByName('beam1');
	myself.restoreAudio('shot','../sounds/tekkiShot.mp3');
	myself.show();
	myself.hide();
	myself.state=0;//0...������ 1...���˒�
	myself.layerSet(gLayerBeam);
	myself.printStatus();

	//�����[�U�[
	var counter=0;
	var num=-1;
	var hogeWhile =setInterval(function(){
		counter++;
		num = getSpriteNumber(sNamePlane);
		if(num==-1){
			if(counter>20 || flagStop){
				clearInterval(hogeWhile);
				console.error("ssBeam.js     ",sNamePlane,"��������܂���ł����B");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile);
			myself.plane = spriteFs[num];
		};
	},100);
};
inherits(BeamAutoVer0,SpriteF);
//BeamAutoVer0.prototype.stopPlay = function(){
//	//do nothing ! because of test
//};
BeamAutoVer0.prototype.play = function() {
if(this.flagStopPlay){
	console.error(this._name,".flagStopPlay=",this.flagStopPlay);
};

	var myself = this;
	var myPlane = myself.plane;
	var target = myPlane.target;
	var center = myPlane.center;


	myself.setAlpha(0);
//	myself.layerUp(2);
	myself.speed=5;
	myself.hide();
	myself.state=0;//������

console.info(myself._name,":ready!");

	var flagFire=false;//���˂̍��}

	var count=0;
	var dist=0;//���@�Ƃ̋���
	var angle=0;//���@�Ƃ̊p�x

	myself.flagPlaying=true;
	//�G�@�r�[��
	var hogePlay = setInterval(function(){

		var dAngle = getAngle(target.x,target.y,myPlane.x,myPlane.y) - myPlane.direction;
		if(dAngle<-180)dAngle+=360;
		if(dAngle>180)dAngle-=360;
//console.log("angle=",dAngle);

		if(Math.abs(dAngle)<15 && myPlane.state==1 && target.state==1)flagFire=true;
		if(flagFire){
			if(myself.state==1){
				myself.x +=myself.speed*Math.cos(-myself.direction*Rad);
				myself.y +=myself.speed*Math.sin(-myself.direction*Rad);
				dist = calcDistance(myself.x,myself.y,target.x,target.y);
				if(dist<20 && target.state==1){
					target.explore();
					myself.hide();
					count=10000;
				}else{
					myself.setX(myself.x - center.x);
					myself.setY(myself.y - center.y);
					count++;
				};
				if(count>100){
					flagFire=false;
					myself.state=0;
					myself.hide();
				};
			}else{
				//������
				count=0;
				myself.state=1;
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
	},drawStep);

};