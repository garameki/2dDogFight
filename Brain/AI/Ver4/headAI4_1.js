//����
//�ϕ�����Y�ꂸ�ɕύX���Ă�������
//���Ɂu�v���V�[�W���t�@�C���̖��O�v�Ƃ��̂Ȃ��́u�v���V�[�W���̖��O�v���m�F���Ă�������
//�u�R���X�g���N�^�v�́uinherit�v��uprototype.play()�̊֐����v�̖��O���m�F���Ă��������B




//AI�̕��i��ǂݍ��ރw�_�[





//aboutShoot_0�����j���[�A���������̂�V���ɓ���







var headerAI = function(){

	const filename="headAI4_1.js";//��
	const folda = HomeFolda + '\\Brain\\AI\\Ver4\\';
	const nameProc = 'AI4_0';

	var names=new Array();

	//AI4�̕��i
	names.push('aiGlobalVariables4_1.js');//��
//��	names.push('aiGlobalVariables4_0.js');
	names.push('aboutSpeed4_0.js')
	names.push('aboutShoot4_0.js');
	names.push('aboutInput4_1.js');//��
//��	names.push('aboutInput4_0.js')
	names.push('aboutAngle4_1.js');//��
//��	names.push('aboutAngle4_0.js')
	names.push('ai4_0.js');
	
	//header��id���擾
	var headId=document.getElementsByTagName("head")[0];

	var tagNew;
	for(var ii=0;ii<names.length;ii++){
		tagNew = document.createElement("script");
		tagNew.setAttribute("type","text/javascript");
		tagNew.setAttribute("src",folda+names[ii]);
		tagNew.setAttribute("charset","Shift_JIS");
		headId.appendChild(tagNew);
	};
	var count=0;
	var hoge = setInterval(function(){

		if(count++>20 || flagStop){
			clearInterval(hoge);
			console.log(filename+"     "+nameProc+"������`�ł�");//��
			flagStop=true;
		};
		if(nameProc in window){//��
			eval(nameProc).prototype.clearInput = AIClearInput4_0;
			eval(nameProc).prototype.storeInfo = AIStoreInfo4_1;
			eval(nameProc).prototype.decideAngle = AIDecideAngle4_1;
			eval(nameProc).prototype.learnAngle = AILearnAngle4_0;
			eval(nameProc).prototype.decideSpeed = AIDecideSpeed4_0;
			eval(nameProc).prototype.learnSpeed = AILearnSpeed4_0;
			eval(nameProc).prototype.decideShoot = AIDecideShoot4_0;
			eval(nameProc).prototype.learnShoot = AILearnShoot4_0;
			clearInterval(hoge);
		};

	},100);

};