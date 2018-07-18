keyJS=null;

FR.push(new FileRelative('makeElementJS','keyJS'));


var abs = function(numInteger){
	if(numInteger==0)return 0
	else return Math.round(numInteger/Math.abs(numInteger));
};

var makeKey=function(title){


	var height=33;

	var eleDiv=makeElement(ClassKey);
	

	var eleTitle=makeElement(ClassTitle,title);
	eleDiv.appendChild(eleTitle);

	var eleHour=makeElement(ClassHour,'23');
	eleDiv.appendChild(eleHour);

	var eleColon=makeElement(ClassColon);
	eleDiv.appendChild(eleColon);

	var eleMinute=makeElement(ClassMinute,'50');
	eleDiv.appendChild(eleMinute);

	return eleDiv;
};


//-----------------------------------------------------------------------------------------


var Key={ };
Object.defineProperty(Key,'create',{value:makeKey,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Key,'where',{value:'keyJS',writable:false,enumerable:true,configurable:false});
Object.defineProperty(Key,'has',{value:function(){
	console.log("--------------------------------------------------------------------");
	for(var key in Key){
		console.log(key);
	};
	console.log("--------------------------------------------------------------------");
},writable:false,enumerable:true,configurable:false});


