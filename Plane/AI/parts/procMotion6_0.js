

var Motion6_0 = function(myself){

	var myself=myself;
	var target=myself.target;
	var center=myself.center;

	var flagShow=true;

	return function(dBeta,dSpeed){
		myself.speed+=dSpeed*myself.drawStep/DrawStep;
		dBeta=dBeta*myself.drawStep/DrawStep;//Åú
		myself.direction+=dBeta;

		myself.rotateClockwise(dBeta);

		if(myself.direction<0)myself.direction+=360;
		if(myself.direction>=360)myself.direction-=360;

		if(myself.speed<MinSpeed)myself.speed=MinSpeed;//Åú
		if(myself.speed>MaxSpeed)myself.speed=MaxSpeed;//Åú

		speed=myself.speed*myself.drawStep/DrawStep;//Åú
		myself.x = myself.x+speed*Math.cos(-myself.direction*Rad);//Åú
		myself.y = myself.y+speed*Math.sin(-myself.direction*Rad);//Åú


	myself.setXY((myself.x - center.x)*Ratio,(myself.y-center.y)*Ratio);

		//åvéZå„Ç…ï\é¶Ç∑ÇÈ
		if(flagShow){
			myself.show();	
			flagMakePlaneShow=false;
		};
	};
};
