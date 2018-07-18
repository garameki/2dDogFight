/*
	divのdragに関するライブラリ
*/




dragDivJS=null;



//画面からdivがはみ出ないようにする
var confirmPositionForDiv=function(eleDiv,left,top){
	//left,top.....現在の位置

		//はみだし監視
	//x軸方向
	if((left+eleDiv.offsetWidth)>window.innerWidth){
		left=window.innerWidth-eleDiv.offsetWidth;
	}else if(left<0){
		left=0;
	};
	//y軸方向
	if((top+eleDiv.offsetHeight)>window.innerHeight){
		top=window.innerHeight-eleDiv.offsetHeight;
	}else if(top<0){
		top=0;
	};

	return {
		left:left,
		top:top
	};
};
