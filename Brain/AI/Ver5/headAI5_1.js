console.info("eval headAI5_1.js");
if(!'$test' in window)console.log("$testを定義してください");
if(!'flagStop' in window)console.log("flagStopを定義してください");
if(!'Headers' in window)console.log("Headersを定義してください");


__version__='5_0';
__pathparts__='../Brain/AI/Ver5/';

if($test)__pathparts__='./';//ここは変えない

__versionClearInput__	='5_0';
__versionStoreInfo__		='5_0';
__versionDecideAngle__	='5_0';
__versionLearnAngle__	='5_0';
__versionDecideSpeed__	='5_0';
__versionLearnSpeed__	='5_0';
__versionDecideShoot__	='5_0';
__versionLearnShoot__	='5_0';


__timestamp__=new Date();
//注意
//可変部分を忘れずに変更してください
//特に「プロシージャファイルの名前」とそのなかの「プロシージャの名前」を確認してください
//「コンストラクタ」の「inherit」や「prototype.play()の関数名」の名前も確認してください。




//AIの部品を読み込むヘダー





//aboutShoot_0をリニューアルしたものを新たに導入


//テンプレート
var script = (function(){/*

//__timestamp__

Headers +='headerAI__version__();\n';//こいつをaction.htmでeval()


var headerAI__version__ = function(){

	const filename="headAI__version__.js";
	const folda = '__pathparts__';

	var names=new Array();

	//Weight30
	names.push('aiWeight5_2.js');//●
//○	names.push('aiWeight5_0.js');
	//AIの部品
	names.push('aboutAngle5_0.js');
	names.push('aboutInput5_0.js');
	names.push('aboutShoot5_0.js');
	names.push('aboutSpeed5_0.js')
	names.push('ai5_0.js');
	
	//headerのidを取得
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
			console.log(filename+"     AI__version__が未定義です");
			flagStop=true;
		};
		if('AI__version__' in window){
			AI__version__.prototype.clearInput = AIClearInput__versionClearInput__;
			AI__version__.prototype.storeInfo = AIStoreInfo__versionStoreInfo__;
			AI__version__.prototype.decideAngle = AIDecideAngle__versionDecideAngle__;
			AI__version__.prototype.learnAngle = AILearnAngle__versionLearnAngle__;
			AI__version__.prototype.decideSpeed = AIDecideSpeed__versionDecideSpeed__;
			AI__version__.prototype.learnSpeed = AILearnSpeed__versionLearnSpeed__;
			AI__version__.prototype.decideShoot = AIDecideShoot__versionDecideShoot__;
			AI__version__.prototype.learnShoot = AILearnShoot__versionLearnShoot__;
			clearInterval(hoge);
			console.info("headerAI__version__ の準備が出来ました。 !");
			console.info("'AI__version__'が生成されました。");

		};

	},100);

};

*/});


script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__version__/g,__version__);
script=script.replace(/__pathparts__/g,__pathparts__);


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
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Brain\\AI\\Ver5\\txtHeader.txt",ForWriting.toString(16),true);//trueでファイルがないとき新規作成
file.WriteLine(script);
file.close();
};



