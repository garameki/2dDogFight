
__version__='6_0';




//���Ǔ_
//5_2 prototype.play()�ɂ�����procedure�Q���R���X�g���N�^�Ɉړ�
//5_2 ��p�̏�����status��\������@�\�̒ǉ�

//5_1
//5_1weight�𕪂�����ASpan�𕪂�����i�������ʁj
//5_0�����Ŕ��f���Ēe������
//5_0flagStop�̂Ƃ�����weight���t�@�C���Ɋi�[



__timeStamp__=new Date();

script=(function(){/*

//__timeStamp__


var PlaneConstructor__version__ = function(sName,sNameBeam,sNameTarget,sNameCenter,classAI,instanceWeight,nSpan){
var filename="classPlaneConstructor__version__.js";

	SpriteF.call(this,sName);

	this.classAI=classAI;
	this.instanceWeight=instanceWeight;//��
	this.nSpan=nSpan;//��

	this.restoreCostume('plane1',HomeFolda+'images\\enemy2.gif');
	this.setCostumeByName('plane1');
	this.restoreCostume('explosion',HomeFolda+'images\\explosion.gif');
	this.restoreAudio('explosion',HomeFolda+'sounds\\jikiExplosion.mp3');
	this.printStatus();
	this.layerSet(gLayerPlane);
	this.hide();

	var myself=this;//��

	var counter1=0;
	var num1=-1;
	var hogeWhile1 =setInterval(function(){
		counter1++;
		num1 = getSpriteNumber(sNameTarget);
		if(num1==-1){
			if(counter1>20 || flagStop){
				clearInterval(hogeWhile1);
				console.error(filename,"     ",sNameTarget,"��������܂���ł����B");
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
				console.error(filename,"     ",sNameBeam,"��������܂���ł����B");
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
				console.error(filename,"     ",sNameCenter,"��������܂���ł����B");
				stopSprites(myself);
			};
		}else{
			clearInterval(hogeWhile3);
			myself.center = spriteFs[num3];//global variable as class variable
		};
	},100);

};
inherits(PlaneConstructor__version__,SpriteF);
PlaneConstructor__version__.prototype.play = function(){
if(this.flagStopPlay){
	info.caution(this._name+".flagStopPlay="+this.flagStopPlay);
};

	var target=this.target;//���@(�v���C���[�Ƃ����Ӗ��ł͂Ȃ��Bthis�̂���)
	var yanBeam = target.beam;//�G�̃r�[��(�v���C���[�̓G�̃r�[���Ƃ����Ӗ��ł͂Ȃ��Bthis�̓G�̃r�[���Ƃ����Ӗ�)
	var center=this.center;

	var beam = this.beam;

	this.motion=true;//if died -->false
	this.state=1;//0...����    1...active    -1...dead

	this.fire=false;//false...���˂��Ȃ�  true...����

	this.setAlpha(50);


	this.speed=3;
	//���������_��
	this.direction=0;
	this.setAngle(this.direction);

	this.direction = Math.random()*360;//���܂������Ȃ�
	this.setAngle(this.direction);//���}�C�i�X����Ȃ�����
	//�ʒu�����_��
	if(center==this){
		this.x=0;
		this.y=0;
	}else{
		var radius =500;
		var theta=Math.random()*2*Math.PI;
		this.x=radius*Math.cos(-theta)+center.x;
		this.y=radius*Math.sin(-theta)+center.y;
	};

	//�R�X�`���[��
	this.resize(100);
	this.setCostumeByName('plane1');
	console.info(this._name,":ready!");


		//��������AI�֘A

	//setInterval�ɓn���v���V�[�W���Q./Plane/headVer*.js�ɂĐ���
	//procedure���g�����R�B�Ă΂��񐔂������̂ŁAvar �ɂ�郁�����m�ۂ𖈉񂵂����Ȃ��B
	var ai = new this.classAI(this,target,this.instanceWeight,this.nSpan);//���\���target������
//��	var ai = new this.classAI(this,target,this.instanceWeight,this.nSpan);
	var move = new this.procMotion(this);
	var collision = new this.procCollision(this);//�Փ˂̗ǂ�����(�r�[���܂�)���b�N�I�������Ƃ�
	var evaluateAngle = new this.procAngle(this);//�]��
	var evaluateSpeed = new this.procSpeed(this);//�]��
	var printStatus = new this.procPrintStatus(this);//��//��ԕ\��
	//�p�x
	var dBeta=0;//AI����̓���
	var evaAngle=false;//�]���֐�����̓���

	//���x
	var dSpeed=0;//AI����̓���
	var evaSpeed=false;//�]���֐��̕]��

	//��
	var evaShoot;//���˂̕]��
	////
	////



	var time;
	var dt;

	var ans;
	var kind;
	var dAngle;

	var dist;
	var minDist=100000;//�e���G�ɍł��߂Â�������

	//    �v���C&�w�K
	var myself = this;
	this.flagPlaying=true;
	var hogePlay = setInterval(function(){
		time=Date.now();

		if(myself.state==1){



			dBeta = ai.decideAngle();
			dSpeed = ai.decideSpeed();

			if(!myself.fire){
				ans = ai.decideShoot();
				if(ans==1){
					kind=1;
					myself.fire=true;
					myself.beam.setCostumeByName('mybeamDecide');
				}else if(ans==-1){
					dAngle = getAngle(target.x,target.y,myself.x,myself.y) - myself.direction;
					if(dAngle<-180)dAngle+=360;
					if(dAngle>180)dAngle-=360;
					if(Math.abs(dAngle)<15 && myself.state==1 && target.state==1){
						kind=-1;
						myself.fire=true;
						myself.beam.setCostumeByName('mybeam');
					};
				}else{
					info.caution("ans�̒l���ςł�010");
					flagStop=true;
				};

			};


			ai.clearInput();

			evaAngle = evaluateAngle();
			if(evaAngle!=false){
				ai.learnAngle(evaAngle);
			};
			evaSpeed = evaluateSpeed();
			if(evaSpeed!=false){
				ai.learnSpeed(evaSpeed);
			};


			//�r�[���̓����蔻��//�vevaluate �v���V�[�W����
			if(myself.fire){
				dist = calcDistance(beam.x,beam.y,target.x,target.y)
				if(minDist>dist)minDist=dist;

				if(beam.state==2){
//if(kind==1)info.text('hit');
					ai.learnShoot(kind);
					myself.fire=false;//���ˏ����ɂ��ǂ�
					beam.state=0;
					minDist=100000;
				}else if(beam.state==3){
//if(kind==1)info.text('out');
				//	if(minDist>200){
				//		kind=kind*8;
				//	}else if(minDist>100){
				//		kind=kind*3;		
				//	}else if(minDist>50){
				//		kind=-kind*10;
				//	}else{
				///		kind=-kind*15;
				//	};
				//	ai.learnShoot(-kind);
					myself.fire=false;//���ˏ����ɖ߂�
					beam.state=0;
					minDist=100000;
				};
			};
			move(dBeta,dSpeed);

			ai.storeInfo();
			evaSituation = collision();
			if(evaSituation!=0){
				ai.learnAngle(evaSituation);
				ai.learnSpeed(evaSituation);
			};

			printStatus();
		};

	



		if(myself.flagStopPlay || flagStop){
			myself.hide();
			clearInterval(hogePlay);
			info.text(myself._name+" stopped to play");
			myself.flagPlaying=false;
			myself.hide();
			if(flagStop)ai.ww.writeWeight();
//��			ai4_writeWeight();
		};
		dt=Date.now-time;
		if(dt>DrawStep){
			info.overtime(myself,dt);
			myself.drawStep=dt;
		}else{
			myself.drawStep=DrawStep;

		};
	},DrawStep);
};

*/});
script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__version__/g,__version__);
script=script.replace(/__timeStamp__/g,__timeStamp__);



if(true){
var fs = new ActiveXObject("Scripting.FileSystemObject");
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Plane\\AI\\parts\\txtClassPlaneConstructor"+__version__+".txt",ForWriting.toString(16),true);//true�Ńt�@�C�����Ȃ��Ƃ��V�K�쐬
file.WriteLine(script);
file.close();
};

eval(script);

console.log("classPlaneConstructor"+__version__+".js");
