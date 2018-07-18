

//ヘッダのバージョンとPlaneAIクラスのバージョンを同じにする


__version__='5_1_1';
__versionPlaneSuper__='5_1';
//○__versionPlane__='5_1';


__pathparts__='../Plane/AI/parts/';


__versionMotion__='0_1';
__versionAngle__='0_1';//★
__versionShoot__='Ver1';
__versionSpeed__='Ver0';
__versionCollision__='';
__versionStatus__='0_0';//●

__timestamp__=new Date();

console.info("eval headPlaneAI"+__version__+"prototype.js");
/////////注意 部品のプロシージャを作るときは命名規則に従ってください



//改良履歴

//5_1 txtWeight.txtのファイルを分けられるようにした。
//5_0 10ステップごとの評価していたのを、１回ごとに前10回の評価を行うようにした。
//4_2 速度とdrawStepの調整
//4_1 自分で判断して弾を撃つ
//4_0 evaluateShoot_1.jsを新搭載


//テンプレート
var script = (function(){/*

//__timestamp__

Headers +='headerPlaneAI__version__();\n';//こいつをaction.htmでeval()

var headerPlaneAI__version__ = function(){

	const folda = '__pathparts__';


	var names=new Array();

	//PlaneAIの部品
	names.push('motion_1.js');
	names.push('evaluateAngle0_1.js');//★
	names.push('evaluateCollision_1.js');
	names.push('evaluateSpeed_0.js');
	names.push('evaluateShoot_1.js');
	names.push('ssPlaneAI5_1.js');
	
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

	//ここでplaneの機能拡張 proc*はPlaneAIの中でプロシージャとして使われます。
	var counter=0;
	var hoge = setInterval(function(){
		counter++;
		if(counter>20 || flagStop){
			info.caution("headPlaneAI__version__.js   PlaneAI__versionPlaneSuper__ is not defined !");
			clearInterval(hoge);
			flagStop=true;
		};
		if('PlaneAI__versionPlaneSuper__' in window){

			//●ここから　新しいサブクラスを作成
			PlaneAI__version__ = function(){
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
				eval("PlaneAI__versionPlaneSuper__.call(this,"+args+");");			
			};
			inherits(PlaneAI__version__,PlaneAI__versionPlaneSuper__);
			//●ここまで









			PlaneAI__version__.prototype.procMotion=PlaneAIMotion__versionMotion__;//各ファイルの中の関数名を使います
			PlaneAI__version__.prototype.procCollision=PlaneAIEvaluateCollision__versionCollision__;//Ver0を無くした
			PlaneAI__version__.prototype.procAngle=PlaneAIEvaluateAngle__versionAngle__;
			PlaneAI__version__.prototype.procSpeed=PlaneAIEvaluateSpeed__versionSpeed__;
			PlaneAI__version__.prototype.procShoot=PlaneAIEvaluateShoot__versionShoot__;

			clearInterval(hoge);
			console.info("headerPlaneAI__version__ の準備が出来ました。 !");
			console.info("'PlaneAI__version__'が生成されました。");
		};
	},100);

};

*/});

script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__version__/g,__version__);
script=script.replace(/__versionPlaneSuper__/g,__versionPlaneSuper__);
//script=script.replace(/__version__/g,__version__);
script=script.replace(/__pathparts__/g,__pathparts__);
script=script.replace(/__versionMotion__/g,__versionMotion__);
script=script.replace(/__versionAngle__/g,__versionAngle__);
script=script.replace(/__versionSpeed__/g,__versionSpeed__);
script=script.replace(/__versionCollision__/g,__versionCollision__);
script=script.replace(/__versionShoot__/g,__versionShoot__);


if(true){
var fs = new ActiveXObject("Scripting.FileSystemObject");
const ForReading = 1;
const ForWriting = 2;
const ForAppending = 8;
var file = fs.OpenTextFile("C:\\Users\\usaku\\Documents\\games\\2dDogFight\\Plane\\AI\\txtHeader"+__version__+".txt",ForWriting.toString(16),true);//trueでファイルがないとき新規作成
file.WriteLine(script);
file.close();
};



eval(script);




