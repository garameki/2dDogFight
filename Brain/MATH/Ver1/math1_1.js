

	//  ●  MATH 1

	//.1前に逃げる

//プロシージャ
var MATH1_1 = function(myself,target){

	var myself=myself;
	var target=target;


	var test=false;


	var dist = 0;
	var angle=0;
	
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

	var flagDanger=false;
	var flagInDanger=false;

	return function(){

//console.log("math1_1.js countKeep=",countKeep);
//console.log("math1_1.js   countKeep=",countKeep);
		
		dBeta=2;
		dSpeed=2;

		dist = calcDistance(target.x,target.y,myself.x,myself.y);
		angle=getAngle(target.x,target.y,myself.x,myself.y);
		ang1 = angle - myself.direction;
		if(ang1<-180)ang1+=360;
		if(ang1>180)ang1-=360;
		ang2 = target.direction - myself.direction;
		if(ang2<-180)ang2+=360;
		if(ang2>180)ang2-=360;

		flagDanger=false;
		if(ang1 >-45 && ang1 < 45){
			if((ang2>135 || ang2<-135) && dist <400){
				flagDanger=true;
			};
		}else if(ang1>45 && ang1<135){
			if(ang2<-45 && ang2>-135 && dist<400){
				flagDanger=true;
			};
		}else if(ang1<-45 && ang1>-135){
			if(ang2>45 && ang2<135 && dist<400){
				flagDanger=true;
			};
		}else if(ang1>135 || ang1 <-135){
			if(ang2<45 && ang2>-45 && dist<400){
				flagDanger=true;
			};
		};
if(flagInDanger){
	info.text("MATH in Danger !");
};
		if(false){
			//do nothing !
		}else if(!flagDanger){
			flagInDanger=false;
		}else if(flagDanger&&!flagInDanger){
			flagInDanger=true;
			dBeta=0.02*Math.random()-0.01;
			dSpeed=1;
			return {dBeta:dBeta,dSpeed:dSpeed};
		}else if(flagInDanger){
			return {dBeta:dBeta,dSpeed:dSpeed};
		};


//console.log("ang1=",ang1," ang2=",ang2," kind=",kind);
		
		//加速・減速×右・左の4つの組み合わせから最適なものを選ぶ
		speed = myself.speed + dSpeed;
		beta = myself.direction-dBeta;
		xNext=myself.x + speed*Math.cos(-Rad*beta);
		yNext=myself.y + speed*Math.sin(-Rad*beta);
		distNext=calcDistance(xNext,yNext,target.x,target.y);
		pointAR = dist-distNext;

		speed = myself.speed + dSpeed;
		beta = myself.direction+dBeta;
		xNext=myself.x + speed*Math.cos(-Rad*beta);
		yNext=myself.y + speed*Math.sin(-Rad*beta);
		distNext=calcDistance(xNext,yNext,target.x,target.y);
		pointAL = dist-distNext;


		speed = myself.speed-dSpeed;
		beta = myself.direction+dBeta;
		xNext=myself.x + speed*Math.cos(-Rad*beta);
		yNext=myself.y + speed*Math.sin(-Rad*beta);
		distNext=calcDistance(xNext,yNext,target.x,target.y);
		pointDL = dist-distNext;

		speed = myself.speed -dSpeed;
		beta = myself.direction-dBeta;
		xNext=myself.x + speed*Math.cos(-Rad*beta);
		yNext=myself.y + speed*Math.sin(-Rad*beta);
		distNext=calcDistance(xNext,yNext,target.x,target.y);
		pointDR = dist-distNext;


//console.log(pointAR,pointAL,pointDL,pointDR);
		if(pointAR>pointAL){
			if(pointAR>pointDR){
				if(pointAR>pointDL){
					//pointAR;
					dSpeed=dSpeed;
					dBeta=-dBeta;
				
if(test)console.log("AR");
				}else{
					//pointDL;
					dSpeed=-dSpeed;
					dBeta=dBeta;
if(test)console.log("DL");
				};
			}else{
				if(pointDR>pointDL){
					//pointDR;
					dSpeed=-dSpeed;
					dBeta=-dBeta;
if(test)console.log("DR");
				}else{
					//pointDL;
					dSpeed=-dSpeed;
					dBeta=dBeta;
if(test)console.log("DL");
				};
			};
		}else{
			if(pointAL>pointDL){
				if(pointAL>pointDR){
					//pointAL;
					dSpeed=dSpeed;
					dBeta=dBeta;
if(test)console.log("AL");
				}else{
					//pointDR;
					dSpeed=-dSpeed;
					dBeta=-dBeta;
if(test)console.log("DR");
				};
			}else{
				if(pointDL>pointDR){
					//pointDL;
					dSpeed=-dSpeed;
					dBeta=dBeta;
if(test)console.log("DL");
				}else{
					//pointDR;
					dSpeed=-dSpeed;
					dBeta=-dBeta;
if(test)console.log("DR");
				};
			};
		};
		return {dBeta:dBeta,dSpeed:dSpeed};

	};//return
};
