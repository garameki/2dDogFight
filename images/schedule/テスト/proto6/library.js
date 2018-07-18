libraryJS=null;


//●オブジェクトの深いコピーをして返す
var copyObject=function(prop){

//	var obj={ };
//
//	Object.defineProperty(obj,'a',{value:5,writable:true});
//
//	return obj;

	console.log("library typeof prop=",typeof prop);
	if(typeof prop=="string"){
		var stringNew=prop;

		return stringNew;
	};
	var objNew={ };
	if(Object.keys(prop).length==0){
		return objNew;
	}else{
		for(var key in prop){
			var variable = copyObject(prop[key]);
console.log("boolean=",variable===prop[key]);
			Object.defineProperty(objNew,key,{
				value:variable,
				writable:true
			});
		};
		return objNew;
	};
};





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
	var number=start;
	return {
		up:function(){
			return number++;
		},
		down:function(){
			return number--;
		},
		reset:function(num){
			number=num;
		}
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
//console.log("parent=",parent);

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
var sortByZindexDescendingOrder = function(arr){
	//注意：body以外のelementにはすべてNumZindexオブジェクトで連番を振らないと、ソートできないよ


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
			else if(arr[ii]!=document.getElementsByTagName('body')[0])console.error("z-indexが定義されていません",arr[ii]);
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
//座標から上にいるelementたちを得る
var getUpperElements=function(cx,cy){
	var test=false;

	//DOMツリーを辿ります
	var bod=document.getElementsByTagName('body')[0];
	var eles=new Array();//クリック時に上空にあるelements
	var search=function(ele){
		//elesに条件(領域がクリック地点を含む)に合ったものを入れていきます
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

	eles = sortByZindexDescendingOrder(eles);

	return eles;
};



var gUpperElementsOnmouseup=[];
var gUpperElementsOnmousedown=[];
var getUpperElementsForEvent=function(event){
	//注意：divのchildはposition:relativeでないと、divにoffsetWidthとoffsetHeightが付かないよクリック等に反応しないよ
	//注意：body以外のelement.style.zIndexにはすべてNumZindexオブジェクトで連番を振っておくこと

	var test=false;

	var cx=event.clientX;
	var cy=event.clientY;

	var eles=getUpperElements(cx,cy);

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
//この形で使用してくださいwindow.addEventListener('mouseup',getUpperElementsForEvent,true);
//この形で使用して下さいwindow.addEventListener('mousedown',getUpperElementsForEvent,true);




//●elementのしまわれた配列の中に該当するelementがあればtrueを返す
var elementExist=function(arr,ele){

	var flag=false;
	for(var ii=0,len=arr.length;ii<len;ii++){
		if(arr[ii]==ele){
			flag=true;
			break;
		};
	};
	return flag;
};


//●DOMtreeに属するeleのglobalなpositionを求める
var getGlobalPosition=function(ele){
	if(ele=='undefined')console.error("libraryJS ele=",ele);
	var children=document.getElementsByClassName(ele.className);
	if(!elementExist(children,ele))console.error(ele,"はDOMに存在しません");

	var bod=document.getElementsByTagName('body')[0];
	var left=0;
	var top=0;
	var parent=ele;
	do{
		left+=parent.offsetLeft;
		top+=parent.offsetTop;
		parent=parent.parentNode;
	}while(parent!=bod);
	return {
		left:left,
		top:top
	};
};


var stopEvent=function(event){
	event.stopPropagation();
	event.preventDefault();
	console.log("now event preventing... event=",event);
};
//使用例
//window.addEventListener('mousedown',stopEvent,true);
//window.removeEventListener('mousedown',stopEvent,true);





//●Array.prototype.IndexOfの実装
if (Array.prototype.indexOf) {
		
}else{
 Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
    "use strict";

    if (this == null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    if (len === 0) {
      return -1;
    }

    var n = 0;

    if (arguments.length > 0) {
      n = Number(arguments[1]);

      if (n != n) { // shortcut for verifying if it's NaN
        n = 0;
      } else if (n != 0 && n != Infinity && n != -Infinity) {
         n = (n > 0 || -1) * Math.floor(Math.abs(n));
      }
    }

    if (n >= len) {
      return -1;
    }

    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);

    for (; k < len; k++) {
      if (k in t && t[k] === searchElement) {
        return k;
      }
    }
    return -1;
  }
 }
//●ここまで





