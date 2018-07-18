treeMakeJS=null;

FR.push(new FileRelative('libraryJS','treeMakeJS'));//posAbsolute(),stopEvent()
FR.push(new FileRelative('makeElementJS','treeMakeJS'));//NumZindexオブジェクト
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

//refPlateの前にinsert。nullの時は末尾
var mergeTree=function(tree1,refPlate,tree2){
	if(tree1.className!=ClassTree)console.error("tree1はClassTreeではありません。",tree1.className,"です。");
	if(tree2.className!=ClassTree)console.error("tree2はClassTreeではありません。",tree2.className,"です。");

console.log("treeMakeJS mergeTree() tree1:(",tree1.className,",",tree1.id,") tree2:(",tree2.className,",",tree2.id,")");
	if(refPlate!=null && tree1!=refPlate.parentNode)console.error(refPlate,"の親要素と",tree1,"が同一ではありません。");

	window.addEventListener('mousedown',stopEvent,true);//全てのイベントを遮断

	var count=0;
	var lenChildrenTree2=tree2.children.length;
	var hoge=setInterval(function(){
		if(count++<lenChildrenTree2){
			tree1.insertBefore(tree2.children[0],refPlate);
		}else{
			clearInterval(hoge);

			//zindexを更新->cookieで順番に使うため
			var childrenTree1=tree1.getElementsByClassName(ClassPlate);//htmlCollectionオブジェクト
			for(var ii=0,lenChildrenTree1=childrenTree1.length;ii<lenChildrenTree1;ii++){
				childrenTree1[ii].style.zIndex=NumZindex.up();
			};

			//treeにnodeが残っていないことを確認してdelete
			if(tree2.children.length!=0){
				tree2.style.backgroundColor='red';
				console.error("treeMakeJS mergeTree() まだ子要素があるのに削除? tree2=",tree2);
			}else{
				tree2.parentNode.removeChild(tree2);
				tree2=null;
			};
			window.removeEventListener('mousedown',stopEvent,true);//イベント受付を再開
		};
	},50);
};


//refPlate以下を別のtreeとして分割
var devideTree=function(refPlate){
	if(refPlate.parentNode.className!=ClassTree)console.error("treeMakeJS divideTree() Plateの親がTreeでない。");
	if(refPlate.className!=ClassPlate)console.error("treeMakeJS devideTree() refPlateがPlateでない。");

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





