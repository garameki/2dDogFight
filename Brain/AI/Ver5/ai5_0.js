


//���Ǔ_

// �u�N���X��.prototype.�֐��v�Ńt�@�C���ɓ����Ă������̂�
//�u�֐��v�����Ńt�@�C���ɓ���Ă����A�N���X�����ς���Ă����p�ł���悤�ɂ����B



var AI5_0 = function(myPlane,targetPlane){
	//myPlane...Plane�I�u�W�F�N�g�̃C���X�^���X
	//targetPlane...Plane�I�u�W�F�N�g�̃C���X�^���X


	this.NSpan = 15+1;//�L���X�p��+1�͑O��̋L���Ɏg������

	this.numIma=0;//storeInfo�p
	this.preNumInput=0;//AIStoreInfo5_0�Ŏg�p

	this.numZenkai=0;//����0��1�̒l���X�C�b�`���O����
	this.numKonkai=1;

	this.numInput = new Array(this.NSpan);//ON�̓��͍זE�̔ԍ�
	for(var ii=0;ii<this.NSpan;ii++)this.numInput[ii]=0;//�������K�v

	//��ꒆ�ԑw��3����i3�̏o�͂����邽�߁j
	this.mid11 = new Array(2);
	this.mid11[0] = new Array(ww5.Nmid11);
	this.mid11[1] = new Array(ww5.Nmid11);
	this.resSpeed=new Array(2);


	this.mid12 = new Array(2);
	this.mid12[0] = new Array(ww5.Nmid12);
	this.mid12[1] = new Array(ww5.Nmid12);
	this.resAngle=new Array(2);
	

//����������
//��	this.nMid13s=new Array(2);
//��	this.numMid13s=new Array(2);
//��	this.nMid13s=0;//�z��̒����B�ő�ww5.Nmid13
//��	this.numMid13s[0]=new Array(ww5.Nmid13);//ON�̍זE�̔ԍ������܂��Ă���
//��	this.numMid13s[1]=new Array(ww5.Nmid13);//ON�̍זE�̔ԍ������܂��Ă���


	this.mid13 = new Array(2);
	this.mid13[0] = new Array(ww5.Nmid13);
	this.mid13[1] = new Array(ww5.Nmid13);
	this.resShoot = new Array(2);

	//�o��



	this.target=targetPlane;//�C���X�^���X
	this.plane=myPlane;//��

	this.thresholdSpeed = this.NSpan;
	this.thresholdAngle = 1;//this.NSpan;//kkkkkkk
	this.thresholdShoot = 1;//this.NSpan;
	this.thresholdSpeed = 1;
	this.alphaSpeed=0.1;
	this.alphaAngle=0.1;//grad(f(w))�̌W��
	this.alphaShoot=0.1;



};
AI5_0.prototype.version = "5_0";





console.info("ai5_0.js      ready!");