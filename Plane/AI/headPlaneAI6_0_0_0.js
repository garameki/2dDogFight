

//ヘッダのバージョンとPlaneAIクラスのバージョンを同じにする


__version__='6_0_0_0';


__versionPlaneConstructor__='6_0';


if(!$test){
	__pathparts__='../Plane/AI/parts/';//action.html基準
}else{
	__pathparts__='./parts/';//htmHeaderTest.html基準
};

__versionMotion__	='6_0';
__versionAngle__	='6_0';
__versionShoot__	='6_0';
__versionSpeed__	='6_0';
__versionCollision__	='6_0';
//○__versionStatus__	='6_0';

__timestamp__=new Date();

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


	var fnames=new Array();

	//PlaneAIの部品
	fnames.push('procMotion__versionMotion__');
	fnames.push('procEvaluateAngle__versionAngle__');
	fnames.push('procEvaluateCollision__versionCollision__');
	fnames.push('procEvaluateSpeed__versionSpeed__');
	fnames.push('procEvaluateShoot__versionShoot__');
//○	fnames.push('procPrintStatus__versionStatus__');//●
	fnames.push('classPlaneConstructor__versionPlaneConstructor__');//●
	
	//headerのidを取得
	var headId=document.getElementsByTagName("head")[0];
	var tagNew;
	for(var ii=0;ii<fnames.length;ii++){
		tagNew = document.createElement("script");
		tagNew.setAttribute("type","text/javascript");
		tagNew.setAttribute("src",folda+fnames[ii]+'.js');
		tagNew.setAttribute("charset","Shift_JIS");
		headId.appendChild(tagNew);
	};

	//ここでplaneの機能拡張 proc*はPlaneAIの中でプロシージャとして使われます。
	var counter=0;
	var hoge = setInterval(function(){




		var conMotion = 'Motion__versionMotion__' in window;
		var conAngle = 'EvaluateAngle__versionAngle__' in window;
		var conCollision = 'EvaluateCollision__versionCollision__' in window;
		var conSpeed = 'EvaluateSpeed__versionSpeed__' in window;
		var conShoot = 'EvaluateShoot__versionShoot__' in window;
//○		var conStatus = 'PrintStatus__versionStatus__' in window;
		var conPlaneConstructor = 'PlaneConstructor__versionPlaneConstructor__' in window;

	var con = conMotion && conAngle && conCollision && conSpeed && conShoot && conPlaneConstructor;
//○	var con = conMotion && conAngle && conCollision && conSpeed && conShoot && conStatus && conPlaneConstructor;
		if(con){
			//新しいサブクラスを作成
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
				eval("PlaneConstructor__versionPlaneConstructor__.call(this,"+args+");");			
			};
			inherits(PlaneAI__version__,PlaneConstructor__versionPlaneConstructor__);

			PlaneAI__version__.prototype.namePlane = 'PlaneAI__version__';
			PlaneAI__version__.prototype.procMotion=Motion__versionMotion__;//各ファイルの中の関数名を使います
			PlaneAI__version__.prototype.procCollision=EvaluateCollision__versionCollision__;
			PlaneAI__version__.prototype.procAngle=EvaluateAngle__versionAngle__;
			PlaneAI__version__.prototype.procSpeed=EvaluateSpeed__versionSpeed__;
			PlaneAI__version__.prototype.procShoot=EvaluateShoot__versionShoot__;
//○			PlaneAI__version__.prototype.procPrintStatus=PrintStatus__versionStatus__;

			console.info("'PlaneAI__version__'が使えます！");
			//console.info("headerPlaneAI__version__ の準備が出来ました。 !");
			clearInterval(hoge);
		};

		if(++counter>20 || flagStop){
			clearInterval(hoge);
			flagStop=true;
			if(!conMotion)	console.error("headPlaneAI__version__.js     'Motion__versionMotion__'が定義されていません");
			if(!conAngle)	console.error("headPlaneAI__version__.js     'Angle__versionAngle__'が定義されていません");
			if(!conCollision)	console.error("headPlaneAI__version__.js     'Collision__versionCollision__'が定義されていません");
			if(!conSpeed)	console.error("headPlaneAI__version__.js     'Speed__versionSpeed__'が定義されていません");
			if(!conShoot)	console.error("headPlaneAI__version__.js     'Shoot__versionShoot__'が定義されていません");
//○			if(!conStatus)	console.error("headPlaneAI__version__.js     'PrintStatus__versionStatus__'が定義されていません");
			if(!conPlaneConstructor)console.error("headPlaneAI__version__.js     'PlaneConstructor__versionPlaneConstructor__'が定義されていません");
		};
	},100);

};

*/});

script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
script=script.replace(/__timestamp__/g,__timestamp__);
script=script.replace(/__version__/g,__version__);
script=script.replace(/__versionPlaneConstructor__/g,__versionPlaneConstructor__);
script=script.replace(/__pathparts__/g,__pathparts__);
script=script.replace(/__versionMotion__/g,__versionMotion__);
script=script.replace(/__versionAngle__/g,__versionAngle__);
script=script.replace(/__versionSpeed__/g,__versionSpeed__);
script=script.replace(/__versionCollision__/g,__versionCollision__);
script=script.replace(/__versionShoot__/g,__versionShoot__);
//○script=script.replace(/__versionStatus__/g,__versionStatus__);//●


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
