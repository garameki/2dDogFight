//to do
//Timerの表示からCanvas*を消す
//window.onresizeをcreateCanvasにしこんで、どのcanvasもおおきさといちを変えるようにする。



//グローバル

//定数はここで定義
const DrawStep = 1;//描画間隔(ミリ秒)
const MaxSpeed = 3;//px/3ms
const MinSpeed = 1;//pc/3ms
var Ratio=1;//表示の拡縮比

var hogeFlagStop = setInterval(function(){
	if(flagStop){
		console.log("globalVariables_2.js      どこかでflagStop=trueになりました。");
		clearInterval(hogeFlagStop);
	};
},1000);


if(!('flagStop' in window))console.error("flagStopを定義してください");
if(!('Headers' in window))console.error("Headersを定義してください");

Headers+='globalVariables();\n';

var globalVariables = function(){


	//勝利回数
	g1Win=0;
	g2Win=0;


	HomeFolda='C:\\Users\\usaku\\Documents\\games\\2dDogFight\\';

	//レイヤー一括指定（個々でやるとわかりずらいので）グローバル変数
	gLayerPlane=4;
	gLayerBeam=3;

	gLayerJiki=4;
	gLayerJikiBeam=3;
	gLayerTekki=4;
	gLayerTekkiBeam=3;
	gLayerScene=5;
	gLayerHorizon=2;
	gLayerInformation=4;





	nil = -1854;//終端記号
	Rad = Math.PI/180;
	CanvasWidth = screen.availWidth;
	CanvasHeight = screen.availHeight;
	CssWidth='width:'+CanvasWidth.toString()+'px;';
	CssHeight = 'height:'+CanvasHeight.toString()+'px;';
	CssWH = CssWidth+CssHeight;
	CenterX = window.innerWidth/2;
	CenterY = window.innerHeight/2;

	//重なり　　canvas.getContext('2d').context.globalAlphaプロパティーの値
	gLayerTekki=4;
	gLayerTekkiBeam=3;
	gLayerFighter=4;
	gLayerFighterBeam=3
	gLayerMain=1;
	gLayerHorizon=2;


	//キーコード
	//右左上下スペース
	R=39;//→
	L=37;//←
	U=38;//↑
	D=40;//↓
	SP=32;//space key
	A=65;//a
	Z=90;//z
	W=87;//w

	//動き(eventListener)
	gDd=0;
	gDs=0;
	gDzoom=0;
	gMissile=false;
	gR=false;
	gL=false;
	gU=false;
	gD=false;
	gA=false;
	gZ=false;
	gW=false;

	flagStop=false;
//hogeStop = setInterval(function(){
//	flagStop=true;
//	clearInterval(hogeStop);
//	console.log("stopped by globalVariables.js");
//},60000);//60秒後にストップ




	//グローバルなクロージャ
//○	info = new PrintInformation();
	info = new PrintInformation(30,80,40,20,10,15);//●
	info.text("ready");


	//ssPlaneのステータスを表示する
	printStatusLeft = new PrintStatus(15,0,20);//文字サイズ ｘ位置% 行数
	printStatusRight = new PrintStatus(15,70,20);


	//timer = new PrintTimer(30);ステージにより異なるのでグローバルにしない


};


//機能はトップダウンで作成しないといいものが作れない

var createContext = function(){


	//defaults
	index=2;//重なりが一番後ろの方
	nXpercent=50;//innerWidthの50％の位置(中央が)
	nYpercent=50;//innerHeightの50％の位置(中央が)
	nWpercent=50;//innerWidthの50％の幅
	nHpercent=50;//innerHeightの50％の高さ
	
	//set arguments
	var variables=new Array();
	variables.push("index");
	variables.push("nXpercent");
	variables.push("nYpercent");
	variables.push("nWpercent");
	variables.push("nHpercent");

	if(arguments.length>variables.length){
		console.error("globalVariables_2.js 引数の数が多すぎます in createContext");
		flagStop=true;
	}else{
		for(var ii=0;ii<arguments.length;ii++){
//console.log(variables[ii]+"='"+arguments[ii]+"'");
			eval(variables[ii]+"='"+arguments[ii]+"'");
		};
	};
//console.log("index=",index,"nXpercent=",nXpercent,"nYpercent=",nYpercent,"nWpercent=",nWpercent,"nHpercent=",nHpercent);
	var canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('width',(Math.round(window.innerWidth*nWpercent/100)).toString());
	canvasNew.setAttribute('height',(Math.round(window.innerHeight*nHpercent/100)).toString());
	canvasNew.setAttribute('style','position: absolute; left: '+(nXpercent/100*window.innerWidth-window.innerWidth*nWpercent/100/2).toString()+'px; top: '+(nYpercent/100*window.innerHeight).toString()+'px;z-index:'+index.toString());
	DivTop.appendChild(canvasNew);
	var ctx = canvasNew.getContext('2d');
	ctx.fillStyle='yellow';
	ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);


