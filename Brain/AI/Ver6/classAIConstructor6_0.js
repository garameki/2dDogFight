


//���Ǔ_

// �u�N���X��.prototype.�֐��v�Ńt�@�C���ɓ����Ă������̂�
//�u�֐��v�����Ńt�@�C���ɓ���Ă����A�N���X�����ς���Ă����p�ł���悤�ɂ����B

var AIConstructor6_0 = function(plane,target,ww,nSpan){
	this.nameAIConstructor='AIConstructor6_0';
	this.progressAIConstructor='���ԑw���30�Z��';
	//Plane�̂Ȃ���new���Ďg���܂��B
	//myPlane...Plane�I�u�W�F�N�g�̃C���X�^���X
	//targetPlane...Plane�I�u�W�F�N�g�̃C���X�^���X
	//instanceWeight�̓t�@�C�������w�肷��֌W��Anew ���Ă���n����Ă��܂��I�IAI5_0���g��Plane�̂Ȃ���new���Ȃ���myPlane���킩��Ȃ�

	this.plane = plane;//����
	this.target = plane.target;//�G
	this.ww = ww;//weight//weight30��instance
	this.NSpan= nSpan;//�o���̔��f��





	this.NSpan+=1;//��this.Zenkai�p��1��������

	this.numIma=0;//storeInfo�p
	this.preNumInput=0;//AIStoreInfo5_0�Ŏg�p

	this.numZenkai=0;//����0��1�̒l���X�C�b�`���O����
	this.numKonkai=1;

	this.numInput = new Array(this.NSpan);//ON�̓��͍זE�̔ԍ�
	for(var ii=0;ii<this.NSpan;ii++)this.numInput[ii]=0;//�������K�v

	//��ꒆ�ԑw��3����i3�̏o�͂����邽�߁j
	this.mid11 = new Array(2);
	this.mid11[0] = new Array(this.ww.Nmid11);
	this.mid11[1] = new Array(this.ww.Nmid11);
	this.resSpeed=new Array(2);


	this.mid12 = new Array(2);
	this.mid12[0] = new Array(this.ww.Nmid12);
	this.mid12[1] = new Array(this.ww.Nmid12);
	this.resAngle=new Array(2);
	
	this.mid13 = new Array(2);
	this.mid13[0] = new Array(this.ww.Nmid13);
	this.mid13[1] = new Array(this.ww.Nmid13);
	this.resShoot = new Array(2);

	//�o��

	this.thresholdSpeed = 1;//this.NSpan;
	this.thresholdAngle = 1;//this.NSpan;//kkkkkkk
	this.thresholdShoot = 1;//this.NSpan;
	this.thresholdSpeed = 1;
	this.alphaSpeed=0.1;
	this.alphaAngle=0.1;//grad(f(w))�̌W��
	this.alphaShoot=0.1;



};





console.log("classAIConstructor6_0.js");