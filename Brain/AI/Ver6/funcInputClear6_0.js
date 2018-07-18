

		//  ●  入力層(前回)と入力層(今回)を入れ替え、新・入力層(今回)をクリア
var InputClear6_0 = function(){//これから入力を行うinput変数の中身を0にする
	this.nameInputClear='InputClear6_0';
	this.progressInputClear='input[ii]を廃止。numImaを採用。';


	//スパンとスパンの継ぎ目に入れる
	if(this.numZenkai==0){
		this.numZenkai=1;
		this.numKonkai=0;
	}else{
		this.numZenkai=0;
		this.numKonkai=1;
	};

	this.numIma++;
	if(this.numIma==this.NSpan)this.numIma=0;


//○	for(var ii=0;ii<aiself.input[aiself.numKonkai].length;ii++)aiself.input[aiself.numKonkai][ii]=0;


};

console.log("funcInputClear6_0.js");
