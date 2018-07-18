var stage2 = function(main,aa,myb,ene1,bea1,ene2,bea2,hor){

	var musicTitle='battle';

	main.stopAudio('dearDragon');
	if(aa.state==1){
		ene1.play();
		bea1.play();
		ene2.play();
		bea2.play();
	}else if(aa.state==-1){

		main.playAudio(musicTitle,0);

		aa.play();
		myb.play();
		ene1.play();
		bea1.play();
		ene2.play();
		bea2.play();
		hor.play();
	}else{
		console.error("stage2.js   not aa.state==1 nor aa.state==-1  aa.state=",aa.state);
		stopSprites(main);
	};
	var flagOut=false;
	var hogeWait1=setInterval(function(){
	var hogePlaying2 = setInterval(function(){
		if(!aa.motion){
			main.stopAudio(musicTitle);
			flagOut=true;//Ç±ÇÃÉãÅ[ÉvÇåJÇËï‘Ç≥Ç»Ç¢ÇΩÇﬂ
		//ppp	var hogeWait2 = setInterval(function(){
console.info("GAME OVER");
				main.state=-1;
				myb.stopPlay();
				ene1.stopPlay();
				bea1.stopPlay();
				ene2.stopPlay();
				bea2.stopPlay();
				hor.stopPlay();
		//ppp		clearInterval(hogeWait2);
		//ppp	},3000);
		}else if(!ene1.motion && !ene2.motion){
			flagOut=true;
			var hogeWait2 = setInterval(function(){
console.info("CLEARED STAGE 2");
				main.stageNumber++;
				bea1.stopPlay();
				bea2.stopPlay();
				main.playing=0;
				main.state=0;
				clearInterval(hogeWait2);
			},2000);
		};
		if(flagOut||flagStop){
			clearInterval(hogePlaying2);
			console.log("stage2 Stopped");
		};
	},200);
	clearInterval(hogeWait1);
	},500);		
};