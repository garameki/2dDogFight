

var Motion6_0 = function(myself){

	var myself=myself;
	var target=myself.target;
	var center=myself.center;

	var flagShow=true;

	return function(dBeta,dSpeed){
		myself.speed+=dSpeed*myself.drawStep/DrawStep;
		dBeta=dBeta*myself.drawStep/DrawStep;//��
		myself.direction+=dBeta;

		myself.rotateClockwise(dBeta);

		if(myself.direction<0)myself.direction+=360;
		if(myself.direction>=360)myself.direction-=360;

		if(myself.speed<MinSpeed)myself.speed=MinSpeed;//��
		if(myself.speed>MaxSpeed)myself.speed=MaxSpeed;//��

		speed=myself.speed*myself.drawStep/DrawStep;//��
		myself.x = myself.x+speed*Math.cos(-myself.direction*Rad);//��
		myself.y = myself.y+speed*Math.sin(-myself.direction*Rad);//��


	myself.setXY((myself.x - center.x)*Ratio,(myself.y-center.y)*Ratio);

		//�v�Z��ɕ\������
		if(flagShow){
			myself.show();	
			flagMakePlaneShow=false;
		};
	};
};
