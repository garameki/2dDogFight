/*
	div��drag�Ɋւ��郉�C�u����
*/




dragDivJS=null;



//��ʂ���div���͂ݏo�Ȃ��悤�ɂ���
var confirmPositionForDiv=function(eleDiv,left,top){
	//left,top.....���݂̈ʒu

		//�݂͂����Ď�
	//x������
	if((left+eleDiv.offsetWidth)>window.innerWidth){
		left=window.innerWidth-eleDiv.offsetWidth;
	}else if(left<0){
		left=0;
	};
	//y������
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
