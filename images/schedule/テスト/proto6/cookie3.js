/*
�J������
3	cookieCompress()��globalEventsJS����ڊ�
	�N�b�L�[�̍ő�ʂ�10000�����B�y�A�͍ő�170���炢�B
		60class->'tree'
		60parent->30
		�Ƃ��Ă������̂�
		60->class00tree00parent0030title00�V�K�쐬....�Ƃ�����ɂ���

2	DOM�̍�����ύX
	�����I�u�W�F�N�g���璼��element���쐬�Belement�͔z��elements�ɏW�߂�ꏇ�Ԃɐeelement�ɐڑ��Btree�ŊǗ����Ȃ����߁A���N�B

1	2017.2.23
*/



cookieJS=null;
FR.push(new FileRelative("storageJS","cookieJS"));//localStorage...global object
FR.push(new FileRelative("makeElementJS","cookieJS"));//makeElement(),NumZindex�I�u�W�F�N�g
FR.push(new FileRelative("libraryJS","cookieJS"));//maxZindex�I�u�W�F�N�g

FR.push(new FileRelative("metaElementJS","cookieJS"));//MetaElement()�N���X
FR.push(new FileRelative("treeDragJS","cookieJS"));//TreeDrag.setPosPlates()
FR.push(new FileRelative("menuJS","cookieJS"));//Menu�I�u�W�F�N�g

var cPropPair=function(sProp,oFuncGetter){
	this.prop=sProp;//�v���p�e�B�[��
	this.func=oFuncGetter;//���̊֐���metaElementJS����MetaElement�N���X��prototype�֐��ł��B���̂��߁Acall(oMetaElement<-new MetaElement��������)���Ďg���܂�
};

//�N�b�L�[�ɕۑ�����v���p�e�B�[���ƁA�v���p�e�B�[�����o�����߂�MetaElement�N���X��prototype�֐���z��ɂ��܂��Ă����B�Ō�͐��K�\����$������B
var aProps=new Array();
aProps.push(new cPropPair('id',function(){
		return this.getId();
}));
aProps.push(new cPropPair('parentId',function(){
		return this.getParentId();
}));
aProps.push(new cPropPair('class',function(){
		return this.getClass();
}));
aProps.push(new cPropPair('left',function(){
		return this.getLeft();
}));
aProps.push(new cPropPair('top',function(){
		return this.getTop();
}));
aProps.push(new cPropPair('width',function(){
		return this.getWidth();
}));
aProps.push(new cPropPair('height',function(){
		return this.getHeight();
}));
aProps.push(new cPropPair('zindex',function(){
		return this.getZindex();
}));
aProps.push(new cPropPair('position',function(){
		return this.getPosition();
}));
aProps.push(new cPropPair('title',function(){
		return this.getTitle();
}));
aProps.push(new cPropPair('$',function(){ return null; }));//for regexp

var clearCookie=function(){

	while(localStorage.length>0){
		key = localStorage.key(0);
		localStorage.removeItem(key);
	};
};


