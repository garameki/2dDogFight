

//改良点
//weight.txtの場所をaction.htmのonloadに移す





	//●AI3のグローバル変数

//→これをaction.htmに移す
//kkkkk	const FilenameWeight = 'C:\\Users\\usaku\\Documents\\games\\2dDogFight\\AI\\Ver4\\ai4weight.txt';





//ここでは、経験の累積であるweightのみを扱います
		//各量の量子化後の状態の数
Nqtheta=8;
Nqlambda=8;
Nqsp=4;
Nqdis=7;

	//十進数変換のための数を求める
Ldis = 1
Lsp = Ldis * Nqdis;
Llambda = Lsp * Nqsp;
Ltheta = Llambda * Nqlambda;

	//量子化後の状態を次の座標で表すことにする
	//(qtheta,qlambda,qsp,qdis)→4次元
	//これを言い換えるとthetaを桁の一番大きいものとして、順番に、qdisを桁の一番小さいものとすると、それぞれがN*進数の一つの数と捉えることが出来る	

	//これを次の式で10進数を用いた直線（一次元)に置き換えることにする
	//qtheta*Ltheta+qlambda*Llambda+qsp*Lsp+qdis*Ldis
	//ここでL*は１０進数における、増分を示す。
	//L*は次のように求めることができる。まずは小さい桁からはじめて、最後に大きい桁を順番に求めていく
	//Ldis = 1;ここは必ず1である
	//Lsp = Ldis * Nqdis = 1 * 7 = 7;
	//Llambda = Lsp * Nqsp = 7 * 3 = 21;
	//Ltheta = Llambda * Nqlambda = 21 *  8 = 168;
	//　※　N*とNpre*は状態数なので等しい。

	//以上をもちいると、4次元配列は次のように1次元配列に変換できる
	//input[qtheta][qlambda][qsp][qdis]
	//=input[qtheta*Ltheta+qlambda*Llambda+qsp*Lsp+qdis*Ldis]

	//初期設定は次のように行う
	//input = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);

	//forループなどの繰り返しの多重入れ子状態を回避でき、そのうえ、状態を意識せず行う操作においては(中間層への転写、初期化など)
	//その操作は簡便に行える。


	//第一中間層を二つの出力があるために二つ作る
	//第一中間層の1番目と2番目のノードの数
Nm11 = 30;
Nm12 = 30;
Nm13 = 30;

	//入力層と第一中間層をつなぐweightも作る
	//weight[im11][qtheta][qlambda][qsp][qdis]
	//を仮に考え、次のように変換する
	//weight[qtheta*Ltheta+qlambda*Ltheta+qsp*Lsp+qdis*Ldis][Nm11]
	//こうすることで、中間層のどのノードの重みなのかがわかりやすい。→速度よりもわかりやすさを重視した

weight11 = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
for(var ii=0;ii<weight11.length;ii++){
	weight11[ii]=new Array(Nm11);
	for(var kk=0;kk<weight11[ii].length;kk++)weight11[ii][kk]=2*Math.random()-1;
};
weight12 = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
for(var ii=0;ii<weight12.length;ii++){
	weight12[ii]=new Array(Nm12);
	for(var kk=0;kk<weight12[ii].length;kk++)weight12[ii][kk]=2*Math.random()-1;
};
weight13 = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
for(var ii=0;ii<weight13.length;ii++){
	weight13[ii]=new Array(Nm13);
	for(var kk=0;kk<weight13[ii].length;kk++)weight13[ii][kk]=2*Math.random()-1;
};

	//第一中間層と出力ノードを繋ぐweightも作る


weight21 = new Array(Nm11);
weight22 =new Array(Nm12);
weight23 =new Array(Nm13);

for(var ii=0;ii<weight21.length;ii++)weight21[ii]=2*Math.random()-1; 
for(var ii=0;ii<weight22.length;ii++)weight22[ii]=2*Math.random()-1; 
for(var ii=0;ii<weight23.length;ii++)weight23[ii]=2*Math.random()-1; 

	//●プロシージャ

//weightの状態は最初は表示しない
var flagPrintWeight=false;
var flagPrintWeightDifference=false;

