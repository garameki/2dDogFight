

//�w�b�_�̃o�[�W������PlaneAI�N���X�̃o�[�W�����𓯂��ɂ���


__version__='6_0_0_0';


__versionPlaneConstructor__='6_0';


if(!$test){
	__pathparts__='../Plane/AI/parts/';//action.html�
}else{
	__pathparts__='./parts/';//htmHeaderTest.html�
};

__versionMotion__	='6_0';
__versionAngle__	='6_0';
__versionShoot__	='6_0';
__versionSpeed__	='6_0';
__versionCollision__	='6_0';
//��__versionStatus__	='6_0';

__timestamp__=new Date();

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


	var fnames=new Array();

	//PlaneAI�̕��i
	fnames.push('procMotion__versionMotion__');
	fnames.push('procEvaluateAngle__versionAngle__');
	fnames.push('procEvaluateCollision__versionCollision__');
	fnames.push('procEvaluateSpeed__versionSpeed__');
	fnames.push('procEvaluateShoot__versionShoot__');
//��	fnames.push('procPrintStatus__versionStatus__');//��
	fnames.push('classPlaneConstructor__versionPlaneConstructor__');//��
	
	//header��id���擾
	var headId=document.getElementsByTagName("head")[0];
	var tagNew;
	for(var ii=0;ii<fnames.length;ii++){
		tagNew = document.createElement("script");
		tagNew.setAttribute("type","text/javascript");
		tagNew.setAttribute("src",folda+fnames[ii]+'.js');
		tagNew.setAttribute("charset","Shift_JIS");
		headId.appendChild(tagNew);
	};

	//������plane�̋@�\�g�� proc*��PlaneAI�̒��Ńv���V�[�W���Ƃ��Ďg���܂��B
	var counter=0;
	var hoge = setInterval(function(){




		var conMotion = 'Motion__versionMotion__' in window;
		var conAngle = 'EvaluateAngle__versionAngle__' in window;
		var conCollision = 'EvaluateCollision__versionCollision__' in window;
		var conSpeed = 'EvaluateSpeed__versionSpeed__' in window;
		var conShoot = 'EvaluateShoot__versionShoot__' in window;
//��		var conStatus = 'PrintStatus__versionStatus__' in window;
		var conPlaneConstructor = 'PlaneConstructor__versionPlaneConstructor__' in window;

	var con = conMotion && conAngle && conCollision && conSpeed && conShoot && conPlaneConstructor;
//��	var con = conMotion && conAngle && conCollision && conSpeed && conShoot && conStatus && conPlaneConstructor;
		if(con){
			//�V�����T�u�N���X���쐬
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
				eval("PlaneConstructor__versionPlaneConstructor__.call(this,"+args+");");			
			};
			inherits(PlaneAI__version__,PlaneConstructor__versionPlaneConstructor__);

			PlaneAI__version__.prototype.namePlane = 'PlaneAI__version__';
			PlaneAI__version__.prototype.procMotion=Motion__versionMotion__;//�e�t�@�C���̒��̊֐������g���܂�
			PlaneAI__version__.prototype.procCollision=EvaluateCollision__versionCollision__;
			PlaneAI__version__.prototype.procAngle=EvaluateAngle__versionAngle__;
			PlaneAI__version__.prototype.procSpeed=EvaluateSpeed__versionSpeed__;
			PlaneAI__version__.prototype.procShoot=EvaluateShoot__versionShoot__;
//��			PlaneAI__version__.prototype.procPrintStatus=PrintStatus__versionStatus__;

			console.info("'PlaneAI__version__'���g���܂��I");
			//console.info("headerPlaneAI__version__ �̏������o���܂����B !");
			clearInterval(hoge);
		};

		if(++counter>20 || flagStop){
			clearInterval(hoge);
			flagStop=true;
			if(!conMotion)	console.error("headPlaneAI__version__.js     'Motion__versionMotion__'����`����Ă��܂���");
			if(!conAngle)	console.error("headPlaneAI__version__.js     'Angle__versionAngle__'����`����Ă��܂���");
			if(!conCollision)	console.error("headPlaneAI__version__.js     'Collision__versionCollision__'����`����Ă��܂���");
			if(!conSpeed)	console.error("headPlaneAI__version__.js     'Speed__versionSpeed__'����`����Ă��܂���");
			if(!conShoot)	console.error("headPlaneAI__version__.js     'Shoot__versionShoot__'����`����Ă��܂���");
//��			if(!conStatus)	console.error("headPlaneAI__version__.js     'PrintStatus__versionStatus__'����`����Ă��܂���");
			if(!conPlaneConstructor)console.error("headPlaneAI__version__.js     'PlaneConstructor__versionPlaneConstructor__'����`����Ă��܂���");
		};
	},100);

};

*/});

script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__version__/g,__version__);
script=script.replace(/__versionPlaneConstructor__/g,__versionPlaneConstructor__);
script=script.replace(/__pathparts__/g,__pathparts__);
script=script.replace(/__versionMotion__/g,__versionMotion__);
script=script.replace(/__versionAngle__/g,__versionAngle__);
script=script.replace(/__versionSpeed__/g,__versionSpeed__);
script=script.replace(/__versionCollision__/g,__versionCollision__);
script=script.replace(/__versionShoot__/g,__versionShoot__);
//��script=script.replace(/__versionStatus__/g,__versionStatus__);//��


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
