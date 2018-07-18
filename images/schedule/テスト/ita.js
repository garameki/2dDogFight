itaJS=null;

///FR.push(new FileRelative("libraryJS","itaJS"));
//FR.push(new FileRelative("modalWindowInput3JS","itaJS"));
//FR.push(new FileRelative("modalWindowYesNo2JS","itaJS"));


var Ita=function(name){

	/*
		draggableな板を作る
	*/


	this.name=name;

	var ctx=createContext(NumZindex(),200,50);
	var ele=ctx.canvas;
	//ele.style.position='absolute';//sub classで選ぶ
	//ele.style.position='relative';//
	ele.draggable=true;

	var letterSize,lettersWidth;
	var letterSize=30;
	//文字の大きさを決めておく
	do{
		letterSize--;
		ctx.font = "bold "+letterSize.toString()+"px 'ＭＳ 明朝'";
		lettersWidth=ctx.measureText(name).width;
	}while(lettersWidth>ele.width-5);

	//バックアップ変数の用意
	var temp={
		blur:ctx.shadowBlur,
		color:ctx.shadowColor,
		style:ctx.fillStyle,
		alpha:ctx.globalAlpha,
		lineWidth:ctx.lineWidth
	};

	//中身の描画	この部分をたくさんのcanvasの複合体にする
	//バックの枠
	paintKadomaru(ctx,0,0,ele.width,ele.height,20,'black','rgb(0,200,0)');
	//文字
	ctx.font = "bold "+letterSize.toString()+"px 'ＭＳ 明朝'";
	ctx.fillStyle='yellow';
	ctx.fillText(name,ele.width/2-ctx.measureText(name).width/2,letterSize);

	//退避しておいた値を元に戻す
	ctx.shadowBlur=temp.blur;
	ctx.shadowColor=temp.color;
	ctx.fillStyle=temp.color;
	ctx.globalAlpha=temp.alpha;
	ctx.lineWidth=temp.lineWidth;


	this.name=name;
	this.ele=ele;	
	this.ctx=ctx;
};