var makeElementTreesFromCookie=function(){



	//�N�b�L�[��F12�Ŋm�F
	console.log("recognize cookie contains length=",localStorage.length);
	for(var ii=0,len=localStorage.length;ii<len;ii++){
		key=localStorage.key(ii);
		console.log(key,"->",localStorage.getItem(key));
	};

	var body=document.getElementsByTagName('body')[0];

	var oElements={ };//������element�̃v���g�^�C�v������
	Object.defineProperty(oElements,'isExist',{value:function(sKeyPurpose){//�@�\��ǉ�:�L�[�����݂����true��Ԃ�
		for(var sKey in oElements){
			if(sKey===sKeyPurpose)return true;
		};
		return false;
	},writable:false,enumerable:false,configurable:false});




	//�N�b�L�[��ǂݍ����element�̃v���g�^�C�v�����
	var key,value;
	var regexp,strs,str;
	for(var ii=0,lenii=localStorage.length;ii<lenii;ii++){
		key=localStorage.key(ii);
		value=localStorage.getItem(key);//id�ԍ�

		Object.defineProperty(oElements,key,{value:{ },writable:true,enumerable:true,configurable:true});//element�̃v���g�^�C�v�ɂȂ��̃I�u�W�F�N�g
		for(var kk=0,lenkk=aProps.length;kk<lenkk-1;kk++){//�v���p�e�B�[
			regexp=new RegExp(aProps[kk].prop+"(.*)"+aProps[kk+1].prop);
			strs=value.match(regexp);
			if(typeof strs=='object'){
				str=strs[1];
			}else{
				str="";
			};
			Object.defineProperty(oElements[key],aProps[kk].prop,{value:str,writable:true,enumerable:true});
		};
	};


	var obj;
	for(key in oElements){//�񋓉\�ȃv���p�e�B�[
		obj=oElements[key];//element�̃v���g�^�C�v
		ele=makeElement(obj.class,obj.title,obj.left,obj.top);//element�̃v���g�^�C�v�̃v���p�e�B�[����element�𐶐�
//�Z�����ŏ���ɂ��Ȃ�		ele.id=obj.id;
		ele.style.zIndex=obj.zindex;
		Object.defineProperty(obj,'element',{value:ele,writable:true});
	};


	//--------------------option from here---------------------------
	//Menu.elementRoot�̓N�b�L�[�ɓ����Ă��Ȃ�(oElements�̃L�[�ɂ͊܂܂�Ă��Ȃ�)�̂ŁA����Menu.elementRoot�ɐڑ�����
	for(var sKey in oElements){
		if(oElements[sKey].parentId===Menu.elementRoot.id){
			Menu.elementRoot.appendChild(oElements[sKey].element);//Menu��DOM�ɃA�^�b�`����Ă��邱��
		};
	};
	//--------------------option to here--------------------------



	//���݂�DOM�ɒǉ�����`��------>zindex�̐������Ƃ�Ȃ��̂Œǉ��̓_���B�N���[���ȏ�Ԃ�DOM�c���[�𐶐�����
	//�N���[���`�F�b�N
	var aDocChildren=document.documentElement.children;
	var lenDocChildren=aDocChildren.length;
	var flagDocChildren=false;
	for(var iii=0;iii<lenDocChildren;iii++){
		switch(aDocChildren[iii].tagName){
			case 'body':
			case 'BODY':
			case 'head':
			case 'HEAD':
				break;
			default:
				flagDocChildren=true;
				console.log("tagName=",aDocChildren[iii].tagName);
				break;
		};
	};
	if(flagDocChildren)console.error("cookieJS DOM��element������܂��Bzindex�͕ۏ؂���܂���");


	//DOM���쐬
	var keyParentId;
	for(key in oElements){
		keyParent=oElements[key].parentId;
		if(keyParent=="-1"){
			body.appendChild(oElements[key].element);
		}else{
			if(oElements.isExist(keyParent)){
//console.log("exist key=",keyParent);
				oElements[keyParent].element.appendChild(oElements[key].element);
				if(oElements[keyParent].element.className==oElements[key].element.className){
					console.error("class������element�ɐe�q�֌W������");
				};
			}else{
//console.log("not exist key=",keyParent);
				//�eelement������(Menu.elementRoot�Ƃ�)�̏ꍇ�̓L�[�Ƃ���Menu.elementRoot.id��oElements�ɖ�������A�O�ɃA�^�b�`���邩�A��ɃA�^�b�`���Ă�������
			};
		};
	};

	//tree��􂢏o���A���̎q�m�[�h��Plate��zindex�̏��ԂɃA�^�b�`���Ȃ���
	//�j�󃁃\�b�h
	var temp;
	var sortByZindexAscendingOrder=function(nodes){
		for(var ii=0;ii<nodes.length-1;ii++){
			for(var kk=ii+1;kk<nodes.length;kk++){
				if(nodes[ii].style.zIndex>nodes[kk].style.zIndex){
					//����ւ�
					temp=nodes[ii];
					nodes[ii]=nodes[kk];
					nodes[kk]=temp;
				};
			};
		};
		return nodes;
	};

//


	var htmlCollectionChildren,aChildren,aChildrenNew;
	var trees=document.getElementsByClassName(ClassTree);//htmlCollection�I�u�W�F�N�g���擾����܂�
	for(var ii=0,lenTrees=trees.length;ii<lenTrees;ii++){
		htmlCollectionChildren=trees[ii].getElementsByClassName(ClassPlate);//htmlCollection�I�u�W�F�N�g���擾����܂�
		if(htmlCollectionChildren.length==0)console.error("cookieJS  ClassTree��children������܂���Bcookie��|�����Ă�������");
		aChildren=[];
		for(var hh=0,lenHtmlCollectionChildren=htmlCollectionChildren.length;hh<lenHtmlCollectionChildren;hh++)aChildren.push(htmlCollectionChildren[hh]);
		aChildrenNew = sortByZindexAscendingOrder(aChildren);//�����Ƀ\�[�g 1,3,7,9,....
		for(var kk=0,lenAChildrenNew=aChildrenNew.length;kk<lenAChildrenNew;kk++){
//console.log("trees["+ii.toString()+"]=",trees[ii],"aChildrenNew["+kk.toString()+"]=",aChildrenNew[kk]);
			trees[ii].removeChild(aChildrenNew[kk]);//htmlCollection�I�u�W�F�N�g�͓��I�ŁADOM����O�ꂽ�m�[�h��htmlCollection�I�u�W�F�N�g����A���̂�������
//console.log("trees["+ii.toString()+"]=",trees[ii],"aChildrenNew["+kk.toString()+"]=",aChildrenNew[kk]);
		};
//console.log("---------------------------------");
		for(var kk=0,lenAChildrenNew=aChildrenNew.length;kk<lenAChildrenNew;kk++){
//console.log("trees["+ii.toString()+"]=",trees[ii],"aChildrenNew["+kk.toString()+"]=",aChildrenNew[kk]);
			trees[ii].appendChild(aChildrenNew[kk]);
//console.log("trees["+ii.toString()+"]=",trees[ii],"aChildrenNew["+kk.toString()+"]=",aChildrenNew[kk]);
		};
	};




	//tree����Plate�̈ʒu��Plate�̓Ǝ�property�Ƃ��Čv�Z���Ă����B
	var trees=body.getElementsByClassName(ClassTree);
	for(var ii=0,len=trees.length;ii<len;ii++){
		TreeDrag.setPosPlates(trees[ii]);
	};


	NumZindex.reset(maxZindex()+1);//���̂��ƂɎg�p����NumZindex�����ݎg�p����Ă�����̂̂����ōő�+1�ɂ���

};


