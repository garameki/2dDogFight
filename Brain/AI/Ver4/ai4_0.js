


//���Ǔ_

// �u�N���X��.prototype.�֐��v�Ńt�@�C���ɓ����Ă������̂�
//�u�֐��v�����Ńt�@�C���ɓ���Ă����A�N���X�����ς���Ă����p�ł���悤�ɂ����B



var AI4_0 = function(myPlane,targetPlane){
	//myPlane...Plane�I�u�W�F�N�g�̃C���X�^���X
	//targetPlane...Plane�I�u�W�F�N�g�̃C���X�^���X

	this.numZenkai=0;//����0��1�̒l���X�C�b�`���O����
	this.numKonkai=1;

	//���͑w�O��̂��̂ƍ���̂��́B�����O��ɂȂ蓾�āA��������ɂȂ蓾��B!!
	this.input = new Array(2);
	this.input[0] = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
	this.input[1] = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
	for(var ii=0;ii<this.input[0].length;ii++)this.input[0][ii]=0;
	for(var ii=0;ii<this.input[1].length;ii++)this.input[1][ii]=0;


	//��ꒆ�ԑw��3����i3�̏o�͂����邽�߁j
	this.mm11 = new Array(2);
	this.mm11[0] = new Array(Nm11);
	this.mm11[1] = new Array(Nm11);
	for(var ii=0;ii<this.mm11[0].length;ii++)this.mm11[0][ii]=0;
	for(var ii=0;ii<this.mm11[1].length;ii++)this.mm11[1][ii]=0;


	this.mm12 = new Array(2);
	this.mm12[0] = new Array(Nm12);
	this.mm12[1] = new Array(Nm12);
	for(var ii=0;ii<this.mm12[0].length;ii++)this.mm12[0][ii]=0;
	for(var ii=0;ii<this.mm12[1].length;ii++)this.mm12[1][ii]=0;

	this.mm13 = new Array(2);
	this.mm13[0] = new Array(Nm13);
	this.mm13[1] = new Array(Nm13);
	for(var ii=0;ii<this.mm13[0].length;ii++)this.mm13[0][ii]=0;
	for(var ii=0;ii<this.mm13[1].length;ii++)this.mm13[1][ii]=0;


	//�o��

	this.res1 = 0;//�p�x
	this.res2 = 0;//���x
	this.resShoot = 0;//����

	this.target=targetPlane;//�C���X�^���X
	this.myself=myPlane;


};
AI4_0.prototype.version = "4.0";





console.info("ai4_0.js      ready!");