//�v���V�[�W���ɂ���pre*���g������
var EvaluateAngle6_0 = function(myself){


	var myself=myself;
	var target=myself.target;



	var ang;//����̊p�x
	var preang=false;
	var eva;

	var xPurpose;
	var yPurpose;
	return function(){


		//�^�[�Q�b�g�̏������50px�̂Ƃ��낪�ڕW
//		xPurpose = target.x + 50*Math.cos((-target.direction+180)*Rad);
//		yPurpose = target.y + 50*Math.sin((-target.direction+180)*Rad);


		xPurpose=target.x;
		yPurpose=target.y;		

		ang = getAngle(xPurpose,yPurpose,myself.x,myself.y)-myself.direction;

		//��start
		while(ang>180){
			ang=ang-360;
		};
		while(ang<-180){
			ang=ang+360;
		};
		//��end
		if(preang==false){
			eva=1;

		}else{
			if(Math.abs(ang)<Math.abs(preang)){
				eva=2;//����
			}else if(Math.abs(ang)>Math.abs(preang)){
				eva=-2;//�㉻
			};
		};
		preang=ang;

		return eva;
	};//return
};

