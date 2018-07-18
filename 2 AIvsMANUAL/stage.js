//ステージはステージごとに違うものを使うのでオブジェクトで作らない方がよいという結論に達した
var stageMATH1vsMANUAL = function(main,aa,myb,ene1,bea1,hor,arrow){

	var musicTitle = 'battle';


	main.stopAudio('dearDragon');
	main.playAudio(musicTitle,0);

	aa.play();
	myb.play();
	ene1.play();//0％の能力
	bea1.play();
	hor.play();
	arrow.play();

	var count=0;
	var countLife=0;
	var hogePlay=setInterval(function(){
		if(!aa.motion){
			countLife=0;
			aa.motion=true;
			var count=0;
			var hogeAA = setInterval(function(){
				count++;
				if(count>50 || flagStop){
					clearInterval(hogeAA);
					info.caution("stage.js  aa.flagPlayingがfalseになりません");
					flagStop=true;
				};
				if(!aa.flagPlaying){
					clearInterval(hogeAA);
					aa.play();
				};
			},100);
		
		}else if(!ene1.motion){
			countLife=0;
			ene1.motion=true;
			var countE=0;
			var hogeEne1=setInterval(function(){
				countE++;
				if(countE>50 || flagStop){
					clearInterval(hogeEne1);
					info.caution("stage.js  ene1.flagPlayingがfalseになりません");
					flagStop=true;
				};
				if(!ene1.flagPlaying){
					clearInterval(hogeEne1);
					ene1.play();
				};
			},100);
		}else if(++countLife>300){
			ene1.explore();
			aa.explore();
		};

		if(flagStop){
			clearInterval(hogePlay);
			info.text("stage stopped !");
		};
	},100);
};

console.info("stage.js    ready!");