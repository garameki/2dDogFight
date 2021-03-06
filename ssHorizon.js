

	//●地平線


var Horizon = function(sName,sNamePlane){

	SpriteF.call(this,sName);

	var hh=this;
	hh.hide();
	hh.layerSet(gLayerHorizon);
	hh.printStatus();

	var counter=0;
	var num=-1;
	var hogeWhile =setInterval(function(){
		counter++;
		num = getSpriteNumber(sNamePlane);
		if(num==-1){
			if(counter>20 || flagStop){
				clearInterval(hogeWhile);
				console.error("ssHorizon.js     ",sNamePlane,"が見つかりませんでした。");
				stopSprites(hh);
			};
		}else{
			clearInterval(hogeWhile);
			hh.plane = spriteFs[num];
		};
	},100);
};
inherits(Horizon,SpriteF);
Horizon.prototype.play=function(){
if(this.flagStopPlay){
	console.error(this._name,".flagStopPlay=",this.flagStopPlay);
};

	var hh=this;

	var aa=hh.plane;//普通は自機
	hh.show();

	hh.flagPlaying=true;
	var hogePlay = setInterval(function(){

		hh._ctx.clearRect(0,0,CanvasWidth,CanvasHeight);

		if(hh._flagPrint){
			var dx = CanvasWidth/10;
			var dy = CanvasHeight/5;

			var ax = aa.x%dx;
			var ay = aa.y%dy;
			//縦線
			for(var ii=0;ii<20;ii++){
				hh.drawLine(-CanvasWidth/2+ii*dx-ax,CanvasHeight/2,-CanvasWidth/2+ii*dx-ax,-CanvasHeight/2);
			};
			//横線
			for(var ii=0;ii<10;ii++){
				hh.drawLine(-CanvasWidth/2,-CanvasHeight/2+dy*ii+ay,CanvasWidth/2,-CanvasHeight/2+dy*ii+ay);
			};

		};
		if(hh.flagStopPlay || flagStop){
			clearInterval(hogePlay);
			hh.flagPlaying=false;
			hh._ctx.clearRect(0,0,CanvasWidth,CanvasHeight);//kkk.hide();の代わりです//←止めたら消す
			console.info(hh._name," stopped to play");
		};
	},1);
};
