var stage4 = function(main,aa,myb,hor,ene1,bea1,ene2,bea2,ene3,bea3,ene4,bea4,ene5,bea5,ene6,bea6,ene7,bea7,ene8,bea8,ene9,bea9,ene0,bea0){

	var musicTitle='battle';


	main.titlecall(4);
	main.stopAudio('dearDragon');
	if(aa.state==1){
		ene1.play();
		bea1.play();
		ene2.play();
		bea2.play();
		ene3.play();
		bea3.play();
		ene4.play();
		bea4.play();
		ene5.play();
		bea5.play();
		ene6.play();
		bea6.play();
		ene7.play();
		bea7.play();
		ene8.play();
		bea8.play();
		ene9.play();
		bea9.play();
		ene0.play();
		bea0.play();
	}else if(aa.state==-1){
		main.playAudio(musicTitle,0);

		aa.play();
		myb.play();
		hor.play();
		ene1.play();
		bea1.play();
		ene2.play();
		bea2.play();
		ene3.play();
		bea3.play();
		ene4.play();
		bea4.play();
		ene5.play();
		bea5.play();
		ene6.play();
		bea6.play();
		ene7.play();
		bea7.play();
		ene8.play();
		bea8.play();
		ene9.play();
		bea9.play();
		ene0.play();
		bea0.play();
	}else{
		console.error("main   not aa.state==1 nor aa.state==-1");
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
				hor.stopPlay();
				ene1.stopPlay();
				bea1.stopPlay();
				ene2.stopPlay();
				bea2.stopPlay();
				ene3.stopPlay();
				bea3.stopPlay();
				ene4.stopPlay();
				bea4.stopPlay();
				ene5.stopPlay();
				bea5.stopPlay();
				ene6.stopPlay();
				bea6.stopPlay();
				ene7.stopPlay();
				bea7.stopPlay();
				ene8.stopPlay();
				bea8.stopPlay();
				ene9.stopPlay();
				bea9.stopPlay();
				ene0.stopPlay();
				bea0.stopPlay();
		//ppp		clearInterval(hogeWait2);
		//ppp	},3000);
		}else if(!ene1.motion && !ene2.motion && !ene3.motion && !ene4.motion && !ene5.motion && !ene6.motion && !ene7.motion && !ene8.motion && !ene9.motion && !ene0.motion){
			flagOut=true;
			var hogeWait2 = setInterval(function(){
console.info("CLEARED STAGE 4");
				main.stageNumber++;
				ene1.stopPlay();
				bea1.stopPlay();
				ene2.stopPlay();
				bea2.stopPlay();
				ene3.stopPlay();
				bea3.stopPlay();
				ene4.stopPlay();
				bea4.stopPlay();
				ene5.stopPlay();
				bea5.stopPlay();
				ene6.stopPlay();
				bea6.stopPlay();
				ene7.stopPlay();
				bea7.stopPlay();
				ene8.stopPlay();
				bea8.stopPlay();
				ene9.stopPlay();
				bea9.stopPlay();
				ene0.stopPlay();
				bea0.stopPlay();

				main.playing=0;
				main.state=0;
				clearInterval(hogeWait2);
			},2000);
		};
		if(flagOut||flagStop){
			clearInterval(hogePlaying2);
			console.log("stage4 Stopped");
		};
	},200);
	clearInterval(hogeWait1);
	},500);		
};