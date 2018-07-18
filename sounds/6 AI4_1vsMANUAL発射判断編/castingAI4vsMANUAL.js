
//約束事
//	x,y...画面上の座標（スクリーン座標） : 表示に用いる
//	xx,yy...ゲーム内仮想空間上の座標（空間座標） : どこを中心とするかでスクリーン上の座標は異なる

canvas = document.createElement('canvas');
if ( ! canvas || ! canvas.getContext ){
	console.log("お使いのブラウザではお楽しみいただけません。")
}

function LayerScenery() {
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id','Grid');
	canvas.setAttribute('width',CanvasWidth.toString());
	canvas.setAttribute('height',CanvasHeight.toString());
	canvas.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:1;');//一番後ろ
	DivTop.appendChild(canvas);
	var ctx = canvas.getContext('2d');

	//背景を黒にする

	ctx.fillStyle = "rgb(0,0,0)";
	ctx.fillRect(0,0,CanvasWidth,CanvasHeight);
	ctx.fill();
};



var initialize = function () {


	printTimer();

	var main=new Scene('scene');



	//  ●  cast

	
	var pointOfView = 'fighter';



	var aa=new PlaneMANUALVer0('fighter','mybeam','enemy',pointOfView);//最後の引数は関数(クラス)
	var myb=new BeamAutoVer0('mybeam','fighter');

	var enemy = new PlaneAI4_1('enemy','yanbeam','fighter',pointOfView,AI4_0);
	var enemyBeam = new BeamAI0_0('yanbeam','enemy');

	var hor =new Horizon('horizon',pointOfView);

	var arrow=new Arrow('arrow',pointOfView);



	//敵にやられた状態を再現
	main.playing=1;//initial screen
	main.state=-1;//

//	main.playing=0;//game start
//	main.state=0;

	aa.state=-1;//→ステージ.jsのなかで初期化を行うのに必要！！！要改良
	main.stageNumber=1;


	//main.state=0 ... ready to play
	//	      1 ... in preparation人間関係、うまくいかなくて当たり前。気にしないこと。うまくいったら素直に喜ぶ。

//	main.stageNumber=5;
//	main.playing=0;
//	main.state=0;


	//  ●  play script


	var hogeStage = setInterval(function(){

		if(false){

			//do nothing! to seem nice and to be changed easily

		}else if(main.stageNumber==1 && main.playing==0 && main.state==0){

			//●ステージ1(AI用テストプレイ)
			main.state=1;
			main.playing=1;
			var hogeW=setInterval(function(){
				clearInterval(hogeW);
				stageAI4vsMANUAL(main,aa,myb,enemy,enemyBeam,hor,arrow);//ステージはステージごとに違うものを使うのでオブジェクトで作らない方がよいという結論に達した
			},100);
		}else if(main.playing==1 && main.state==-1){
			main.playing=0;
			console.info("push space key to start");
			main.show();
			main.playAudio('dearDragon',0);
			var hogeWaitToPlay = setInterval(function(){
				if(gMissile && main.audioSet('dearDragon').canplay){//スペースキーが押された合図
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

