



//�v��
//__evaluateCollision0_1__



//�O���}15���Ŏ�������

var BeamMANUAL1_0 = function(sName,sNamePlane){


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
				console.error(filename,"     ",sNamePlane,"��������܂���ł����B");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile);
			myself.plane = spriteFs[num];
		};
	},100);

	this.drawStep=100;//hoge�̃��A���ȊԊu

};
inherits(BeamMANUAL1_0,SpriteF);
BeamMANUAL1_0.prototype.play = function() {
if(this.flagStopPlay){
	info.caution(this._name+".flagStopPlay="+this.flagStopPlay);
};



	var myself = this;
	var myPlane = myself.plane;
	var target = myPlane.target;
	var center = myPlane.center;


	myself.setAlpha(0);
	myself.speed=6;
	myself.hide();
	myself.state=0;//������

console.info(myself._name,":ready!");

	gMissile=false;//���˂̍��}

	var count=0;
	var dist=0;//���@�Ƃ̋���
	var angle=0;//���@�Ƃ̊p�x

	var time=0;//��
	var speed=0;//�����A�����x

	myself.flagPlaying=true;

	var hogePlay = setInterval(function(){
		time=Date.now();

		

		if(gMissile){
			if(myself.state==1){
				speed=myself.speed*myself.drawStep/DrawStep;//��
				myself.x +=speed*Math.cos(-myself.direction*Rad);//��
				myself.y +=speed*Math.sin(-myself.direction*Rad);//��
				if(myself.hit){//��
					count=10000;
				}else{
					myself.setXY((myself.x - center.x)*Ratio,(myself.y - center.y)*Ratio);//��
					count++;
				};
				if(count>100){
					gMissile=false;
					myself.state=0;
					myself.hide();
				};
			}else{
				//������
				count=0;
				myself.state=1;
				myself.hit=false;//���G��true�ɂ��Ă����
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
		if(Date.now()-time>DrawStep){//��
			info.overtime(myself,Date.now()-time);
			myself.drawStep=Date.now()-time;//��
		}else{
			myself.drawStep=DrawStep
		};
	},DrawStep);//��
//�Z	},drawSpeed/20):
};