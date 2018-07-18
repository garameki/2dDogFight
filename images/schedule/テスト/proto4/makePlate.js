makePlateJS=null;

FR.push(new FileRelative('makeElementJS','makePlateJS'));


var abs = function(numInteger){
	if(numInteger==0)return 0
	else return Math.round(numInteger/Math.abs(numInteger));
};

var makePlate=function(title,xx,yy){

	var height=33;

	var eleDiv=makeDiv(ClassPlate,Relative,xx,yy);
	

	var eleTitle=makeCanvas(title,ClassTitle,Relative,0,0,200,height,'black','auto','center');
	eleDiv.appendChild(eleTitle);

	var eleHour=makeCanvas('23',ClassHour,Relative,0,0,32,height,'green',30,'left');
	eleHour.__number=0;
	eleDiv.appendChild(eleHour);
	var eleColon=makeCanvas(':',ClassColon,Relative,0,0,15,height,'green',30,'left');
	eleDiv.appendChild(eleColon);
	var eleMinute=makeCanvas('50',ClassMinute,Relative,0,0,30,height,'green',30,'left');
	eleMinute.__number=0;
	eleDiv.appendChild(eleMinute);




	return eleDiv;
};

	

