menuJS=null;

FR.push(new FileRelative('buttonCreateJS','menuJS'));




var gExistMenu=false;
var menu=function(){
	//menuの準備
	var ele=document.createElement('div');
	ele.setAttribute('style','background-color:purple;position:absolute;left:0px;top:0px;z-index:'+NumZindex()+';');
	var btnC=makeButtonCreate();
	ele.appendChild(btnC);
	ele.appendChild(document.createElement('br'));

	ele.draggable=true;

	var moveMenu=function(mx,my){
		//mx,my.....ドラッグスタート時からのマウスの移動距離
		ele.style.left=(ele.offsetLeft-mx).toString()+'px';
		ele.style.top=(ele.offsetTop-my).toString()+'px';
		ele.style.zIndex=NumZindex();
//console.log("ele.style.left=",ele.offsetLeft);
	};
	ele.ondragstart = function(event){
	};
	ele.ondragend = function(event){
		if($testevent)console.log('eleMenu.dragend');
		moveMenu(gMouseDownX-event.clientX,gMouseDownY-event.clientY);		
	};





	return ele;
};

