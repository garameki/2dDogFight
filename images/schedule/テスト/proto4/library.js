libraryJS=null;

//����_�Ԃ̋���
var calcDistance = function(xx,yy,ox,oy){
	var distance = Math.pow((xx-ox)*(xx-ox)+(yy-oy)*(yy-oy),1/2);
	return distance;
};


//��inherits
var inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};


//���J�E���^�[
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
		console.error("libraryJS posAbsolute() element��DOM�ɂȂ����Ă��܂���B")
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



//��DOM�c���[�̍ŏ��z-index�l�𒲂ׂ�
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