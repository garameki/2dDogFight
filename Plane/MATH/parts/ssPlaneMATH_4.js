

//���Ǔ_

//MaxSpeed,MinSpeed�̓���
//DrawStep�̓���
//count==?�ƁA����ɂƂ��Ȃ�if������


var PlaneMATH0_4 = function(sName,sNameBeam,sNameTarget,sNameCenter,procMATH){//*****
	//procMATH...���̃v���V�[�W���֐�   ������myself
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
				console.error(filename,"    ",sNameTarget,"��������܂���ł����B");
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
				console.error("ssPlane.js     ",sNameBeam,"��������܂���ł����B");
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
				console.error("ssPlane.js     ",sNameCenter,"��������܂���ł����B");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile3);
			myself.center = spriteFs[num3];//global variable as class variable
		};
	},100);

	this.procMATH = procMATH;
	this.maxSpeed=MaxSpeed;//��
	this.minSpeed=MinSpeed;//��
};
inherits(PlaneMATH0_4,SpriteF);//*****
PlaneMATH0_4.prototype.play = function(){//*****
var filename="ssPlaneMATH0_4prototype.js";//*****
if(this.flagStopPlay){
	info.caution(filename+" "+this._name+".flagStopPlay="+this.flagStopPlay);
};

	var myself = this;
	var target=myself.target;//���@(�v���C���[�Ƃ����Ӗ��ł͂Ȃ��Bthis�̂���)
	var yanBeam = target.beam;//�G�̃r�[��(�v���C���[�̓G�̃r�[���Ƃ����Ӗ��ł͂Ȃ��Bthis�̓G�̃r�[���Ƃ����Ӗ�)
	var center=myself.center;

	myself.motion=true;//if died -->false
	myself.state=1;//0...����    1...active    -1...dead

	myself.setAlpha(50);


	myself.speed=myself.minSpeed+(myself.maxSpeed-myself.minSpeed)*0.5;//��
	//���������_��
	myself.direction=0;
	myself.setAngle(myself.direction);

	myself.direction = Math.random()*360;//���܂������Ȃ�
	myself.setAngle(myself.direction);//���}�C�i�X����Ȃ�����
	//�ʒu�����_��
	if(center==myself){
		myself.x=0;
		myself.y=0;
	}else{
		var radius =500;
		var theta=Math.random()*2*Math.PI;
		myself.x=radius*Math.cos(-theta)+center.x;
		myself.y=radius*Math.sin(-theta)+center.y;
	};

	//�R�X�`���[��
	myself.resize(100);
	myself.setCostumeByName('plane1');
	info.text(myself._name+": ready!");


		//��������AI�֘A

	//setInterval�ɓn���v���V�[�W���Q./Plane/headVer*.js�ɂĐ���
	var math = new this.procMATH(myself);//���R���X�g���N�^�ɂĒ�`
	var motion = new this.procMotion(myself);//��header�Œ�`
	var collision = new this.procCollision(myself);//��header�Œ�`

	//�p�x
	var ans;//MATH����̓���{dBeta,dSpeed}�������Ă���
	var dBeta=0;
	var dSpeed=0;

	var time;//��
	var dt;//��


	//�v���C
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
		if(dt>DrawStep){//��
			info.overtime(myself,Date.now()-time);
			myself.drawStep=dt;
		}else{
			myself.drawStep=DrawStep;
		};
	},DrawStep);//��
//�Z		if((Date.now()-time)>drawStep*5){
//�Z			info.overtime(myself,Date.now()-time);
//�Z		};
//�Z	},10);

};




console.info("ssPlaneMATH_1.js ready");