/*
�J������

1	plate�Ɋւ�����̂������ɏW��


*/



plateJS=null;

FR.push(new FileRelative('mainHTM','plateJS'));//gBody
FR.push(new FileRelative('treeMakeJS','plateJS'));//TreeMake.devide()
FR.push(new FileRelative('treeDragJS','plateJS'));//TreeDrag.moveBrightDelete()
FR.push(new FileRelative('makeElementJS','plateJS'));


/*
	tree�𕪊�����drag����
*/

var appendDragForPlate=function(element){

	element.onmousedown=function(event){


		var ct=event.currentTarget;
		if(ct.className!=ClassPlate)console.error("plateJS �C�x���g��catch���ꂽ�̂�Plate�ł͂���܂���BcurrentTarget=",ct);
		var targetTree=ct.parentNode;
		if(targetTree.children.length>1 && ct!=targetTree.children[0]){//Tree�ɂ�����擪��Plate��'mousedown'�̂Ƃ���bubblePHASE�̎���TreeDrag�C�x���g�����΂���

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




