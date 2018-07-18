//●継承用
var inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};


//●クラス共通関数
var getSpriteNumber = function(name) {
	//あったら配列番号
	//なかったら-1

	var num=-1;
	for(var ii=0;ii<spriteFs.length;ii++){
		if(spriteFs[ii]._name==name){
			num = ii;
			break;
		};
	};

	return num;
};
var stopSprites = function(sprite){
	flagStop=true;
	console.info(sprite._name," send stop message");
	var hoge=setInterval(function(){
		flagStop=false;
		clearInterval(hoge);
	},500);
};

//●クラス本体Sprite

var Sprite = function (nameSprite) {

	this._name = nameSprite;

	//costumes...Array
	this._costumes = new Array();
	this.restoreCostume('costume1','../images/asteroid1.gif');
	this._costumeNumber=0;

	//audios...Array
	this._audioSets = new Array();
	this.restoreAudio('1up','../sounds/1up.mp3');


	
	//Layer to draw...canvas
	this._zindex=1;

	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id',name);
	canvasNew.setAttribute('width',CanvasWidth.toString());
	canvasNew.setAttribute('height',CanvasHeight.toString());
	canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:1');
	DivTop.appendChild(canvasNew);
	this._canvas = canvasNew;
	this._ctx=canvasNew.getContext('2d');


	this._imageSize=100;//%
	this._angle=0;//°
	this._flagPrint=true;
	this._numAlpha=100;
	this._globalAlpha=1;

	this._x=0;
	this._y=0;

};

//●表示関連
Sprite.prototype.hide=function(){
	this._flagPrint=false;
	this.erase();
};
Sprite.prototype.show=function(){
	this._flagPrint=true;
	this.erase();
	this.draw();
};
Sprite.prototype.draw = function () {
//console.log("DRAW:",this._name,": x=",this._x," y=",this._y," angle=",this._angle);
	//注意.image.srcに指定した画像は存在しますか？拡張子はついていますか？

	var width = this._costumes[this._costumeNumber].width*this._imageSize/100;
	var height = this._costumes[this._costumeNumber].height*this._imageSize/100;

	var x1 = this._x+CenterX-width/2;
	var y1 = this._y+CenterY-height/2;
	var ans = getNewXYAfterRotation(x1,y1,-this._angle);
	var x2=ans.x;
	var y2=ans.y;

	var cx1 = width/2;
	var cy1 = height/2;
	var ans = getNewXYAfterRotation(cx1,cy1,-this._angle);
	var cx2 = ans.x;
	var cy2 = ans.y;

	var dx = cx2-cx1;//画像の左上を原点としたずれを計算
	var dy = cy2-cy1;

	this._ctx.globalAlpha = this._globalAlpha;
	this._ctx.drawImage(this._costumes[this._costumeNumber].image,x2+dx,y2+dy,width,height);
};
Sprite.prototype.erase = function () {
//console.log("ERASE:",this._name,": x=",this._x," y=",this._y," angle=",this._angle);
	//注意.image.srcに指定した画像は存在しますか？拡張子はついていますか？

	//既に軸が傾いていることを前提にしている
	var angle = Rad*this._angle;

	var width = this._costumes[this._costumeNumber].width*this._imageSize/100;
	var height = this._costumes[this._costumeNumber].height*this._imageSize/100;

	var x1 = this._x+CenterX-width/2;
	var y1 = this._y+CenterY-height/2;
	var ans = getNewXYAfterRotation(x1,y1,-this._angle);
	var x2=ans.x;
	var y2=ans.y;

	var cx1 = width/2;
	var cy1 = height/2;
	var ans = getNewXYAfterRotation(cx1,cy1,-this._angle);
	var cx2 = ans.x;
	var cy2 = ans.y;

	var dx = cx2-cx1;//画像の左上を原点としたずれを計算
	var dy = cy2-cy1;

	if(false){
		this._ctx.fillStyle="rgb(200,0,0)";
		this._ctx.fillRect(x2+dx,y2+dy,width+2,height+2);
	}else{
		this._ctx.clearRect(x2+dx-1,y2+dy-1,width+2,height+2);
	};
};

//●回転関連(回転方向が数学と逆なので、関数の中はマイナスにしておく必要がある)
Sprite.prototype.setAngle = function(angle){
	this.erase();
	this._ctx.rotate(this._angle*Rad);
	this._ctx.rotate(-angle*Rad);
	this._angle = angle;
	if(this._flagPrint)this.draw();

};
Sprite.prototype.rotateClockwise = function(angle){
	this.erase();
	this._ctx.rotate(-angle*Rad);
	this._angle = this._angle + angle;
//	this._ctx.rotate(-angle*Rad);
//	this._angle= this._angle + angle;
	if(this._flagPrint)this.draw();
};

