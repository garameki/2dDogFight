

		//  ��  ���͑w(�O��)�Ɠ��͑w(����)�����ւ��A�V�E���͑w(����)���N���A
var AIClearInput5_1 = function(){//���ꂩ����͂��s��input�ϐ��̒��g��0�ɂ���

	//�X�p���ƃX�p���̌p���ڂɓ����
	if(this.numZenkai==0){
		this.numZenkai=1;
		this.numKonkai=0;
	}else{
		this.numZenkai=0;
		this.numKonkai=1;
	};

	this.numIma++;
	if(this.numIma==this.NSpan)this.numIma=0;


//��	for(var ii=0;ii<aiself.input[aiself.numKonkai].length;ii++)aiself.input[aiself.numKonkai][ii]=0;


};

console.info("jsInputClear5_1.js      ready!");
