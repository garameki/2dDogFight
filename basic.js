console.log("graph/class_and_module.js------------------start");


//prototype chain���g�����߂̊֐�
var inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};






var GraphLine = function (nIdTag,sIdResultJS,posZeroY) {

	//idResultJS�̏���nIdTag�ɐ܂���O���t�Ƃ��Ĕ��f����̂����̃N���X�B

	this.sIdTag = String(nIdTag);//���O���t��\������^�O�̔F���[


	//result_*.js�̃f�[�^���������ϐ���p��
	this.result = eval("result_"+sIdResultJS);



	var canvasNew = "";

	var canvasWidth = 1850;
	var canvasHeight = 850;
	var canvasWidthPX = String(canvasWidth)+'px'+this.sIdTag;
	var canvasHeightPX = String(canvasHeight)+'px';

	//�c�̌r��
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','gridX'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;');
	document.getElementById('grid_'+this.sIdTag).appendChild(canvasNew);
	//���̌r��
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','gridY'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('grid_'+this.sIdTag).appendChild(canvasNew);
	//�O���t��
	canvasNew = document.createElement('canvas');//�����ɐF���{���܂܂��
	canvasNew.setAttribute('id','gridLines'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('grid_'+this.sIdTag).appendChild(canvasNew);
	//X���̒l
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','xCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('xAxis_'+this.sIdTag).appendChild(canvasNew);
	//Y���̒l
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','yCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('yAxis_'+this.sIdTag).appendChild(canvasNew);
	//�O���t�̃^�C�g��
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','titleCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('lineTitle_'+this.sIdTag).appendChild(canvasNew);
	//Y���̃^�C�g��
	 canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','titleYCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('titleY_'+this.sIdTag).appendChild(canvasNew);
	//X���̃^�C�g��
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','titleXCanvas'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','background-color:rgba(255,255,255,0);position: absolute; left: 0px; top: 0px;');
	document.getElementById('titleX_'+this.sIdTag).appendChild(canvasNew);


	this.canvasLines = document.getElementById( 'gridLines'+this.sIdTag );
	var canvasGridX = document.getElementById( 'gridX'+this.sIdTag );
	var canvasGridY = document.getElementById( 'gridY'+this.sIdTag );
	var canvasX = document.getElementById( 'xCanvas'+this.sIdTag );
	var canvasY = document.getElementById( 'yCanvas'+this.sIdTag );



	var canvasTitle = document.getElementById( 'titleCanvas'+this.sIdTag );
	var canvasXTitle = document.getElementById( 'titleXCanvas'+this.sIdTag );
	var canvasYTitle = document.getElementById( 'titleYCanvas'+this.sIdTag );


	 this.contextLines = this.canvasLines.getContext( '2d' );

	 this.contextGX = canvasGridX.getContext( '2d' );

	 this.contextGY = canvasGridY.getContext( '2d' );
	 this.contextX = canvasX.getContext( '2d' );
	 this.contextY = canvasY.getContext( '2d' );

	 this.contextT = canvasTitle.getContext( '2d' );
	 this.contextXT = canvasXTitle.getContext( '2d' );
	 this.contextYT = canvasYTitle.getContext( '2d' );

	if( this.canvasLines.getContext && canvasX.getContext &&canvasY.getContext){
		//�e�p�[�c�̑傫��������(�[���ɂ���ĕς��邱�ƂɂȂ�ł��낤)
		 var screenWidth = document.getElementById('grid_'+this.sIdTag).width;
		 var screenHeight = document.getElementById('grid_'+this.sIdTag).height;
		 var linesWidth = 300;//***;
		 this.yAxisWidth = 80;//this.contextX.measureText('1000000000').width;//***;
console.log('this.result.dates[0]=',this.result.dates[0]);
		 var xAxisHeight=this.contextX.measureText(this.result.dates[0]).width*1.3;//***
		 var titleHeight = 50;//***
		 var titleXHeight = titleHeight;
		 this.titleYWidth = titleHeight;
console.log('this.result.dates[0]=',this.result.dates[0]);
		 this.gridHeight = screenHeight - titleHeight - xAxisHeight - titleXHeight;
		 var yAxisHeight = this.gridHeight;
		 this.titleYHeight = this.gridHeight;
		 var linesHeight = this.gridHeight;
		 this.gridWidth = screenWidth - this.yAxisWidth - linesWidth - this.titleYWidth;
		 this.titleWidth = this.gridWidth;
		 var xAxisWidth = this.gridWidth;
		 this.titleXWidth = this.gridWidth;

		//�e�p�[�c��ʂ̌��_
		var screenX0=0;
		var screenY0=posZeroY;
		var titleX0=screenX0 + this.yAxisWidth + this.titleYWidth;
		var titleY0=screenY0;
		var yAxisX0=screenX0 + this.titleYWidth;
		var yAxisY0=screenY0 + titleHeight;
		var xAxisX0 = screenX0 + this.yAxisWidth + this.titleYWidth;
		var xAxisY0 = screenY0 + titleHeight + this.gridHeight;
		var linesX0 = screenX0 + this.titleYWidth + this.yAxisWidth + this.titleWidth;
		var linesY0 = screenY0 + titleHeight;
		var gridX0 = screenX0 + this.titleYWidth + this.yAxisWidth;
		var gridY0 = screenY0 + titleHeight;
		var titleYX0 = screenX0;
		var titleYY0 = screenY0 + titleHeight; 
		var titleXX0 = screenX0 + this.titleYWidth + this.yAxisWidth;
		var titleXY0 = screenY0 + titleHeight + this.gridHeight + xAxisHeight;




/*
		//�e�p�[�c�̈ʒu���m�F
		 var context = canvasX.getContext('2d');

		context.beginPath();
		context.strokeRect(screenX0, screenY0,screenWidth,screenHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(titleX0,titleY0,this.titleWidth,titleHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(yAxisX0, yAxisY0,this.this.yAxisWidth,yAxisHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(gridX0, gridY0,this.gridWidth,this.gridHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(linesX0, linesY0,linesWidth,linesHeight);
		context.closePath();

		context.beginPath();
		context.strokeRect(xAxisX0, xAxisY0,xAxisWidth,xAxisHeight);
		context.closePath();
*/


		//html�ɂ���A���ꂼ��̗v�f�̈ʒu�Ƒ傫���𓮓I�Ɍ��肷��
		document.getElementById('elements_'+this.sIdTag).setAttribute('style','background-color:black;position:absolute;top:'+String(linesY0)+'px;left:'+String(linesX0)+'px;width:'+String(linesWidth)+'px;height:'+String(linesHeight)+'px;z-index:10;');
		document.getElementById('grid_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(gridY0)+'px;left:'+String(gridX0)+'px;width:'+String(this.gridWidth)+'px;height:'+String(this.gridHeight)+'px;z-index:10;');
		document.getElementById('lineTitle_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(titleY0)+'px;left:'+String(titleX0)+'px;width:'+String(this.titleWidth)+'px;height:'+String(titleHeight)+'px;');
		document.getElementById('yAxis_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(yAxisY0)+'px;left:'+String(yAxisX0)+'px;width:'+String(this.yAxisWidth)+'px;height:'+String(yAxisHeight)+'px;');
		document.getElementById('xAxis_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(xAxisY0)+'px;left:'+String(xAxisX0)+'px;width:'+String(xAxisWidth)+'px;height:'+String(xAxisHeight)+'px;');
		document.getElementById('titleX_'+this.sIdTag).setAttribute('style','background-color:black;position:absolute;top:'+String(titleXY0)+'px;left:'+String(titleXX0)+'px;width:'+String(this.titleXWidth)+'px;height:'+String(titleXHeight)+'px;');
		document.getElementById('titleY_'+this.sIdTag).setAttribute('style','position:absolute;top:'+String(titleYY0)+'px;left:'+String(titleYX0)+'px;width:'+String(this.titleYWidth)+'px;height:'+String(this.titleYHeight)+'px;');

	};


	//�O���t���������߂̕ϐ�
	this.topY=0;
	this.bottomY=this.gridHeight;
	this.colorGrid = 'rgb(30,30,150)';//�r���̐F




		



};//GraphLine

//�ǂ̃^�O�ɃO���t��`�������[
GraphLine.prototype.sIdTag = "";

GraphLine.prototype.result = null;//�O���t�ɗp����f�[�^�̋l�܂����ϐ�
	//result���g�����ƂŁA�ȉ����ȗ�
	//GraphLine.prototype.minYmoto=0;
	//GraphLine.prototype.maxYmoto=0;
	//GraphLine.prototype.title ="";
	//GraphLine.prototype.titleY="";
	//GraphLine.prototype.tan_i="";
	//GraphLine.prototype.titleX="";
	//GraphLine.prototype.dates=new Array;
	//GraphLine.prototype.itemNames = new Array;
	//GraphLine.prototype.pointXs = new Array;

//�O���t�ɕ\���f�[�^
GraphLine.prototype.lines = new Array;
GraphLine.prototype.maxY= null;//0;
GraphLine.prototype.minY= null;//0;
GraphLine.prototype.maxYmoto = null;//result_*,js����ڂ�
GraphLine.prototype.minYmoto = null;//result_*.js����ڂ�







	//��}�֌W
	GraphLine.prototype.canvasLines = null;//document.getElementById( 'gridLines'+this.sIdTag );
	GraphLine.prototype.contextLines = null;//this.canvasLines.getContext( '2d' );
	GraphLine.prototype.contextGX = null;//canvasGridX.getContext( '2d' );
	GraphLine.prototype.contextGY = null;//canvasGridY.getContext( '2d' );
	GraphLine.prototype.contextX = null;//canvasX.getContext( '2d' );
	GraphLine.prototype.contextY = null;//canvasY.getContext( '2d' );
	GraphLine.prototype.contextT = null;//canvasTitle.getContext( '2d' );
	GraphLine.prototype.contextXT = null;//canvasXTitle.getContext( '2d' );
	GraphLine.prototype.contextYT = null;//canvasYTitle.getContext( '2d' );
	GraphLine.prototype.yAxisWidth = null;//80;//this.contextX.measureText('1000000000').width;//***;
	GraphLine.prototype.titleYWidth = null;//titleHeight;
	GraphLine.prototype.gridHeight = null;//screenHeight - titleHeight - xAxisHeight - titleXHeight;
	GraphLine.prototype.titleYHeight = null;// this.gridHeight;
	GraphLine.prototype.gridWidth = null;// screenWidth - this.yAxisWidth - linesWidth - this.titleYWidth;
	GraphLine.prototype.titleWidth = null;// this.gridWidth;
	GraphLine.prototype.titleXWidth = null;// this.gridWidth;

	//�O���t���������߂̕ϐ�
	GraphLine.prototype.topY= 0;
	GraphLine.prototype.bottomY= null;//this.gridHeight;
	GraphLine.prototype.colorGrid = 'rgb(30,30,150)';//�r���̐F

	//item���������߂̕ϐ�
	GraphLine.prototype.iElement__ = 0;//private�B���̕ϐ���GraphLine.prototype.Line�̃R���X�g���N�^�̒������ň�������
	GraphLine.prototype.MaxNumberOfBoxesInElement= 20;
	GraphLine.prototype.colors = ['red','skyblue','cyan','blue','yellow','honeydew','mistyrose','yellowgreen','palegoldenrod','cornsilk','chartreuse','peru','chocolate','floralwhite','cornflowerblue','springgreen','goldenrod','magenta','moccasin','lightblue','greenyellow','saddlebrown','mediumorchid','seashell','aqua','olivedrab','rosybrown','azure','beige','lightsalmon','gainsboro','lightsteelblue','lemonchiffon','lightgoldenrodyellow','tomato','deepink','hotpink','slategray','lavender','teal','mediumaquamarine','mediumblue','whitesmoke'];



	//�O���t�S�̂�`��
GraphLine.prototype.draw = function () {

	this.maxYmoto = this.result.maxYmoto;
	this.minYmoto = this.result.minYmoto;


	for(var ii=0;ii<this.result.itemNames.length;ii++){
		this.lines[ii] = new this.Line(this.result.itemNames[ii],this.result.pointXs[ii]);
		this.lines[ii].setElementBox(ii);//Box(ii)��ii�͏��Ԃ�����
	};//this.minYmoto,this.maxYmoto������
	//�����O��this.maxYmoto��this.minYmoto�Ƃ͈Ⴄ


	this.minY=this.minYmoto;//�X�P�[����߂��Ƃ�minYmoto���Ăюg��
	this.maxY=this.maxYmoto;//�X�P�[����߂��Ƃ�maxYmoto���Ăюg��

	this.writeTitle();
	this.writeXtitle();
	this.writeYtitle();
	this.drawRuleX();
	this.writeXnames();
	this.drawRuleY();


	//this.minY��this.maxY�����܂��Ă����`��
	for(var i=0;i<this.iElement__;i++){
		this.lines[i].draw()
	};
	//�f�[�^��S�ē��͂�����ɌĂяo��
};


	//X��
GraphLine.prototype.drawRuleX = function () {

	var nDates = this.result.dates.length;
	var context = this.contextGX;

	var rangeScaleX = this.gridWidth/(nDates-1);

	for (var ii=0;ii<nDates;ii++) {
		var x = rangeScaleX*ii;
		context.beginPath();
		context.lineWidth=5;
		context.strokeStyle=this.colorGrid;
		context.moveTo(x,0);
		context.lineTo(x,this.gridHeight);
		context.stroke();
	};
};

	//X���̓��t
GraphLine.prototype.writeXnames = function () {
	var nDates = this.result.dates.length;//result_*,js
	var context = this.contextX;//GraphLine's
	var mojiHeight = 15;//eee�����͒[���ɂ���ĕς���K�v������Ȃ����Œ萔��ݒ肷��̂͂܂����ł���


	var angle = (90*Math.PI/180);
	context.rotate(angle);//���W���E���ɂX�O����]���E������-y,�������͂�
	//context.translate(this.marginTop+this.ruleHeight+4,-this.marginLeft+4);//���_(0,0)���ړ����J�X��̍��W
	var rangeX=(this.gridWidth-mojiHeight)/(nDates-1);			

	for (var ii=0;ii<nDates;ii++) {
		context.beginPath();
		context.strokeStyle='rgb(255,255,255)';
		context.lineWidth=1;
		context.font = "bold 14px '�l�r ����'";
		context.fillStyle='white';
		context.fillText(this.result.dates[ii],0,-rangeX*ii);
		context.stroke();
	};
};

	//X���̃^�C�g��
GraphLine.prototype.writeXtitle = function () {
	this.contextXT.translate(this.titleXWidth/2.2,25);
//	this.contextXT.translate(0,0);
	this.contextXT.beginPath();
	this.contextXT.strokeStyle='rgb(255,255,255)';
	this.contextXT.lineWidth=1;
	this.contextXT.font = "bold 20px '�l�r ����'";
	this.contextXT.fillStyle='white';
//	this.contextXT.fillText(this.result.titleX,this.titleXWidth/2 - this.contextXT.measureText(this.result.titleX).width/2,20);
	this.contextXT.fillText(this.result.titleX,0,0);
	this.contextXT.stroke();
};

	//Y���̃^�C�g��
GraphLine.prototype.writeYtitle = function () {

	//this.titleY='%';

	var angle = (90*Math.PI/180);
	this.contextYT.rotate(-angle);//���W���E���ɂX�O����]���E������-y,�������͂�
	this.contextYT.translate(-this.titleYHeight/2,0);
	var angle = (90*Math.PI/180);
	this.contextYT.beginPath();
	this.contextYT.strokeStyle='rgb(255,255,255)';
	this.contextYT.lineWidth=1;
	this.contextYT.font = "bold 20px '�l�r ����'";
	this.contextYT.fillStyle='white';
	this.contextYT.fillText(this.result.titleY,this.titleYWidth/2 - this.contextYT.measureText(this.result.titleY).width/2,20);
	this.contextYT.stroke();
};


	//�O���t�̃^�C�g��
GraphLine.prototype.writeTitle = function () {
	this.contextT.translate(this.titleWidth/2 - this.contextT.measureText(this.result.title).width,25);
//	this.contextT.translate(0,0);
	this.contextT.beginPath();
	this.contextT.strokeStyle='rgb(255,255,255)';
	this.contextT.lineWidth=1;
	this.contextT.font = "bold 20px '�l�r ����'";
	this.contextT.fillStyle='white';
//	this.contextT.fillText(this.result.title,this.titleWidth/2 - this.contextT.measureText(this.result.title).width/2,20);
	this.contextT.fillText(this.result.title,0,0);
	this.contextT.stroke();
};

//eee	maxY��minY�̖����͂��̊֐��Ŗ��炩��


	//Y��
GraphLine.prototype.drawRuleY = function () {
	//���̌r���Ɩڐ���̒l��`��

	//this.maxY��this.minY�����������Ă��Ȃ�


	var keta=Math.floor(Math.log(this.maxY-this.minY)/Math.log(10));
//console.log('this.maxY-this.minY=',this.maxY-this.minY);
//console.log('keta=',keta);
	var moto = Math.pow(10,keta); 
//console.log('this.maxY=',this.maxY,' this.minY=',this.minY,' moto=',moto);
	var pitch= moto/10;
	if(this.yAxisWidth/pitch > 20)pitch = moto/5;//��ԏ�̐��l���͂ݏo�Č����Ȃ��Ȃ�Ȃ��悤��-5���Ă�
	if(this.yAxisWidth/pitch > 20)pitch = moto/2;
	if(this.yAxisWidth/pitch > 20)pitch = moto;
	var y = this.minY;
	var ypointSen=0;
	var ypointAtai=0;
	var sNumber='';
	while(this.maxY>=y){
		if(this.minY<=y){
			//���̌r��
			ypointSen = this.gridHeight - (y-this.minY)/(this.maxY-this.minY)*this.gridHeight;				
			this.contextGY.beginPath();
			this.contextGY.lineWidth=3;
			this.contextGY.strokeStyle=this.colorGrid;
			this.contextGY.moveTo(0,ypointSen);
//console.log('Sen=',ypointSen);
			this.contextGY.lineTo(this.gridWidth,ypointSen);
			this.contextGY.stroke();	
	
			//���̃�����
			ypointAtai = this.gridHeight - (y-this.minY)/(this.maxY-this.minY)*(this.gridHeight-15);//��̐������\�����邽�߂ɍ�����15����	
			sNumber = Number(y).toLocaleString( undefined, { maximumFractionDigits: 20 });
			sNumber = ('   '+sNumber+this.tan_i).substr(-(keta+5));
			this.contextY.beginPath();
			this.contextY.strokeStyle='rgb(255,255,255)';//eee������ăN�H�[�e�[�V�����ɓ����́H
			this.contextY.lineWidth=1;
			this.contextY.font = "bold 14px '�l�r ����'";
			this.contextY.fillStyle='white';
//console.log('Atai=',ypointAtai);
			this.contextY.fillText(sNumber,this.yAxisWidth-this.contextY.measureText(sNumber).width-1,ypointAtai);
			this.contextY.stroke();
		};
		y= y + pitch;
	};
};


//�N���X���N���X
//���ꂼ���item�̃f�[�^�����Ă����A���̐�����element�ɉ����Ă����Athis.minYmoto��this.maxYmoto�����Ƃ߂�
GraphLine.prototype.Line = function (name,points) {

	//this��GraphLine�ł͂Ȃ��ALine�ł���
	this.points = points;
	this.name = name;
	this.number = this.iElement__;
	this.canvasElement = 0;
	this.colorNumber = 0;

	this.iElement__++;//GraphLine

	this.decideMaxMinY(this.points);

//console.log('Line�N���X');


};
inherits(GraphLine.prototype.Line,GraphLine);//GraphLine��this.iElement__���Ăяo����悤�ɂ���


	//�v���p�e�B�[
GraphLine.prototype.Line.prototype.hoge = 0;//setInterval��id�ԍ������Ă����B���삵�Ă��Ȃ��Ƃ���0������B
GraphLine.prototype.Line.prototype.flagblink = 0;//-1,1,0���Ƃ�B-1,1��setInterval��reverse����B���̂Ƃ��ɐF��ς���B�_�ł��Ă��Ȃ��Ƃ���0





	//���̎��̃��\�b�h�B�t�@�C������f�[�^��ǂނƂ��ɂ��������Ăяo����āA�`�悷��񂾂��ǁA
	//�������ňꊇ�ł��悤�ɂ���΁A�}�E�X��wheel����̎��ɁA���Ԃ�ς��āA�ꊇ�`��
	//����悤�ɂ���΂���
GraphLine.prototype.Line.prototype.decideMaxMinY = function (points) {
	//points�cArray���item�̘A���f�[�^

	//�ő�l�ƍŏ��l�����߂�
	for (var ii=0;ii<points.length;ii++) {
		if (this.maxYmoto < points[ii]) {
			this.maxYmoto = points[ii];
		};
		if (this.minYmoto > points[ii]) {
			this.minYmoto = points[ii];
		};
	};
};

GraphLine.prototype.Line.prototype.setElementBox = function (junban) {//junban...�ォ��̏���

	//�^�O���쐬
	var idElement = 'ele'+this.sIdTag+"-"+String(this.number);
	var canvasNew = document.createElement('canvas');//�L�����o�X�^�O�����
	canvasNew.setAttribute('id',idElement);
	canvasNew.setAttribute('class','element');
	canvasNew.setAttribute('height','25px');//canvas�ɂ�right��bottom���Ӗ��Ȃ��̂�
	canvasNew.setAttribute('style','position:relative;top:'+String(junban*5+0)+'px;');

	canvasNew.setAttribute('onmouseover','graphs['+this.sIdTag+'].lines['+String(this.number)+'].blink();');
	canvasNew.setAttribute('onmouseout','graphs['+this.sIdTag+'].lines['+String(this.number)+'].blinkstop();');



eee	�ǂݎ��Ȃ��Bprototype chain���q�����Ă��Ȃ��I�I�I�J���Ńe�X�g
console.log("idTag=",this.sIdTag);
	document.getElementById('elements_'+this.sIdTag).appendChild(canvasNew);//html��id=elements�̃^�O���Ƀ^�O������
	//canvas�̏���
	this.canvasElement = document.getElementById(idElement);
	var context = this.canvasElement.getContext( '2d' );

	this.colorNumber = this.number % this.MaxNumberOfBoxesInElement;

	//canvas�ւ̏�������
	//���O������
	context.beginPath();
	context.lineWidth=1;
	context.fillStyle = 'cyan';
	context.font = "bold 20px '�l�r ����'";
	context.fillStyle='white';
	context.fillText(this.name,100,20);
	context.stroke();

	//���{�̐���`��
	context.beginPath();
	context.lineWidth=5;
	context.strokeStyle=this.colors[this.colorNumber];//Global
	context.moveTo(10,15);
	context.lineTo(90,15);
	context.stroke();

};

	//Line�N���X��prototype����Ăяo����܂�
GraphLine.prototype.Line.prototype.drawLines = function (points,color) {

	var context = this.canvasLines.getContext( '2d' );//Lines

	var nPoints = points.length;

	context.lineWidth=3;
	var y = this.gridHeight - (points[0]-this.minY)/(this.maxY-this.minY)*this.gridHeight;
//console.log('this.gridHeight=',this.gridHeight,'  points[0]=',points[0],' this.maxY =',this.maxY,' this.minY=',this.minY);


	var x = 0;

	context.beginPath();//�����ꂪ�Ȃ��ƁA�O�̃p�X�Ɠ����o�H�Ƃ݂Ȃ���Ă��܂��܂��B
	context.moveTo(x,y);

	for (var i=1;i<nPoints;i++){
		y = this.gridHeight - (points[i]-this.minY)/(this.maxY-this.minY)*this.gridHeight;
		x = x + this.gridWidth/(this.dates.length-1);
//console.log('x=',x,' y=',y);
		context.lineTo(x,y);
	};

	context.strokeStyle=color;
	context.stroke();
};

GraphLine.prototype.Line.prototype.draw = function () {
	this.drawLines(this.points,this.colors[this.colorNumber]);
};
GraphLine.prototype.Line.prototype.drawcolor = function (nameColor) {
	this.drawLines(this.points,nameColor);
};
GraphLine.prototype.Line.prototype.lineState = 0;
GraphLine.prototype.Line.prototype.blink = function () {
	if(this.hoge==0){
		var thisline = this;//��������āA���[�J���ϐ��ɓ���Ă��ƂȂ���function�̒��ɓ����Ă����B
		if(this.hoge==0)thisline.lineState=1;
		this.hoge = setInterval(function(){
			if(thisline.lineState==1){
				console.log('thisline=',thisline);
				thisline.drawcolor('blue');
				thisline.lineState=-1;
			}else if(thisline.lineState==-1){
				thisline.drawcolor('gold');
				thisline.lineState=1;
			};
		},250);
	};
};
GraphLine.prototype.Line.prototype.blinkstop = function () {
	clearInterval(this.hoge);
	this.hoge=0;
	this.lineState=0;
	this.draw();
};	

				//blink(num);//javascript���n�ゾ����lines[num].blink();�Ƃł��Ȃ��B
				//Line.prototype.blink = function () {
				//	this.hoge = setInterval(function(){this.blinkEntity();},250);
				//};
				//Line.prototype.blinkEntity = function () {
				//	console.log('this.hoge=',this.hoge);
				//};
				//����́Afunction(){this.�`}�̃��\�b�h���F���ł��Ȃ��I�I�I
				//function(){function(����);}�̌`���������������B�X�R�[�v����΂ɕρB
				//
				//�����ɕK�{�m���@�R���p�C��
				//function(){};�Ƃ����̂̓R���p�C�����ɒ�`�����֐��B�܂�ÓI�B
				//function(){function1();};��function1�͎��s���ɒ�`�����֐��B�܂蓮�I�B
				//���I�֐��̒��ɐÓI�֐�����`����Ă���Ȃ���Ȃ��B
				//�ÓI�֐��̒��ɓ��I�֐��͖��B�Ȃ��Ȃ�A���I�֐��̓R���p�C�����ɂ͖���`�����炾�B
				//����́A���L�V�J���X�R�[�v�𗝉�����΂킩��
				//�����ɕK�{�m���A���L�V�J���X�R�[�v
				//return function () { return variable; }
				//variable���O���[�o���X�R�[�v�Œ�`����Ă��鎞�A�������O���`���Ďg�������ł��A
				//���̒l��Ԃ����Ƃ��ł���B���ꂪ��̍\�����B
				//var a = 'a';
				//var func1 = function () {
				//	var a='A';
				//	return function () { return a; }
				//};
				//
				//var func2 = func1()
				//
				//console.log('a=',a);//=>'a'
				//console.log('a=',func2(););//=>'A'---���[�J���Œ�`���ꂽ���e���\�������
				//
				//�����ɕK�v�Ȓm���B�N���[�W��
				//�Ȃ�Ƃ����Ă������́A���I�֐��̕ϐ����ۑ�����Ă����Ƃ������Ƃł���B
				//var counter = function () {
				//	var count = 0;
				//	return {
				//		'up':function () {//���L�V�J���X�R�[�v�Ń��[�J���ϐ��̒l��Ԃ�
				//			count++;
				//			return count;
				//		},//�������ӁB�Z�~�R�����ł͂Ȃ��R���}
				//		'down':function () {
				//			count--;
				//			return count;
				//		}
				//	};
				//};
				//
				//var count = counter();
				//
				//console.log(count.up());//=>1
				//console.log(count.up());//=>2
				//console.log(count.up());//=>3
				//console.log(count.down());//=>2
				//
				//
				//����͎��Ă���ł͂Ȃ����N���X�ɁB
				//�������A�������Ƃ��Ȃ�Ȃ��ꍇ�́A�đ�����\�����A�����𔺂��ꍇ�͍đ�����ł��Ȃ��B�R���p�C���͂Q��s���Ȃ��̂��B

				//��
				//var counter = function (num) {
				//	var count=num;
				//	return {
				//		'up':function () {
				//			count++;
				//			return count; 
				//		},
				//		'down':function () {
				//			count--;
				//			return count;
				//		}
				//	};
				//};
				//var count1 = counter(4);
				//var count2 = counter(4);//=>�֐����w�肵�Ă��������B
				//
				//�Ƃ�����ŁA�G���[���o���B
				//var count1 =  new counter(4);
				//var count2 = new counter(4);//=>���̃I�u�W�F�N�g�ł̓T�|�[�g����Ă��Ȃ�����ł��B
				//�N���X�Ƃ��Ă͎g���Ȃ��̂��B

				//�����𓥂܂��āA�u�J���v�̃t�H���_��Go



console.log('class_and_module.js------------------ready');

//���C���[��

	var canvasWidth = 1850;
	var canvasHeight = 850;
	var canvasWidthPX = String(canvasWidth)+'px'+this.sIdTag;
	var canvasHeightPX = String(canvasHeight)+'px';

	//�c�̌r��
	canvasNew = document.createElement('canvas');
	canvasNew.setAttribute('id','gridX'+this.sIdTag);
	canvasNew.setAttribute('width',canvasWidthPX);
	canvasNew.setAttribute('height',canvasHeightPX);
	canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;');
	document.getElementById('grid_'+this.sIdTag).appendChild(canvasNew);

xCenter =
yCenter =
var screenWidth = document.getElementById('grid_'+this.sIdTag).width;
var screenHeight = document.getElementById('grid_'+this.sIdTag).height;



var Charactor = function (image) {

	this.direction=0;
	this.x=0;
	this.y=0;
	this.image = image;
};
Charactor.prototype.walkFoward = function (num) {
	this.direction = 90;
};
Charactor.prototype.appear = function () {

	this.x = 100;
};
Charactor.prototype.disappear = function () {

	this.y = 100;
};

var a = new Charactor;


