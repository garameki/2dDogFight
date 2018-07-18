

//機能	変数、関数
//性能	アルゴリズム




/////////////head$_$_*_*	用のヘッダです(*の部分を変えたときに使うヘッダ)

//Weight30を別々のファイルで動かすことができる

//ai = new AI5_0(new Weight30(filename));
//plane = new PlaneAI5_0(sName,ssName,sName,ssName,ai);
//で可能

//コンストラクタを変えたら5_*_1の*の部分を変える
//変数の中身を変えただけなら5_1_*の*の部分を変える




if(!('$test' in window))console.error("$testを定義してください");
if(!('flagStop' in window))console.error("flagStopを定義してください");
if(!('Headers' in window))console.error("Headersを定義してください");

__pathparts__='../Brain/AI/Ver6/';

if($test)__pathparts__='./';//ここは変えない

__version__		='6_0_0_0';//●//★新しく作るクラス
__versionAIConstructor__	='6_0';///////////head$_$_*_*の$_$の部分

__versionWeight__		='30_0'

__versionInputClear__	='6_0';//ファイル名のバージョンと一致していること
__versionInputStore__	='6_0';
__versionAngleDecide__	='6_0';//★
__versionAngleLearn__	='6_0';//★
__versionSpeedDecide__	='6_0';
__versionSpeedLearn__	='6_0';
__versionShootDecide__	='6_0';
__versionShootLearn__	='6_0';

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


	var  folda = '__pathparts__';

	var ids=new Array();

	//AIの部品

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
	//headerのidを取得
	var headId=document.getElementsByTagName("head")[0];

	var tag;
	for(var ii=0;ii<ids.length;ii++){
		if(ids[ii] in window){//同じものはincludeしない
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

			//新しいサブクラスを作成
			AI__version__ = function(){
				//引数を変数へ代入
				var len = arguments.length;
				for(var ii=0;ii<len;ii++){
					eval('arg'+ii.toString()+"=arguments["+ii.toString()+"]");
				};
				//for(var ii=0;ii<len;ii++)eval("console.log(arg"+ii.toString()+");");
				//callの準備
				var args="";
				for(var ii=0;ii<len;ii++){
					args+='arg'+ii.toString();
					if(ii+1!=len)args+=',';
				};
				eval("AIConstructor__versionAIConstructor__.call(this,"+args+");");			
			};
			inherits(AI__version__,AIConstructor__versionAIConstructor__);

			//左が変わったら、PlaneAIに影響が出る
			AI__version__.prototype.clearInput 	=InputClear__versionInputClear__;
			AI__version__.prototype.storeInfo 	=InputStore__versionInputStore__;
			AI__version__.prototype.decideAngle 	=AngleDecide__versionAngleDecide__;
			AI__version__.prototype.learnAngle 	=AngleLearn__versionAngleLearn__;
			AI__version__.prototype.decideSpeed 	=SpeedDecide__versionSpeedDecide__;
			AI__version__.prototype.learnSpeed 	=SpeedLearn__versionSpeedLearn__;
			AI__version__.prototype.decideShoot 	=ShootDecide__versionShootDecide__;
			AI__version__.prototype.learnShoot 	=ShootLearn__versionShootLearn__;
			console.info("'AI__version__'が生成されました。");

			//console.info("headerAI__version__ の準備が出来ました。 !");

		};

		//エラー処理
		if(++count>20 || flagStop){
			clearInterval(hoge);
			flagStop=true;
			if(!conAIConstructor)	console.error("headAI__version__.js     'AIConstructor__versionAIConstructor__'が未定義です");
			if(!conAngleDecide)	console.error("headAI__version__.js     'AngleDecide__versionAngleDecide__'が定義されていません");
			if(!conAngleLearn)	console.error("headAI__version__.js     'AngleLearn__versionAngleLearn__'が定義されていません");
			if(!conInputClear)	console.error("headAI__version__.js     'InputClear__versionInputClear__'が定義されていません");
			if(!conInputStore)	console.error("headAI__version__.js     'InputStore__versionInputStore__'が定義されていません");
			if(!conShootDecide)console.error("headAI__version__.js     'ShootDecide__versionShootDecide__'が定義されていません");
			if(!conShootLearn)	console.error("headAI__version__.js     'ShootLearn__versionShootLearn__'が定義されていません");
			if(!conSpeedDecide)console.error("headAI__version__.js     'SpeedDecide__versionSpeedDecide__'が定義されていません");
			if(!conSpeedLearn)	console.error("headAI__version__.js     'SpeedLearn__versionSpeedLearn__'が定義されていません");
			if(!conWeight)	console.error("headAI__version__.js     'classWeight__versionWeight__'が定義されていません");
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

//ファイル吐きだし
var fs = new ActiveXObject("Scripting.FileSystemObject");
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Brain\\AI\\Ver6\\txtHeader"+__version__+".txt",ForWriting.toString(16),true);//trueでファイルがないとき新規作成
file.WriteLine(script);
file.close();

//実行
eval(script);