var flagPSOWStop=false;
var hogePSOW = setInterval(function(){
	if('PrintStateOfWeight' in window && 'PrintStateOfWeightDifference' in window){

		var canvasNew = document.createElement('canvas');
		canvasNew.setAttribute('id','weight');
		canvasNew.setAttribute('width',CanvasWidth.toString());
		canvasNew.setAttribute('height',CanvasHeight.toString());
		canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:15;');
		DivTop.appendChild(canvasNew);
		var ctx=canvasNew.getContext('2d');
		ctx.globalAlpha = 0.8;




		var pw = new PrintStateOfWeight(ctx,500,1,1);
		var pwd = new PrintStateOfWeightDifference(ctx,500,1,1);

		var hogePW = setInterval(function(){

			if(gW){
				gW=false;//連続押しが効かないようにする
				if(flagPrintWeight){
					flagPrintWeight=false;
					flagPrintWeightDifference=true;
				}else if(flagPrintWeightDifference){
					flagPrintWeightDifference=false;
				}else{
					flagPrintWeight=true;
				};
			};

//			ctx.clearRect(0,0,boxWidth*cellWidth,(accum.length/boxWidth+1)*cellHeight);
			ctx.clearRect(0,0,500,500);

			if(flagPrintWeight){
					pw();
			}else if(flagPrintWeightDifference){
				pwd();
			};

			if(flagStop)clearInterval(hogePW);		

		},3000);
		flagPSOWStop=true;
	};
	if(flagPSOWStop || flagStop)clearInterval(hogePSOW);
},100);


var ai4_readWeight = function(){
	//ファイルのweightを読み込む
	var fs = new ActiveXObject("Scripting.FileSystemObject");

	var ForReading = 1;
	var ForWriting = 2;
	var ForAppending = 8;
	var file = fs.OpenTextFile(FilenameWeight,ForReading.toString(16),false);
	var accum=new Array();
	while(!file.AtEndOfStream) {
		var str = file.ReadLine();
		accum.push(parseFloat(str));
	};
	file.close();
	var count=0;
	for(var ii=0;ii<weight11.length;ii++){
		for(var kk=0;kk<weight11[ii].length;kk++){
			weight11[ii][kk]=accum[count];
			count++;
		};
	};
	for(var ii=0;ii<weight21.length;ii++){
		weight21[ii]=accum[count];
		count++;
	};
	for(var ii=0;ii<weight12.length;ii++){
		for(var kk=0;kk<weight12[ii].length;kk++){
			weight12[ii][kk]=accum[count];
			count++;
		};
	};
	for(var ii=0;ii<weight22.length;ii++){
		weight22[ii]=accum[count];
		count++;
	};
	for(var ii=0;ii<weight13.length;ii++){
		for(var kk=0;kk<weight13[ii].length;kk++){
			weight13[ii][kk]=accum[count];
			count++;
		};
	};
	for(var ii=0;ii<weight23.length;ii++){
		weight23[ii]=accum[count];
		count++;
	};

	info.text("read weight from file !");
};


var ai4_writeWeight = function(){
	//ファイルにweightを書き込む
if(true){
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var ForReading = 1;
	const ForWriting = 2;
	var ForAppending = 8;
	var file = fs.OpenTextFile(FilenameWeight,ForWriting.toString(16),true);//trueでファイルがないとき新規作成
	for(var ii=0;ii<weight11.length;ii++){
		for(var kk=0;kk<weight11[ii].length;kk++){
			file.WriteLine(weight11[ii][kk]);
	}};
	for(var ii=0;ii<weight21.length;ii++){
		file.WriteLine(weight21[ii]);
	};
	for(var ii=0;ii<weight12.length;ii++){
		for(var kk=0;kk<weight12[ii].length;kk++){
			file.WriteLine(weight12[ii][kk]);
	}};
	for(var ii=0;ii<weight22.length;ii++){
		file.WriteLine(weight22[ii]);
	};
	for(var ii=0;ii<weight13.length;ii++){
		for(var kk=0;kk<weight13[ii].length;kk++){
			file.WriteLine(weight13[ii][kk]);
	}};
	for(var ii=0;ii<weight23.length;ii++){
		file.WriteLine(weight23[ii]);
	};
	file.close();

	info.text("wrote weight into file !");
}else{
	info.caution("weight haven't writen into file ");
};//true/false

};

