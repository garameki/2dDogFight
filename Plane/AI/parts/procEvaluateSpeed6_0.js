
//evaluateSpeed�֐��ɂ���
//�p�x�̕]���͂P�X�p���O�̊p�x�ƕ]������΂悢���A���x�̏ꍇ�̕]���̎d���͏����قȂ�B
//�p�x�̓X�p���ɑ΂��ĂP�������A���x�͂Q���֐��Ȃ̂ŁA�X�p���Őϕ������l��]������K�v������̂ŁA
//�O�̑O�̃X�p���̃f�[�^���K�v�ł���


var EvaluateSpeed6_0 = function(myself){//////////�O���炢��������Ȃ��Ă�


	var distance =new Array(2);//N=2���
	distance[0]=-1;
	distance[1]=-1;

	var differential=new Array(2);//��񑽂�������镪�A�g�������P���₵�Ă���
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
				eva = 2;//����
			}else if(differential[0]<differential[1]){
				eva = -2;//�㉻
			};
		};
		distance.shift(0);
		differential.shift(0);

		return eva;//�v�Z�����ł�false��Ԃ�
	};//return
};

