__kindSprite__='Plane';
__kindType__='AI';
__version__='4_2';

__filename__='headAI.js';
__path__='';

__classname__='';
__version__='4_0';


__filenameMotion__='';
__procnameMotion__='';
__versionMotion__='';



var head = function(){

//例	ARTICLE=ARTICLE.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1].replace(/\n/g,BR).replace(/\r/g,"");


	var __version__='4_0'

	var script = (function(){/*

var names=new Array();

names.push('./tasu.js');
names.push('./hiku.js');
names.push('./dentaku.js');
	
//headerのidを取得
var headId=document.getElementsByTagName("head")[0];

var tagNew;
for(var ii=0;ii<names.length;ii++){
	tagNew = document.createElement("script");
	tagNew.setAttribute("type","text/javascript");
	tagNew.setAttribute("src",names[ii]);
	tagNew.setAttribute("charset","Shift_JIS");
	headId.appendChild(tagNew);
};


var count=0;
var hoge = setInterval(function(){

	if(count++>20){
		clearInterval(hoge);
		console.error("head.js  'Dentaku'が未定義です");
	};
	if('Dentaku' in window){
		Dentaku.prototype.decideShoot = tasu;
		Dentaku.prototype.learnShoot = hiku;
		clearInterval(hoge);
	};
},100);

*/});

	script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,"").replace(/\r/g,"");

	var fs = new ActiveXObject("Scripting.FileSystemObject");
	const ForReading = 1;
	const ForWriting = 2;
	const ForAppending = 8;
	var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\テスト\\バージョン管理\\script.txt",ForWriting.toString(16),true);//trueでファイルがないとき新規作成
	file.WriteLine(script);
	file.close();


};






