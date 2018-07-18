dragPlateJS=null;

FR.push(new FileRelative('mainHTM','dragPlateJS'));//gBody
FR.push(new FileRelative('makeTreeJS','dragPlateJS'));//devideTree()
FR.push(new FileRelative('dragTreeJS','dragPlateJS'));//moveAndBright()


/*
	treeを分割してdragする
*/

var appendDragForPlate=function(element){

	element.onmousedown=function(event){


		if(event.currentTarget.className!=ClassPlate)console.error("dragPlateJS イベントがcatchされたのがPlateではありません。");

		var ct=event.currentTarget;
		var targetTree=ct.parentNode;
		if(targetTree.children.length>1 && ct!=targetTree.children[0]){

			event.stopPropagation();

			var eleTree=devideTree(ct);

/*
			var plates=new Array();
			var flag=false;
			for(var ii=0,len=targetTree.children.length;ii<len;ii++){
				if(targetTree.children[ii]==ct)flag=true;
				if(flag)plates.push(targetTree.children[ii]);
			};
			var xx=ct.parentNode.offsetLeft+ct.offsetLeft;
			var yy=ct.parentNode.offsetTop+ct.offsetTop;
			var eleTree=createTree(plates,xx,yy);
			gBody.appendChild(eleTree);
*/
			moveAndBright(eleTree);
		};
	};

};