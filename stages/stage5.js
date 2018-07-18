var stage4 = function(main,aa,myb,hor,ene1,bea1,ene2,bea2,ene3,bea3,ene4,bea4,ene5,bea5,ene6,bea6,ene7,bea7,ene8,bea8,ene9,bea9,ene0,bea0){

	var musicTitle='battle';


	main.titlecall(4);
	main.stopAudio('dearDragon');
	if(aa.state==1){
		ene1.play(2);//AIナンバー2を使用
		bea1.play();
	}else if(aa.state==-1){
		main.playAudio(musicTitle,0);

		aa.play();
		myb.play();
		hor.play();
		ene1.play(2);
		bea1.play();
	}else{
		console.error("main   not aa.state==1 nor aa.state==-1");
		stopSprites(main);
	};
	var flagOut=false;
	var hogeWait1=setInterval(function(){
	var hogePlaying2 = setInterval(function(){
		if(!aa.motion){
			main.stopAudio(musicTitle);
			flagOut=true;//このループを繰り返さないため
console.info("GAME OVER");
			main.state=-1;
			myb.stopPlay();
			hor.stopPlay();
			ene1.stopPlay();
			bea1.stopPlay();
		}else if(!ene1.motion){
			flagOut=true;
			var hogeWait2 = setInterval(function(){//ちょっとラグを開けてから次のステージに移る
console.info("CLEARED STAGE5");
				main.stageNumber++;
				ene1.stopPlay();
				bea1.stopPlay();

				main.playing=0;
				main.state=0;
				clearInterval(hogeWait2);
			},2000);
		};
		if(flagOut||flagStop){
			clearInterval(hogePlaying2);
			console.log("stage5 Stopped");
		};
	},200);
	clearInterval(hogeWait1);
	},500);		
};