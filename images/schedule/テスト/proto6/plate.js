/*
開発履歴

1	plateに関するものをここに集約


*/



plateJS=null;

FR.push(new FileRelative('mainHTM','plateJS'));//gBody
FR.push(new FileRelative('treeMakeJS','plateJS'));//TreeMake.devide()
FR.push(new FileRelative('treeDragJS','plateJS'));//TreeDrag.moveBrightDelete()
FR.push(new FileRelative('makeElementJS','plateJS'));


/*
	treeを分割してdragする
*/

var appendDragForPlate=function(element){

	element.onmousedown=function(event){


		var ct=event.currentTarget;
		if(ct.className!=ClassPlate)console.error("plateJS イベントがcatchされたのがPlateではありません。currentTarget=",ct);
		var targetTree=ct.parentNode;
		if(targetTree.children.length>1 && ct!=targetTree.children[0]){//Treeにおける先頭のPlateが'mousedown'のときはbubblePHASEの次のTreeDragイベントが発火する

			event.stopPropagation();

			var eleTree=TreeMake.devide(ct);

			TreeDrag.moveBrightDelete(eleTree);
		};
	};

};



var abs = function(numInteger){
	
	if(numInteger==0)return 0
	else return Math.round(numInteger/Math.abs(numInteger));
};

var makePlate=function(title,hour,minute,xx,yy){

	var height=33;

	var eleDiv=makeElement(ClassPlate);
	

	var eleTitle=makeElement(ClassTitle,title);
	eleDiv.appendChild(eleTitle);
	var eleHour=makeElement(ClassHour,hour);
	eleDiv.appendChild(eleHour);
	var eleColon=makeElement(ClassColon);
	eleDiv.appendChild(eleColon);
	var eleMinute=makeElement(ClassMinute,minute);
	eleDiv.appendChild(eleMinute);




	return eleDiv;
};



Plate={ };
Object.defineProperty(Plate,'addEventDrag',{value:appendDragForPlate,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Plate,'create',{value:makePlate,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Plate,'where',{value:'plateJS',writable:false,enumerable:true,configurable:false});
Object.defineProperty(Plate,'has',{value:function(){
	console.log("");
	cosnole.log("Plate has...");
	for(var key in Plate){
		console.log(key);
	};
	console.log("");
},writable:false,enumerable:true,configurable:false});




