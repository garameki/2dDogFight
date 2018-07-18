var PlaneAIEvaluateCollision = function(myself){
	var myself=myself;
	var myBeam=myself.beam;
	var target=myself.target;
	var yanBeam=target.beam;

//console.log("myself=",myself," myBeam=",myBeam," target=",target," yanBeam=",yanBeam);





	var eva;//評価
	var dis;//距離
	return function(){
		//当たり判定と評価

		eva=0;
//○		dist = calcDistance(myBeam.x,myBeam.y,target.x,target.y);//自分のビームと相手の衝突
//○		if(dis<35 && myBeam.state==1 && target.state==1){
//○			myself.explore();爆発は相手に任せる
//○			eva = 5;
//○		};
		//やられたら何にもならないので、else ifにせずにつづけて評価
		dist=calcDistance(target.x,target.y,myself.x,myself.y);//自分と相手の衝突
		if(dist<20 && target.state==1 && myself.state==1){
			myself.explore();
			eva = -20;
		};
		if(yanBeam.state==1 && myself.state==1){//自分と相手のビームの衝突
			dist = calcDistance(myself.x,myself.y,yanBeam.x,yanBeam.y);
			if(dist<20){
				myself.explore();
				yanBeam.hit=true;//相手のobjがこのプロパティーを持っていないかもしれないBeamAI用
				eva = -10;//「当たるような位置関係にいた」ということ
			};
		};

		//敵のビームが複数(複数対1や複数対複数やチーム戦も考えられます)ある場合、こんな感じになるでしょう
		//for(var ii=0;ii<yan.length;ii++){
		//	if(yan[ii].beam.state==1 && myself.state==1){
		//		dist=calcDistance(myself.x,myself.y,yan[ii].beam.x,yan[ii].beam.y);
		//		if(dist<20){
		//			myself.explore();
		//			eva = -5;
		//			break;
		//		};
		//	};
		//};
		return eva;
	};//return
};
