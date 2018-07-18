makeTreeJS=null;

FR.push(new FileRelative('libraryJS','createTreeJS'));//posAbsolute()
FR.push(new FileRelative('makeElementJS','createTreeJS'));
FR.push(new FileRelative('mainHTM','createTreeJS'));//gBody


var abs = function(numInteger){
	if(numInteger==0)return 0
	else return Math.round(numInteger/Math.abs(numInteger));
};

var createTree=function(plates,xx,yy){

	var eleDiv=makeDiv(ClassTree,Absolute,xx,yy);
	
	for(var ii=0,len=plates.length;ii<len;ii++){
		eleDiv.appendChild(plates[ii]);
	};

	return eleDiv;
};

//refPlateの前にinsert。nullの時は末尾
var mergeTree=function(tree1,refPlate,tree2){
	if(tree1.className!=ClassTree)console.error("tree1はClassTreeではありません。");
	if(tree2.className!=ClassTree)console.error("tree2はClassTreeではありません。");

	if(refPlate!=null && tree1!=refPlate.parentNode)console.error(refPlate,"の親要素と",tree1,"が同一ではありません。");

	for(var ii=0,len=tree2.children.length;ii<len;ii++){
		tree1.insertBefore(tree2.children[0],refPlate);
	};
	if(tree2.children.length!=0){
		console.error("makeTreeJS mergeTree() まだ子要素があるのに削除?");
		tree2.style.backgroundColor='red';
	}else{
		tree2.parentNode.removeChild(tree2);
		tree2=null;
	};
};


//refPlate以下を別のtreeとして分割
var devideTree=function(refPlate){
	if(refPlate.parentNode.className!=ClassTree)console.error("makeTreeJS divideTree() Plateの親がTreeでない。");
	if(refPlate.className!=ClassPlate)console.error("makeTreeJS mergeTree() refPlateがPlateでない。");

	//分割されるtreeのPlateを全て配列に入れる
	var plates=refPlate.parentNode.getElementsByClassName(ClassPlate);
	var platesNew=new Array();
	var flag=false;
	for(var ii=0,len=plates.length;ii<len;ii++){
		if(plates[ii]==refPlate)flag=true;
		if(flag)platesNew.push(plates[ii]);
	};

	var pos=posAbsolute(refPlate);
/*
	var sumLeft=0;
	var sumTop=0;
	var parent=refPlate;
	while(true){
		sumLeft+=parent.offsetLeft;
		sumTop+=parent.offsetTop;
		if(parent==gBody)break;
		parent=parent.parentNode;
	};
*/
	var treeNew=createTree(platesNew,pos.left,pos.top);
	gBody.appendChild(treeNew);

	return treeNew;
};
	

