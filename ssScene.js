

//●シーンの演出・進行



var Scene = function(sName){

	SpriteF.call(this,sName);

	var scene = this;

	scene.hide();
	scene.restoreCostume('loading','../images/explosion.gif');
	scene.restoreCostume('title','../images/titleTheDogFighter.gif');
	scene.restoreCostume('stageclear','../images/explosion.gif');
	scene.restoreCostume('gameclear','../images/explosion.gif');
	scene.restoreCostume('gameover','../images/explosion.gif');
	scene.setCostumeByName('title');
	scene.restoreAudio('dearDragon','../sounds/dearDragon.mp3');
	scene.restoreAudio('yochou','../sounds/yochou.mp3');
	scene.restoreAudio('battle','../sounds/battle.mp3');
	scene.setXY(0,0);
	scene.stageNumber=0;
	scene.playing=0;
	scene.state=0;
	scene.layerSet(gLayerScene);

	scene.printStatus();
};
inherits(Scene,SpriteF);
Scene.prototype.titlecall = function(number){

	var kkk=this;

	var text = "STAGE"+number;
	var length = kkk._ctx.measureText(text).width;//***;

	var mm = this.stageNumber;
	var hoge=setInterval(function(){
		kkk._ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		kkk._ctx.beginPath();
		kkk._ctx.strokeStyle='rgb(255,255,255)';
		kkk._ctx.lineWidth=1;
		kkk._ctx.fillStyle="white";
		kkk._ctx.font = "bold 40px 'ＭＳ 明朝'";
		kkk._ctx.fillText(text,window.innerWidth/2-length/2,50);
		kkk._ctx.stroke();
		if(kkk.stageNumber!=mm || kkk.state==-1|| flagStop){
			clearInterval(hoge);
			kkk._ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
		};
	},100);

	var count=0;
	var hoge2=setInterval(function(){
		count++;
		if(count<10){
			kkk._ctx.globalAlpha = (count*10/100);
		}else if(count<40){
			//nothing
		}else{
			kkk._ctx.globalAlpha = ((100-(count-40)*10)/100);
		};
		if(count>50)clearInterval(hoge2);
	},60);



	console.info("Stage",number," start");


};
