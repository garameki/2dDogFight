

//�@�\	�ϐ��A�֐�
//���\	�A���S���Y��




/////////////head$_$_*_*	�p�̃w�b�_�ł�(*�̕�����ς����Ƃ��Ɏg���w�b�_)

//Weight30��ʁX�̃t�@�C���œ��������Ƃ��ł���

//ai = new AI5_0(new Weight30(filename));
//plane = new PlaneAI5_0(sName,ssName,sName,ssName,ai);
//�ŉ\

//�R���X�g���N�^��ς�����5_*_1��*�̕�����ς���
//�ϐ��̒��g��ς��������Ȃ�5_1_*��*�̕�����ς���




if(!('$test' in window))console.error("$test���`���Ă�������");
if(!('flagStop' in window))console.error("flagStop���`���Ă�������");
if(!('Headers' in window))console.error("Headers���`���Ă�������");

__pathparts__='../Brain/AI/Ver6/';

if($test)__pathparts__='./';//�����͕ς��Ȃ�

__version__		='6_0_0_0';//��//���V�������N���X
__versionAIConstructor__	='6_0';///////////head$_$_*_*��$_$�̕���

__versionWeight__		='30_0'

__versionInputClear__	='6_0';//�t�@�C�����̃o�[�W�����ƈ�v���Ă��邱��
__versionInputStore__	='6_0';
__versionAngleDecide__	='6_0';//��
__versionAngleLearn__	='6_0';//��
__versionSpeedDecide__	='6_0';
__versionSpeedLearn__	='6_0';
__versionShootDecide__	='6_0';
__versionShootLearn__	='6_0';

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

Headers +='headerAI__version__();\n';//������action.htm��eval()


