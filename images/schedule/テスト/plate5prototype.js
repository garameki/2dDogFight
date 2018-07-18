//ファイルの関係性関連
plate5JS=null;
FR.push(new FileRelative("libraryJS","plate5JS"));
FR.push(new FileRelative("modalWindowInput3JS","plate5JS"));
FR.push(new FileRelative("modalWindowYesNo2JS","plate5JS"));
FR.push(new FileRelative("ita2JS","plate5JS"));




//Plateクラス関数

var Plate_plates = new Array();//作成したplateをしまう配列
var Plate_numIdCanvas=new Counter(0);

var Plate_zIndexOrder = function(arr){


	//中央値を決めて左右に分けよう。
	var order = function(arr){
		var len,sum,med;
		var small,large;
		var smalls=new Array();
		var larges=new Array();

		sum=0;
		len=arr.length;
		if(len==1)return arr;
		if(len==0)return [];

		for(var ii=0;ii<len;ii++){
			sum+=arr[ii];
		};
		med=sum/len;

		for(var ii=0;ii<len;ii++){
			if(arr[ii]>med){
				larges.push(arr[ii]);
			}else{
				smalls.push(arr[ii]);
			};
		};
		small=order(smalls);
		large=order(larges);
		small.splice(small.length,0,large);
		return small;
	};

	var res = order(arr);
	return res;
};


var arr=[5,4,6,8,9,3,7,2,1];
console.log("arr=",Plate_zIndexOrder(arr));




//ここに、treeのbottomとany treeのtopの距離が最も短いものを見つけるスクリプトを書いて
//上の結果と比べて、距離の短いものを優先させる

//戻り値は、近い者同士のnodeと(top or bottom)をそれぞれ１組づつ返す












var Plate = function(name){

	Ita.call(this,name);





	Plate_plates.push(myself);//クラス変数

};
inherits(Plate,Ita);
