console.info("eval headAI5_0prototype.js");
if(!'$test' in window)console.log("$test���`���Ă�������");
if(!'flagStop' in window)console.log("flagStop���`���Ă�������");
if(!'Headers' in window)console.log("Headers���`���Ă�������");

__versionHead__		='5_1';
__pathparts__='../Brain/AI/Ver5/';

if($test)__pathparts__='./';//�����͕ς��Ȃ�


__versionAI__		='5_0';
__versionClearInput__	='5_0';
__versionStoreInfo__		='5_0';
__versionDecideAngle__	='5_0';
__versionLearnAngle__	='5_0';
__versionDecideSpeed__	='5_0';
__versionLearnSpeed__	='5_0';
__versionDecideShoot__	='5_0';
__versionLearnShoot__	='5_0';


__timestamp__=new Date();
//����
//�ϕ�����Y�ꂸ�ɕύX���Ă�������
//���Ɂu�v���V�[�W���t�@�C���̖��O�v�Ƃ��̂Ȃ��́u�v���V�[�W���̖��O�v���m�F���Ă�������
//�u�R���X�g���N�^�v�́uinherit�v��uprototype.play()�̊֐����v�̖��O���m�F���Ă��������B




//AI�̕��i��ǂݍ��ރw�_�[





//aboutShoot_0�����j���[�A���������̂�V���ɓ���


//�e���v���[�g
var script = (function(){/*

//__timestamp__

Headers +='headerAI__versionHead__();\n';//������action.htm��eval()


var headerAI__versionHead__ = function(){

	const filename="headAI__versionHead__.js";
	const folda = '__pathparts__';

	var names=new Array();

	//�g��weight30
	names.push('aiWeight5_1.js');//��
//��	names.push('aiWeight5_0.js');

	//���i
	names.push('aboutAngle5_0.js');
	names.push('aboutInput5_0.js');
	names.push('aboutShoot5_0.js');
	names.push('aboutSpeed5_0.js')
	names.push('ai5_0.js');
	
	//header��id���擾
	var headId=document.getElementsByTagName("head")[0];

	var tag;
	for(var ii=0;ii<names.length;ii++){
		tag = document.createElement("script");
		tag.setAttribute("type","text/javascript");
		tag.setAttribute("src",folda+names[ii]);
		tag.setAttribute("charset","Shift_JIS");
		headId.appendChild(tag);
	};
	var count=0;
	var hoge = setInterval(function(){

		if(count++>20 || flagStop){
			clearInterval(hoge);
			console.log(filename+"     AI__versionAI__������`�ł�");
			flagStop=true;
		};
		if('AI__versionAI__' in window){
			AI__versionAI__.prototype.clearInput = AIClearInput__versionClearInput__;
			AI__versionAI__.prototype.storeInfo = AIStoreInfo__versionStoreInfo__;
			AI__versionAI__.prototype.decideAngle = AIDecideAngle__versionDecideAngle__;
			AI__versionAI__.prototype.learnAngle = AILearnAngle__versionLearnAngle__;
			AI__versionAI__.prototype.decideSpeed = AIDecideSpeed__versionDecideSpeed__;
			AI__versionAI__.prototype.learnSpeed = AILearnSpeed__versionLearnSpeed__;
			AI__versionAI__.prototype.decideShoot = AIDecideShoot__versionDecideShoot__;
			AI__versionAI__.prototype.learnShoot = AILearnShoot__versionLearnShoot__;
			clearInterval(hoge);
			console.info("headerAI__versionAI__ �̏������o���܂����B !");
			console.info("'AI__versionAI__'����������܂����B");

		};

	},100);

};

*/});


script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__versionHead__/g,__versionHead__);
script=script.replace(/__pathparts__/g,__pathparts__);


script=script.replace(/__versionAI__/g,__versionAI__);
script=script.replace(/__versionClearInput__/g,__versionClearInput__);
script=script.replace(/__versionStoreInfo__/g,__versionStoreInfo__);
script=script.replace(/__versionDecideAngle__/g,__versionDecideAngle__);
script=script.replace(/__versionLearnAngle__/g,__versionLearnAngle__);
script=script.replace(/__versionDecideSpeed__/g,__versionDecideSpeed__);
script=script.replace(/__versionLearnSpeed__/g,__versionLearnSpeed__);
script=script.replace(/__versionDecideShoot__/g,__versionDecideShoot__);
script=script.replace(/__versionLearnShoot__/g,__versionLearnShoot__);


eval(script);

if(true){
var fs = new ActiveXObject("Scripting.FileSystemObject");
const ForReading = 1;
const ForWriting = 2;
const ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Brain\\AI\\Ver5\\txtHeader.txt",ForWriting.toString(16),true);//true�Ńt�@�C�����Ȃ��Ƃ��V�K�쐬
file.WriteLine(script);
file.close();
};