var headerAI__version__ = function(){


	var  folda = '__pathparts__';

	var ids=new Array();

	//AI�̕��i

	//Weight30
	ids.push('classWeight__versionWeight__');

	ids.push('funcAngleDecide__versionAngleDecide__');
	ids.push('funcAngleLearn__versionAngleLearn__');
	ids.push('funcInputClear__versionInputClear__');
	ids.push('funcInputStore__versionInputStore__');
	ids.push('funcShootDecide__versionShootDecide__');
	ids.push('funcShootLearn__versionShootLearn__');
	ids.push('funcSpeedDecide__versionSpeedDecide__')
	ids.push('funcSpeedLearn__versionSpeedLearn__')
	ids.push('classAIConstructor__versionAIConstructor__');
	//header��id���擾
	var headId=document.getElementsByTagName("head")[0];

	var tag;
	for(var ii=0;ii<ids.length;ii++){
		if(ids[ii] in window){//�������̂�include���Ȃ�
			//nothing
		}else{
			tag = document.createElement("script");
			tag.setAttribute("type","text/javascript");
			tag.setAttribute("id",ids[ii]);
			tag.setAttribute("src",folda+ids[ii]+'.js');
			tag.setAttribute("charset","Shift_JIS");
			headId.appendChild(tag);
		};
	};
	var count=0;
	var hoge = setInterval(function(){

		var conAIConstructor	= 'AIConstructor__versionAIConstructor__' in window;
		var conAngleDecide	= 'AngleDecide__versionAngleDecide__'	in window;
		var conAngleLearn		= 'AngleLearn__versionAngleLearn__'	in window;
		var conInputClear		= 'InputClear__versionInputClear__'	in window;
		var conInputStore		= 'InputStore__versionInputStore__'	in window;
		var conShootDecide	= 'ShootDecide__versionShootDecide__'	in window;
		var conShootLearn		= 'ShootLearn__versionShootLearn__'	in window;
		var conSpeedDecide	= 'SpeedDecide__versionSpeedDecide__' in window;
		var conSpeedLearn		= 'SpeedLearn__versionSpeedLearn__'	in window;
		var conWeight		= 'Weight__versionWeight__'		in window;

		var con = conAIConstructor && conAngleDecide && conAngleLearn && conInputClear && conInputStore && conShootDecide && conShootLearn && conSpeedDecide && conSpeedLearn && conWeight;



		if(con){
			clearInterval(hoge);

			//�V�����T�u�N���X���쐬
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
				eval("AIConstructor__versionAIConstructor__.call(this,"+args+");");			
			};
			inherits(AI__version__,AIConstructor__versionAIConstructor__);

			//�����ς������APlaneAI�ɉe�����o��
			AI__version__.prototype.clearInput 	=InputClear__versionInputClear__;
			AI__version__.prototype.storeInfo 	=InputStore__versionInputStore__;
			AI__version__.prototype.decideAngle 	=AngleDecide__versionAngleDecide__;
			AI__version__.prototype.learnAngle 	=AngleLearn__versionAngleLearn__;
			AI__version__.prototype.decideSpeed 	=SpeedDecide__versionSpeedDecide__;
			AI__version__.prototype.learnSpeed 	=SpeedLearn__versionSpeedLearn__;
			AI__version__.prototype.decideShoot 	=ShootDecide__versionShootDecide__;
			AI__version__.prototype.learnShoot 	=ShootLearn__versionShootLearn__;
			console.info("'AI__version__'����������܂����B");

			//console.info("headerAI__version__ �̏������o���܂����B !");

		};

		//�G���[����
		if(++count>20 || flagStop){
			clearInterval(hoge);
			flagStop=true;
			if(!conAIConstructor)	console.error("headAI__version__.js     'AIConstructor__versionAIConstructor__'������`�ł�");
			if(!conAngleDecide)	console.error("headAI__version__.js     'AngleDecide__versionAngleDecide__'����`����Ă��܂���");
			if(!conAngleLearn)	console.error("headAI__version__.js     'AngleLearn__versionAngleLearn__'����`����Ă��܂���");
			if(!conInputClear)	console.error("headAI__version__.js     'InputClear__versionInputClear__'����`����Ă��܂���");
			if(!conInputStore)	console.error("headAI__version__.js     'InputStore__versionInputStore__'����`����Ă��܂���");
			if(!conShootDecide)console.error("headAI__version__.js     'ShootDecide__versionShootDecide__'����`����Ă��܂���");
			if(!conShootLearn)	console.error("headAI__version__.js     'ShootLearn__versionShootLearn__'����`����Ă��܂���");
			if(!conSpeedDecide)console.error("headAI__version__.js     'SpeedDecide__versionSpeedDecide__'����`����Ă��܂���");
			if(!conSpeedLearn)	console.error("headAI__version__.js     'SpeedLearn__versionSpeedLearn__'����`����Ă��܂���");
			if(!conWeight)	console.error("headAI__version__.js     'classWeight__versionWeight__'����`����Ă��܂���");
		};

//console.log("hoge count=",count);
	},100);

};

*/});


script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__version__/g,__version__);
script=script.replace(/__versionAIConstructor__/g,__versionAIConstructor__);
script=script.replace(/__versionWeight__/g,__versionWeight__);
script=script.replace(/__pathparts__/g,__pathparts__);

script=script.replace(/__versionInputClear__/g,__versionInputClear__);
script=script.replace(/__versionInputStore__/g,__versionInputStore__);
script=script.replace(/__versionAngleDecide__/g,__versionAngleDecide__);
script=script.replace(/__versionAngleLearn__/g,__versionAngleLearn__);
script=script.replace(/__versionSpeedDecide__/g,__versionSpeedDecide__);
script=script.replace(/__versionSpeedLearn__/g,__versionSpeedLearn__);
script=script.replace(/__versionShootDecide__/g,__versionShootDecide__);
script=script.replace(/__versionShootLearn__/g,__versionShootLearn__);

//�t�@�C���f������
var fs = new ActiveXObject("Scripting.FileSystemObject");
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Brain\\AI\\Ver6\\txtHeader"+__version__+".txt",ForWriting.toString(16),true);//true�Ńt�@�C�����Ȃ��Ƃ��V�K�쐬
file.WriteLine(script);
file.close();

//���s
eval(script);


