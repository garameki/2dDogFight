/*
�T�v

DOM��element�̗v�f�������₷�����邽�߂̃��^�G�������g�Ƃ������ׂ�element

*/



/*
�J������

1	DOM�̃G�������g��property���N���X�u���E�U�Ŏ擾�A�ݒ�
*/



metaElementJS=null;
FR.push(new FileRelative("makeElementJS","cookieJS"));//localStorage...global object
FR.push(new FileRelative("libraryJS","cookieJS"));//copyObject()


//�N���X�u���E�U�p
gIE='internet explorer';
gBrowser=gIE


//body�ɂȂ����Ă��邩�̌���
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




//�N���X
var MetaElement=function(element){

	if(typeof element==='object' && element!==null && element!=undefined){
		this.element=element;
	}else{
		console.error("metaElementJS  MetaElement()������element���w�肵�Ă�������");
	};
};
//id�̒�`
MetaElement.prototype.getId=function(){
	if(gBrowser==gIE)return getIdIE.call(this);
	else console.error("metaElementJS  MetaElement.getId()�͖�����");
};
var getIdIE=function(){
	var id=this.element.id;
	if(id===''){
		console.error("metaElementJS  id����`����Ă��܂���this.element=",this.element);
		return '-1';
	} else return id;
};


//parentId�̒�`
MetaElement.prototype.getParentId=function(){
	if(gBrowser==gIE)return getParentIdIE.call(this);
	else console.error("metaElementJS  MetaElement.getParentId()�͖�����");
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

//parent�̒�`
MetaElement.prototype.getParent=function(){
	if(gBrowser==gIE)return getParentIE.call(this);
	else console.error("metaElementJS  getParent�͎�������Ă��܂���");
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

//class�̒�`
MetaElement.prototype.getClass=function(){
	if(gBrowser==gIE)return getClassIE.call(this);
	else console.error("metaElementJS  getClass�͎�������Ă��܂���");
};
var getClassIE=function(){
	return this.element.className;
};

//position�̒�`
MetaElement.prototype.getPosition=function(){
	if(gBrowser==gIE)return getPositionIE.call(this);
	else console.error("metaElementJS  potision�͎�������Ă��܂���");
};
var getPositionIE=function(){
	return this.element.style.position;
};

//left�̒�`
MetaElement.prototype.getLeft=function(){
	if(!isConnectBody(this.element))console.info("metaElementJS  MetaElement.getLeft()  DOM�ɂȂ����Ă��܂��� element=",this.element);
	if(gBrowser==gIE)return getLeftIE.call(this);
	else console.error("metaElementJS  getLeft�͎�������Ă��܂���");
};
var getLeftIE=function(){
	return this.element.offsetLeft;
};

//top�̒�`
MetaElement.prototype.getTop=function(){
	if(!isConnectBody(this.element))console.info("metaElementJS  MetaElement.getTop()  DOM�ɂȂ����Ă��܂��� element=",this.element);
	if(gBrowser==gIE)return getTopIE.call(this);
	else console.error("metaElementJS  getTop�͎�������Ă��܂���");
};
var getTopIE=function(){
	return this.element.offsetTop;
};

//zindex�̒�`
MetaElement.prototype.getZindex=function(){
	if(gBrowser==gIE)return getZindexIE.call(this);
	else console.error("metaElementJS  getZindex�͎�������Ă��܂���");
};
var getZindexIE=function(){
	var zindex=this.element.style.zIndex;
	if(zindex===''){
			console.error("metaElementJS  zindex����`this.element=",this.element);
			return 0;
	}else return zindex;
};

//width�̒�`
MetaElement.prototype.getWidth=function(){
	if(!isConnectBody(this.element))console.info("metaElementJS  MetaElement.getWidth()  DOM�ɂȂ����Ă��܂��� element=",this.element);
	if(gBrowser==gIE)return getWidthIE.call(this);
	else console.error("metaElementJS  getWidth�͎�������Ă��܂���");
};
var getWidthIE=function(){
	return this.element.offsetWidth;
};

//height�̒�`
MetaElement.prototype.getHeight=function(){
	if(!isConnectBody(this.element))console.info("metaElementJS  MetaElement.getHeight()  DOM�ɂȂ����Ă��܂��� element=",this.element);
	if(gBrowser==gIE)return getHeightIE.call(this);
	else console.error("metaElementJS  getHeight�͎�������Ă��܂���");
};
var getHeightIE=function(){
	return this.element.offsetHeight;
};


//title�̒�`
MetaElement.prototype.getTitle=function(){
	if(gBrowser==gIE)return getTitleIE.call(this);
	else console.error("metaElementJS  MetaElement.getTitle()�͖�����");
};
var getTitleIE=function(){
	var title=this.element.__title;
	if(title==='' || title===undefined){
		console.info("metaElementJS  title������܂���Belement=",this.element);
		return '';
	}else{
		return title;
	};
};


MetaElement.prototype.setParent=function(oValue){
	if(!oValue.tagName || oValue==null || oValue==undefined){
		console.error("metaElementJS  oValue��element�ł͂���܂���oValue=",oValue);
	};
	switch(oValue.tagName){
		case 'input':
		case 'br':
			console.error("metaElementJS  oValue��parentNode�ɂӂ��킵���Ȃ�element�ł�oValue=",oValue);
			break;
		default:
	};
	switch(gBrowser){
		case gIE:
			setParentIE.call(this,oValue);
			break;
		default:
			console.error("metaElementJS  MetaElement.setParent()�͎�������Ă��܂���");
	};
};
var setParentIE=function(obj){
	obj.appendChild(this.element);
};
//class�̒�`
MetaElement.prototype.setClass=function(string){
	if(typeof string!='string')console.error("metaElementJS  'string'�ł͂���܂���string=",string);
	switch(gBrowser){
		case gIE:
			setClassIE.call(this,string);
			break;
		default:
			console.error("metaElementJS  MetaElement.class()�͎�������Ă��܂���");
	};
};
var setClassIE=function(string){
	this.element.setAttribute('class',string);
};

//position�̒�`
MetaElement.prototype.setPosition=function(string){
	if(typeof string!='string')console.error("metaElementJS  'string'�ł͂���܂���string=",string);
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
			console.error("metaElementJS  MetaElement.potision()�͎�������Ă��܂���");
	};
};
var setPositionIE=function(string){
	this.element.style.position=string;
};

//left�̒�`
MetaElement.prototype.setLeft=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'�ł͂���܂���number=",number);

	switch(gBrowser){
		case gIE:
			setLeftIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setLeft()�͎�������Ă��܂���");
	};
};
var setLeftIE=function(number){
	this.element.style.left=number.toString()+'px';
};