var storeElementTreeToCookie=function(eleRoot){
	//eleRoot...document.createElement�ō����element

	//element�̖؍\������oElements�����
	var oElements={ };
	var body=document.getElementsByTagName('body')[0];
	var me;
	var createOElement=function(node){
		Object.defineProperty(oElements,node.id,{value:{ },writable:true,enumerable:true});
		me=new MetaElement(node);
		for(var ii=0,len=aProps.length-1;ii<len;ii++){
			Object.defineProperty(oElements[node.id],aProps[ii].prop,{value:aProps[ii].func.call(me),writable:true,enumerable:true});//.func.call(me)��MetaElement�N���X��prototype�֐��Ƃ���func()���������Ƃ������Ă���
		};
	};
	var trace=function(node){
		for(var ii=0,len=node.children.length;ii<len;ii++)trace(node.children[ii]);
		if(node!==body)createOElement(node);
	};
	trace(eleRoot);


console.info(oElements);
			

	var valueCookie;
	for(var keyCookie in oElements){
		valueCookie="";
		for(var ii=0,len=aProps.length-1;ii<len;ii++){
			valueCookie+=aProps[ii].prop+oElements[keyCookie][aProps[ii].prop];
//console.log("valueCookie=",valueCookie);
		};
		if(document.cookie.length>9000){
			console.error("cookieStrage(�������e��)������܂���̂ł���Ȃ��A�C�e�����폜���Ă�������");
		}else{
			localStorage.setItem(keyCookie,valueCookie);
		};
	};
};


var Cookie={ };
Object.defineProperty(Cookie,'clear',{value:clearCookie,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Cookie,'constructTrees',{value:makeElementTreesFromCookie,writable:false,enumerable:true,configurable:false});
Object.defineProperty(Cookie,'storeTree',{value:storeElementTreeToCookie,writable:false,enumerable:true,configurable:false});

console.log("cookieJS Object Cookie=",Cookie);