
//PlaneMATHVer3の部品を読み込むヘダー




var tagNew;
//***Do not forget changing below after copying
var headerPlaneMANUAL1_0 = function(){
	console.info("headerPlaneMANUAL1_0 called !");

	var names=new Array();



	//***Do not forget changing below after copying
	//path & parts
	const folda = '../Plane/MANUAL/parts/';
	names.push('motion_0.js');
	names.push('../../MATH/parts/collision0_1.js');
	names.push('ssPlaneMANUAL1_0.js');


	
	//headerのidを取得
	var headId=document.getElementsByTagName("head")[0];
	var tagNew;
	for(var ii=0;ii<names.length;ii++){
		tagNew = document.createElement("script");
		tagNew.setAttribute("type","text/javascript");
		tagNew.setAttribute("src",folda+names[ii]);
		tagNew.setAttribute("charset","Shift_JIS");
		headId.appendChild(tagNew);
	};

	//ここでplaneの機能拡張 proc*はPlaneAIVer0の中でプロシージャとして使われます。
	var counter=0;
	var hoge = setInterval(function(){
		counter++;
		if(counter>20 || flagStop){
			console.error("PlaneMANUAL1_0 is not defined !");
			clearInterval(hoge);
			flagStop=true;
		};
		if('PlaneMANUAL1_0' in window){
			//use this name above as class name in casting file
			//***Do not forget changing below after copying
			PlaneMANUAL1_0.prototype.procMotion=PlaneMANUALMotionVer0;//各ファイルの中の関数名を使います
			PlaneMANUAL1_0.prototype.procCollision=PlaneMATHCollision0_1;//拝借
			clearInterval(hoge);
			console.info("PlaneMANUAL1_0 が使えます !");
		};
	},100);
};