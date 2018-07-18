addKeyToMenuJS=null;


FR.push(new FileRelative('modalWindowInput3JS','addKeyToMenuJS'));
FR.push(new FileRelative('globalEventsJS','addKeyToMenuJS'));//gMouseXMove,gMouseYMove
FR.push(new FileRelative('makeElementJS','addKeyToMenuJS'));//makeCanvas
FR.push(new FileRelative('mainHTM','addKeyToMenuJS'));//gDivMenu



var addKeyToMenu=function(eleDiv){

gAnsModalWindow=null;
mwInput.setMessage('ƒCƒxƒ“ƒg–¼‚ð“ü—Í‚µ‚Ä‚­‚¾‚³‚¢');
mwInput.appear(gMouseXMove,gMouseYMove);
var hoge = setInterval(function(){
	if(gAnsModalWindow!=null){
		clearInterval(hoge);
		if(gAnsModalWindow){
			//script to do
console.log("addKeyToMenuJS  ans=",gAnsModalWindow);
			var eleKey=makeKey(gAnsModalWindow);
			gDivMenu.appendChild(eleKey);
		}else{
			//returned nothing and nothing to do
		};
	};
},100);





};