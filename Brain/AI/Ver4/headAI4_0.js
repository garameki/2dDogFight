
//AI4_0�̕��i��ǂݍ��ރw�_�[





//aboutShoot_0�����j���[�A���������̂�V���ɓ���







var headerAI4_0 = function(){

	const folda = HomeFolda + '\\Brain\\AI\\Ver4\\';
	const nameProc = 'AI4_0';

	var names=new Array();

	//AI4�̕��i
	names.push('aiGlobalVariables4_0.js');
	names.push('aboutSpeed4_0.js')
	names.push('aboutShoot4_0.js')
	names.push('aboutInput4_0.js')
	names.push('aboutAngle4_0.js')
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
			info.caution("headAI4_0     'AI4_0'������`�ł�");
			flagStop=true;
		};
		if('AI4_0' in window){
			AI4_0.prototype.clearInput = AIClearInput4_0;
			AI4_0.prototype.storeInfo = AIStoreInfo4_0;
			AI4_0.prototype.decideAngle = AIDecideAngle4_0;
			AI4_0.prototype.learnAngle = AILearnAngle4_0;
			AI4_0.prototype.decideSpeed = AIDecideSpeed4_0;
			AI4_0.prototype.learnSpeed = AILearnSpeed4_0;
			AI4_0.prototype.decideShoot = AIDecideShoot4_0;
			AI4_0.prototype.learnShoot = AILearnShoot4_0;
			clearInterval(hoge);
		};

	},100);

};