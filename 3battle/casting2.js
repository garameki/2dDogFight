
//�񑩎�
//	x,y...��ʏ�̍��W�i�X�N���[�����W�j : �\���ɗp����
//	xx,yy...�Q�[�������z��ԏ�̍��W�i��ԍ��W�j : �ǂ��𒆐S�Ƃ��邩�ŃX�N���[����̍��W�͈قȂ�

canvas = document.createElement('canvas');
if ( ! canvas || ! canvas.getContext ){
	console.log("���g���̃u���E�U�ł͂��y���݂��������܂���B")
}


var initialize = function () {


//���܂̌�����ǂ��g�����H
//�ł͂Ȃ�
//�u������肽���v���`�ɂ���I

//ww1 =new Weight30('../weights/weight30_1.txt');//AI,Weight30�Ƃ���prototype���g���̂ŁAnew���K�v
//ww2 =new Weight30('../weights/weight30_2.txt');

//��������ƁAweight30�̃C���X�^���X�����L���Ȃ����ƂɂȂ遨����������

//var aa		=new PlaneAI5_1('fighter','mybeam','enemy',pointOfView,AI5_1,ww1);
//var enemy	=new PlaneAI5_1('enemy','yanbeam','fighter',pointOfView,AI5_1,ww2);








	var main=new Scene('scene');


	//  ��  cast
	var pointOfView = 'fighter';

//	var aa=new PlaneMANUAL1_0('fighter','mybeam','enemy',pointOfView);//�Ō�̈����͊֐�(�N���X)
//	var myb = new BeamMANUAL1_0('mybeam','fighter');

//	var ww1= new Weight30('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane5_1AI5_1.txt');//��
//	var aa = new PlaneAI5_1('fighter','mybeam','enemy',pointOfView,AI5_1,ww1,15);//���Ō�̈�����NSpan--AI�p
//	var myb = new BeamAI2_0('mybeam','fighter');


//	var ww2= new Weight30('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3 differentWeightAIBattle\\ai5weight2.txt');//��
//	var enemy = new PlaneAI5_2_0('enemy','yanbeam','fighter',pointOfView,AI5_1_1,ww2,15);//��
//	var enemyBeam = new BeamAI2_0('yanbeam','enemy');


//	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3 differentWeightAIBattle\\weight30PlaneAI5_2_0AI5_1_1.txt');//��
//	var enemy = new PlaneAI5_2_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_0,ww2,15);//��
//	var enemyBeam = new BeamAI2_0('yanbeam','enemy');

//	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_0.txt');//
//	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_0,ww2,15);//��
//	var enemyBeam = new BeamAI2_0('yanbeam','enemy');

//	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_1.txt');//��
//	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_1,ww2,15);//��
//	var enemyBeam = new BeamAI2_0('yanbeam','enemy');


//	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_3.txt');//��
//	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_3,ww1,15);//���Ō�̈�����NSpan--AI�p
//	var myb = new BeamAI2_0('mybeam','fighter');
//	printStatus.storeSprite(aa);

/*
	//	fighter : 1/x^2����		vs	enemy:1/x^2�Ȃ�
	//����		741 				 676

	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_4.txt');//��
	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_4,ww1,15);//���Ō�̈�����NSpan--AI�p
	var myb = new BeamAI2_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//��
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,15);//��
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');

*/

/*

	//	fighter : 1/x^2����		vs	enemy : 1/x^2�Ȃ�NSpan=5
	//����		233				267
	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_4.txt');//��
	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_4,ww1,15);//���Ō�̈�����NSpan--AI�p
	var myb = new BeamAI2_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//��
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,5);//��
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');
*/

/*
	//	fighter : 1/x^2����		vs	enemy : 1/x^2�Ȃ�NSpan=1
	//����		280				221					
	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_4.txt');//��
	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_4,ww1,15);//���Ō�̈�����NSpan--AI�p
	var myb = new BeamAI2_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//��
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,1);//��
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');
*/

/*
	//			MANUAL		vs 	��̎ア��
	//����			   103			     163

	var aa=new PlaneMANUAL1_0('fighter','mybeam','enemy',pointOfView);//�Ō�̈����͊֐�(�N���X)
	var myb = new BeamMANUAL1_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//��
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,1);//��
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');
*/


	//	fighter : 1/x^2����		vs	enemy : 1/x^2�Ȃ�NSpan=1
	//����		280				221					
	//MANUAL�Ό���  251		vs		251
	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_4.txt');//��
	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_4,ww1,15);//���Ō�̈�����NSpan--AI�p
	var myb = new BeamAI2_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//��
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,1);//��
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');




	printStatusLeft.storeSprite(aa);
	printStatusRight.storeSprite(enemy);	



	var hor =new Horizon('horizon',pointOfView);

	var arrow=new Arrow('arrow',pointOfView);



	//�G�ɂ��ꂽ��Ԃ��Č�
	main.playing=1;//initial screen
	main.state=-1;//

//	main.playing=0;//game start
//	main.state=0;

	aa.state=-1;//���X�e�[�W.js�̂Ȃ��ŏ��������s���̂ɕK�v�I�I�I�v����
	main.stageNumber=1;


	//main.state=0 ... ready to play
	//	      1 ... in preparation�l�Ԋ֌W�A���܂������Ȃ��ē�����O�B�C�ɂ��Ȃ����ƁB���܂���������f���Ɋ�ԁB

//	main.stageNumber=5;
//	main.playing=0;
//	main.state=0;


	//  ��  play script


	var hogeStage = setInterval(function(){

		if(false){

			//do nothing! to seem nice and to be changed easily

		}else if(main.stageNumber==1 && main.playing==0 && main.state==0){

			//���X�e�[�W1(AI�p�e�X�g�v���C)
			main.state=1;
			main.playing=1;
			var hogeW=setInterval(function(){
				clearInterval(hogeW);
				stageMATH1vsMANUAL(main,aa,myb,enemy,enemyBeam,hor,arrow);//�X�e�[�W�̓X�e�[�W���ƂɈႤ���̂��g���̂ŃI�u�W�F�N�g�ō��Ȃ������悢�Ƃ������_�ɒB����
			},100);
		}else if(main.playing==1 && main.state==-1){
			main.playing=0;
			console.info("push space key to start");
			main.show();
			main.playAudio('dearDragon',0);
			var hogeWaitToPlay = setInterval(function(){
				if(gMissile && main.audioSet('dearDragon').canplay){//�X�y�[�X�L�[�������ꂽ���}
					main.state=0;
					gMissile=false;
					clearInterval(hogeWaitToPlay);
					console.info("GAME START");
					main.hide();
				};
				main.setXY(0,0);
			},100);
		};
		if(main.stageNumber>4){
			clearInterval(hogeStage);
			console.log("hogeStage Stopped");
		};
		if(flagStop)clearInterval(hogeStage);
	
	},1000);


};//initialize

