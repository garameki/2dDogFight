

	//●地平線

///*****must change
var Arrow = function(sName,sNamePlaneMyself){

	SpriteF.call(this,sName);

	var hh=this;

	hh.restoreCostume('arrow',HomeFolda+'images\\arrow.gif');
	hh.setCostumeByName('arrow');

	hh.layerSet(gLayerInformation);
	hh.hide();
	hh.printStatus();
	
	var counter=0;
	var num=-1;
	var hogeWhile1 =setInterval(function(){
		counter++;
		num = getSpriteNumber(sNamePlaneMyself);
		if(num==-1){
			if(counter>20 || flagStop){
				clearInterval(hogeWhile1);
				console.error("ssHorizon.js     ",sNamePlaneMyself,"が見つかりませんでした。");
				stopSprites(hh);
			};
		}else{
			clearInterval(hogeWhile1);
			//***Do not forget changing below after copying
			hh.plane = spriteFs[num];
		};
	},100);

	

};
//*****must change
inherits(Arrow,SpriteF);
//*****must change
Arrow.prototype.play=function(){
if(this.flagStopPlay){
	console.error(this._name,".flagStopPlay=",this.flagStopPlay);
};

	var hh=this;

	var aa=hh.plane;//普通は自機
	var bb=aa.target;//普通は敵機

	hh.setXY(50,50);

	hh.setAlpha(50);
	hh.show();


	var ang;
	hh.flagPlaying=true;
	var hogePlay = setInterval(function(){

		ang = getAngle(bb.x,bb.y,aa.x,aa.y);
		hh.setAngle(ang);

		if(hh.flagStopPlay || flagStop){
			clearInterval(hogePlay);
			hh.flagPlaying=false;
			hh.hide();
			console.info(hh._name," stopped to play");
		};
	},100);
};