//●大きさ関連
Sprite.prototype.resize = function (number) {
	this.erase();
	this._imageSize = number;
	if(this._flagPrint){
		this.draw();
	};
};

//●レイヤー関連
Sprite.prototype.layerSet = function(number) {
	this._zindex=number;
	var style = 'position: absolute; left: 0px; top: 0px; z-index:'+number.toString()+";"+CssWH;
	this._canvas.setAttribute('style',style);
};
Sprite.prototype.layerUp = function (number) {
	this._zindex=this._zindex+number;
	var style ='position: absolute; left: 0px; top: 0px;z-index:'+this._zindex+';'+CssWH;
	this._canvas.setAttribute('style',style);
};
Sprite.prototype.layerDown = function (number) {
	this._zindex=this._zindex-number;
	if(this._zindex<1){
		this._zindex=1;
		console.log("スプライト",this._name,"はこれ以上後に行きません");
	};
	var style ='position: absolute; left: 0px; top: 0px;z-index:'+this._zindex+';'+CssWH;
	this._canvas.setAttribute('style',style);
};

//●移動関連
Sprite.prototype.goto = function (name) {
	var num = getSpriteNumber(name);
	if(num==-1){
		console.error("存在しないスプライト名を指定しました。in goto");
	};

	this.erase();
	this._x = sprites[num].x;
	this._y = sprites[num].y;
	if(this._flagPrint)this.draw();
};
Sprite.prototype.walk = function (num) {

	this.erase();

	var dx = num*Math.cos(this._angle*Rad);
	var dy = num*Math.sin(this._angle*Rad);

	this._x = this._x + dx;
	this._y = this._y + dy;

	if(this._flagPrint)this.draw();

};
Sprite.prototype.setXY = function(num1,num2){
	this.erase();
	this._x=num1;
	this._y=num2;
	if(this._flagPrint)this.draw();
};
Sprite.prototype.setX = function(num){
	this.erase();
	this._x=num;
	if(this._flagPrint)this.draw();
};
Sprite.prototype.setY = function(num){
	this.erase();
	this._y=num;
	if(this._flagPrint)this.draw();
};
Sprite.prototype.increaseX = function(num){
	this.erase();
	this._x = this._x +num;
	if(this._flagPrint)this.draw();
};
Sprite.prototype.increaseY = function(num){
	this.erase();
	this._y=this._y-num;
	if(this._flagPrint)this.draw();
};


//●コスチューム関連
Sprite.prototype.getCostumeNumber = function(name){
	//costumesはinstanceを格納している
	var num=-1;
	for(var ii=0;ii<this._costumes.length;ii++){
		if(this._costumes[ii].name==name){
			num=ii;
			break;
		}
	};
	return num;
};
Sprite.prototype.restoreCostume = function (name,filename) {

	var num = this.getCostumeNumber(name);
	if(num==-1){
		var costume = new CostumeStructure(name,filename);
		this._costumes.push(costume);
	}else{
		console.error(this._name,":同じコスチュームネームが登録済です→",name);
		stopSprites(this);
	};
};
Sprite.prototype.setCostumeByName = function (name) {
	this.erase();
	var num = this.getCostumeNumber(name);
	if(num==-1){
		console.error(this._name,':存在しないコスチューム名を指定しました。→',name);
		stopSprites(this);
	}else{
		this._costumeNumber = num;
		this._costumeName = name;
	};
	if(this._flagPrint){
		this.draw();
	};
};
Sprite.prototype.setCostumeByNumber = function (number) {
	this.erase();
	if(number<this._costumes.length){
		this._costumeNumber=number;
	}else{
		console.log(this._name,':その番号はコスチュームの登録数を超えています→',number);
		stopSprites(this);
	};
	if(this._flagPrint){
		this.draw();
	};
};

//●音関連

Sprite.prototype.getAudioNumber = function(name){
	var num=-1;
	for(var ii=0;ii<this._audioSets.length;ii++){
		if(this._audioSets[ii].name==name){
			num=ii;
			break;
		}
	};
	return num;
};
Sprite.prototype.restoreAudio = function(name,src){
	
	var num = this.getAudioNumber(name);
	if(num==-1){
		var audioSet = new AudioStructure(name,src);
		this._audioSets.push(audioSet);
	}else{
		console.error(this._name,":同じオーディオネームが登録済です→",name);
		stopSprites(this);
	};
};
Sprite.prototype.audioSet = function(sName){
	var num = this.getAudioNumber(sName);
	if(num==-1){
		console.error(this._name,':存在しないオーディオ名を指定しました→',name);
		stopSprites(this);
	}else{
		return this._audioSets[num];
	};
};


