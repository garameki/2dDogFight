var PlaneMANUALCollisionVer0 = function(myself){
	var myself=myself;
	var myBeam=myself.beam;
	var target=myself.target;
	var yanBeam=target.beam;

//console.log("myself=",myself," myBeam=",myBeam," target=",target," yanBeam=",yanBeam);





	var dis;//����
	return function(){
		//�����蔻��ƕ]��

		dist = calcDistance(myBeam.x,myBeam.y,target.x,target.y);//�����̃r�[���Ƒ���̏Փ�
		if(dis<35 && myBeam.state==1 && target.state==1){
//			myself.explore();�����͑���ɔC����
		};
		dist=calcDistance(target.x,target.y,myself.x,myself.y);//�����Ƒ���̏Փ�
		if(dist<35 && target.state==1 && myself.state==1){
			myself.explore();
		};
		//���ꂽ�牽�ɂ��Ȃ�Ȃ��̂ŁAelse if�ɂ����ɂÂ��ĕ]��
		dist = calcDistance(myself.x,myself.y,yanBeam.x,yanBeam.y);//�����Ƒ���̃r�[���̏Փ�
		if(dist<20 && yanBeam.state==1 && myself.state==1){
			myself.explore();
		};
	};//return
};
