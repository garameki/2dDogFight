


//ssPlaneMATH_3.js��ssPlaneMATH_4*.js

//*****__version__=0_4

var headerPlaneMATH0_4 = function(){//*****


	const folda = '../Plane/MATH/parts/';//******
	const nameProc='PlaneMATH0_4';//*****


	console.info("header"+nameProc+"() called !");

	var names=new Array();



	names.push('motion0_2.js');//��
	names.push('collision0_1.js');//��
	names.push('ssPlaneMATH_4.js');//��

	
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

	//������plane�̋@�\�g�� proc*��PlaneAIVer0�̒��Ńv���V�[�W���Ƃ��Ďg���܂��B
	var counter=0;
	var hoge = setInterval(function(){
		counter++;
		if(counter>20 || flagStop){
			console.error(nameProc+" is not defined !");
			clearInterval(hoge);
			flagStop=true;
		};
		if(nameProc in window){
			//use this name above as class name in casting file
//***Do not forget
			eval(nameProc).prototype.procMotion=PlaneMATHMotion0_2;//�e�t�@�C���̒��̊֐������g���܂�
			eval(nameProc).prototype.procCollision=PlaneMATHCollision0_1;//��Ver0������
			clearInterval(hoge);
		};
	},100);
};