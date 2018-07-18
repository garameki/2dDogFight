libraryJS=null;

//●二点間の距離
var calcDistance = function(xx,yy,ox,oy){
	var distance = Math.pow((xx-ox)*(xx-ox)+(yy-oy)*(yy-oy),1/2);
	return distance;
};


//●inherits
var inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};


//●カウンター
var Counter=function(start){
	var num=start;
	return function(){
		return num++;
	};
};


var posAbsolute=function(element){
	var sumLeft=0;
	var sumTop=0;
	if(element!=document.getElementsByTagName('body')[0] && element.parentNode==null){
		console.error("libraryJS posAbsolute() elementはDOMにつながっていません。")
		sumLeft=null;
		sumTop=null;
	}else{
		var parent=element;
		while(true){
			sumLeft+=parent.offsetLeft;
			sumTop+=parent.offsetTop;
			if(parent==document.getElementsByTagName('body')[0])break;
			parent=parent.parentNode;
		};
	};
	return {
		left:sumLeft,
		top:sumTop
	};
};



//●DOMツリーの最上位z-index値を調べる
var maxZindex = function(){
	var max=0;
	var searchChildren = function(parent){
//		console.log("parent=",parent);
		var children=parent.childNodes;
		for(var ii=0,len=children.length;ii<len;ii++){
			if(children[ii].nodeType==1){
//console.log("children[",ii,"]=",children[ii].style.zIndex);
				if(max<children[ii].style.zIndex)max=children[ii].style.zIndex;
				searchChildren(children[ii]);
			};
		};
	};
	searchChildren(document.getElementsByTagName('body')[0]);
	return max;
};



//●arrに入っているelementをz-index順に降順にして返す
var sortByZindex = function(arr){
	//注意：body以外のelementにはすべてNumZindex()で連番を振らないと、ソートできないよ


	//中央値を決めて左右に分けよう。
	var order = function(arr){
		var len,sum,med;
		var small,large;
		var smalls=new Array();
		var larges=new Array();

		sum=0;
		len=arr.length;
		if(len==1)return arr;
		if(len==0)return [];

		for(var ii=0;ii<len;ii++){
			if(arr[ii].style.zIndex)sum+=arr[ii].style.zIndex;
			else console.error("z-indexが定義されていません",arr[ii]);
		};
		med=sum/len;

		for(var ii=0;ii<len;ii++){
			if(arr[ii].style.zIndex>med){
				larges.push(arr[ii]);
			}else{
				smalls.push(arr[ii]);
			};
		};
		small=order(smalls);
		large=order(larges);
//		small.splice(small.length,0,large);
//		return small.concat(larges);//昇順
		return large.concat(small);//降順
	};

	var res = order(arr);
	return res;
};



/*
	マウスアップまたはマウスダウンされたときにその上空にあるelementを重なり順に拾い上げる
		//視点は宇宙にあって、地表がwindow。高い位置の方がz-indexが大きいイメージ
		//gUpperElementsOnmouseupとgUpperElementsOnmousedownにz-indexの順番に入る
*/

var gUpperElementsOnmouseup=[];
var gUpperElementsOnmousedown=[];
var getUpperElements=function(event){
	//注意：divのchildはposition:relativeでないと、divにoffsetWidthとoffsetHeightが付かないよクリック等に反応しないよ
	//注意：body以外のelement.style.zIndexにはすべてNumZindex()で連番を振っておくこと

	var test=false;

	var cx=event.clientX;
	var cy=event.clientY;

	//DOMツリーを辿ります
	var bod=document.getElementsByTagName('body')[0];
	var eles=new Array();//クリック時に上空にあるelements
	var search=function(ele){
		//elesに条件に合ったものを入れていきます
		if(test)console.log("ele=",ele);
		var left=ele.offsetLeft;
		var top=ele.offsetTop;
		if(test)console.log("top=",top);
		var parent=ele;
		while(parent.parentNode!=null && parent!=bod){
			parent=parent.parentNode;
			left+=parent.offsetLeft;
			top+=parent.offsetTop;
			if(test)console.log("top2=",parent.offsetTop,parent);
		};
		var right=left+ele.offsetWidth;
		var bottom=top+ele.offsetHeight;
		if(cx>left && cx<right && cy>top && cy<bottom)eles.push(ele)


		for(var ii=0,len=ele.children.length;ii<len;ii++){
			search(ele.children[ii]);
		};
	};
	search(bod);//elesに入る

	if(test)console.log("before childs=",eles);

	eles = sortByZindex(eles);

	if(test)console.log("after childs");
	if(test)for(var ii=0,len=eles.length;ii<len;ii++)console.log("2=",eles[ii]);

	if(test)console.log("kind=",event.type);
	if(event.type=='mouseup'){
		gUpperElementsOnmouseup=eles;
	}else if(event.type=='mousedown'){
		gUpperElementsOnmousedown=eles;
	};
//console.log("gUpperElementsOnmouseup=",gUpperElementsOnmouseup);
//for(var ii=0,len=gUpperElementsOnmouseup.length;ii<len;ii++)console.log("up element=",gUpperElementsOnmouseup[ii],"  z-index=",gUpperElementsOnmouseup[ii].style.zIndex);
//console.log("gUpperElementsOnmousedown=",gUpperElementsOnmousedown);
//for(var ii=0,len=gUpperElementsOnmousedown.length;ii<len;ii++)console.log("down element=",gUpperElementsOnmousedown[ii],"  z-index=",gUpperElementsOnmousedown[ii].style.zIndex);
};
window.addEventListener('mouseup',getUpperElements,true);
window.addEventListener('mousedown',getUpperElements,true);
