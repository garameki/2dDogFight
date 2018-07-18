console.log("eval headAI5_2_1prototype.js");



/////////////head$_$_*_*	用のヘッダです(*の部分を変えたときに使うヘッダ)

//Weight30を別々のファイルで動かすことができる

//ai = new AI5_0(new Weight30(filename));
//plane = new PlaneAI5_0(sName,ssName,sName,ssName,ai);
//で可能

//コンストラクタを変えたら5_*_1の*の部分を変える
//変数の中身を変えただけなら5_1_*の*の部分を変える




if(!'$test' in window)console.log("$testを定義してください");
if(!'flagStop' in window)console.log("flagStopを定義してください");
if(!'Headders' in window)console.log("Headersを定義してください");

__pathparts__='../Brain/AI/Ver5/';

if($test)__pathparts__='./';//ここは変えない

__versionHead__		='5_2_1';//●
__version__		='5_1_1';//●//★新しく作るクラス
__versionAISuper__		='5_1';///////////head$_$_*_*の$_$の部分

__versionClearInput__	='5_1';//ファイル名のバージョンと一致していること
__versionStoreInfo__		='5_1';
__versionDecideAngle__	='5_1_1';//★
__versionLearnAngle__	='5_1_1';//★
__versionDecideSpeed__	='5_1';
__versionLearnSpeed__	='5_1';
__versionDecideShoot__	='5_1';
__versionLearnShoot__	='5_1';


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

Headers +='headerAI__versionHead__();\n';//こいつをaction.htmでeval()



var headerAI__versionHead__ = function(){


	const folda = '__pathparts__';

	var names=new Array();

	//AIの部品

	//Weight30
	names.push('aiWeight5_2.js');

	//●ここから
	names.push('jsAngleDecide__versionDecideAngle__.js');
	names.push('jsAngleLearn__versionLearnAngle__.js');
	names.push('jsInputClear__versionClearInput__.js');
	names.push('jsInputStore__versionStoreInfo__.js');
	names.push('jsShootDecide__versionDecideShoot__.js');
	names.push('jsShootLearn__versionLearnShoot__.js');
	names.push('jsSpeedDecide__versionDecideSpeed__.js')
	names.push('jsSpeedLearn__versionLearnSpeed__.js')
	names.push('ai__versionAISuper__.js');//ここが変わっていないことに注意スーパークラス
	//●ここまで	

//○	names.push('jsAngleDecide5_1_1.js');//●
//○	names.push('jsAngleLearn5_1.js');
//○	names.push('jsInputClea5_1.js');
//○	names.push('jsInputStore5_1.js');
//○	names.push('jsShootDecide5_1.js');
//○	names.push('jsShootLearn5_1.js');
//○	names.push('jsSpeedDecide5_1.js')
//○	names.push('jsSpeedLearn5_1.js')
//○	names.push('aiAI5_1prototype.js');//ここが変わっていないことに注意スーパークラス

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
			console.log("headAI__versionHead__.js     スーパークラスAI__versionAISuper__が未定義です");
			flagStop=true;
		};
		if('AI__versionAISuper__' in window){

			//●ここから　新しいサブクラスを作成
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
				eval("AI__versionAISuper__.call(this,"+args+");");			
			};
			inherits(AI__version__,AI__versionAISuper__);
			//●ここまで


			AI__version__.prototype.clearInput = AIClearInput__versionClearInput__;
			AI__version__.prototype.storeInfo = AIStoreInfo__versionStoreInfo__;
			AI__version__.prototype.decideAngle = AIDecideAngle__versionDecideAngle__;
			AI__version__.prototype.learnAngle = AILearnAngle__versionLearnAngle__;
			AI__version__.prototype.decideSpeed = AIDecideSpeed__versionDecideSpeed__;
			AI__version__.prototype.learnSpeed = AILearnSpeed__versionLearnSpeed__;
			AI__version__.prototype.decideShoot = AIDecideShoot__versionDecideShoot__;
			AI__version__.prototype.learnShoot = AILearnShoot__versionLearnShoot__;
			clearInterval(hoge);
			console.info("headerAI__versionHead__ の準備が出来ました。 !");
			console.info("'AI__version__'が生成されました。");

		};

	},100);

};

*/});


script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__version__/g,__version__);
script=script.replace(/__versionAISuper__/g,__versionAISuper__);
script=script.replace(/__versionHead__/g,__versionHead__);
script=script.replace(/__pathparts__/g,__pathparts__);


script=script.replace(/__versionClearInput__/g,__versionClearInput__);
script=script.replace(/__versionStoreInfo__/g,__versionStoreInfo__);
script=script.replace(/__versionDecideAngle__/g,__versionDecideAngle__);
script=script.replace(/__versionLearnAngle__/g,__versionLearnAngle__);
script=script.replace(/__versionDecideSpeed__/g,__versionDecideSpeed__);
script=script.replace(/__versionLearnSpeed__/g,__versionLearnSpeed__);
script=script.replace(/__versionDecideShoot__/g,__versionDecideShoot__);
script=script.replace(/__versionLearnShoot__/g,__versionLearnShoot__);


//○if(true){
var fs = new ActiveXObject("Scripting.FileSystemObject");
var ForReading = 1;
var ForWriting = 2;
var ForAppending = 8;
//●ここから__versionHead__挿入
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Brain\\AI\\Ver5\\txtHeader"+__versionHead__+".txt",ForWriting.toString(16),true);//trueでファイルがないとき新規作成
//●ここまで
file.WriteLine(script);
file.close();
//○};


eval(script);


