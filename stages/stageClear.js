var stageClear = function(main,aa,myb,hor){

	var musicTitleBefore='battle';
	var musicTitleEnding='yochou';


	var kkk=main;
	var kka=aa;
	var kkh=hor;
	

	myb.stopPlay();


		//ÅúââèoÇíËã`

	var titleWrite = function(){//GAME CLEARÇï`Ç≠
		var text = "GAME CLEAR";
		var length = kkk._ctx.measureText(text).width;//***;
		var count=0;
		var hoge=setInterval(function(){
			kkk._ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
			kkk._ctx.beginPath();
			kkk._ctx.strokeStyle='rgb(255,255,255)';
			kkk._ctx.lineWidth=1;
			kkk._ctx.fillStyle="white";
			kkk._ctx.font = "bold 40px 'ÇlÇr ñæí©'";
			kkk._ctx.fillText(text,window.innerWidth/2-length/2,50);
			kkk._ctx.stroke();
			if(count>40 || flagStop){
				clearInterval(hoge);
				kkk._ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
			};
			count++;
		},100);
	};

	var horizonsDisappear = function(){//horizonÇ∆é©ã@ÇèôÅXÇ…è¡Ç∑
		var count=0;
		var hoge=setInterval(function(){
			count++;
			kka.setAlpha(count*2.5+50);
			kkh._ctx.globalAlpha=((20-count)/20);
			if(count>20){
				clearInterval(hoge);
			};
		},100);
	};

	var titleAppear = function(){//GAME CLEARÇèôÅXÇ…èoÇ∑
		var count=0;
		var hoge=setInterval(function(){
			count++;
			kkk._ctx.globalAlpha = (count*10/100);
			if(count>10)clearInterval(hoge);
		},60);
	};


	var titleDisappear = function(){//GAME CLEARÇèôÅXÇ…è¡Ç∑
		var count=0;
		var hoge=setInterval(function(){
			count++;
			kkk._ctx.globalAlpha = (200-count*10)/200;
			if(count>20){
				clearInterval(hoge);
			};
		},60);
	};

	var LengthMusic = 10;//ïb
	var Curve=0.8;//<1Ç≈Ç∑.nèÊÇÃãtä÷êîÇ≈Ç∑
	var length=LengthMusic*10
	var volumeFadeOut = function(){//É{ÉäÉÖÅ[ÉÄÇèôÅXÇ…è¨Ç≥Ç≠ÇµÇƒÉGÉìÉfÉBÉìÉOÇÃã»ÇÇ©ÇØÇÈ
		var count=0;
		var hogeVolume=setInterval(function(){
			count++;
			kkk.audioSet(musicTitleBefore).audio.volume = (Math.pow(length,Curve) - Math.pow(count,Curve))/Math.pow(length,Curve);
			if(count>length-1){
				clearInterval(hogeVolume);
				main.stopAudio(musicTitleBefore);
			};
		},100);
	};

	var length=LengthMusic*10
	var volumeFadeIn = function(){//É{ÉäÉÖÅ[ÉÄÇèôÅXÇ…ëÂÇ´Ç≠ÇµÇƒÉGÉìÉfÉBÉìÉOÇÃã»ÇÇ©ÇØÇÈ
console.log(main.audioSet(musicTitleEnding).audio);
		main.playAudio(musicTitleEnding,0);
		var count=0;
		var hogeVolume=setInterval(function(){
			count++;
			kkk.audioSet(musicTitleEnding).audio.volume = Math.pow(count/length,Curve);
			if(count>length-1){
				clearInterval(hogeVolume);
			};
		},100);
	};



	var SpeedUp = 100;//pixcel per second
	var caption1 = function(){

		kkk._ctx.globalAlpha =1;
		kkk.setAlpha(0);
		kkk.printStatus();
console.log("begin",kkk._ctx.globalAlpha);
		//kkk.show();Å©non of this business, because it's not Image object

		var texts = new Array();
		texts.push(['scenario','Tsuyoshi Sumiya']);
		texts.push(['charactor desin','Tsuyoshi Sumiya']);
		texts.push(['direction','Tsuyoshi Sumiya']);
		texts.push(['programming','Tsuyoshi Sumiya']);
		texts.push(['test play','Tsuyoshi Sumiya']);
		texts.push(['music','MusMus']);
		texts.push(['','']);
		texts.push(['total produce','glass workshop of USAKU']);


		for(var ii=0;ii<texts.length;ii++){
			canvasNew = document.createElement('canvas');
			canvasNew.setAttribute('id',name);
			canvasNew.setAttribute('width',CanvasWidth.toString());
			canvasNew.setAttribute('height',CanvasHeight.toString());
			canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:1');
			DivTop.appendChild(canvasNew);
			texts[ii].push(canvasNew.getContext('2d'));
			texts[ii][2].globalAlpha=0;
		};

		var CurveVanish=0.15;
		var CurveAppear=0.15;
		var t=0;
		var h=0;
		var y=0;
		var length=0;
		var count=0;
		var hoge=setInterval(function(){
			for(ii=0;ii<texts.length;ii++){
				texts[ii][2].clearRect(0,0,window.innerWidth,window.innerHeight);
				length = texts[ii][2].measureText(texts[ii][0]).width;//***;
				//role
				texts[ii][2].beginPath();
				texts[ii][2].strokeStyle='rgb(255,255,255)';
				texts[ii][2].lineWidth=1;
				texts[ii][2].fillStyle="white";
				texts[ii][2].font = "bold 40px 'ÇlÇr ñæí©'";
				texts[ii][2].fillText(texts[ii][0],window.innerWidth/2-length-30,window.innerHeight-count+ii*200+40);
				texts[ii][2].stroke();
				//name
				texts[ii][2].beginPath();
				texts[ii][2].strokeStyle='rgb(255,255,255)';
				texts[ii][2].lineWidth=1;
				texts[ii][2].fillStyle="white";
				texts[ii][2].font = "bold 40px 'ÇlÇr ñæí©'";
				texts[ii][2].fillText(texts[ii][1],window.innerWidth/2,window.innerHeight-count+ii*200+40);
				texts[ii][2].stroke();

				h=window.innerHeight;
				y=window.innerHeight-count+ii*200;
				if(y<=h-70 && y>h/2){
					t=y/(-h/2+70)+(h-70)/(h/2-70);
					texts[ii][2].globalAlpha = Math.pow(t,CurveAppear);
				};
				if(y<=h/2 && y>=30){
					t=y/(h/2-30)-30/(h/2-30);
					texts[ii][2].globalAlpha = Math.pow(t,CurveVanish);
//3333
				};
			};

			count++;
			if(window.innerHeight-count+(texts.length-1)*200+40<window.innerHeight/2 || flagStop){
				clearInterval(hoge);
				var hogehoge=setInterval(function(){
					clearInterval(hogehoge);
					var cc=0;
					var ii=texts.length-1;
					var fuga=setInterval(function(){
						//çƒï`âÊ(ìßñæìxÇïœÇ¶Ç»Ç™ÇÁ)
						texts[ii][2].clearRect(0,0,window.innerWidth,window.innerHeight);
						texts[ii][2].globalAlpha=(100-cc)/100;
						//role
						texts[ii][2].beginPath();
						texts[ii][2].strokeStyle='rgb(255,255,255)';
						texts[ii][2].lineWidth=1;
						texts[ii][2].fillStyle="white";
						texts[ii][2].font = "bold 40px 'ÇlÇr ñæí©'";
						texts[ii][2].fillText(texts[ii][0],window.innerWidth/2-length-30,window.innerHeight-count+ii*200+40);
						texts[ii][2].stroke();
						//name
						texts[ii][2].beginPath();
						texts[ii][2].strokeStyle='rgb(255,255,255)';
						texts[ii][2].lineWidth=1;
						texts[ii][2].fillStyle="white";
						texts[ii][2].font = "bold 40px 'ÇlÇr ñæí©'";
						texts[ii][2].fillText(texts[ii][1],window.innerWidth/2,window.innerHeight-count+ii*200+40);
						texts[ii][2].stroke();
						cc++;
						if(cc>100 || flagStop)clearInterval(fuga);
					},20);
				},2000);
stopSprites(kkk);
console.info("END");
			};
		},18);//Ç¢Ç¿ÇÁÇ»Ç¢ÅIÅI
	};





	//ÅúäeââèoÇÃé¿çs
	var perform=new Array();
	var timeStart=new Array();

	perform.push(titleWrite);
	timeStart.push(0);
	perform.push(titleAppear);
	timeStart.push(0);
	perform.push(volumeFadeOut);
	timeStart.push(0);
	perform.push(titleDisappear);
	timeStart.push(3);
	perform.push(volumeFadeIn);
	timeStart.push(4);
	perform.push(horizonsDisappear);
	timeStart.push(5);
	perform.push(caption1);
	timeStart.push(9);

	var numMax=5;
	var order=0;
	var time=0;
	var count=0;
	var hogeTimeKeeper = setInterval(function(){
		time+=0.1;
		

		if(time>timeStart[order] && order==count){
			perform[order]();
			order++;
		};
		if(time>15 || flagStop)clearInterval(hogeTimeKeeper);
		
		count++;
		if(count>numMax)count=order;

	},100);


};