

//�w�b�_�̃o�[�W������PlaneAI�N���X�̃o�[�W�����𓯂��ɂ���


__version__='5_1_1';
__versionPlaneSuper__='5_1';
//��__versionPlane__='5_1';


__pathparts__='../Plane/AI/parts/';


__versionMotion__='0_1';
__versionAngle__='0_1';//��
__versionShoot__='Ver1';
__versionSpeed__='Ver0';
__versionCollision__='';
__versionStatus__='0_0';//��

__timestamp__=new Date();

console.info("eval headPlaneAI"+__version__+"prototype.js");
/////////���� ���i�̃v���V�[�W�������Ƃ��͖����K���ɏ]���Ă�������



//���Ǘ���

//5_1 txtWeight.txt�̃t�@�C���𕪂�����悤�ɂ����B
//5_0 10�X�e�b�v���Ƃ̕]�����Ă����̂��A�P�񂲂ƂɑO10��̕]�����s���悤�ɂ����B
//4_2 ���x��drawStep�̒���
//4_1 �����Ŕ��f���Ēe������
//4_0 evaluateShoot_1.js��V����


//�e���v���[�g
var script = (function(){/*

//__timestamp__

Headers +='headerPlaneAI__version__();\n';//������action.htm��eval()

var headerPlaneAI__version__ = function(){

	const folda = '__pathparts__';


	var names=new Array();

	//PlaneAI�̕��i
	names.push('motion_1.js');
	names.push('evaluateAngle0_1.js');//��
	names.push('evaluateCollision_1.js');
	names.push('evaluateSpeed_0.js');
	names.push('evaluateShoot_1.js');
	names.push('ssPlaneAI5_1.js');
	
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

	//������plane�̋@�\�g�� proc*��PlaneAI�̒��Ńv���V�[�W���Ƃ��Ďg���܂��B
	var counter=0;
	var hoge = setInterval(function(){
		counter++;
		if(counter>20 || flagStop){
			info.caution("headPlaneAI__version__.js   PlaneAI__versionPlaneSuper__ is not defined !");
			clearInterval(hoge);
			flagStop=true;
		};
		if('PlaneAI__versionPlaneSuper__' in window){

			//����������@�V�����T�u�N���X���쐬
			PlaneAI__version__ = function(){
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
				eval("PlaneAI__versionPlaneSuper__.call(this,"+args+");");			
			};
			inherits(PlaneAI__version__,PlaneAI__versionPlaneSuper__);
			//�������܂�









			PlaneAI__version__.prototype.procMotion=PlaneAIMotion__versionMotion__;//�e�t�@�C���̒��̊֐������g���܂�
			PlaneAI__version__.prototype.procCollision=PlaneAIEvaluateCollision__versionCollision__;//Ver0�𖳂�����
			PlaneAI__version__.prototype.procAngle=PlaneAIEvaluateAngle__versionAngle__;
			PlaneAI__version__.prototype.procSpeed=PlaneAIEvaluateSpeed__versionSpeed__;
			PlaneAI__version__.prototype.procShoot=PlaneAIEvaluateShoot__versionShoot__;

			clearInterval(hoge);
			console.info("headerPlaneAI__version__ �̏������o���܂����B !");
			console.info("'PlaneAI__version__'����������܂����B");
		};
	},100);

};

*/});

script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__version__/g,__version__);
script=script.replace(/__versionPlaneSuper__/g,__versionPlaneSuper__);
//script=script.replace(/__version__/g,__version__);
script=script.replace(/__pathparts__/g,__pathparts__);
script=script.replace(/__versionMotion__/g,__versionMotion__);
script=script.replace(/__versionAngle__/g,__versionAngle__);
script=script.replace(/__versionSpeed__/g,__versionSpeed__);
script=script.replace(/__versionCollision__/g,__versionCollision__);
script=script.replace(/__versionShoot__/g,__versionShoot__);


if(true){
var fs = new ActiveXObject("Scripting.FileSystemObject");
const ForReading = 1;
const ForWriting = 2;
const ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Plane\\AI\\txtHeader"+__version__+".txt",ForWriting.toString(16),true);//true�Ńt�@�C�����Ȃ��Ƃ��V�K�쐬
file.WriteLine(script);
file.close();
};



eval(script);