Sprite.prototype.playAudio = function (name,number) {
	var num = this.getAudioNumber(name);
	if(num==-1){
		console.error(this._name,':存在しないオーディオ名を指定しました→',name);
		stopSprites(this);
	}else{
		var counter=0;
		var kkk=this._audioSets[num];
		var hoge=setInterval(function(){
			counter++;
			if(kkk.canplay){
//console.info(name," play start");
				clearInterval(hoge);
				kkk.audio.currentTime=number;
				kkk.audio.play();
			}else if(counter>20 || flagStop){
				clearInterval(hoge);
				console.error("Sprite.js  ",name," : 音源が読み込まれていません。");
				stopSprites(kkk);
			};
		},100);
	};
};
Sprite.prototype.stopAudio = function(name){
	var num = this.getAudioNumber(name);
	if(num==-1){
		console.error(this._name,':存在しないオーディオ名を指定しました→',name);
		stopSprites(this);
	}else{
		this._audioSets[num].audio.pause();
//ここは多分ボリュームの調節になるでしょう。（フェードアウト）
	};
};
	

//●画像効果関連
Sprite.prototype.setAlpha = function(number){//幽霊の効果0-100

//console.error("proto.setAlpha  name=",this._name," number=",number);
	this._globalAlpha = 1-number/100;
	console.log(this._name," changes globalAlpha as ",this._globalAlpha);
};
Sprite.prototype.setAlpha = function(number){//幽霊の効果0-100
	this._numAlpha = number;
//	console.log(this._name," : numAlpha=",this._numAlpha);
	this._globalAlpha = 1 - this._numAlpha/100;
};
Sprite.prototype.increaseAlpha = function(number){
	this._numAlpha+=number;
//	console.log(this._name," : numAlpha=",this._numAlpha);
	this._globalAlpha = 1 - this._numAlpha/100;
};
//●ペン関係
Sprite.prototype.drawLine = function(x1,y1,x2,y2){
	var ans = getNewXYAfterRotation(x1,y1,this._angle);
	this._ctx.beginPath();
	this._ctx.lineWidth=1;
	this._ctx.strokeStyle="skyblue";
	this._ctx.moveTo(ans.x+CenterX,CenterY-ans.y);
	var ans = getNewXYAfterRotation(x2,y2,this._angle);
	this._ctx.lineTo(ans.x+CenterX,CenterY-ans.y);
	this._ctx.stroke();
};

//●ステータスの表示
Sprite.prototype.printStatus = function(){
	console.log("");
	console.log("name=",this._name);
	console.log("x=",this._x);
	console.log("y=",this._y);
	console.log("costumeNumber=",this._costumeNumber);
	console.log("costumeName=",this._costumes[this._costumeNumber].name);
	for(var ii=0;ii<this._costumes.length;ii++){
		console.log("costumes[",ii,"]=",this._costumes[ii]);
	};
	console.log("z-index=",this._zindex);
	console.log("imageSize=",this._imageSize);
	console.log("angle=",this._angle);
	console.log("globalAlpha=",this._globalAlpha);
};


//コスチューム構造体
var CostumeStructure = function (name,filename) {
	this.name = name;
	this.candraw = false;
	this.image = new Image();
	this.image.src = filename;
	var kkk=this;
	this.image.onload=function(){
		kkk.candraw=true;
	};
	var counter=0
	var hoge = setInterval(function(){
		counter++;
		if(kkk.candraw){
			clearInterval(hoge);
			kkk.width = kkk.image.width;//初期の大きさ
			kkk.height = kkk.image.height;
		}else{
			if(counter>20 || flagStop){
				clearInterval(hoge);
				console.error("Sprite.js  画像が読み込めません->",filename);
				stopSprites(kkk);				
			};
		};
	},100);
};

//オーディオ構造体
var AudioStructure = function (name,filename){
	this.name = name;
	this.canplay=false;
	this.audio = new Audio(filename);
	var kkk=this;
	this.audio.oncanplaythrough = function () {
		kkk.canplay=true;
	};
	var counter=0;
	var hoge=setInterval(function(){
		counter++;
		if(kkk.canplay){
			clearInterval(hoge);
		}else if(counter>30 || flagStop){
			clearInterval(hoge);
			console.error("Sprite.js   ",name," : 音源が3秒以内にロードし終わりません。");
			stopSprites(kkk);
		};
	},100);


};







			//●カスタマイズSpriteF<<Sprite

