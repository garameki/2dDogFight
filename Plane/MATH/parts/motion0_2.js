

//���Ǔ_
//SpriteF.drawStep�̓���(���ۂ̕`��Ԋu)
//DrawStep�Ƃ����O���[�o���ϐ��̓���
//���X�s�[�h�̓������Ƃ邽�߂�drawStep��MaxSpeed��ϐ��ɂ����B
//���֐�������o�[�W�������Ƃ����B


//must use
//ssPlameMATH_4*.js

//*****__version__=0_2


var PlaneMATHMotion0_2 = function(myself){//*****

	var myself=myself;
	var target=myself.target;
	var center=myself.center;

	var flagShow=true;
	var speed=0;//�����A���ȑ��x�B�i�����ł�max=3,min=1�Ōv�Z����Ă���j

	return function(dBeta,dSpeed){//���MaxSpeed/DrawStep=3(1�b��3000px�i��);���ʎq�����l������my.MaxSp+ene.MaxSp=6�ȓ�

//console.log("motion_0.js ---MATH   dBeta=",dBeta," dSpeed=",dSpeed);
		myself.speed+=dSpeed;
		dBeta=dBeta*myself.drawStep/DrawStep;//��
		myself.direction+=dBeta;

		myself.rotateClockwise(dBeta);

		if(myself.direction<0)myself.direction+=360;
		if(myself.direction>=360)myself.direction-=360;

		if(myself.speed<MinSpeed)myself.speed=MinSpeed;//��
		if(myself.speed>MaxSpeed)myself.speed=MaxSpeed;//��
//��		if(myself.speed>10)myself.speed=10;

		speed=myself.speed*myself.drawStep/DrawStep;//��
		myself.x = myself.x+speed*Math.cos(-myself.direction*Rad);
		myself.y = myself.y+speed*Math.sin(-myself.direction*Rad);
//��		myself.x = myself.x+myself.speed*Math.cos(-myself.direction*Rad);
//��		myself.y = myself.y+myself.speed*Math.sin(-myself.direction*Rad);


//��	ratio=1;
	myself.setXY((myself.x - center.x)*Ratio,(myself.y-center.y)*Ratio);//���g�哙�𓱓�
//��	myself.setXY((myself.x - center.x)/ratio,(myself.y-center.y)/ratio);

		//�v�Z��ɕ\������
		if(flagShow){//��
			myself.show();	
			flagMakePlaneShow=false;
		};
	};
};