//top�̒�`
MetaElement.prototype.setTop=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'�ł͂���܂���number=",number);
	switch(gBrowser){
		case gIE:
			setTopIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setTop()�͎�������Ă��܂���");
	};
};
var setTopIE=function(number){
	this.element.style.top=number.toString()+'px';
};

//zindex�̒�`
MetaElement.prototype.setZindex=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'�ł͂���܂���number=",number);
	switch(gBrowser){
		case gIE:
			setZindexIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setZindex()�͎�������Ă��܂���");
	};
};
var setZindexIE=function(number){
	this.element.style.zIndex=number;
};

//width�̒�`
MetaElement.prototype.setWidth=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'�ł͂���܂���number=",number);
	switch(gBrowser){
		case gIE:
			setWidthIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setWidth()�͎�������Ă��܂���");
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
			console.error("metaElementJS  �w�肳��Ă��Ȃ�tagName�ł�this.element.tagName=",this.element.tagName);
	};
};

//height�̒�`
MetaElement.prototype.setHeight=function(number){
	if(typeof number!='number')console.error("metaElementJS  'number'�ł͂���܂���number=",number);
	switch(gBrowser){
		case gIE:
			setHeightIE.call(this,number);
			break;
		default:
			console.error("metaElementJS  MetaElement.setHeight()�͎�������Ă��܂���");
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
			console.error("metaElementJS  �w�肳��Ă��Ȃ�tagName�ł�this.element.tagName=",this.element.tagName);
	};
};


//title�̃Z�b�^�[
MetaElement.prototype.setTitle=function(string){
	if(typeof string!='string')console.error("metaElementJS  'string'�ł͂���܂���string=",string);
	switch(gBrowser){
		case gIE:
			setTitleIE.call(this,string);
			break;
		default:
			console.error("metaElementJS  MetaElement.setTitle()�͖�����");
	};
};
var setTitleIE=function(string){
	this.element.__title=string;
};

//backgroundColor�̒�`
MetaElement.prototype.setBackgroundColor=function(string){
	if(typeof string!='string')console.error("metaElementJS  'string'�ł͂���܂���string=",string);
	switch(gBrowser){
		case gIE:
			setBackgroundColorIE.call(this,string);
			break;
		default:
			console.error("metaElementJS  MetaElement.setBackgroundColor()�͎�������Ă��܂���");
	};
};
var setBackgroundColorIE=function(string){
	this.element.style.backgroundColor=string;
};



