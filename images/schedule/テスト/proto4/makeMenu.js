makeMenuJS=null;

FR.push(new FileRelative('makeElementJS','makeMenuJS'));//ClassMenu,ClassCreate,makeCanvas(),makeDiv()
FR.push(new FileRelative('makeKeyJS','makeMenuJS'));//makeKey()

var makeMenu=function(){

	var ele=makeDiv(ClassMenu,Relative,0,0);

	gCreate=makeCanvas('�V�K�쐬',ClassCreate,Relative,0,0,300,50,'red',30,'center');
	ele.appendChild(gCreate);


	var key=makeKey('������');
	ele.appendChild(key);

	var key=makeKey('�˂�');
	ele.appendChild(key);

	return ele;
};
