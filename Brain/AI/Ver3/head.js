
//Plane Ver3�̕��i��ǂݍ��ރw�_�[


var headerAIVer3 = function(){

	const folda = HomeFolda + '\\AI\\Ver3\\';

	var names=new Array();

	//AI3�̕��i
	names.push('ai3_globalVariables_0.js');
	names.push('ai3_0.js');
	names.push('aboutSpeed_0.js')
	names.push('aboutShoot_0.js')
	names.push('aboutInput_0.js')
	names.push('aboutAngle_0.js')
	
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
};