makeMenuJS=null;

FR.push(new FileRelative('makeElementJS','makeMenuJS'));//ClassMenu,ClassCreate,makeCanvas(),makeDiv()
FR.push(new FileRelative('makeKeyJS','makeMenuJS'));//makeKey()

var makeMenu=function(){

	var ele=makeDiv(ClassMenu,Relative,0,0);

	gCreate=makeCanvas('新規作成',ClassCreate,Relative,0,0,300,50,'red',30,'center');
	ele.appendChild(gCreate);


	var key=makeKey('おきる');
	ele.appendChild(key);

	var key=makeKey('ねる');
	ele.appendChild(key);

	return ele;
};
