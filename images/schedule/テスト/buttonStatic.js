buttonStaticJS=null;
FR.push(new FileRelative("libraryJS","buttonStaticJS"));






//ボタンを作っておく。elementを返す
//マウスイベントはキャンセルしておきます
//呼び出しもとでイベントの設定をしてください
var createButton = function(text,colorBackground,colorBackgroundTag,colorText){

	if(arguments.length!=4)console.error("引数の数が違います buttonStatic");


	var rad=3.14/180;
	var xx=0,yy=0,width=180,height=70;
	var rr=35,sizeLetter=40;


	var ele;
	ele=document.createElement('canvas');
	ele.setAttribute('width',width);//canvasのwidthはele.width='300px'かな？
	ele.setAttribute('height',height);//divのwidthはele.style.width='300px'で指定
	ele.style.position='absolute';
	ele.style.margin='10px';
	ele.style.backgroundColor='rgba(0,0,0)';//colorBackground;
//	ele.style.zIndex=1000;//kkkあとで直す必要あり

	var ctx=ele.getContext('2d');//これをgetしたあとでcanvasの大きさを変えると、拡大とかになる

	paintKadomaru(ctx,xx,yy,width,height,rr,colorBackground,colorBackgroundTag);//●

	ctx.font = "bold "+sizeLetter.toString()+"px 'ＭＳ 明朝'";
	ctx.fillStyle=colorText;
	var widthLetter=ctx.measureText(text).width;
	ctx.fillText(text,(width-widthLetter)/2,(height-sizeLetter)/2+sizeLetter/4*3.2);

/*
	ele.addEventListener('click',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	ele.addEventListener('mousedown',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	ele.addEventListener('mouseup',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	ele.addEventListener('mouseout',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	ele.addEventListener('mousemove',function(event){
		event.stopPropagation();
		event.preventDefault();
	});
*/

	return ele;
};