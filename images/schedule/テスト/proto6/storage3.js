storageJS=null;

/*
開発履歴
3	escape(),unescape()をencodeURIComponent(),decodeURIComponent()に変更

	setItemにexpireを使い、30日間はcookieを保存するようにした。
*/

//test
var nDate=Date.now()+30*24*60*60*1000;
console.log("date=",nDate,typeof nDate);
var sDate=new Date(nDate);
console.log("date=",sDate.toGMTString(),typeof sDate);


if (!window.localStorage) {

	/*
		オブジェクトとは { } のことです。


		Object.defineProperty(obj,sVariable,setting)
			obj:プロパティーを追加したいオブジェクト
			sVariable:プロパティーの名前	
			setting:{ }の中にvalue:,writable:,configurable:,enumerable:を使ったディスクプリタとしての設定と、this.get=function(){ return hoge; },this.set=function(value){ hoge=value; }を用いたゲッター、セッターとしての設定の2種類のどちらかを設定する
				ちなみにvalueとgetを混在させるとエラーになる
				getはobj.sVariableで呼び出され、
				setはobj.sVariable=hogeで呼び出され、hogeが引数としてsetに渡される
	*/




	console.log("cookie strage");

	Object.defineProperty(window, "localStorage", new (function () {
    		var aKeys = [];//キーの一覧
		var oStorage = {};//空のハッシュ
    		Object.defineProperty(oStorage, "getItem", {
      			value: function (sKey) {//storage.getItem.value(キー)と使用するのは間違い。storage.getItem(キー)とする。
				return sKey ? this[sKey] : null;//sKeyが指定されていないとnullを返す。sKeyがキーとして存在しない場合はundefinedを返す
			},
      			writable: false,
      			configurable: false,
      			enumerable: false
    		});
    		Object.defineProperty(oStorage, "key", {
			value: function (nKeyId) {
				return aKeys[nKeyId];
			},
      			writable: false,
      			configurable: false,
      			enumerable: false
		});
    		Object.defineProperty(oStorage, "setItem", {//キー=値;をクッキーに追加する
     			value: function (sKey, sValue) {
				if(!sKey) {
					return;
				};

				var daysKigen=30;
				var nDate=Date.now()+daysKigen*24*60*60*1000;
//console.log("date=",nDate,typeof nDate);
				var sDate=(new Date(nDate)).toGMTString();
//console.log("date=",sDate);

        				document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + ";expires="+sDate+"; path=/";//クッキーの追加!!
console.log("storageJS addition  document.cookie=",document.cookie.length);
console.log(localStorage.length);
 			},
      			writable: false,
      			configurable: false,
      			enumerable: false
    		});
    		Object.defineProperty(oStorage, "length", {
			get: function () {
				return aKeys.length;
			},
      			configurable: false,
      			enumerable: false
		});
    		Object.defineProperty(oStorage, "removeItem", {
      			value: function (sKey) {
				if(!sKey) { return; }
        				var sExpDate = new Date();
        				sExpDate.setDate(sExpDate.getDate() - 1);//1日前の日付を生成
        				document.cookie = encodeURIComponent(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";//expiresをキーに付けて過去のデータ(使用期限切れ)とする
			},
      			writable: false,
      			configurable: false,
      			enumerable: false
		});
//console.log("storageJS this=",this);
    		this.get = function () {//アクセサディスクプリタはオプションとして次のキーを持つことができます。->どういうこと？
			var iThisIndx;
      			for (var sKey in oStorage) {//oStorageオブジェクトの各propertyが順不同でsKeyに代入される
        				iThisIndx = aKeys.indexOf(sKey);//aKeysの中のsKeyが現れた番号を返す。ない場合は-1を返す
        				if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }//もしaKeysの中にsKeyがない場合、ハッシュのキーとハッシュの値をoStorageにsetItemする
        				else { aKeys.splice(iThisIndx, 1); }//もしaKeysの中にsKeyがある場合、aKeyのiThisIndx番目の要素を取り除く。つまり、aKeysからsKeyを取り除く
        				delete oStorage[sKey];//ハッシュoStorageからsKeyの指す要素を削除する（のだが、配列の長さは保持。sKeyは参照不可になる）
      			}
			for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {//配列aKeysの要素を一つずつ削除し、要素がなくなるまで繰り返す
				oStorage.removeItem(aKeys[0]);//次に配列から削除される要素aKeys[0]を、削除される前に参照してcookieのペアを有効期限切れにする（削除ではない）
			};
			for (var iCouple, iKey, iCouplId = 0, aCouples = document.cookie.split(/\s*;\s*/); iCouplId < aCouples.length; iCouplId++) {//split(セパレータ)で、";"で区切られた文字列が配列となってaCouplesに代入される
 				iCouple = aCouples[iCouplId].split(/\s*=\s*/);//今度は"="をセパレータとして要素数２の配列を生成
				if (iCouple.length > 1) {//"="で結ばれていた文字列対だけが処理される
//console.log("iCouple[0]=",iCouple[0],"1=",iCouple[1]);
        					oStorage[iKey = decodeURIComponent(iCouple[0])] = decodeURIComponent(iCouple[1]);//"="の左をキーに、右側を値にして、ハッシュoStorageにしまう
          					aKeys.push(iKey);//すべてのキーを一元的に管理するためにaKeysに保存
        				}
      			}
//console.log("storageJS aKeys=",aKeys);
      			return oStorage;
    		};

 		this.configurable = false;
    		this.enumerable = true;
	})());
}
