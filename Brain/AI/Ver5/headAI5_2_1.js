console.log("eval headAI5_2_1prototype.js");



/////////////head$_$_*_*	�p�̃w�b�_�ł�(*�̕�����ς����Ƃ��Ɏg���w�b�_)

//Weight30��ʁX�̃t�@�C���œ��������Ƃ��ł���

//ai = new AI5_0(new Weight30(filename));
//plane = new PlaneAI5_0(sName,ssName,sName,ssName,ai);
//�ŉ\

//�R���X�g���N�^��ς�����5_*_1��*�̕�����ς���
//�ϐ��̒��g��ς��������Ȃ�5_1_*��*�̕�����ς���




if(!'$test' in window)console.log("$test���`���Ă�������");
if(!'flagStop' in window)console.log("flagStop���`���Ă�������");
if(!'Headders' in window)console.log("Headers���`���Ă�������");

__pathparts__='../Brain/AI/Ver5/';

if($test)__pathparts__='./';//�����͕ς��Ȃ�

__versionHead__		='5_2_1';//��
__version__		='5_1_1';//��//���V�������N���X
__versionAISuper__		='5_1';///////////head$_$_*_*��$_$�̕���

__versionClearInput__	='5_1';//�t�@�C�����̃o�[�W�����ƈ�v���Ă��邱��
__versionStoreInfo__		='5_1';
__versionDecideAngle__	='5_1_1';//��
__versionLearnAngle__	='5_1_1';//��
__versionDecideSpeed__	='5_1';
__versionLearnSpeed__	='5_1';
__versionDecideShoot__	='5_1';
__versionLearnShoot__	='5_1';


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


	const folda = '__pathparts__';

	var names=new Array();

	//AI�̕��i

	//Weight30
	names.push('aiWeight5_2.js');

	//����������
	names.push('jsAngleDecide__versionDecideAngle__.js');
	names.push('jsAngleLearn__versionLearnAngle__.js');
	names.push('jsInputClear__versionClearInput__.js');
	names.push('jsInputStore__versionStoreInfo__.js');
	names.push('jsShootDecide__versionDecideShoot__.js');
	names.push('jsShootLearn__versionLearnShoot__.js');
	names.push('jsSpeedDecide__versionDecideSpeed__.js')
	names.push('jsSpeedLearn__versionLearnSpeed__.js')
	names.push('ai__versionAISuper__.js');//�������ς���Ă��Ȃ����Ƃɒ��ӃX�[�p�[�N���X
	//�������܂�	

//��	names.push('jsAngleDecide5_1_1.js');//��
//��	names.push('jsAngleLearn5_1.js');
//��	names.push('jsInputClea5_1.js');
//��	names.push('jsInputStore5_1.js');
//��	names.push('jsShootDecide5_1.js');
//��	names.push('jsShootLearn5_1.js');
//��	names.push('jsSpeedDecide5_1.js')
//��	names.push('jsSpeedLearn5_1.js')
//��	names.push('aiAI5_1prototype.js');//�������ς���Ă��Ȃ����Ƃɒ��ӃX�[�p�[�N���X

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
			console.log("headAI__versionHead__.js     �X�[�p�[�N���XAI__versionAISuper__������`�ł�");
			flagStop=true;
		};
		if('AI__versionAISuper__' in window){

			//����������@�V�����T�u�N���X���쐬
			AI__version__ = function(){
				//������ϐ��֑��
				var len = arguments.length;
				for(var ii=0;ii<len;ii++){
					eval('arg'+ii.toString()+"=arguments["+ii.toString()+"]");
				};
				//for(var ii=0;ii<len;ii++)eval("console.log(arg"+ii.toString()+");");
				//call�̏���
				var args="";
				for(var ii=0;ii<len;ii++){
					args+='arg'+ii.toString();
					if(ii+1!=len)args+=',';
				};
				eval("AI__versionAISuper__.call(this,"+args+");");			
			};
			inherits(AI__version__,AI__versionAISuper__);
			//�������܂�


			AI__version__.prototype.clearInput = AIClearInput__versionClearInput__;
			AI__version__.prototype.storeInfo = AIStoreInfo__versionStoreInfo__;
			AI__version__.prototype.decideAngle = AIDecideAngle__versionDecideAngle__;
			AI__version__.prototype.learnAngle = AILearnAngle__versionLearnAngle__;
			AI__version__.prototype.decideSpeed = AIDecideSpeed__versionDecideSpeed__;
			AI__version__.prototype.learnSpeed = AILearnSpeed__versionLearnSpeed__;
			AI__version__.prototype.decideShoot = AIDecideShoot__versionDecideShoot__;
			AI__version__.prototype.learnShoot = AILearnShoot__versionLearnShoot__;
			clearInterval(hoge);
			console.info("headerAI__versionHead__ �̏������o���܂����B !");
			console.info("'AI__version__'����������܂����B");

		};

	},100);

};

*/});


script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__version__/g,__version__);
script=script.replace(/__versionAISuper__/g,__versionAISuper__);
script=script.replace(/__versionHead__/g,__versionHead__);
script=script.replace(/__pathparts__/g,__pathparts__);


script=script.replace(/__versionClearInput__/g,__versionClearInput__);
script=script.replace(/__versionStoreInfo__/g,__versionStoreInfo__);
script=script.replace(/__versionDecideAngle__/g,__versionDecideAngle__);
script=script.replace(/__versionLearnAngle__/g,__versionLearnAngle__);
script=script.replace(/__versionDecideSpeed__/g,__versionDecideSpeed__);
script=script.replace(/__versionLearnSpeed__/g,__versionLearnSpeed__);
script=script.replace(/__versionDecideShoot__/g,__versionDecideShoot__);
script=script.replace(/__versionLearnShoot__/g,__versionLearnShoot__);


//��if(true){
var fs = new ActiveXObject("Scripting.FileSystemObject");
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;
//����������__versionHead__�}��
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Brain\\AI\\Ver5\\txtHeader"+__versionHead__+".txt",ForWriting.toString(16),true);//true�Ńt�@�C�����Ȃ��Ƃ��V�K�쐬
//�������܂�
file.WriteLine(script);
file.close();
//��};


eval(script);


