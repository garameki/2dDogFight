

var PlaneMANUALMotionVer0 = function(myself){

	var myself=myself;
	var target=myself.target;
	var center=myself.center;

	var flagMakePlaneShow=true;

	return function(dBeta,dSpeed){

//console.log("motion_0.js ---MANUAL   dBeta=",dBeta," dSpeed=",dSpeed);
		myself.speed+=dSpeed;
		myself.direction+=dBeta;

		myself.rotateClockwise(dBeta);

		if(myself.direction<0)myself.direction+=360;
		if(myself.direction>=360)myself.direction-=360;

		if(myself.speed<1)myself.speed=1;
		if(myself.speed>3)myself.speed=3;

		myself.x = myself.x+myself.speed*Math.cos(-myself.direction*Rad);
		myself.y = myself.y+myself.speed*Math.sin(-myself.direction*Rad);


ratio=1;
	myself.setXY((myself.x - center.x)/ratio,(myself.y-center.y)/ratio);

		//ŒvŽZŒã‚É•\Ž¦‚·‚é
		if(flagMakePlaneShow){
			myself.show();	
			flagMakePlaneShow=false;
		};
	};
};
