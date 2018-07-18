




//*.prototype.も直してね


var Weight30_0 = function(filename){

	this.name='Weight30_0';//●


		//ここでは、経験の累積であるweightのみを扱います
		//各量の量子化後の状態の数
	Nqtheta=8;
	Nqlambda=8;
	Nqsp=4;
	Nqdis=7;

		//十進数変換のための数を求める
	Ldis = 1;
	Lsp = Ldis * Nqdis;
	Llambda = Lsp * Nqsp;
	Ltheta = Llambda * Nqlambda;

	this.Nqtheta=Nqtheta;
	this.Nqlambda=Nqlambda;
	this.Nqsp=Nqsp;
	this.Nqdis=Nqdis;
	this.Ldis=Ldis;
	this.Lsp=Lsp;
	this.Llambda=Llambda;
	this.Ltheta=Ltheta;	

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
	this.Nmid11 = 30;
	this.Nmid12 = 30;
	this.Nmid13 = 30;

		//入力層と第一中間層をつなぐweightも作る
		//weight[im11][qtheta][qlambda][qsp][qdis]
		//を仮に考え、次のように変換する
		//weight[qtheta*Ltheta+qlambda*Ltheta+qsp*Lsp+qdis*Ldis][this.Nmid11]
		//こうすることで、中間層のどのノードの重みなのかがわかりやすい。→速度よりもわかりやすさを重視した

	var pp;
	pp=Nqtheta*Nqlambda*Nqsp*Nqdis;
	this.weight11 = new Array(pp);
	for(var ii=0;ii<pp;ii++){
		this.weight11[ii]=new Array(this.Nmid11);
		for(var kk=0;kk<this.Nmid11;kk++)this.weight11[ii][kk]=2*Math.random()-1;
	};
	pp=Nqtheta*Nqlambda*Nqsp*Nqdis;
	this.weight12 = new Array(pp);
		for(var ii=0;ii<pp;ii++){
		this.weight12[ii]=new Array(this.Nmid12);
		for(var kk=0;kk<this.Nmid12;kk++)this.weight12[ii][kk]=2*Math.random()-1;
	};
	pp=Nqtheta*Nqlambda*Nqsp*Nqdis;
	this.weight13 = new Array(pp);
	for(var ii=0;ii<pp;ii++){
		this.weight13[ii]=new Array(this.Nmid13);
		for(var kk=0;kk<this.Nmid13;kk++)this.weight13[ii][kk]=2*Math.random()-1;
	};
	this.pp=pp;


		//第一中間層と出力ノードを繋ぐweightも作る


	this.weight21 = new Array(this.Nmid11);
	this.weight22 =new Array(this.Nmid12);
	this.weight23 =new Array(this.Nmid13);

	for(var ii=0;ii<this.Nmid11;ii++)this.weight21[ii]=2*Math.random()-1; 
	for(var ii=0;ii<this.Nmid12;ii++)this.weight22[ii]=2*Math.random()-1; 
	for(var ii=0;ii<this.Nmid13;ii++)this.weight23[ii]=2*Math.random()-1; 


	this.filename=filename;//●weightをしまっておくファイル(変更しやすいようにaction.jsで定義する)
	this.readWeight();//●
};
Weight30_0.prototype.decode = function(number){

	var qtheta = Math.floor(number /this.Ltheta);
	number-=qtheta*this.Ltheta;
	var qlambda = Math.floor(number/this.Llambda);
	number-=qlambda*this.Llambda;
	var qsp = Math.floor(number/this.Lsp);
	var qdis = number - qsp*this.Lsp;

	return qtheta.toString()+" "+qlambda.toString()+" "+qsp.toString()+" "+qdis.toString();
};


Weight30_0.prototype.readWeight = function(){



	//ファイルのweightを読み込む
	var fs = new ActiveXObject("Scripting.FileSystemObject");

	if(fs.FileExists(this.filename)){
		var ForReading = 1;
		var ForWriting = 2;
		var ForAppending = 8;
		var file = fs.OpenTextFile(this.filename,ForReading.toString(16),false);
		var accum=new Array();
		while(!file.AtEndOfStream) {
			var str = file.ReadLine();
			accum.push(parseFloat(str));
		};
		file.close();
		var count=0;
		for(var ii=0;ii<this.weight11.length;ii++){
			for(var kk=0;kk<this.weight11[ii].length;kk++){
				this.weight11[ii][kk]=accum[count];
				count++;
			};
		};
		for(var ii=0;ii<this.weight21.length;ii++){
			this.weight21[ii]=accum[count];
			count++;
		};
		for(var ii=0;ii<this.weight12.length;ii++){
			for(var kk=0;kk<this.weight12[ii].length;kk++){
				this.weight12[ii][kk]=accum[count];
				count++;
			};
		};
		for(var ii=0;ii<this.weight22.length;ii++){
			this.weight22[ii]=accum[count];
			count++;
		};
		for(var ii=0;ii<this.weight13.length;ii++){
			for(var kk=0;kk<this.weight13[ii].length;kk++){
				this.weight13[ii][kk]=accum[count];
				count++;
			};
		};
		for(var ii=0;ii<this.weight23.length;ii++){	
			this.weight23[ii]=accum[count];
			count++;
		};
		info.text("read n="+count.toString());

		//make check-sum
		var sum=0;
		for(var ii=0;ii<this.weight12.length;ii++){
			for(var kk=0;kk<this.weight12[ii].length;kk++){
				sum+=this.weight12[ii][kk];
			};
		};
		info.text("check sum="+sum.toString());
	}else{
		info.caution("ファイルが存在しません。weightを初期化して使います。");
	};
};