//console.log("****** ctx=",ctx);
//ctx.canvas.width=50;
//console.log("****** ctx=",ctx);



	return ctx;
};


var PrintStringsFixedPosition = function(nSize,sColor,nXpercent,nYpercent){

	var ctx = createContext(2);

	ctx.strokeStyle=sColor;
	ctx.font = "bold "+nSize.toString()+"px 'ＭＳ 明朝'";
	ctx.fillStyle=sColor;

	var length;
	return function(sStrs){
		length = ctx.measureText(sStrs).width;//*
		ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		ctx.fillText(sStrs,window.innerWidth*nXpercent/100-length/2,window.innerHeight*nYpercent/100);
	};
};

var Counter = function(){

	var state=0;
	var count=0;
	var hoge=setInterval(function(){
		if(flagStop)clearInterval(hoge);
		if(state==1)count++;
		if(state==0)count=0;
	},100);



	return {
		start:function(){
			state=1;
		},
		stop:function(){
			state=2;
		},
		clear:function(){
			state=0;
		},
		close:function(){
			clearInterval(hoge);
		},
		time:function(){
			return Math.floor(count/10);
		}

	};
};

var CounterDown = function(limit){
	var counter = new Counter();


	return {
		start:function(){
			counter.clear();
			counter.start();
			var hoge=setInterval(function(){
				if(flagStop)clearInterval(hoge);
				if(limit<counter.time()){
					counter.stop();
					clearInterval(hoge);
				};
			},100);
		},
		stop:function(){
			counter.stop();

		},
		time:function(){
//console.log(counter.time());
			return limit-counter.time();
		}
	}
};			

var PrintCounterDown = function(limit){

	var screenTime = new PrintLines(50,10,10,8,2,30,true);
	var counter = new CounterDown(limit);

	var func=function(){clearInterval(hoge);};//dummy
	var hoge=setInterval(func,1);
	var time;
	var length;

	return {
		start:function(){
			counter.start();
			clearInterval(hoge);
			hoge = setInterval(function(){
				if(flagStop)clearInterval(hoge);

				time=counter.time();
				if(time==0){
					counter.stop();
					text='TIME UP';
					length = screenTime.measure(text);
					screenTime.put(text,'pink',-length/2);
					clearInterval(hoge);
				}else{
					text=time.toString();
					length = screenTime.measure(text);
					screenTime.put(text,'white',-length/2);
				};
			},100);
		}
	};//return
};


//参考
//クロージャの戻り値
//		return {
//これではだめ		motion:flagHoge
//こうする		motion:function(){
//				return flagHoge;
//			}
//
//		};//return

