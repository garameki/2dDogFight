console.info("eval headPlaneMANUAL1_0.js");
if(!'$test' in window)console.log("$testを定義してください");
if(!'flagStop' in window)console.log("flagStopを定義してください");
if(!'Headers' in window)console.log("Headersを定義してください");

__timestamp__=new Date();

__versionHeader__='1_0';

__pathparts__='../Plane/MANUAL/parts/';



__versionPlaneMANUAL__='1_0';
__versionMotion__='Ver0';
__versionCollision__='';//MATHから拝借中　下記参照






var script = (function(){/*

//__timestamp__


Headers +='headerPlaneMANUAL__versionHeader__();\n';//こいつをaction.htmでeval()

var headerPlaneMANUAL__versionHeader__ = function(){

	const folda = '__pathparts__'

	var names=new Array();
	names.push('motion_0.js');
	names.push('../../MATH/parts/collision0_1.js');
	names.push('ssPlaneMANUAL__versionPlaneMANUAL__.js');


	
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

	//ここでplaneの機能拡張 proc*はPlaneAIVer0の中でプロシージャとして使われます。
	var counter=0;
	var hoge = setInterval(function(){
		counter++;
		if(counter>20 || flagStop){
			console.error("PlaneMANUAL__versionPlaneMANUAL__ is not defined !");
			clearInterval(hoge);
			flagStop=true;
		};
		if('PlaneMANUAL__versionPlaneMANUAL__' in window){
			//use this name above as class name in casting file
			PlaneMANUAL__versionPlaneMANUAL__.prototype.procMotion=PlaneMANUALMotion__versionMotion__;//各ファイルの中の関数名を使います
			PlaneMANUAL__versionPlaneMANUAL__.prototype.procCollision=PlaneMATHCollision0_1;//拝借
//MATHから拝借中	PlaneMANUAL__versionPlaneMANUAL__.prototype.procCollision=PlaneMANUALCollision__versionCollision__;
			clearInterval(hoge);
			console.info("PlaneMANUAL__versionPlaneMANUAL__ が使えます !");
		};
	},100);
};



*/});//EOF

script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__versionHeader__/g,__versionHeader__);
script=script.replace(/__pathparts__/g,__pathparts__);
script=script.replace(/__versionMotion__/g,__versionMotion__);
script=script.replace(/__versionCollision__/g,__versionCollision__);
script=script.replace(/__versionPlaneMANUAL__/g,__versionPlaneMANUAL__);



if(true){
var fs = new ActiveXObject("Scripting.FileSystemObject");
const ForReading = 1;
const ForWriting = 2;
const ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Plane\\MANUAL\\txtHeaderHeader.txt",ForWriting.toString(16),true);//trueでファイルがないとき新規作成
file.WriteLine(script);
file.close();
};

eval(script);








