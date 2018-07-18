
	//AI�̔��f�Ŕ���


var BeamAI2_0 = function(sName,sNamePlane){

	var filename="ssBeamAI2_0.js";//��


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
				console.error(filename,"     ",sNamePlane,"��������܂���ł����B");//��
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
		info.caution(this._name+".flagStopPlay="+this.flagStopPlay);//��
	};

	var cc=this;


	var aa = cc.plane;//���@
	var center=aa.center;//�\���̒��S
	var target=aa.target;//�G
	var dist;

	cc.setAlpha(0);
//	cc.layerUp(3);
	cc.direction=0;
	cc.speed=MaxSpeed*2;//��
	cc.setAngle(cc.direction);
	cc.x=120;
	cc.y=120;
	cc.hide();
	
	cc.state=0;//0...������ 1...���˒� 2...������  3...�͂���

console.info(cc._name,":ready!");

	var time;//��drawStep�̌v���p
	var dt;//��

	var count=0;
	cc.flagPlaying=true;
	var hogePlay = setInterval(function(){

		time=Date.now();//��

		if(aa.fire){//aa.fire�͂��̂��ƁAcc.state==2 or 3�ƂȂ�A���̌�cc.state==0�ɂȂ�Ɠ�����aa.fire==false�ƂȂ�
			//���̒���cc.state=0�ɂ��Ȃ��B
			//����̂�PlaneAI.play()�̒�

			if(cc.state==1){
				speed=cc.speed*cc.drawStep/DrawStep;//��
//info.text("flagStop="+flagStop.toString());
//info.text("speed="+speed.toString());
//info.text("cc.speed="+cc.speed.toString());
//info.text("DrawStep="+DrawStep.toString());
//info.text("cc.drawStep="+cc.drawStep.toString());
				cc.x +=speed*Math.cos(-cc.direction*Rad);//��
				cc.y +=speed*Math.sin(-cc.direction*Rad);//��
				cc.setXY((cc.x - center.x)*Ratio,(cc.y - center.y)*Ratio);//��Ratio


				//�����œ����蔻��
				if(cc.hit){//��cc.hit�͓���������s�@����true�ɂ���܂�
					cc.state=2;//planeAI�ŕ]���������.fire��.state��false��0�ɖ߂�
					cc.hide();
				}else{
					count++;
					if(count>75){
						cc.increaseAlpha(4);
					};
					if(count>100){
						cc.state=3;//planeAI�ŕ]���������.fire��.state��false��0�ɖ߂�
						cc.hide();
					};
				};
			}else if(cc.state==0){
				if(aa.state==1){
					//������
					count=0;
					cc.state=1;
					cc.hit=false;//���G��true�ɂ��Ă����
					cc.setAlpha(0);
					cc.direction=aa.direction;
					cc.setAngle(cc.direction);
					cc.x=aa.x;
					cc.y=aa.y;
					cc.setXY((cc.x - center.x)*Ratio,(cc.y - center.y)*Ratio);//��Ratio
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
		if(dt>DrawStep){//��
			info.overtime(cc,dt);
			cc.drawStep=dt;
		}else{
			cc.drawStep=DrawStep;
		};
	},DrawStep);//��
};

console.info("'BeamAI2_0'���g���܂��I");
