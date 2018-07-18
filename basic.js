console.log("graph/class_and_module.js------------------start");


//prototype chainを使うための関数
var inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};






var GraphLine = function (nIdTag,sIdResultJS,posZeroY) {

	//idResultJSの情報をnIdTagに折れ線グラフとして反映するのがこのクラス。

	this.sIdTag = String(nIdTag);//←グラフを表示するタグの認識票


	//result_*.jsのデータが入った変数を用意
	this.result = eval("result_"+sIdResultJS);



	var canvasNew = "";

	var canvasWidth = 1850;
	var canvasHeight = 850;
	var canvasWidthPX = String(canvasWidth)+'px'+this.sIdTag;
	var canvasHeightPX = String(canvasHeight)+'px';

	//縦の罫線
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','gridX'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;');
	document.getElementById('grid_'+this.sIdTag).appendChild(canvasNew);
	//横の罫線
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','gridY'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('grid_'+this.sIdTag).appendChild(canvasNew);
	//グラフ線
	canvasNew = document.createElement('canvas');//ここに色見本が含まれる
	canvasNew.setAttribute('id','gridLines'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('grid_'+this.sIdTag).appendChild(canvasNew);
	//X軸の値
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','xCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('xAxis_'+this.sIdTag).appendChild(canvasNew);
	//Y軸の値
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','yCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('yAxis_'+this.sIdTag).appendChild(canvasNew);
	//グラフのタイトル
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','titleCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('lineTitle_'+this.sIdTag).appendChild(canvasNew);
	//Y軸のタイトル
	 canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','titleYCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('titleY_'+this.sIdTag).appendChild(canvasNew);
	//X軸のタイトル
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','titleXCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('titleX_'+this.sIdTag).appendChild(canvasNew);


	this.canvasLines = document.getElementById( 'gridLines'+this.sIdTag );
	var canvasGridX = document.getElementById( 'gridX'+this.sIdTag );
	var canvasGridY = document.getElementById( 'gridY'+this.sIdTag );
	var canvasX = document.getElementById( 'xCanvas'+this.sIdTag );
	var canvasY = document.getElementById( 'yCanvas'+this.sIdTag );



	var canvasTitle = document.getElementById( 'titleCanvas'+this.sIdTag );
	var canvasXTitle = document.getElementById( 'titleXCanvas'+this.sIdTag );
	var canvasYTitle = document.getElementById( 'titleYCanvas'+this.sIdTag );


	 this.contextLines = this.canvasLines.getContext( '2d' );

	 this.contextGX = canvasGridX.getContext( '2d' );

	 this.contextGY = canvasGridY.getContext( '2d' );
	 this.contextX = canvasX.getContext( '2d' );
	 this.contextY = canvasY.getContext( '2d' );

	 this.contextT = canvasTitle.getContext( '2d' );
	 this.contextXT = canvasXTitle.getContext( '2d' );
	 this.contextYT = canvasYTitle.getContext( '2d' );

	if( this.canvasLines.getContext && canvasX.getContext &&canvasY.getContext){
		//各パーツの大きさを決定(端末によって変えることになるであろう)
		 var screenWidth = document.getElementById('grid_'+this.sIdTag).width;
		 var screenHeight = document.getElementById('grid_'+this.sIdTag).height;
		 var linesWidth = 300;//***;
		 this.yAxisWidth = 80;//this.contextX.measureText('1000000000').width;//***;
console.log('this.result.dates[0]=',this.result.dates[0]);
		 var xAxisHeight=this.contextX.measureText(this.result.dates[0]).width*1.3;//***
		 var titleHeight = 50;//***
		 var titleXHeight = titleHeight;
		 this.titleYWidth = titleHeight;
console.log('this.result.dates[0]=',this.result.dates[0]);
		 this.gridHeight = screenHeight - titleHeight - xAxisHeight - titleXHeight;
		 var yAxisHeight = this.gridHeight;
		 this.titleYHeight = this.gridHeight;
		 var linesHeight = this.gridHeight;
		 this.gridWidth = screenWidth - this.yAxisWidth - linesWidth - this.titleYWidth;
		 this.titleWidth = this.gridWidth;
		 var xAxisWidth = this.gridWidth;
		 this.titleXWidth = this.gridWidth;

		//各パーツ画面の原点
		var screenX0=0;
		var screenY0=posZeroY;
		var titleX0=screenX0 + this.yAxisWidth + this.titleYWidth;
		var titleY0=screenY0;
		var yAxisX0=screenX0 + this.titleYWidth;
		var yAxisY0=screenY0 + titleHeight;
		var xAxisX0 = screenX0 + this.yAxisWidth + this.titleYWidth;
		var xAxisY0 = screenY0 + titleHeight + this.gridHeight;
		var linesX0 = screenX0 + this.titleYWidth + this.yAxisWidth + this.titleWidth;
		var linesY0 = screenY0 + titleHeight;
		var gridX0 = screenX0 + this.titleYWidth + this.yAxisWidth;
		var gridY0 = screenY0 + titleHeight;
		var titleYX0 = screenX0;
		var titleYY0 = screenY0 + titleHeight; 
		var titleXX0 = screenX0 + this.titleYWidth + this.yAxisWidth;
		var titleXY0 = screenY0 + titleHeight + this.gridHeight + xAxisHeight;




/*
		//各パーツの位置を確認
		 var context = canvasX.getContext('2d');

		context.beginPath();
		context.strokeRect(screenX0, screenY0,screenWidth,screenHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(titleX0,titleY0,this.titleWidth,titleHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(yAxisX0, yAxisY0,this.this.yAxisWidth,yAxisHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(gridX0, gridY0,this.gridWidth,this.gridHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(linesX0, linesY0,linesWidth,linesHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(xAxisX0, xAxisY0,xAxisWidth,xAxisHeight);
		context.closePath();
*/


		//htmlにある、それぞれの要素の位置と大きさを動的に決定する
		document.getElementById('elements_'+this.sIdTag).setAttribute('style','background-color:black;position:absolute;top:'+String(linesY0)+'px;left:'+String(linesX0)+'px;width:'+String(linesWidth)+'px;height:'+String(linesHeight)+'px;z-index:10;');
		document.getElementById('grid_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(gridY0)+'px;left:'+String(gridX0)+'px;width:'+String(this.gridWidth)+'px;height:'+String(this.gridHeight)+'px;z-index:10;');
		document.getElementById('lineTitle_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(titleY0)+'px;left:'+String(titleX0)+'px;width:'+String(this.titleWidth)+'px;height:'+String(titleHeight)+'px;');
		document.getElementById('yAxis_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(yAxisY0)+'px;left:'+String(yAxisX0)+'px;width:'+String(this.yAxisWidth)+'px;height:'+String(yAxisHeight)+'px;');
		document.getElementById('xAxis_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(xAxisY0)+'px;left:'+String(xAxisX0)+'px;width:'+String(xAxisWidth)+'px;height:'+String(xAxisHeight)+'px;');
		document.getElementById('titleX_'+this.sIdTag).setAttribute('style','background-color:black;position:absolute;top:'+String(titleXY0)+'px;left:'+String(titleXX0)+'px;width:'+String(this.titleXWidth)+'px;height:'+String(titleXHeight)+'px;');
		document.getElementById('titleY_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(titleYY0)+'px;left:'+String(titleYX0)+'px;width:'+String(this.titleYWidth)+'px;height:'+String(this.titleYHeight)+'px;');

	};


	//グラフを扱うための変数
	this.topY=0;
	this.bottomY=this.gridHeight;
	this.colorGrid = 'rgb(30,30,150)';//罫線の色




		



};//GraphLine

//どのタグにグラフを描くかを個票
GraphLine.prototype.sIdTag = "";

GraphLine.prototype.result = null;//グラフに用いるデータの詰まった変数
	//resultを使うことで、以下を省略
	//GraphLine.prototype.minYmoto=0;
	//GraphLine.prototype.maxYmoto=0;
	//GraphLine.prototype.title ="";
	//GraphLine.prototype.titleY="";
	//GraphLine.prototype.tan_i="";
	//GraphLine.prototype.titleX="";
	//GraphLine.prototype.dates=new Array;
	//GraphLine.prototype.itemNames = new Array;
	//GraphLine.prototype.pointXs = new Array;

//グラフに表すデータ
GraphLine.prototype.lines = new Array;
GraphLine.prototype.maxY= null;//0;
GraphLine.prototype.minY= null;//0;
GraphLine.prototype.maxYmoto = null;//result_*,jsから移す
GraphLine.prototype.minYmoto = null;//result_*.jsから移す







	//作図関係
	GraphLine.prototype.canvasLines = null;//document.getElementById( 'gridLines'+this.sIdTag );
	GraphLine.prototype.contextLines = null;//this.canvasLines.getContext( '2d' );
	GraphLine.prototype.contextGX = null;//canvasGridX.getContext( '2d' );
	GraphLine.prototype.contextGY = null;//canvasGridY.getContext( '2d' );
	GraphLine.prototype.contextX = null;//canvasX.getContext( '2d' );
	GraphLine.prototype.contextY = null;//canvasY.getContext( '2d' );
	GraphLine.prototype.contextT = null;//canvasTitle.getContext( '2d' );
	GraphLine.prototype.contextXT = null;//canvasXTitle.getContext( '2d' );
	GraphLine.prototype.contextYT = null;//canvasYTitle.getContext( '2d' );
	GraphLine.prototype.yAxisWidth = null;//80;//this.contextX.measureText('1000000000').width;//***;
	GraphLine.prototype.titleYWidth = null;//titleHeight;
	GraphLine.prototype.gridHeight = null;//screenHeight - titleHeight - xAxisHeight - titleXHeight;
	GraphLine.prototype.titleYHeight = null;// this.gridHeight;
	GraphLine.prototype.gridWidth = null;// screenWidth - this.yAxisWidth - linesWidth - this.titleYWidth;
	GraphLine.prototype.titleWidth = null;// this.gridWidth;
	GraphLine.prototype.titleXWidth = null;// this.gridWidth;

	//グラフを扱うための変数
	GraphLine.prototype.topY= 0;
	GraphLine.prototype.bottomY= null;//this.gridHeight;
	GraphLine.prototype.colorGrid = 'rgb(30,30,150)';//罫線の色

	//itemを扱うための変数
	GraphLine.prototype.iElement__ = 0;//private。この変数はGraphLine.prototype.Lineのコンストラクタの中だけで扱うこと
	GraphLine.prototype.MaxNumberOfBoxesInElement= 20;
	GraphLine.prototype.colors = ['red','skyblue','cyan','blue','yellow','honeydew','mistyrose','yellowgreen','palegoldenrod','cornsilk','chartreuse','peru','chocolate','floralwhite','cornflowerblue','springgreen','goldenrod','magenta','moccasin','lightblue','greenyellow','saddlebrown','mediumorchid','seashell','aqua','olivedrab','rosybrown','azure','beige','lightsalmon','gainsboro','lightsteelblue','lemonchiffon','lightgoldenrodyellow','tomato','deepink','hotpink','slategray','lavender','teal','mediumaquamarine','mediumblue','whitesmoke'];



	//グラフ全体を描く
GraphLine.prototype.draw = function () {

	this.maxYmoto = this.result.maxYmoto;
	this.minYmoto = this.result.minYmoto;


	for(var ii=0;ii<this.result.itemNames.length;ii++){
		this.lines[ii] = new this.Line(this.result.itemNames[ii],this.result.pointXs[ii]);
		this.lines[ii].setElementBox(ii);//Box(ii)のiiは順番を示す
	};//this.minYmoto,this.maxYmotoが決定
	//もう前のthis.maxYmotoとthis.minYmotoとは違う


	this.minY=this.minYmoto;//スケールを戻すときminYmotoを再び使う
	this.maxY=this.maxYmoto;//スケールを戻すときmaxYmotoを再び使う

	this.writeTitle();
	this.writeXtitle();
	this.writeYtitle();
	this.drawRuleX();
	this.writeXnames();
	this.drawRuleY();


	//this.minYとthis.maxYが決まってからを描く
	for(var i=0;i<this.iElement__;i++){
		this.lines[i].draw()
	};
	//データを全て入力した後に呼び出す
};


	//X軸
GraphLine.prototype.drawRuleX = function () {

	var nDates = this.result.dates.length;
	var context = this.contextGX;

	var rangeScaleX = this.gridWidth/(nDates-1);

	for (var ii=0;ii<nDates;ii++) {
		var x = rangeScaleX*ii;
		context.beginPath();
		context.lineWidth=5;
		context.strokeStyle=this.colorGrid;
		context.moveTo(x,0);
		context.lineTo(x,this.gridHeight);
		context.stroke();
	};
};

	//X軸の日付
GraphLine.prototype.writeXnames = function () {
	var nDates = this.result.dates.length;//result_*,js
	var context = this.contextX;//GraphLine's
	var mojiHeight = 15;//eeeここは端末によって変える必要があるなここで定数を設定するのはまずいでしょ


	var angle = (90*Math.PI/180);
	context.rotate(angle);//座標を右回りに９０°回転→右方向は-y,下方向はｘ
	//context.translate(this.marginTop+this.ruleHeight+4,-this.marginLeft+4);//原点(0,0)を移動→開店後の座標
	var rangeX=(this.gridWidth-mojiHeight)/(nDates-1);			

	for (var ii=0;ii<nDates;ii++) {
		context.beginPath();
		context.strokeStyle='rgb(255,255,255)';
		context.lineWidth=1;
		context.font = "bold 14px 'ＭＳ 明朝'";
		context.fillStyle='white';
		context.fillText(this.result.dates[ii],0,-rangeX*ii);
		context.stroke();
	};
};

	//X軸のタイトル
GraphLine.prototype.writeXtitle = function () {
	this.contextXT.translate(this.titleXWidth/2.2,25);
//	this.contextXT.translate(0,0);
	this.contextXT.beginPath();
	this.contextXT.strokeStyle='rgb(255,255,255)';
	this.contextXT.lineWidth=1;
	this.contextXT.font = "bold 20px 'ＭＳ 明朝'";
	this.contextXT.fillStyle='white';
//	this.contextXT.fillText(this.result.titleX,this.titleXWidth/2 - this.contextXT.measureText(this.result.titleX).width/2,20);
	this.contextXT.fillText(this.result.titleX,0,0);
	this.contextXT.stroke();
};

	//Y軸のタイトル
GraphLine.prototype.writeYtitle = function () {

	//this.titleY='%';

	var angle = (90*Math.PI/180);
	this.contextYT.rotate(-angle);//座標を右回りに９０°回転→右方向は-y,下方向はｘ
	this.contextYT.translate(-this.titleYHeight/2,0);
	var angle = (90*Math.PI/180);
	this.contextYT.beginPath();
	this.contextYT.strokeStyle='rgb(255,255,255)';
	this.contextYT.lineWidth=1;
	this.contextYT.font = "bold 20px 'ＭＳ 明朝'";
	this.contextYT.fillStyle='white';
	this.contextYT.fillText(this.result.titleY,this.titleYWidth/2 - this.contextYT.measureText(this.result.titleY).width/2,20);
	this.contextYT.stroke();
};


	//グラフのタイトル
GraphLine.prototype.writeTitle = function () {
	this.contextT.translate(this.titleWidth/2 - this.contextT.measureText(this.result.title).width,25);
//	this.contextT.translate(0,0);
	this.contextT.beginPath();
	this.contextT.strokeStyle='rgb(255,255,255)';
	this.contextT.lineWidth=1;
	this.contextT.font = "bold 20px 'ＭＳ 明朝'";
	this.contextT.fillStyle='white';
//	this.contextT.fillText(this.result.title,this.titleWidth/2 - this.contextT.measureText(this.result.title).width/2,20);
	this.contextT.fillText(this.result.title,0,0);
	this.contextT.stroke();
};

//eee	maxYとminYの役割はこの関数で明らかに


	//Y軸
GraphLine.prototype.drawRuleY = function () {
	//横の罫線と目盛りの値を描く

	//this.maxYとthis.minYしか料理していない


	var keta=Math.floor(Math.log(this.maxY-this.minY)/Math.log(10));
//console.log('this.maxY-this.minY=',this.maxY-this.minY);
//console.log('keta=',keta);
	var moto = Math.pow(10,keta); 
//console.log('this.maxY=',this.maxY,' this.minY=',this.minY,' moto=',moto);
	var pitch= moto/10;
	if(this.yAxisWidth/pitch > 20)pitch = moto/5;//一番上の数値がはみ出て見えなくならないように-5してる
	if(this.yAxisWidth/pitch > 20)pitch = moto/2;
	if(this.yAxisWidth/pitch > 20)pitch = moto;
	var y = this.minY;
	var ypointSen=0;
	var ypointAtai=0;
	var sNumber='';
	while(this.maxY>=y){
		if(this.minY<=y){
			//横の罫線
			ypointSen = this.gridHeight - (y-this.minY)/(this.maxY-this.minY)*this.gridHeight;				
			this.contextGY.beginPath();
			this.contextGY.lineWidth=3;
			this.contextGY.strokeStyle=this.colorGrid;
			this.contextGY.moveTo(0,ypointSen);
//console.log('Sen=',ypointSen);
			this.contextGY.lineTo(this.gridWidth,ypointSen);
			this.contextGY.stroke();	
	
			//横のメモリ
			ypointAtai = this.gridHeight - (y-this.minY)/(this.maxY-this.minY)*(this.gridHeight-15);//上の数字も表示するために高さを15引く	
			sNumber = Number(y).toLocaleString( undefined, { maximumFractionDigits: 20 });
			sNumber = ('   '+sNumber+this.tan_i).substr(-(keta+5));
			this.contextY.beginPath();
			this.contextY.strokeStyle='rgb(255,255,255)';//eeeこれってクォーテーションに入れるの？
			this.contextY.lineWidth=1;
			this.contextY.font = "bold 14px 'ＭＳ 明朝'";
			this.contextY.fillStyle='white';
//console.log('Atai=',ypointAtai);
			this.contextY.fillText(sNumber,this.yAxisWidth-this.contextY.measureText(sNumber).width-1,ypointAtai);
			this.contextY.stroke();
		};
		y= y + pitch;
	};
};


//クラス内クラス
//それぞれのitemのデータを入れておき、線の説明もelementに加えていく、this.minYmotoとthis.maxYmotoをもとめる
GraphLine.prototype.Line = function (name,points) {

	//thisはGraphLineではなく、Lineである
	this.points = points;
	this.name = name;
	this.number = this.iElement__;
	this.canvasElement = 0;
	this.colorNumber = 0;

	this.iElement__++;//GraphLine

	this.decideMaxMinY(this.points);

//console.log('Lineクラス');


};
inherits(GraphLine.prototype.Line,GraphLine);//GraphLineのthis.iElement__を呼び出せるようにする


	//プロパティー
GraphLine.prototype.Line.prototype.hoge = 0;//setIntervalのid番号を入れておく。動作していないときは0を入れる。
GraphLine.prototype.Line.prototype.flagblink = 0;//-1,1,0をとる。-1,1をsetIntervalでreverseする。そのときに色を変える。点滅していないときは0





	//この次のメソッド。ファイルからデータを読むときにいちいち呼び出されて、描画するんだけど、
	//それを後で一括でやるようにすれば、マウスのwheel操作の時に、順番を変えて、一括描画
	//するようにすればいい
GraphLine.prototype.Line.prototype.decideMaxMinY = function (points) {
	//points…Array一つのitemの連続データ

	//最大値と最小値を求める
	for (var ii=0;ii<points.length;ii++) {
		if (this.maxYmoto < points[ii]) {
			this.maxYmoto = points[ii];
		};
		if (this.minYmoto > points[ii]) {
			this.minYmoto = points[ii];
		};
	};
};

GraphLine.prototype.Line.prototype.setElementBox = function (junban) {//junban...上からの順番

	//タグを作成
	var idElement = 'ele'+this.sIdTag+"-"+String(this.number);
	var canvasNew = document.createElement('canvas');//キャンバスタグを作る
	canvasNew.setAttribute('id',idElement);
	canvasNew.setAttribute('class','element');
	canvasNew.setAttribute('height','25px');//canvasにはrightもbottomも意味ないので
	canvasNew.setAttribute('style','position:relative;top:'+String(junban*5+0)+'px;');

	canvasNew.setAttribute('onmouseover','graphs['+this.sIdTag+'].lines['+String(this.number)+'].blink();');
	canvasNew.setAttribute('onmouseout','graphs['+this.sIdTag+'].lines['+String(this.number)+'].blinkstop();');



eee	読み取れない。prototype chainが繋がっていない！！！開発でテスト
console.log("idTag=",this.sIdTag);
	document.getElementById('elements_'+this.sIdTag).appendChild(canvasNew);//htmlのid=elementsのタグ内にタグをつける
	//canvasの準備
	this.canvasElement = document.getElementById(idElement);
	var context = this.canvasElement.getContext( '2d' );

	this.colorNumber = this.number % this.MaxNumberOfBoxesInElement;

	//canvasへの書き込み
	//名前を書く
	context.beginPath();
	context.lineWidth=1;
	context.fillStyle = 'cyan';
	context.font = "bold 20px 'ＭＳ 明朝'";
	context.fillStyle='white';
	context.fillText(this.name,100,20);
	context.stroke();

	//見本の線を描く
	context.beginPath();
	context.lineWidth=5;
	context.strokeStyle=this.colors[this.colorNumber];//Global
	context.moveTo(10,15);
	context.lineTo(90,15);
	context.stroke();

};

	//Lineクラスのprototypeから呼び出されます
GraphLine.prototype.Line.prototype.drawLines = function (points,color) {

	var context = this.canvasLines.getContext( '2d' );//Lines

	var nPoints = points.length;

	context.lineWidth=3;
	var y = this.gridHeight - (points[0]-this.minY)/(this.maxY-this.minY)*this.gridHeight;
//console.log('this.gridHeight=',this.gridHeight,'  points[0]=',points[0],' this.maxY =',this.maxY,' this.minY=',this.minY);


	var x = 0;

	context.beginPath();//←これがないと、前のパスと同じ経路とみなされてしまいます。
	context.moveTo(x,y);

	for (var i=1;i<nPoints;i++){
		y = this.gridHeight - (points[i]-this.minY)/(this.maxY-this.minY)*this.gridHeight;
		x = x + this.gridWidth/(this.dates.length-1);
//console.log('x=',x,' y=',y);
		context.lineTo(x,y);
	};

	context.strokeStyle=color;
	context.stroke();
};

GraphLine.prototype.Line.prototype.draw = function () {
	this.drawLines(this.points,this.colors[this.colorNumber]);
};
GraphLine.prototype.Line.prototype.drawcolor = function (nameColor) {
	this.drawLines(this.points,nameColor);
};
GraphLine.prototype.Line.prototype.lineState = 0;
GraphLine.prototype.Line.prototype.blink = function () {
	if(this.hoge==0){
		var thisline = this;//こうやって、ローカル変数に入れてやるとなぜかfunctionの中に入ってくれる。
		if(this.hoge==0)thisline.lineState=1;
		this.hoge = setInterval(function(){
			if(thisline.lineState==1){
				console.log('thisline=',thisline);
				thisline.drawcolor('blue');
				thisline.lineState=-1;
			}else if(thisline.lineState==-1){
				thisline.drawcolor('gold');
				thisline.lineState=1;
			};
		},250);
	};
};
GraphLine.prototype.Line.prototype.blinkstop = function () {
	clearInterval(this.hoge);
	this.hoge=0;
	this.lineState=0;
	this.draw();
};	

				//blink(num);//javascriptが貧弱だからlines[num].blink();とできない。
				//Line.prototype.blink = function () {
				//	this.hoge = setInterval(function(){this.blinkEntity();},250);
				//};
				//Line.prototype.blinkEntity = function () {
				//	console.log('this.hoge=',this.hoge);
				//};
				//これの、function(){this.～}のメソッドが認識できない！！！
				//function(){function(引数);}の形も理解しがたい。スコープが絶対に変。
				//
				//理解に必須知識①コンパイル
				//function(){};というのはコンパイル時に定義される関数。つまり静的。
				//function(){function1();};のfunction1は実行時に定義される関数。つまり動的。
				//動的関数の中に静的関数が定義されているなら問題ない。
				//静的関数の中に動的関数は問題。なぜなら、動的関数はコンパイル時には未定義だからだ。
				//これは、レキシカルスコープを理解すればわかる
				//理解に必須知識②レキシカルスコープ
				//return function () { return variable; }
				//variableがグローバルスコープで定義されている時、同じ名前を定義して使った時でも、
				//その値を返すことができる。それが上の構文だ。
				//var a = 'a';
				//var func1 = function () {
				//	var a='A';
				//	return function () { return a; }
				//};
				//
				//var func2 = func1()
				//
				//console.log('a=',a);//=>'a'
				//console.log('a=',func2(););//=>'A'---ローカルで定義された内容が表示される
				//
				//理解に必要な知識③クロージャ
				//なんといっても驚きは、動的関数の変数が保存されていたということである。
				//var counter = function () {
				//	var count = 0;
				//	return {
				//		'up':function () {//レキシカルスコープでローカル変数の値を返す
				//			count++;
				//			return count;
				//		},//ここ注意。セミコロンではなくコンマ
				//		'down':function () {
				//			count--;
				//			return count;
				//		}
				//	};
				//};
				//
				//var count = counter();
				//
				//console.log(count.up());//=>1
				//console.log(count.up());//=>2
				//console.log(count.up());//=>3
				//console.log(count.down());//=>2
				//
				//
				//これは似ているではないかクラスに。
				//ただし、引数をともなわない場合は、再代入が可能だが、引数を伴う場合は再代入ができない。コンパイルは２回行われないのだ。

				//例
				//var counter = function (num) {
				//	var count=num;
				//	return {
				//		'up':function () {
				//			count++;
				//			return count; 
				//		},
				//		'down':function () {
				//			count--;
				//			return count;
				//		}
				//	};
				//};
				//var count1 = counter(4);
				//var count2 = counter(4);//=>関数を指定してください。
				//
				//という具合で、エラーを出す。
				//var count1 =  new counter(4);
				//var count2 = new counter(4);//=>このオブジェクトではサポートされていない操作です。
				//クラスとしては使えないのだ。

				//これらを踏まえて、「開発」のフォルダにGo



console.log('class_and_module.js------------------ready');

//レイヤーを

	var canvasWidth = 1850;
	var canvasHeight = 850;
	var canvasWidthPX = String(canvasWidth)+'px'+this.sIdTag;
	var canvasHeightPX = String(canvasHeight)+'px';

	//縦の罫線
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','gridX'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;');
	document.getElementById('grid_'+this.sIdTag).appendChild(canvasNew);

xCenter =
yCenter =
var screenWidth = document.getElementById('grid_'+this.sIdTag).width;
var screenHeight = document.getElementById('grid_'+this.sIdTag).height;



var Charactor = function (image) {

	this.direction=0;
	this.x=0;
	this.y=0;
	this.image = image;
};
Charactor.prototype.walkFoward = function (num) {
	this.direction = 90;
};
Charactor.prototype.appear = function () {

	this.x = 100;
};
Charactor.prototype.disappear = function () {

	this.y = 100;
};

var a = new Charactor;