var PrintStatus = function(nSize,nXpercent,nLines){
	//ステータス表示用構造体
	var nXpercint=nXpercent;
	var nLines=nLines;

	var structPlane = function(ssSprite,sColor){
		this.plane = ssSprite;
		this.color = sColor;
	};

	var structPlanes=new Array();//構造体をしまう配列

	var yStart=0;//この座標から書き始める
	var screen =new function(){
		var ctx = createContext(10,nXpercent,0,20,nLines*nSize/window.innerHeight*100);//index,xRelative,yRelative,widthRelative,heightRelative
		ctx.canvas.onmousewheel=function(event){
			var delta = event.wheelDelta/Math.abs(event.wheelDelta);
			if(delta>0)yStart+=30;
			else yStart-=30;
		};

		ctx.globalAlpha=0.7;
		ctx.font = "bold "+nSize.toString()+"px 'ＭＳ 明朝'";
		ctx.fillStyle='white';//default
		var xCenter = ctx.canvas.width/2;

		var length;

		return {
			nothing:1,
			print:function(sName,sValue){
				nLine++;
				length = ctx.measureText(sName).width;//*
				ctx.fillText(sName,xCenter-length,yStart+nLine*nSize);
				ctx.fillText(" : "+sValue,xCenter,yStart+nLine*nSize);
			},
			reset:function(){
				nLine=0;
				ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
			},
			carriagereturn:function(){
				nLine++;
			},
			setColor:function(sColor){
				ctx.fillStyle=sColor;
			},
			nothing:1
		};

	};//screen

//	console.log("nSize=",nSize.toString());

	var hoge = setInterval(function(){
		screen.reset();
		for(var ii=0;ii<structPlanes.length;ii++){
			plane=structPlanes[ii].plane;
			screen.setColor(structPlanes[ii].color);
			screen.print('name',plane._name);
			screen.print('Plane',plane.namePlane);
			screen.print('AI',plane.ai.nameAI);
			//screen.print('x',plane.x);
			//screen.print('y',plane.y);
			screen.print('weight',plane.ai.ww.name);
			screen.print('calc span',plane.ai.NSpan-1);
			screen.print(plane.ai.nameAIConstructor,plane.ai.progressAIConstructor);
			screen.print(plane.ai.nameAngleDecide,plane.ai.progressAngleDecide);
			screen.print(plane.ai.nameAngleLearn,plane.ai.progressAngleLearn);
			screen.print(plane.ai.nameShootDecide,plane.ai.progressShootDecide);
			screen.print(plane.ai.nameShootLearn,plane.ai.progressShootLearn);
			screen.print(plane.ai.nameSpeedDecide,plane.ai.progressSpeedDecide);
			screen.print(plane.ai.nameSpeedLearn,plane.ai.progressSpeedLearn);
			screen.print(plane.ai.nameInputClear,plane.ai.progressInputClear);
			screen.print(plane.ai.nameInputStore,plane.ai.progressInputStore);
			screen.print('AlphaAngle',plane.ai.alphaAngle);
			screen.print('AlphaShoot',plane.ai.alphaShoot);
			screen.print('AlphaSpeed',plane.ai.alphaSpeed);
			screen.print('thresholdAngle',plane.ai.thresholdAngle);
			screen.print('thresholdAngle',plane.ai.thresholdAngle);
			screen.print('thresholdAngle',plane.ai.thresholdAngle);
			screen.print('weight change Angle',plane.ai.changeWeightAngle);
			screen.print('weight change Speed',plane.ai.changeWeightSpeed);
			screen.print('weight change Shoot',plane.ai.changeWeightShoot);
			screen.carriagereturn();
		};
		if(flagStop)clearInterval(hoge);
	},100);
	return {
		storeSprite:function(plane,sColor){
			var sColor='white';if(arguments.length>1)sColor=arguments[1];//default処理
			structPlanes.push(new structPlane(plane,sColor));
		}
	};//return

};










var PrintLines = function(xxr,yyr,wwr,hhr,ind,letterHeight,flagForL,yose){//last hikisuu----true fist in first out,,,false last in first out

	var ctx = createContext(ind,xxr,yyr,wwr,hhr);
	ctx.fillStyle="white";
	var yStart;
	if(flagForL)yStart=0;
	else yStart=letterHeight;
	ctx.canvas.onmousewheel=function(event){
		var delta = event.wheelDelta/Math.abs(event.wheelDelta);
		if(delta>0)yStart+=30;
		else yStart-=30;
	};

	//構造体
	var Line = function(){
		//default process
		text='';
		color='white';
		tabX=0;
		var variables=['text','color','tabX'];
		for(var ii=0;ii<arguments.length;ii++){
			switch(ii){
				case 0:eval(variables[ii]+"='"+arguments[ii]+"'");
					break;
				case 1:eval(variables[ii]+"='"+arguments[ii]+"'");
					break;
				case 2:eval(variables[ii]+"="+arguments[ii]);
					break;
			};
		};
		this.text=text;
		this.color=color;
		this.tabX=tabX;//インデント
	};
	const MaxLines=1000;
	var lines=new Array();

	var length;

	var Xcenter;

	var temp;
	var hoge = setInterval(function(){
		if(flagStop)clearInterval(hoge);

		Xcenter=ctx.canvas.width/2;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
temp = ctx.globalAlpha;
ctx.globalAlpha=0.5;
ctx.fillStyle='yellow';
ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
ctx.globalAlpha=temp;

		var screenHeight=window.innerHeight*hhr/100;
		if(flagForL==false){
			for(var ii=0;ii<lines.length;ii++){
				//画面に入っているものだけ表示する
				yy = ii*letterHeight+yStart;
				if(yy>0 && yy<screenHeight){
					ctx.font = "bold "+letterHeight.toString()+"px 'ＭＳ 明朝'";
					ctx.fillStyle=lines[ii].color;
//					ctx.fillText(lines[ii].text,lines[ii].tabX+Xcenter,ii*letterHeight+yStart);
					ctx.fillText(lines[ii].text,lines[ii].tabX+Xcenter,ii*letterHeight-lines.length*letterHeight+window.innerHeight*hhr/100+yStart);	
//console.log("ii=",ii,"y=",ii*letterHeight-lines.length*letterHeight+window.innerHeight*hhr/100+yStart);
				};
			};
		}else{
			for(var ii=lines.length-1;ii>=0;ii--){
	//		for(var ii=0;ii<lines.length;ii++){
				//画面に入っているものだけ表示する
				yy = ii*letterHeight-lines.length*letterHeight+screenHeight+yStart;
				if(yy>0 && yy<screenHeight){
					ctx.font = "bold "+letterHeight.toString()+"px 'ＭＳ 明朝'";
					ctx.fillStyle=lines[ii].color;
//console.log("Xcenter=",Xcenter);

//					ctx.fillText(lines[ii].text,lines[ii].tabX+10,ii*letterHeight-lines.length*letterHeight+window.innerHeight*hhr/100+yStart);
					ctx.fillText(lines[ii].text,lines[ii].tabX+Xcenter,ii*letterHeight-lines.length*letterHeight+window.innerHeight*hhr/100+yStart);	
//console.log("text=",lines[ii].text," x=",lines[ii].tabX+Xcenter);
	//console.log("ii=",ii,"y=",ii*letterHeight-lines.length*letterHeight+window.innerHeight*hhr/100+yStart);
				};
			};
		};



	},100);

	//スクリーンに書く
	return {
		chAlpha:function(num){
				if(num<0 || num>1)console.error("globalVariables.js    out of range for globalAlpha in PrintLines");
				ctx.globalAlpha = num;
		},
		put:function(text,color,indent){
			if(lines.length>MaxLines) lines.shift();
			lines.push(new Line(text,color,indent));
		},
		measure:function(text){
			return ctx.measureText(text).width;
		},
		width:function(){
//console.log("*********=",ctx.canvas.width);
			return ctx.canvas.width;
		}
	};//return

};



