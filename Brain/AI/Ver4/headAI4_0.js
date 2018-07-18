
//AI4_0の部品を読み込むヘダー





//aboutShoot_0をリニューアルしたものを新たに導入







var headerAI4_0 = function(){

	const folda = HomeFolda + '\\Brain\\AI\\Ver4\\';
	const nameProc = 'AI4_0';

	var names=new Array();

	//AI4の部品
	names.push('aiGlobalVariables4_0.js');
	names.push('aboutSpeed4_0.js')
	names.push('aboutShoot4_0.js')
	names.push('aboutInput4_0.js')
	names.push('aboutAngle4_0.js')
	names.push('ai4_0.js');
	
	//headerのidを取得
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
			info.caution("headAI4_0     'AI4_0'が未定義です");
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