Weight30_0.prototype.flagWritten=false;//少し前に書き込みがあったらtrue
Weight30_0.prototype.writeWeight = function(){
	//ファイルにweightを書き込む


	if(!this.flagWritten){
		this.flagWritten=true;
		var self=this;
		var count=0;
		var hogeWritten = setInterval(function(){//2秒後に値を戻す
			clearInterval(hogeWritten);
			self.flagWritten=false;
		},2000);
		var fs = new ActiveXObject("Scripting.FileSystemObject");
		var ForReading = 1;
		const ForWriting = 2;
		var ForAppending = 8;
		var file = fs.OpenTextFile(this.filename,ForWriting.toString(16),true);
		for(var ii=0;ii<this.weight11.length;ii++){
			for(var kk=0;kk<this.weight11[ii].length;kk++){
				count++;
				file.WriteLine(this.weight11[ii][kk]);
		}};
		for(var ii=0;ii<this.weight21.length;ii++){
			count++;
			file.WriteLine(this.weight21[ii]);
		};
		for(var ii=0;ii<this.weight12.length;ii++){
			for(var kk=0;kk<this.weight12[ii].length;kk++){
				count++;
				file.WriteLine(this.weight12[ii][kk]);
		}};
		for(var ii=0;ii<this.weight22.length;ii++){
			count++;
			file.WriteLine(this.weight22[ii]);
		};
		for(var ii=0;ii<this.weight13.length;ii++){
			for(var kk=0;kk<this.weight13[ii].length;kk++){
			count++;
				file.WriteLine(this.weight13[ii][kk]);
		}};
		for(var ii=0;ii<this.weight23.length;ii++){
			count++;
			file.WriteLine(this.weight23[ii]);
		};
		file.close();

		info.text("writeWeight n="+count.toString());
		info.text(this.name+".writeWeightwrote() was executed.");

		//make check-sum
		var sum=0;
		for(var ii=0;ii<this.weight12.length;ii++){
			for(var kk=0;kk<this.weight12[ii].length;kk++){
				sum+=this.weight12[ii][kk];
			};
		};
		info.text("check sum="+sum.toString());

	}else{
		info.caution(this.name+".writeWeight() was skipped. ");
	};

};


/*



//Canvas*の変数は変更されたかもしれません

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


//プロシージャ
var PrintStateOfWeightDifference = function (context,bww,ww,hh) {
	var ctx=context;
	var cellWidth=ww;
	var cellHeight=hh;
	var boxWidth=bww;

	const N = ww1.weight11.length*ww1.weight11[0].length+ww1.weight12.length*ww1.weight12[0].length+ww1.weight21.length+ww1.weight22.length;
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
		for(var ii=0;ii<ww1.weight11.length;ii++){
			for(var kk=0;kk<ww1.weight11[ii].length;kk++){
				accum[numIma][count]=ww1.weight11[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<ww1.weight21.length;ii++){
			accum[numIma][count]=ww1.weight21[ii];
			count++;
		};
		for(var ii=0;ii<ww1.weight12.length;ii++){
			for(var kk=0;kk<ww1.weight12[ii].length;kk++){
				accum[numIma][count]=ww1.weight12[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<ww1.weight22.length;ii++){
			accum[numIma][count]=ww1.weight22[ii];
			count++;
		};
		for(var ii=0;ii<ww1.weight13.length;ii++){
			for(var kk=0;kk<ww1.weight13[ii].length;kk++){
				accum[numIma][count]=ww1.weight13[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<ww1.weight23.length;ii++){
			accum[numIma][count]=ww1.weight23[ii];
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

	const N = ww1.weight11.length*ww1.weight11[0].length+ww1.weight12.length*ww1.weight12[0].length+ww1.weight21.length+ww1.weight22.length;
	var accum=new Array(N);


	var count=0;
	return function(){

		count=0;
		for(var ii=0;ii<ww1.weight11.length;ii++){
			for(var kk=0;kk<ww1.weight11[ii].length;kk++){
				accum[count]=ww1.weight11[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<ww1.weight21.length;ii++){
			accum[count]=ww1.weight21[ii];
			count++;
		};
		for(var ii=0;ii<ww1.weight12.length;ii++){
			for(var kk=0;kk<ww1.weight12[ii].length;kk++){
				accum[count]=ww1.weight12[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<ww1.weight22.length;ii++){
			accum[count]=ww1.weight22[ii];
			count++;
		};
		for(var ii=0;ii<ww1.weight13.length;ii++){
			for(var kk=0;kk<ww1.weight13[ii].length;kk++){
				accum[count]=ww1.weight13[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<ww1.weight23.length;ii++){
			accum[count]=ww1.weight23[ii];
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


*/


console.log("classWeight30_0.js");
