
//evaluateSpeed関数について
//角度の評価は１スパン前の角度と評価すればよいが、速度の場合の評価の仕方は少し異なる。
//角度はスパンに対して１次だが、速度は２次関数なので、スパンで積分した値を評価する必要があるので、
//前の前のスパンのデータが必要である


var EvaluateSpeed6_0 = function(myself){//////////三つぐらい動作をしなくては


	var distance =new Array(2);//N=2より
	distance[0]=-1;
	distance[1]=-1;

	var differential=new Array(2);//一回多く消される分、使う数より１増やしておく
	differential[0]=false;
	differential[1]=false;


	var myself=myself;
	var target=myself.target;


	var eva=false;//evaluation

	var xPurpose;
	var yPurpose;

	return function(){

		xPurpose = target.x + 50*Math.cos((-target.direction+180)*Rad);
		yPurpose = target.y + 50*Math.sin((-target.direction+180)*Rad);

		distance.push(calcDistance(myself.x,myself.y,xPurpose,yPurpose));

		if(distance[1]!=-1){
			differential.push(distance[2]-distance[1]);

		};
		if(differential[0]!=false){
			if(differential[0]>differential[1]){
				eva = 2;//強化
			}else if(differential[0]<differential[1]){
				eva = -2;//弱化
			};
		};
		distance.shift(0);
		differential.shift(0);

		return eva;//計算初期ではfalseを返す
	};//return
};

