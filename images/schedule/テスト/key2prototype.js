//ファイルの関係性関連
key2JS=null;
FR.push(new FileRelative("libraryJS","key2JS"));
FR.push(new FileRelative("modalWindowInput3JS","key2JS"));
FR.push(new FileRelative("modalWindowYesNo2JS","key2JS"));
FR.push(new FileRelative("ita2JS","key2JS"));

//Keyクラス関数


var Key_keys = new Array();//作成したkeyをしまう配列

var Key = function(name){

	Ita.call(this,name);

	Key_keys.push(myself);//クラス変数

};
inherits(Key,Ita);
