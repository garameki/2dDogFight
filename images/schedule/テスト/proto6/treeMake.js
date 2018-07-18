treeMakeJS=null;

FR.push(new FileRelative('libraryJS','treeMakeJS'));//posAbsolute(),stopEvent()
FR.push(new FileRelative('makeElementJS','treeMakeJS'));//NumZindex�I�u�W�F�N�g
FR.push(new FileRelative('mainHTM','treeMakeJS'));//gBody

var abs = function(numInteger){
	if(numInteger==0)return 0
	else return Math.round(numInteger/Math.abs(numInteger));
};

var createTree=function(plates,xx,yy){

	window.addEventListener('mousedown',stopEvent,true);

	var tree=makeElement(ClassTree,"",xx,yy);
	var before=null;
	for(var ii=1,len=plates.length;ii<=len;ii++){
		tree.insertBefore(plates[len-ii],before);
		before=plates[len-ii];
	};

	window.removeEventListener('mousedown',stopEvent,true);

	return tree;
};

//refPlate�̑O��insert�Bnull�̎��͖���
var mergeTree=function(tree1,refPlate,tree2){
	if(tree1.className!=ClassTree)console.error("tree1��ClassTree�ł͂���܂���B",tree1.className,"�ł��B");
	if(tree2.className!=ClassTree)console.error("tree2��ClassTree�ł͂���܂���B",tree2.className,"�ł��B");

console.log("treeMakeJS mergeTree() tree1:(",tree1.className,",",tree1.id,") tree2:(",tree2.className,",",tree2.id,")");
	if(refPlate!=null && tree1!=refPlate.parentNode)console.error(refPlate,"�̐e�v�f��",tree1,"������ł͂���܂���B");

	window.addEventListener('mousedown',stopEvent,true);//�S�ẴC�x���g���Ւf

	var count=0;
	var lenChildrenTree2=tree2.children.length;
	var hoge=setInterval(function(){
		if(count++<lenChildrenTree2){
			tree1.insertBefore(tree2.children[0],refPlate);
		}else{
			clearInterval(hoge);

			//zindex���X�V->cookie�ŏ��ԂɎg������
			var childrenTree1=tree1.getElementsByClassName(ClassPlate);//htmlCollection�I�u�W�F�N�g
			for(var ii=0,lenChildrenTree1=childrenTree1.length;ii<lenChildrenTree1;ii++){
				childrenTree1[ii].style.zIndex=NumZindex.up();
			};

			//tree��node���c���Ă��Ȃ����Ƃ��m�F����delete
			if(tree2.children.length!=0){
				tree2.style.backgroundColor='red';
				console.error("treeMakeJS mergeTree() �܂��q�v�f������̂ɍ폜? tree2=",tree2);
			}else{
				tree2.parentNode.removeChild(tree2);
				tree2=null;
			};
			window.removeEventListener('mousedown',stopEvent,true);//�C�x���g��t���ĊJ
		};
	},50);
};


//refPlate�ȉ���ʂ�tree�Ƃ��ĕ���
var devideTree=function(refPlate){
	if(refPlate.parentNode.className!=ClassTree)console.error("treeMakeJS divideTree() Plate�̐e��Tree�łȂ��B");
	if(refPlate.className!=ClassPlate)console.error("treeMakeJS devideTree() refPlate��Plate�łȂ��B");

	//���������tree��Plate��S�Ĕz��ɓ����
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

var TreeMake={ };
Object.defineProperty(TreeMake,'create',{ value:createTree,writable:false,enumerable:true,configurable:false});
Object.defineProperty(TreeMake,'merge',{ value:mergeTree,writable:false,enumerable:true,configurable:false});
Object.defineProperty(TreeMake,'devide',{ value:devideTree,writable:false,enumerable:true,configurable:false});

Object.defineProperty(TreeMake,'where',{ value:'treeMakeJS',writable:false,enumerable:true,configurable:false});
Object.defineProperty(TreeMake,'has',{ value:function(){
	console.log("");console.log("TreeMake has");
	for(var key in TreeMake){
		console.log(key);
	};
},writable:false,enumerable:true,configurable:false});





