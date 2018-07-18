var PlaneMATHCollision0_1 = function(myself){//*****
	var myself=myself;
	var myBeam=myself.beam;
	var target=myself.target;
	var yanBeam=target.beam;

//console.log("myself=",myself," myBeam=",myBeam," target=",target," yanBeam=",yanBeam);





	var dis;//距離
	return function(){
		//当たり判定と評価

//		dist = calcDistance(myBeam.x,myBeam.y,target.x,target.y);//自分のビームと相手の衝突
//		if(dis<35 && myBeam.state==1 && target.state==1){
//			myself.explore();爆発は相手に任せる
//		};
		if(target.state==1 && myself.state==1){
			dist=calcDistance(target.x,target.y,myself.x,myself.y);//自分と相手の衝突
			if(dist<20){
				myself.explore();
			};
		};
		//やられたら何にもならないので、else ifにせずにつづけて評価
		if(yanBeam.state==1 && myself.state==1){
			dist = calcDistance(myself.x,myself.y,yanBeam.x,yanBeam.y);//自分と相手のビームの衝突
			if(dist<20){
				myself.explore();
				yanBeam.hit=true;//相手のobjがこのプロパティーを持っていないかもしれないBeamAI用
			};
		};
	};//return
};
