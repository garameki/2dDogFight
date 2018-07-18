/*
概要

DOMのelementの要素を扱いやすくするためのメタエレメントともいうべきelement

*/



/*
開発履歴

1	DOMのエレメントのpropertyをクロスブラウザで取得、設定
*/



metaElementJS=null;
FR.push(new FileRelative("makeElementJS","cookieJS"));//localStorage...global object
FR.push(new FileRelative("libraryJS","cookieJS"));//copyObject()


//クロスブラウザ用
gIE='internet explorer';
gBrowser=gIE


//bodyにつながっているかの検査
var isConnectBody=function(ele){
	//.parentNode...xbrowserOK
	var body=document.getElementsByTagName('BODY')[0];
	var search=function(node){
		if(node==body)return true;
		if(node.parentNode)if(search(node.parentNode))return true;
		return false;
	};
	return search(ele);
};




//クラス
var MetaElement=function(element){

	if(typeof element==='object' && element!==null && element!=undefined){
		this.element=element;
	}else{
		console.error("metaElementJS  MetaElement()引数にelementを指定してください");
	};
};
//idの定義
MetaElement.prototype.getId=function(){
	if(gBrowser==gIE)return getIdIE.call(this);
	else console.error("metaElementJS  MetaElement.getId()は未実装");
};
var getIdIE=function(){
	var id=this.element.id;
	if(id===''){
		console.error("metaElementJS  idが定義されていませんthis.element=",this.element);
		return '-1';
	} else return id;
};


//parentIdの定義
MetaElement.prototype.getParentId=function(){
	if(gBrowser==gIE)return getParentIdIE.call(this);
	else console.error("metaElementJS  MetaElement.getParentId()は未実装");
};
var getParentIdIE=function(){
	var oParent=this.getParent();
	if(oParent==null)return -1;
	else {
		var parent=this.getParent();
		if(parent.id==='')return '-1';
		else return parent.id;
	};
};

//parentの定義
MetaElement.prototype.getParent=function(){
	if(gBrowser==gIE)return getParentIE.call(this);
	else console.error("metaElementJS  getParentは実装されていません");
};
var getParentIE=function(){
	if(!this.element.parentNode){
		return null;
	}else if(this.element==document.getElementsByTagName('BODY')[0]){
		return null;
	}else if(this.element.parentNode==document.getElementsByTagName('BODY')[0]){
		return document.getElementsByTagName('BODY')[0];
	}else{
		return this.element.parentNode;
	};
};	

//classの定義
MetaElement.prototype.getClass=function(){
	if(gBrowser==gIE)return getClassIE.call(this);
	else console.error("metaElementJS  getClassは実装されていません");
};
var getClassIE=function(){
	return this.element.className;
};

//positionの定義
MetaElement.prototype.getPosition=function(){
	if(gBrowser==gIE)return getPositionIE.call(this);
	else console.error("metaElementJS  potisionは実装されていません");
};
var getPositionIE=function(){
	return this.element.style.position;
};

//leftの定義
MetaElement.prototype.getLeft=function(){
	if(!isConnectBody(this.element))console.info("metaElementJS  MetaElement.getLeft()  DOMにつながっていません element=",this.element);
	if(gBrowser==gIE)return getLeftIE.call(this);
	else console.error("metaElementJS  getLeftは実装されていません");
};
var getLeftIE=function(){
	return this.element.offsetLeft;
};

//topの定義
MetaElement.prototype.getTop=function(){
	if(!isConnectBody(this.element))console.info("metaElementJS  MetaElement.getTop()  DOMにつながっていません element=",this.element);
	if(gBrowser==gIE)return getTopIE.call(this);
	else console.error("metaElementJS  getTopは実装されていません");
};
var getTopIE=function(){
	return this.element.offsetTop;
};

//zindexの定義
MetaElement.prototype.getZindex=function(){
	if(gBrowser==gIE)return getZindexIE.call(this);
	else console.error("metaElementJS  getZindexは実装されていません");
};
var getZindexIE=function(){
	var zindex=this.element.style.zIndex;
	if(zindex===''){
			console.error("metaElementJS  zindex未定義this.element=",this.element);
			return 0;
	}else return zindex;
};

//widthの定義
MetaElement.prototype.getWidth=function(){
	if(!isConnectBody(this.element))console.info("metaElementJS  MetaElement.getWidth()  DOMにつながっていません element=",this.element);
	if(gBrowser==gIE)return getWidthIE.call(this);
	else console.error("metaElementJS  getWidthは実装されていません");
};
var getWidthIE=function(){
	return this.element.offsetWidth;
};

//heightの定義
MetaElement.prototype.getHeight=function(){
	if(!isConnectBody(this.element))console.info("metaElementJS  MetaElement.getHeight()  DOMにつながっていません element=",this.element);
	if(gBrowser==gIE)return getHeightIE.call(this);
	else console.error("metaElementJS  getHeightは実装されていません");
};
var getHeightIE=function(){
	return this.element.offsetHeight;
};


