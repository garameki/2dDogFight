
//�񑩎�
//	x,y...��ʏ�̍��W�i�X�N���[�����W�j : �\���ɗp����
//	xx,yy...�Q�[�������z��ԏ�̍��W�i��ԍ��W�j : �ǂ��𒆐S�Ƃ��邩�ŃX�N���[����̍��W�͈قȂ�

canvas = document.createElement('canvas');
if ( ! canvas || ! canvas.getContext ){
	console.log("���g���̃u���E�U�ł͂��y���݂��������܂���B")
}

function LayerScenery() {
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id','Grid');
	canvas.setAttribute('width',CanvasWidth.toString());
	canvas.setAttribute('height',CanvasHeight.toString());
	canvas.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:1;');//��Ԍ��
	DivTop.appendChild(canvas);
	var ctx = canvas.getContext('2d');

	//�w�i�����ɂ���

	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,CanvasWidth,CanvasHeight);
	ctx.fill();
};



var initialize = function () {


	printTimer();

	var main=new Scene('scene');



	//  ��  cast

	
	var pointOfView = 'fighter';



	var aa=new PlaneMANUALVer0('fighter','mybeam','enemy',pointOfView);//�Ō�̈����͊֐�(�N���X)
	var myb=new BeamAutoVer0('mybeam','fighter');

	var enemy = new PlaneAI4_1('enemy','yanbeam','fighter',pointOfView,AI4_0);
	var enemyBeam = new BeamAI0_0('yanbeam','enemy');

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
				stageAI4vsMANUAL(main,aa,myb,enemy,enemyBeam,hor,arrow);//�X�e�[�W�̓X�e�[�W���ƂɈႤ���̂��g���̂ŃI�u�W�F�N�g�ō��Ȃ������悢�Ƃ������_�ɒB����
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

console.info("castingAI3vsMANUAL.js      ready !");

