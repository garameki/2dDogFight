libraryJS=null;



//prototype chain‚ğg‚¤‚½‚ß‚ÌŠÖ”
var inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};


//DOMƒcƒŠ[‚ÌÅãˆÊz-index’l‚ğ’²‚×‚é([‚³—Dæ’Tõ)
var maxZindex = function(){
	var max=0;
	var searchChildren = function(parent){
		console.log("parent=",parent);
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