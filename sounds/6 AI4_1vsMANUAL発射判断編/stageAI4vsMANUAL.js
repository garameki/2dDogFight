//�X�e�[�W�̓X�e�[�W���ƂɈႤ���̂��g���̂ŃI�u�W�F�N�g�ō��Ȃ������悢�Ƃ������_�ɒB����
var stageAI4vsMANUAL = function(main,aa,myb,ene1,bea1,hor,arrow){

	var musicTitle = 'battle';


	main.stopAudio('dearDragon');
	main.playAudio(musicTitle,0);

	if(aa.state==-1){




		aa.play();
		myb.play();
		ene1.play();//0���̔\��
		bea1.play();
		hor.play();
		arrow.play();

	}else{
		ene1.play();
		bea1.play();
	};

	var flagOut=false;
	var hogeWait=setInterval(function(){//����.play()�̕ϐ����ݒ肳���̂�҂�
	var hogePlaying1 = setInterval(function(){
		if(!aa.motion){
			main.stopAudio(musicTitle);
			flagOut=true;//���̃��[�v���J��Ԃ��Ȃ�����
//GAME OVER
			myb.stopPlay();
			ene1.stopPlay();
			bea1.stopPlay();
			hor.stopPlay();
			arrow.stopPlay();

			var count=0;
			var hogeWait = setInterval(function(){
				count++;
				if(count>50 || flagStop){
					clearInterval(hogeWait);
					console.error("stageAI3vsMANUAL.js �e.flagPlay�����낢�܂���");
					flagStop=true;
				};
				if(!myb.flagPlaying && !ene1.flagPlaying && !bea1.flagPlaying && !hor.flagPlaying && !arrow.flagPlaying){
					//main.state=-1;
					main.state=0;
					main.playing=0;
					clearInterval(hogeWait);
				};
			},100);
		}else if(!ene1.motion){
			flagOut=true;
		//ppp	var hogeWait2 = setInterval(function(){
//console.info("CLEAR STAGE 1");
//				main.stageNumber++;
				bea1.stopPlay();
				main.playing=0;
				main.state=0;
		//ppp		clearInterval(hogeWait2);
		//ppp	},3000);
		};
		if(flagOut||flagStop){
			clearInterval(hogePlaying1);
			console.log("stageMATH1vsAI3.js Stopped");
		};
	},200);
	clearInterval(hogeWait);
	},500);		
};

console.info("stageAI3vsMANUAL.js    ready!");