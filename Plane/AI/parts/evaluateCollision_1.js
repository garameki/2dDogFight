var PlaneAIEvaluateCollision = function(myself){
	var myself=myself;
	var myBeam=myself.beam;
	var target=myself.target;
	var yanBeam=target.beam;

//console.log("myself=",myself," myBeam=",myBeam," target=",target," yanBeam=",yanBeam);





	var eva;//�]��
	var dis;//����
	return function(){
		//�����蔻��ƕ]��

		eva=0;
//��		dist = calcDistance(myBeam.x,myBeam.y,target.x,target.y);//�����̃r�[���Ƒ���̏Փ�
//��		if(dis<35 && myBeam.state==1 && target.state==1){
//��			myself.explore();�����͑���ɔC����
//��			eva = 5;
//��		};
		//���ꂽ�牽�ɂ��Ȃ�Ȃ��̂ŁAelse if�ɂ����ɂÂ��ĕ]��
		dist=calcDistance(target.x,target.y,myself.x,myself.y);//�����Ƒ���̏Փ�
		if(dist<20 && target.state==1 && myself.state==1){
			myself.explore();
			eva = -20;
		};
		if(yanBeam.state==1 && myself.state==1){//�����Ƒ���̃r�[���̏Փ�
			dist = calcDistance(myself.x,myself.y,yanBeam.x,yanBeam.y);
			if(dist<20){
				myself.explore();
				yanBeam.hit=true;//�����obj�����̃v���p�e�B�[�������Ă��Ȃ���������Ȃ�BeamAI�p
				eva = -10;//�u������悤�Ȉʒu�֌W�ɂ����v�Ƃ�������
			};
		};

		//�G�̃r�[��������(������1�╡���Ε�����`�[������l�����܂�)����ꍇ�A����Ȋ����ɂȂ�ł��傤
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