//●クラス変数
var spriteFs=new Array();//class variable
var flagExploreSpriteF=true;


//●クラス本体SpriteF
var SpriteF = function(name){
console.log("SpriteF.js    name=",name);
	Sprite.call(this,name);

	var num = getSpriteNumber(name);
	if(num==-1){
		spriteFs.push(this);//global variable as class variable
	}else{
		console.error("Sprites.js  同じ名前のスプライトが存在します。Same name sprite already exist.");
		flagStop=true;
	};

	this.drawStep=100;//.play()中のhogeが実際に回っている間隔(ミリ秒)

};
inherits(SpriteF,Sprite);
SpriteF.prototype.play = function(){
	console.error("Sprite.js  ",this._name,"の.playファンクションは実装されていません。それぞれのサブクラスでオーバーライドしてください");
	console.error("Sprite.js  オブジェクト指向で言うところのinterfaceです");

//////////// 本体テンプレート ///////////////////
	//以下のスクリプトをオーバーライドする.play()に入れてください。
	if(this.flagStopPlay){
		console.error(this._name,".flagStopPlay=",this.flagStopPlay);
	};


	var time=0;
	var temp = this;
	temp.flagPlaying=true;
	var hoge = setInterval(function(){
		time=Date.now();

		temp.drawStep=Date.now()-time;//実際になん秒で回っているかを計測
		if(temp.flagStopPlay || flagStop){
			clearInterval(hoge);
			temp.flagPlaying=false;
			temp.hide();//←止めたら消す
			console.info(temp._name,"  stopped ! at SpriteF as SuperClass ");
		};
	},100);
};
SpriteF.prototype.delete = function(){
	var num = getSpriteNumber(this._name);
	if(num==-1){
		console.log("Sprite.js  ",this._name,"という名前のスプライトは存在しません。");
		flagStop=true;
	}else{
		spriteFs.delete(num);//global variable as class variable//配列から消す
	};
};

//他のスプライトから参照されるものや、スプライトに普遍的に存在するものをここで指定する
SpriteF.prototype.flagPlaying=false;//プレイ中はtrueにしておく//必ず各スプライトのclearInterval(hogePlay)部分に仕込むこと
SpriteF.prototype.flagStopPlay=false;//hogePlayのclearInterval
SpriteF.prototype.stopPlay = function(){
	this.flagStopPlay=true;
	var kkk=this;
	var hoge=setInterval(function(){
		if(!kkk.flagPlaying || flagStop){
			clearInterval(hoge);
			kkk.flagStopPlay=false;
		};
	},10);


		
};
SpriteF.prototype.state=0;//意味はそれぞれのスプライトで異なる
SpriteF.prototype.x=0;//絶対座標系
SpriteF.prototype.y=0;
SpriteF.prototype.direction=0;//向き
SpriteF.prototype.motion=false;//稼働しているかどうか
//●爆発
SpriteF.prototype.explore = function(){

	if(flagExploreSpriteF){

		var num=0;
		num=this.getCostumeNumber('explosion');
		if(num==-1){
			console.error(this._name,":爆発用のコスチュームをexplosionという名前で用意してください");
			stopSprites(sprite);
		};
		num=this.getAudioNumber('explosion');
		if(num==-1){
			console.error(this._name,":爆発用の音をexplosionという名前で用意してください。");
			stopSprites(sprite);
		};

		this.state=-1;
		console.log(this._name,":dead");

		this.setCostumeByName('explosion');
		this.playAudio('explosion',0);

		var count=0;
		var kkk=this;///thisの中身が関数のものになるので、変数で置き換える必要がある
		var hogeExplosion = setInterval(function(){
			kkk.resize(100*count/3);
			kkk.setAlpha(100*count/20);
			count++;
			if(count>20){
				clearInterval(hogeExplosion);
				//kkk.hide();→.stopPlay()に内包
				kkk.stopPlay();
				kkk.motion=false;
			};
		},100);
	}else{
		//爆発処理をとばしたいとき
		this.stopPlay();
		this.motion=false;
	};



};

console.info("Sprite.js  Audioクラスのプロパティー一覧:",(new Audio).constructor.prototype);
console.info("Sprite.js  Imageクラスのプロパティー一覧:",(new Image).constructor.prototype);


console.log("Sprite.js ready");
