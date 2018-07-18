//�O���[�o��

//�萔�͂����Œ�`
const DrawStep = 1;//�`��Ԋu(�~���b)
const MaxSpeed = 3;//px/3ms
const MinSpeed = 1;//pc/3ms
var Ratio=1;//�\���̊g�k��

var hogeFlagStop = setInterval(function(){
	if(flagStop){
		console.log("globalVariables_1.js      �ǂ�����flagStop=true�ɂȂ�܂����B");
		clearInterval(hogeFlagStop);
	};
},1000);

var globalVariables = function(){

	HomeFolda='C:\\Users\\usaku\\Documents\\games\\2dDogFight\\';

	//�����C���[�ꊇ�w��i�X�ł��Ƃ킩�肸�炢�̂Łj�O���[�o���ϐ�
	gLayerPlane=4;
	gLayerBeam=3;

	gLayerJiki=4;
	gLayerJikiBeam=3;
	gLayerTekki=4;
	gLayerTekkiBeam=3;
	gLayerScene=5;
	gLayerHorizon=2;
	gLayerInformation=4;





	nil = -1854;//�I�[�L��
	Rad = Math.PI/180;
	CanvasWidth = screen.availWidth;
	CanvasHeight = screen.availHeight;
	CssWidth='width:'+CanvasWidth.toString()+'px;';
	CssHeight = 'height:'+CanvasHeight.toString()+'px;';
	CssWH = CssWidth+CssHeight;
	CenterX = window.innerWidth/2;
	CenterY = window.innerHeight/2;

	//�d�Ȃ�@�@canvas.getContext('2d').context.globalAlpha�v���p�e�B�[�̒l
	gLayerTekki=4;
	gLayerTekkiBeam=3;
	gLayerFighter=4;
	gLayerFighterBeam=3
	gLayerMain=1;
	gLayerHorizon=2;


	//�L�[�R�[�h
	//�E���㉺�X�y�[�X
	R=39;//��
	L=37;//��
	U=38;//��
	D=40;//��
	SP=32;//space key
	A=65;//a
	Z=90;//z
	W=87;//w

	//����(eventListener)
	gDd=0;
	gDs=0;
	gDzoom=0;
	gMissile=false;
	gR=false;
	gL=false;
	gU=false;
	gD=false;
	gA=false;
	gZ=false;
	gW=false;

	flagStop=false;
//hogeStop = setInterval(function(){
//	flagStop=true;
//	clearInterval(hogeStop);
//	console.log("stopped by globalVariables.js");
//},60000);//60�b��ɃX�g�b�v




	//�O���[�o���ȃN���[�W��
	info = new PrintInformation();//info(������);

	info.text("ready");

};



var printTimer = function(){

	var canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('width',CanvasWidth.toString());
	canvasNew.setAttribute('height',CanvasHeight.toString());
	canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:2');
	DivTop.appendChild(canvasNew);
	var ctx=canvasNew.getContext('2d');

	var count=0;
	var hogeTimer = setInterval(function(){
		count++;
		ctx.clearRect(50,50,100,100);
		ctx.beginPath();
		ctx.strokeStyle='rgb(255,255,255)';
		ctx.lineWidth=1;
		ctx.font = "bold 30px '�l�r ����'";
		ctx.fillStyle="white";
		ctx.fillText(101-count,100,100);
		ctx.stroke();
		if(count>10000000){
			clearInterval(hogeTimer);

			ctx.clearRect(50,50,100,100);
			ctx.fillStyle="rgb(200,0,0)";
			ctx.fillRect(50,50,210,100);

			ctx.beginPath();
			ctx.strokeStyle='rgb(255,255,255)';
			ctx.lineWidth=1;
			ctx.font = "bold 30px '�l�r ����'";
			ctx.fillStyle="white";
			ctx.fillText('Time Up',100,100);
			ctx.stroke();
			ctx.beginPath();
			ctx.strokeStyle='rgb(255,255,255)';
			ctx.lineWidth=1;
			ctx.font = "bold 13px '�l�r ����'";
			ctx.fillStyle="white";
			ctx.fillText('push F5 to restart',90,120);
			ctx.stroke();
			
			console.info("TIME UP");
			flagStop=true;
		};
		if(flagStop)clearInterval(hogeTimer);
	},1000);
};


var PrintInformation = function(){

	//�䏉�@�v���V�[�W�����v���V�[�W��
	var DrawInformation = function(){
		var letterHeight=15;
		var numLine=0;
		var canvasNew = document.createElement('canvas');
		canvasNew.setAttribute('width',CanvasWidth.toString());
		canvasNew.setAttribute('height',CanvasHeight.toString());
		canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:20');
		DivTop.appendChild(canvasNew);
		var ctx=canvasNew.getContext('2d');
		ctx.globalAlpha=0.7;
		ctx.fillStyle="white";

		return {
			chcolor:function(sColor){
				ctx.fillStyle=sColor;
			},
			put:function(text){
				ctx.font = "bold "+letterHeight.toString()+"px '�l�r ����'";
				ctx.fillText(text,0,numLine*letterHeight);	
				numLine++;
				if(numLine*letterHeight>CanvasHeight*0.7){
					numLine=1;
					ctx.clearRect(0,0,CanvasWidth,CanvasHeight);
				};
				ctx.fillStyle="white";
			}
		};//return
	};
	var printInformation = new DrawInformation

	var strings="";
	return {
		text:function(strings){
			printInformation.put(strings);
		},
		caution:function(strings){
			printInformation.chcolor('yellow');
			printInformation.put(strings);
		},
		overtime:function(sprite,sec){
			strings=sprite._name+".play()  too much time to execute "+sec.toString();
			printInformation.chcolor('pink');
			printInformation.put(strings);
		}
	};//return Array
};



//�~��`��

var drawCircle = function(){

	//�䏉�@�v���V�[�W�����v���V�[�W��
	var DrawCircle = function(){
		var letterHeight=15;
		var numLine=0;
		var canvasNew = document.createElement('canvas');
		canvasNew.setAttribute('width',CanvasWidth.toString());
		canvasNew.setAttribute('height',CanvasHeight.toString());
		canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:20');
		DivTop.appendChild(canvasNew);
		var ctx=canvasNew.getContext('2d');
		ctx.globalAlpha=0.7;
		ctx.fillStyle="white";

		return {
			chcolor:function(sColor){
				ctx.fillStyle=sColor;
			},
			put:function(text){
				ctx.font = "bold "+letterHeight.toString()+"px '�l�r ����'";
				ctx.fillText(text,0,numLine*letterHeight);	
				numLine++;
				if(numLine*letterHeight>CanvasHeight*0.7){
					numLine=1;
					ctx.clearRect(0,0,CanvasWidth,CanvasHeight);
				};
				ctx.fillStyle="white";
			}
		};//return
	};
	var printInformation = new DrawInformation

	var strings="";
	return {
		text:function(strings){
			printInformation.put(strings);
		},
		caution:function(strings){
			printInformation.chcolor('yellow');
			printInformation.put(strings);
		},
		overtime:function(sprite,sec){
			strings=sprite._name+".play()  too much time to execute "+sec.toString();
			printInformation.chcolor('pink');
			printInformation.put(strings);
		}
	};//return Array
};






