

	//ÅúínïΩê¸


var Information = function(sName,sNamePlane){

	SpriteF.call(this,sName);

	var hh=this;
	hh.hide();
	hh.layerSet(gLayerInformation);
	hh.printStatus();

	var counter=0;
	var num=-1;
	var hogeWhile =setTimeout(function(){
		counter++;
		num = getSpriteNumber(sNamePlane);
		if(num==-1){
			if(counter>20 || flagStop){
				clearTimeout(hogeWhile);
				console.error("ssInformation.js     ",sNamePlane,"Ç™å©Ç¬Ç©ÇËÇ‹ÇπÇÒÇ≈ÇµÇΩÅB");
				stopSprites(hh);
			};
		}else{
			clearTimeout(hogeWhile);
			hh.plane = spriteFs[num];
		};
	},100);
};
inherits(Information,SpriteF);
Information.prototype.play=function(){
	if(this.flagStopPlay)console.error(this._name,".flagStopPlay=",this.flagStopPlay);

	var hh=this;

	var aa=hh.plane;//ïÅí ÇÕé©ã@
	hh.show();

	hh.flagPlaying=true;
	var hogePlay = setTimeout(function(){

		hh._ctx.clearRect(0,0,CanvasWidth,CanvasHeight);

		if(hh._flagPrint){
			var dx = CanvasWidth/10;
			var dy = CanvasHeight/5;

			var ax = aa.x%dx;
			var ay = aa.y%dy;
			//ècê¸
			for(var ii=0;ii<20;ii++){
				hh.drawLine(-CanvasWidth/2+ii*dx-ax,CanvasHeight/2,-CanvasWidth/2+ii*dx-ax,-CanvasHeight/2);
			};
			//â°ê¸
			for(var ii=0;ii<10;ii++){
				hh.drawLine(-CanvasWidth/2,-CanvasHeight/2+dy*ii+ay,CanvasWidth/2,-CanvasHeight/2+dy*ii+ay);
			};

		};
		if(hh.flagStopPlay || flagStop){
			clearTimeout(hogePlay);
			hh.flagPlaying=false;
			hh._ctx.clearRect(0,0,CanvasWidth,CanvasHeight);//hh.hide();ÇÃë„ÇÌÇËÇ≈Ç∑//Å©é~ÇﬂÇΩÇÁè¡Ç∑
			console.info(hh._name," stopped to play");
		};
	},100);
};
