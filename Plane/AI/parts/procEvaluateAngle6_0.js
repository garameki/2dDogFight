//プロシージャにするpre*を使うから
var EvaluateAngle6_0 = function(myself){


	var myself=myself;
	var target=myself.target;



	var ang;//今回の角度
	var preang=false;
	var eva;

	var xPurpose;
	var yPurpose;
	return function(){


		//ターゲットの少し後ろ50pxのところが目標
//		xPurpose = target.x + 50*Math.cos((-target.direction+180)*Rad);
//		yPurpose = target.y + 50*Math.sin((-target.direction+180)*Rad);


		xPurpose=target.x;
		yPurpose=target.y;		

		ang = getAngle(xPurpose,yPurpose,myself.x,myself.y)-myself.direction;

		//●start
		while(ang>180){
			ang=ang-360;
		};
		while(ang<-180){
			ang=ang+360;
		};
		//●end
		if(preang==false){
			eva=1;

		}else{
			if(Math.abs(ang)<Math.abs(preang)){
				eva=2;//強化
			}else if(Math.abs(ang)>Math.abs(preang)){
				eva=-2;//弱化
			};
		};
		preang=ang;

		return eva;
	};//return
};

