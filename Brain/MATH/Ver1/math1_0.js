

	//  ●  MATH 1



//プロシージャ
var MATH1_0 = function(myself){

	var target=myself.target;
	var myself=myself;


var test=false;


	var dist = 0;

	var direction=0;
	var speed=0;
	var beta=0;
	var xNext=0;
	var yNext=0;
	var distNext=0;
	var pointAR=0;
	var pointDR=0;
	var pointAL=0;
	var pointDL=-5;

	var dBeta=2;//←絶対値
	var dSpeed=2;//←絶対値

	//標的の行き先
	var tx,tx1,tx2;
	var ty,ty1,ty2;




	var prepoint;
	var point;

	var predBeta;
	var predSpeed;

	return function(){

		tx1=target.x+target.speed*Math.cos(-target.direction*Rad);
		ty1=target.y+target.speed*Math.sin(-target.direction*Rad);
		tx2=tx1+100*Math.cos((-target.direction+180)*Rad);
		ty2=ty1+100*Math.sin((-target.direction+180)*Rad);
		dist=calcDistance(tx2,ty2,myself.x,myself.y);
		if(dist<100){
			//敵の後方100pxの点から半径100に入ったならば
			tx=tx1;
			ty=ty1;
		}else{
			tx=tx2;
			ty=ty2;
		};


		dist = calcDistance(tx,ty,myself.x,myself.y);
		dSpeed=1;
		dBeta=1;



		//加速・減速×右・左の4つの組み合わせから最適なものを選ぶ
		speed = myself.speed + dSpeed;
if(speed>MaxSpeed)speed=MaxSpeed;
if(speed<MinSpeed)speed=MinSpeed;
		beta = myself.direction-dBeta;
		xNext=myself.x + speed*Math.cos(-Rad*beta);
		yNext=myself.y + speed*Math.sin(-Rad*beta);
		distNext=calcDistance(xNext,yNext,tx,ty);
		pointAR = dist-distNext;

		speed = myself.speed + dSpeed;
if(speed>MaxSpeed)speed=MaxSpeed;
if(speed<MinSpeed)speed=MinSpeed;
		beta = myself.direction+dBeta;
		xNext=myself.x + speed*Math.cos(-Rad*beta);
		yNext=myself.y + speed*Math.sin(-Rad*beta);
		distNext=calcDistance(xNext,yNext,tx,ty);
		pointAL = dist-distNext;


		speed = myself.speed-dSpeed;
if(speed>MaxSpeed)speed=MaxSpeed;
if(speed<MinSpeed)speed=MinSpeed;
		beta = myself.direction+dBeta;
		xNext=myself.x + speed*Math.cos(-Rad*beta);
		yNext=myself.y + speed*Math.sin(-Rad*beta);
		distNext=calcDistance(xNext,yNext,tx,ty);
		pointDL = dist-distNext;

		speed = myself.speed -dSpeed;
if(speed>MaxSpeed)speed=MaxSpeed;
if(speed<MinSpeed)speed=MinSpeed;
		beta = myself.direction-dBeta;
		xNext=myself.x + speed*Math.cos(-Rad*beta);
		yNext=myself.y + speed*Math.sin(-Rad*beta);
		distNext=calcDistance(xNext,yNext,tx,ty);
		pointDR = dist-distNext;


if(test)info.text(pointAR.toString()+" "+pointAL.toString()+" "+pointDL.toString()+" "+pointDR.toString());
		if(pointAR>pointAL){
			if(pointAR>pointDR){
				if(pointAR>pointDL){
					//pointAR;
					dSpeed=dSpeed;
					dBeta=-dBeta;
point=pointAR;
if(test)info.text(pointAR);
				}else{
					//pointDL;
					dSpeed=-dSpeed;
					dBeta=dBeta;
point=pointDL;
if(test)info.text(pointDL);
				};
			}else{
				if(pointDR>pointDL){
					//pointDR;
					dSpeed=-dSpeed;
					dBeta=-dBeta;
point=pointDR;
if(test)info.text(pointDR);
				}else{
					//pointDL;
					dSpeed=-dSpeed;
					dBeta=dBeta;
point=pointDL;
if(test)info.text(pointDL);
				};
			};
		}else{
			if(pointAL>pointDL){
				if(pointAL>pointDR){
					//pointAL;
					dSpeed=dSpeed;
					dBeta=dBeta;
point=pointAL;
if(test)info.text(pointAL);
				}else{
					//pointDR;
					dSpeed=-dSpeed;
					dBeta=-dBeta;
point=pointDR;
if(test)info.text(pointDR);
				};
			}else{
				if(pointDL>pointDR){
					//pointDL;
					dSpeed=-dSpeed;
					dBeta=dBeta;
point=pointDL;
if(test)info.text(pointDL);
				}else{
					//pointDR;
					dSpeed=-dSpeed;
					dBeta=-dBeta;
point=pointDR;
if(test)info.text(pointDR);
				};
			};
		};


		if(point==0 && prepoint == 0){
			dBeta=predBeta;
			dSpeed=predSpeed;
		}else{
			predBeta=dBeta;
			predSpeed=dSpeed;
		};
		prepoint=point;
		

		return {dBeta:dBeta,dSpeed:dSpeed};

	};//return
};