var PrintInformation = function(){
//○1var PrintInformation = function(xxr,yyr,wwr,hhr,ind,letterHeight){

//console.log("before",arguments);
//〇1	//default
//○1	xxr=0;
//○1	yyr=0;
//○1	wwr=100;
//○1	hhr=100;
//○1	ind=2;
//○1	letterHeight=15;
//○1	var variables=['xxr','yyr','wwr','hhr','ind','letterHeight'];
//○1	for(var ii=0;ii<arguments.length;ii++)
//○1		eval(variables[ii]+"="+arguments[ii]);//数字なのでこれでOK
//		console.log(variables[ii]+"="+arguments[ii]);
//console.log("after",arguments);

//kkk	var printInfo = new PrintLines(xxr,yyr,wwr,hhr,ind,letterHeight,false);//最後の引数はfalseなら「first in first outの表示」 trueなら「last in first outの表示」
//○1	var printInfo = new PrintLines(xxr,yyr,wwr,hhr,ind,letterHeight,true);//最後の引数はfalseなら「first in first outの表示」 trueなら「last in first outの表示」
	var widthP=40;//'P' means percent
	var printInfo = new PrintLines(50,80,widthP,20,2,15,true);//最後の引数はfalseなら「first in first outの表示」 trueなら「last in first outの表示」
	printInfo.chAlpha(0.7);

	return {
		text:function(strings){
			printInfo.put(strings,'white',-printInfo.width()/2);
		},
		caution:function(strings){
			printInfo.put(strings,'yellow',0);
		},
		overtime:function(sprite,sec){
			strings=sprite._name+".play()  too much time to execute "+sec.toString();
			printInfo.put(strings,'pink',0);
		}
	};//return Array
};
































//円を描く

var drawCircle = function(){

	//我初　プロシージャ内プロシージャ
	var DrawCircle = function(){
		var letterHeight=15;
		var numLine=0;
		var canvasNew = document.createElement('canvas');
		canvasNew.setAttribute('width',CanvasWidth.toString());
		canvasNew.setAttribute('height',CanvasHeight.toString());
		canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:2');
		DivTop.appendChild(canvasNew);
		var ctx=canvasNew.getContext('2d');
		ctx.globalAlpha=0.7;
		ctx.fillStyle="white";

		return {
			chcolor:function(sColor){
				ctx.fillStyle=sColor;
			},
			put:function(text){
				ctx.font = "bold "+letterHeight.toString()+"px 'ＭＳ 明朝'";
				ctx.fillText(text,0,numLine*letterHeight);	
				numLine++;
				if(numLine*letterHeight>CanvasHeight*0.7){
					numLine=1;
					ctx.clearRect(0,0,CanvasWidth,CanvasHeight);
				};
				ctx.fillStyle="white";
			}
		};//return
	};
	var printInformation = new DrawInformation

	var strings="";
	return {
		text:function(strings){
			printInformation.put(strings);
		},
		caution:function(strings){
			printInformation.chcolor('yellow');
			printInformation.put(strings);
		},
		overtime:function(sprite,sec){
			strings=sprite._name+".play()  too much time to execute "+sec.toString();
			printInformation.chcolor('pink');
			printInformation.put(strings);
		}
	};//return Array
};


console.log("globalVariables_2.js");



