//�X�e�[�W�̓X�e�[�W���ƂɈႤ���̂��g���̂ŃI�u�W�F�N�g�ō��Ȃ������悢�Ƃ������_�ɒB����
var stage1 = function(main,aa,myb,ene1,bea1,hor){

	var musicTitle = 'battle';


	main.stopAudio('dearDragon');
	main.playAudio(musicTitle,0);

	aa.play();
	myb.play();
	ene1.play(0);//0���̔\��
	bea1.play();
	hor.play();

	var flagOut=false;
	var hogeWait=setInterval(function(){//����.play()�̕ϐ����ݒ肳���̂�҂�
	var hogePlaying1 = setInterval(function(){
		if(!aa.motion){
			main.stopAudio(musicTitle);
			flagOut=true;//���̃��[�v���J��Ԃ��Ȃ�����
		//ppp	var hogeWait = setInterval(function(){
console.info("GAME OVER");
				main.state=-1;
				myb.stopPlay();
				ene1.stopPlay();
				bea1.stopPlay();
				hor.stopPlay();
		//ppp		clearInterval(hogeWait);
		//ppp	},3000);
		}else if(!ene1.motion){
			flagOut=true;
		//ppp	var hogeWait2 = setInterval(function(){
console.info("CLEAR STAGE 1");
				main.stageNumber++;
				bea1.stopPlay();
				main.playing=0;
				main.state=0;
		//ppp		clearInterval(hogeWait2);
		//ppp	},3000);
		};
		if(flagOut||flagStop){
			clearInterval(hogePlaying1);
			console.log("stage1 Stopped");
		};
	},200);
	clearInterval(hogeWait);
	},500);		
};