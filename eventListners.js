//mouse wheel event in div as screen

var initializeEventListner = function(){//綴り違ってます

//	DivTop.onmousemove = mousemove;
	DivTop.onclick = mouseclick;
//	document.getElementsByTagName('body')[0];
	document.onkeydown = keydown;
	document.onkeyup = keyup;
	//document.onkeydown = keydown;

	window.onresize = resize;

	if(false){
		var hogeKey = setInterval(function(){
			console.log("right=",gR," left=",gL," up=",gU," DOWN=",gD," A=",gA," Z=",gZ);
			if(flagStop)clearInterval(hogeKey);
		},100);
	};

};

resize = new (function(){//グローバルなプロシージャをあらかじめ作成
	var scriptMETA = (function(){/*

		var tempGlobalAlpha;
		var tempGlobalCompositeOperation;
		var hogeResize__NUM__=setInterval(function(){
			clearInterval(hogeResize__NUM__);
			for(var ii=0;ii<spriteFs.length;ii++){

				//ここの消す範囲を色で塗ってみる
//○				if(true){
					//●ここから
					tempGlobalAlpha = spriteFs[ii]._ctx.globalAlpha;
					tempGlobalCompositeOperation = spriteFs[ii]._ctx.globalCompositeOperation;
					spriteFs[ii]._ctx.globalAlpha=1;
					spriteFs[ii]._ctx.globalCompositeOperation='destination-out';

					spriteFs[ii]._ctx.fillStyle="rgb(200,0,0)";
					//spriteFs[ii]._ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
					spriteFs[ii]._ctx.beginPath();
					spriteFs[ii]._ctx.arc(0,0,2000,0,6.28,false);//画面の対角線の最大値を指定する
					spriteFs[ii]._ctx.fill();
					spriteFs[ii]._ctx.globalAlpha=tempGlobalAlpha;
					spriteFs[ii]._ctx.globalCompositeOperation=tempGlobalCompositeOperation;
					//●ここまで    矩形範囲が回転しているためにclearRectで対応できない部分をcontext.globalCompositeOperationプロパティーにより解決した


//○				}else{
//○					spriteFs[ii]._ctx.clearRect(-4000,-4000,4000,4000);//window.innerWidth,window.innerHeight);
//○				};
				info.text("deleted __NUM__  "+spriteFs[ii]._name+": width="+window.innerWidth.toString()+" height="+window.innerHeight.toString());
				
			};
		},10);

	*/});//EOF
	scriptMETA=scriptMETA.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");


	//●hogeが同じ変数で何度もよばれてしまうことでclearInterval()が出来なくなることをメタ処理で回避←配列は諸所の理由でやだ
	var count=0;
	var script;
	return function() {
		info.text(count.toString()+" delete");
		script=scriptMETA.replace(/__NUM__/g,count++);
		eval(script);
		CenterX=window.innerWidth/2;
		CenterY=window.innerHeight/2
	};//return

});


function beforeunload() {
	console.error("going to unload!");
};

function mouseclick() {
	console.log(event);
	console.log(event.view.pageXOffset+event.clientX-CenterX,-(event.view.pageYOffset+event.clientY-CenterY));
	flagStop=true;
};

function mousemove(){
//	console.log("X:",event.screenX-CenterX," Y:",-(event.clientY-CenterY));
};

var keydown =  function(event){
	var key = event.keyCode;

	if(key==R){
		gDd=-1;
		gR=true;
	}else if(key==L){
		gDd=1;
		gL=true;
	}else if(key==U){
		gDs=1;
		gU=true;
	}else if(key==D){
		gDs=-1;
		gD=true;
	}else if(key==SP){
info.text("eventListvers.js       space");
		if(gMissile==false)gMissile=true;
	}else if(key==A){
		gA=true;
		gDzoom=1;
	}else if(key==Z){
		gZ=true;
		gDzoom=-1
	}else if(key==W){
		gW=true;
	};

};

function keyup(){
	var key = event.keyCode;

	if(key==R){
		if(gR){
			gR=false;
		}else{
			console.error("RのkeyDownを捉えていなかった");
		};
		if(gL){
			gDd=1;
		}else{
			gDd=0;
		};
	}else if(key==L){
		if(gL){
			gL=false;
		}else{
			console.error("LのkeyDownを捉えていなかった");
		};
		if(gR){
			gDd=-1;
		}else{
			gDd=0;
		};
	}else if(key==U){
		if(gU){
			gU=false;
		}else{
			console.error("UのkeyDownを捉えていなかった");
		};
		if(gD){
			gDs=1;
		}else{
			gDs=0;
		};
	}else if(key==D){
		if(gD){
			gD=false;
		}else{
			console.error("DのkeyDownを捉えていなかった");
		};
		if(gU){
			gDs=1;
		}else{
			gDs=0;
		};
	}else if(key==A){
		if(gA){
			gA=false;
		}else{
			console.error("AのkeyDownを捉えていなかった");
		};
		if(gZ){
			gDzoom=-1;
		}else{
			gDzoom=0;
		};
	}else if(key==Z){
		if(gZ){
			gZ=false;
		}else{
			console.error("ZのkeyDownを捉えていなかった");
		};
		if(gA){
			gDzoom=1;
		}else{
			gDzoom=0;
		};
	};
};



function handle_screen(delta) {

	contextY.clearRect(0,0,yAxisWidth,yAxisHeight+1);
	contextLines.clearRect(0,0,gridWidth,gridHeight+2);
	contextGY.clearRect(0,0,gridWidth,gridHeight+2);



	if (delta < 0){
		// 下方向にまわした場合の処理
		minY = minY;
		var tempY = maxY;
		maxY= maxY + maxYmoto*0.05;
		if(maxY/maxYmoto>3){
			maxY = tempY;
		};
	}else{
		// 上方向にまわした場合の処理
		minY = minY;
		var tempY = maxY
		maxY= maxY - maxYmoto*0.05;
		if(maxY < (maxYmoto-minYmoto)*0.3+minYmoto){
			maxY = tempY;
		};
	};
	drawRuleY();
	var n = lines.length;
	for (var i=0;i<n;i++) {
		lines[i].draw();
	};





};

/** Event handler for mouse wheel event.
 */
function wheel_screen(event){
        var delta = 0;
        if (!event) /* For IE. */
                event = window.event;
        if (event.wheelDelta) { /* IE/Opera. */
                delta = event.wheelDelta/120;
                if (window.opera)
                        delta = -delta;
        } else if (event.detail) { /** Mozilla case. */
                delta = -event.detail/3;
        }

        /** If delta is nonzero, handle it.
         * Basically, delta is now positive if wheel was scrolled up,
         * and negative, if wheel was scrolled down.
         */
        if (delta) handle_screen(delta);
        if (event.preventDefault) {
                event.preventDefault();
        }
        event.returnValue = false;
}

var initialize_wheel = function () {
	/** Initialization code. 
	 * If you use your own event management code, change it as required.
	 */
	var idElementScreen = document.getElementById("grid");
//console.log("screen_before = ",idElementScreen);
	if (idElementScreen.addEventListener){
		idElementScreen.addEventListener('DOMMouseScroll', wheel_screen, false);
//console.log("screen_after = ",idElementScreen);
	
	}
	idElementScreen.onmousewheel = wheel_screen;
	// document.onmousewheel = wheel;
};

