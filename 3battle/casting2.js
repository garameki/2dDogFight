
//約束事
//	x,y...画面上の座標（スクリーン座標） : 表示に用いる
//	xx,yy...ゲーム内仮想空間上の座標（空間座標） : どこを中心とするかでスクリーン上の座標は異なる

canvas = document.createElement('canvas');
if ( ! canvas || ! canvas.getContext ){
	console.log("お使いのブラウザではお楽しみいただけません。")
}


var initialize = function () {


//いまの現状をどう使うか？
//ではなく
//「こうやりたい」を形にする！

//ww1 =new Weight30('../weights/weight30_1.txt');//AI,Weight30ともにprototypeを使うので、newが必要
//ww2 =new Weight30('../weights/weight30_2.txt');

//こうすると、weight30のインスタンスを共有しないことになる→メモリ増加

//var aa		=new PlaneAI5_1('fighter','mybeam','enemy',pointOfView,AI5_1,ww1);
//var enemy	=new PlaneAI5_1('enemy','yanbeam','fighter',pointOfView,AI5_1,ww2);








	var main=new Scene('scene');


	//  ●  cast
	var pointOfView = 'fighter';

//	var aa=new PlaneMANUAL1_0('fighter','mybeam','enemy',pointOfView);//最後の引数は関数(クラス)
//	var myb = new BeamMANUAL1_0('mybeam','fighter');

//	var ww1= new Weight30('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane5_1AI5_1.txt');//●
//	var aa = new PlaneAI5_1('fighter','mybeam','enemy',pointOfView,AI5_1,ww1,15);//●最後の引数はNSpan--AI用
//	var myb = new BeamAI2_0('mybeam','fighter');


//	var ww2= new Weight30('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3 differentWeightAIBattle\\ai5weight2.txt');//●
//	var enemy = new PlaneAI5_2_0('enemy','yanbeam','fighter',pointOfView,AI5_1_1,ww2,15);//●
//	var enemyBeam = new BeamAI2_0('yanbeam','enemy');


//	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3 differentWeightAIBattle\\weight30PlaneAI5_2_0AI5_1_1.txt');//●
//	var enemy = new PlaneAI5_2_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_0,ww2,15);//●
//	var enemyBeam = new BeamAI2_0('yanbeam','enemy');

//	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_0.txt');//
//	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_0,ww2,15);//●
//	var enemyBeam = new BeamAI2_0('yanbeam','enemy');

//	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_1.txt');//●
//	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_1,ww2,15);//●
//	var enemyBeam = new BeamAI2_0('yanbeam','enemy');


//	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_3.txt');//●
//	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_3,ww1,15);//●最後の引数はNSpan--AI用
//	var myb = new BeamAI2_0('mybeam','fighter');
//	printStatus.storeSprite(aa);

/*
	//	fighter : 1/x^2あり		vs	enemy:1/x^2なし
	//結果		741 				 676

	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_4.txt');//●
	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_4,ww1,15);//●最後の引数はNSpan--AI用
	var myb = new BeamAI2_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//●
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,15);//●
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');

*/

/*

	//	fighter : 1/x^2あり		vs	enemy : 1/x^2なしNSpan=5
	//結果		233				267
	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_4.txt');//●
	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_4,ww1,15);//●最後の引数はNSpan--AI用
	var myb = new BeamAI2_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//●
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,5);//●
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');
*/

/*
	//	fighter : 1/x^2あり		vs	enemy : 1/x^2なしNSpan=1
	//結果		280				221					
	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_4.txt');//●
	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_4,ww1,15);//●最後の引数はNSpan--AI用
	var myb = new BeamAI2_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//●
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,1);//●
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');
*/

/*
	//			MANUAL		vs 	上の弱い方
	//結果			   103			     163

	var aa=new PlaneMANUAL1_0('fighter','mybeam','enemy',pointOfView);//最後の引数は関数(クラス)
	var myb = new BeamMANUAL1_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//●
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,1);//●
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');
*/


	//	fighter : 1/x^2あり		vs	enemy : 1/x^2なしNSpan=1
	//結果		280				221					
	//MANUAL対決後  251		vs		251
	var ww1= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_4.txt');//●
	var aa = new PlaneAI6_0_0_0('fighter','mybeam','enemy',pointOfView,AI6_0_0_4,ww1,15);//●最後の引数はNSpan--AI用
	var myb = new BeamAI2_0('mybeam','fighter');

	var ww2= new Weight30_0('C:\\Users\\usaku\\Documents\\games\\2dDogFight\\3battle\\weights\\weightPlane6_0_0_0AI6_0_0_2.txt');//●
	var enemy = new PlaneAI6_0_0_0('enemy','yanbeam','fighter',pointOfView,AI6_0_0_3,ww2,1);//●
	var enemyBeam = new BeamAI2_0('yanbeam','enemy');




	printStatusLeft.storeSprite(aa);
	printStatusRight.storeSprite(enemy);	



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
				stageMATH1vsMANUAL(main,aa,myb,enemy,enemyBeam,hor,arrow);//ステージはステージごとに違うものを使うのでオブジェクトで作らない方がよいという結論に達した
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