//プロシージャ
var PrintStateOfWeightDifference = function (context,bww,ww,hh) {
	var ctx=context;
	var cellWidth=ww;
	var cellHeight=hh;
	var boxWidth=bww;

	const N = weight11.length*weight11[0].length+weight12.length*weight12[0].length+weight21.length+weight22.length;
	var preaccum=new Array(N);
	for(ii=0;ii<N;ii++)preaccum[ii]=0;


	var accum=new Array(2);
	accum[0]=new Array(N);
	accum[1]=new Array(N);
	var numKako=1;
	var numIma=0;


	var count=0;
	return function(){

		count=0;
		for(var ii=0;ii<weight11.length;ii++){
			for(var kk=0;kk<weight11[ii].length;kk++){
				accum[numIma][count]=weight11[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight21.length;ii++){
			accum[numIma][count]=weight21[ii];
			count++;
		};
		for(var ii=0;ii<weight12.length;ii++){
			for(var kk=0;kk<weight12[ii].length;kk++){
				accum[numIma][count]=weight12[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight22.length;ii++){
			accum[numIma][count]=weight22[ii];
			count++;
		};
		for(var ii=0;ii<weight13.length;ii++){
			for(var kk=0;kk<weight13[ii].length;kk++){
				accum[numIma][count]=weight13[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight23.length;ii++){
			accum[numIma][count]=weight23[ii];
			count++;
		};

		var x=0;
		var y=0;
		count=0;
		for(var ii=0;ii<accum[numIma].length;ii++){
			y=Math.floor(count/boxWidth)*cellHeight;
			x=(count % boxWidth)*cellWidth;
			if(accum[numIma][ii]>accum[numKako][ii]){
				ctx.fillStyle="rgb(200,0,0)";
			}else if(accum[numIma][ii]<accum[numKako][ii]){
				ctx.fillStyle="rgb(0,0,200)";
			}else{
				ctx.fillStyle="rgb(0,200,0)";
			};

			ctx.fillRect(x,y,cellWidth,cellHeight);
			count++;
		};


		if(numIma==0){
			numIma=1;
			numKako=0;
		}else{
			numIma=0;
			numKako=1;
		};


//console.log("write",accum.length,boxWidth,cellWidth,cellHeight);

	};//return
};

//プロシージャ
var PrintStateOfWeight = function (context,bw,ww,hh) {
	var ctx=context;
	var cellWidth=ww;
	var cellHeight=hh;
	var boxWidth=bw;

	const N = weight11.length*weight11[0].length+weight12.length*weight12[0].length+weight21.length+weight22.length;
	var accum=new Array(N);


	var count=0;
	return function(){

		count=0;
		for(var ii=0;ii<weight11.length;ii++){
			for(var kk=0;kk<weight11[ii].length;kk++){
				accum[count]=weight11[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight21.length;ii++){
			accum[count]=weight21[ii];
			count++;
		};
		for(var ii=0;ii<weight12.length;ii++){
			for(var kk=0;kk<weight12[ii].length;kk++){
				accum[count]=weight12[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight22.length;ii++){
			accum[count]=weight22[ii];
			count++;
		};
		for(var ii=0;ii<weight13.length;ii++){
			for(var kk=0;kk<weight13[ii].length;kk++){
				accum[count]=weight13[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight23.length;ii++){
			accum[count]=weight23[ii];
			count++;
		};
		var x=0;
		var y=0;
		count=0;
		for(var ii=0;ii<accum.length;ii++){
			y=Math.floor(count/boxWidth)*cellHeight;
			x=(count % boxWidth)*cellWidth;

			if(accum[ii]>0){
				ctx.fillStyle="rgb(200,0,0)";
			}else if(accum[ii]<0){
				ctx.fillStyle="rgb(0,0,200)";
			}else{
				ctx.fillStyle="rgb(0,200,0)";
			};

			ctx.fillRect(x,y,cellWidth,cellHeight);
			count++;
		};



//console.log("write",accum.length,boxWidth,cellWidth,cellHeight);

	};//return
};


console.log("aiGlobalVariables4_0.js   ready");



//以下サンプル
//var file = fs.OpenTextFile("C:\\users\\usaku\\Documents\\games\\2dDogFight\\ai2weight.txt",ForWriting,true);//trueファイルがない時に新規作成する
//	file.WriteLine("set RUBY_CGI_username="+eName.value+"\n");
//	file.WriteLine("set RUBY_CGI_password="+ePassword.value+"\n");
//	file.WriteLine("\n");
//	file.WriteLine("ruby -C"+pathCGI_Entity+" "+filenameCGI_Entity+"||pause\n");
//	file.WriteLine("\n");
//var file = fs.OpenTextFile("C:\\users\\usaku\\Documents\\games\\2dDogFight\\ai2\\ai2weight.txt",ForReading);
//	console.error("ai2_globalVariables.js     ai2のファイルが見つかりません");
//	var hogeBB = setInterval(function(){
///		clearInterval(hogeBB);
//		stopSprites();
//	},1000);
//if(file!=false && file!=-1 && file!=null)file.close();
//};


