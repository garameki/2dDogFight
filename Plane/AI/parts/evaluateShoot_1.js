
//AIの判断によって発射された弾が敵に当たった場合は強化、外れた場合は弱化



//自分の判断で弾を撃てるようにすべし




var PlaneAIEvaluateShootVer1 = function(myself){

	var myself=myself;
	var target=myself.target;


	var eva=false;//evaluation

	return function(){

//		eva = 2;//強化
//		eva = -2;//弱化

		return eva;//計算初期ではfalseを返す
	};//return
};