//titleの定義
MetaElement.prototype.getTitle=function(){
	if(gBrowser==gIE)return getTitleIE.call(this);
	else console.error("metaElementJS  MetaElement.getTitle()は未実装");
};
var getTitleIE=function(){
	var title=this.element.__title;
	if(title==='' || title===undefined){
		console.info("metaElementJS  titleがありません。element=",this.element);
		return '';
	}else{
		return title;
	};
};


MetaElement.prototype.setParent=function(oValue){
	if(!oValue.tagName || oValue==null || oValue==undefined){
		console.error("metaElementJS  oValueはelementではありませんoValue=",oValue);
	};
	switch(oValue.tagName){
		case 'input':
		case 'br':
			console.error("metaElementJS  oValueはparentNodeにふさわしくないelementですoValue=",oValue);
			break;
		default:
	};
	switch(gBrowser){
		case gIE:
			setParentIE.call(this,oValue);
			break;
		default:
			console.error("metaElementJS  MetaElement.setParent()は実装されていません");
	};
};
var setParentIE=function(obj){
	obj.appendChild(this.element);
};
//classの定義
MetaElement.prototype.setClass=function(string){
	if(typeof string!='string')console.error("metaElementJS  'string'ではありませんstring=",string);
	switch(gBrowser){
		case gIE:
			setClassIE.call(this,string);
			break;
		default:
			console.error("metaElementJS  MetaElement.class()は実装されていません");
	};
};
var setClassIE=function(string){
	this.element.setAttribute('class',string);
};

//positionの定義
MetaElement.prototype.setPosition=function(string){
	if(typeof string!='string')console.error("metaElementJS  'string'ではありませんstring=",string);
	switch(string){
		case 'absolute':
		case 'relative':
		case 'float':
		case 'fixed':
			break;
		default:
			console.error("metaElementJS  string="+string,"is invalid value as a property of element.style.positionin");
	};
	switch(gBrowser){
		case gIE:
			setPositionIE.call(this,string);
			break;
		default:
			console.error("metaElementJS  MetaElement.potision()は実装されていません");
	};
};
var setPositionIE=function(string){
	this.element.style.position=string;
};

//leftの定義
MetaElement.prototype.setLeft=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'ではありませんnumber=",number);

	switch(gBrowser){
		case gIE:
			setLeftIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setLeft()は実装されていません");
	};
};
var setLeftIE=function(number){
	this.element.style.left=number.toString()+'px';
};

//topの定義
MetaElement.prototype.setTop=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'ではありませんnumber=",number);
	switch(gBrowser){
		case gIE:
			setTopIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setTop()は実装されていません");
	};
};
var setTopIE=function(number){
	this.element.style.top=number.toString()+'px';
};

//zindexの定義
MetaElement.prototype.setZindex=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'ではありませんnumber=",number);
	switch(gBrowser){
		case gIE:
			setZindexIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setZindex()は実装されていません");
	};
};
var setZindexIE=function(number){
	this.element.style.zIndex=number;
};

//widthの定義
MetaElement.prototype.setWidth=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'ではありませんnumber=",number);
	switch(gBrowser){
		case gIE:
			setWidthIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setWidth()は実装されていません");
	};
};
var setWidthIE=function(number){
	switch(this.element.tagName){
		case 'div':
		case 'DIV':
			this.element.style.width=number.toString()+'px';
			break;
		case 'canvas':
		case 'CANVAS':
			this.element.width=number;
			break;
		default:
			console.error("metaElementJS  指定されていないtagNameですthis.element.tagName=",this.element.tagName);
	};
};

//heightの定義
MetaElement.prototype.setHeight=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'ではありませんnumber=",number);
	switch(gBrowser){
		case gIE:
			setHeightIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setHeight()は実装されていません");
	};
};
var setHeightIE=function(number){
	switch(this.element.tagName){
		case 'div':
		case 'DIV':
			this.element.style.height=number.toString()+'px';
			break;
		case 'canvas':
		case 'CANVAS':
			this.element.height=number;
			break;
		default:
			console.error("metaElementJS  指定されていないtagNameですthis.element.tagName=",this.element.tagName);
	};
};


//titleのセッター
MetaElement.prototype.setTitle=function(string){
	if(typeof string!='string')console.error("metaElementJS  'string'ではありませんstring=",string);
	switch(gBrowser){
		case gIE:
			setTitleIE.call(this,string);
			break;
		default:
			console.error("metaElementJS  MetaElement.setTitle()は未実装");
	};
};
var setTitleIE=function(string){
	this.element.__title=string;
};

//backgroundColorの定義
MetaElement.prototype.setBackgroundColor=function(string){
	if(typeof string!='string')console.error("metaElementJS  'string'ではありませんstring=",string);
	switch(gBrowser){
		case gIE:
			setBackgroundColorIE.call(this,string);
			break;
		default:
			console.error("metaElementJS  MetaElement.setBackgroundColor()は実装されていません");
	};
};
var setBackgroundColorIE=function(string){
	this.element.style.backgroundColor=string;
};



