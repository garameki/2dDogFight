//�X�e�[�W�̓X�e�[�W���ƂɈႤ���̂��g���̂ŃI�u�W�F�N�g�ō��Ȃ������悢�Ƃ������_�ɒB����
var stageMATH1vsMANUAL = function(main,aa,myb,ene1,bea1,hor,arrow){

	var musicTitle = 'battle';


	main.stopAudio('dearDragon');
	main.playAudio(musicTitle,0);

	aa.play();
	myb.play();
	ene1.play();//0���̔\��
	bea1.play();
	hor.play();
	arrow.play();

	const Step=100;


	var counter = new PrintCountDown(10);//�b�@hogePlay�̃X�e�b�v
	var hogePlay=setInterval(function(){
		if(g1Win+g2Win>500)flagStop=true;

		if(!aa.motion && !flagExploreSpriteF){
			g2Win++;//��
			info.text(g1Win.toString()+" - "+g2Win.toString());//��
			aa.motion=true;
			var countAA=0;
			var hogeAA = setInterval(function(){
				countAA++;
				if(countAA>50 || flagStop){
					clearInterval(hogeAA);
					info.caution("stage.js  aa.flagPlaying��false�ɂȂ�܂���");
					flagStop=true;
				};
				if(!aa.flagPlaying){
					clearInterval(hogeAA);
					aa.play();
					counter.reset();

				};
			},100);
		
		}else if(!ene1.motion && !flagExploreSpriteF){
			g1Win++;//��
			info.text(g1Win.toString()+" - "+g2Win.toString());//��
			ene1.motion=true;
			var countE=0;
			var hogeE=setInterval(function(){
				countE++;
				if(countE>50 || flagStop){
					clearInterval(hogeE);
					info.caution("stage.js  ene1.flagPlaying��false�ɂȂ�܂���");
					flagStop=true;
				};
				if(!ene1.flagPlaying){
					clearInterval(hogeE);
					ene1.play();
					counter.reset();
				};
			},100);
		};

		if(flagStop){
			clearInterval(hogePlay);
			info.text("stage stopped !");
		};
		
		if(!counter.motion()){
			ene1.explore();
			aa.explore();
			g1Win--;
			g2Win--;
		};

	},Step);//100

};

console.info("stage.js    ready!");