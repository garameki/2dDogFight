
//PlaneMATHVer3�̕��i��ǂݍ��ރw�_�[

var tagNew;
//***Do not forget changing below after copying
var headerPlaneMANUALVer0 = function(){
	console.info("headerPlaneMANUALVer0() called !");

	var names=new Array();



	//***Do not forget changing below after copying
	//path & parts
	const folda = '../Plane/MANUAL/parts/';
	names.push('ssPlaneMANUAL_0.js');
	names.push('motion_0.js');
	names.push('collision_0.js');


	
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
	var hogePlaneMANUALVer0 = setInterval(function(){
		counter++;
		if(counter>20 || flagStop){
			console.error("PlaneMANUALVer0 is not defined !");
			clearInterval(hogePlaneMANUALVer0);
			flagStop=true;
		};
		if('PlaneMANUALVer0' in window){
			//use this name above as class name in casting file
			//***Do not forget changing below after copying
			PlaneMANUALVer0.prototype.procMotion=PlaneMANUALMotionVer0;//�e�t�@�C���̒��̊֐������g���܂�
			PlaneMANUALVer0.prototype.procCollision=PlaneMANUALCollisionVer0;
			clearInterval(hogePlaneMANUALVer0);
			console.info("PlaneMANUALVer0 is defined !");
		};
	},100);
};