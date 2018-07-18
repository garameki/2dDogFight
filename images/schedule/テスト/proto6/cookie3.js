/*
開発履歴
3	cookieCompress()をglobalEventsJSから移管
	クッキーの最大量が10000文字。ペアは最大170ぐらい。
		60class->'tree'
		60parent->30
		としていたものを
		60->class00tree00parent0030title00新規作成....という具合にした

2	DOMの作り方を変更
	数字オブジェクトから直接elementを作成。elementは配列elementsに集められ順番に親elementに接続。treeで管理しないため、ラク。

1	2017.2.23
*/



cookieJS=null;
FR.push(new FileRelative("storageJS","cookieJS"));//localStorage...global object
FR.push(new FileRelative("makeElementJS","cookieJS"));//makeElement(),NumZindexオブジェクト
FR.push(new FileRelative("libraryJS","cookieJS"));//maxZindexオブジェクト

FR.push(new FileRelative("metaElementJS","cookieJS"));//MetaElement()クラス
FR.push(new FileRelative("treeDragJS","cookieJS"));//TreeDrag.setPosPlates()
FR.push(new FileRelative("menuJS","cookieJS"));//Menuオブジェクト

var cPropPair=function(sProp,oFuncGetter){
	this.prop=sProp;//プロパティー名
	this.func=oFuncGetter;//この関数はmetaElementJS内のMetaElementクラスのprototype関数です。そのため、call(oMetaElement<-new MetaElementしたもの)して使います
};

//クッキーに保存するプロパティー名と、プロパティーを取り出すためのMetaElementクラスのprototype関数を配列にしまっておく。最後は正規表現の$を入れる。
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



	//クッキーをF12で確認
	console.log("recognize cookie contains length=",localStorage.length);
	for(var ii=0,len=localStorage.length;ii<len;ii++){
		key=localStorage.key(ii);
		console.log(key,"->",localStorage.getItem(key));
	};

	var body=document.getElementsByTagName('body')[0];

	var oElements={ };//ここにelementのプロトタイプを入れる
	Object.defineProperty(oElements,'isExist',{value:function(sKeyPurpose){//機能を追加:キーが存在すればtrueを返す
		for(var sKey in oElements){
			if(sKey===sKeyPurpose)return true;
		};
		return false;
	},writable:false,enumerable:false,configurable:false});




	//クッキーを読み込んでelementのプロトタイプを作る
	var key,value;
	var regexp,strs,str;
	for(var ii=0,lenii=localStorage.length;ii<lenii;ii++){
		key=localStorage.key(ii);
		value=localStorage.getItem(key);//id番号

		Object.defineProperty(oElements,key,{value:{ },writable:true,enumerable:true,configurable:true});//elementのプロトタイプになる空のオブジェクト
		for(var kk=0,lenkk=aProps.length;kk<lenkk-1;kk++){//プロパティー
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
	for(key in oElements){//列挙可能なプロパティー
		obj=oElements[key];//elementのプロトタイプ
		ele=makeElement(obj.class,obj.title,obj.left,obj.top);//elementのプロトタイプのプロパティーからelementを生成
//〇ここで勝手につけない		ele.id=obj.id;
		ele.style.zIndex=obj.zindex;
		Object.defineProperty(obj,'element',{value:ele,writable:true});
	};


	//--------------------option from here---------------------------
	//Menu.elementRootはクッキーに入ってこない(oElementsのキーには含まれていない)ので、直接Menu.elementRootに接続する
	for(var sKey in oElements){
		if(oElements[sKey].parentId===Menu.elementRoot.id){
			Menu.elementRoot.appendChild(oElements[sKey].element);//MenuがDOMにアタッチされていること
		};
	};
	//--------------------option to here--------------------------



	//現在のDOMに追加する形で------>zindexの整合がとれないので追加はダメ。クリーンな状態でDOMツリーを生成する
	//クリーンチェック
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
	if(flagDocChildren)console.error("cookieJS DOMにelementがあります。zindexは保証されません");


	//DOMを作成
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
					console.error("classが同じelementに親子関係がある");
				};
			}else{
//console.log("not exist key=",keyParent);
				//親elementが特殊(Menu.elementRootとか)の場合はキーとしてMenu.elementRoot.idがoElementsに無いから、前にアタッチするか、後にアタッチしてください
			};
		};
	};

	//treeを洗い出し、その子ノードのPlateをzindexの順番にアタッチしなおす
	//破壊メソッド
	var temp;
	var sortByZindexAscendingOrder=function(nodes){
		for(var ii=0;ii<nodes.length-1;ii++){
			for(var kk=ii+1;kk<nodes.length;kk++){
				if(nodes[ii].style.zIndex>nodes[kk].style.zIndex){
					//入れ替え
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
	var trees=document.getElementsByClassName(ClassTree);//htmlCollectionオブジェクトが取得されます
	for(var ii=0,lenTrees=trees.length;ii<lenTrees;ii++){
		htmlCollectionChildren=trees[ii].getElementsByClassName(ClassPlate);//htmlCollectionオブジェクトが取得されます
		if(htmlCollectionChildren.length==0)console.error("cookieJS  ClassTreeにchildrenがありません。cookieを掃除してください");
		aChildren=[];
		for(var hh=0,lenHtmlCollectionChildren=htmlCollectionChildren.length;hh<lenHtmlCollectionChildren;hh++)aChildren.push(htmlCollectionChildren[hh]);
		aChildrenNew = sortByZindexAscendingOrder(aChildren);//昇順にソート 1,3,7,9,....
		for(var kk=0,lenAChildrenNew=aChildrenNew.length;kk<lenAChildrenNew;kk++){
//console.log("trees["+ii.toString()+"]=",trees[ii],"aChildrenNew["+kk.toString()+"]=",aChildrenNew[kk]);
			trees[ii].removeChild(aChildrenNew[kk]);//htmlCollectionオブジェクトは動的で、DOMから外れたノードはhtmlCollectionオブジェクトから、実体が消える
//console.log("trees["+ii.toString()+"]=",trees[ii],"aChildrenNew["+kk.toString()+"]=",aChildrenNew[kk]);
		};
//console.log("---------------------------------");
		for(var kk=0,lenAChildrenNew=aChildrenNew.length;kk<lenAChildrenNew;kk++){
//console.log("trees["+ii.toString()+"]=",trees[ii],"aChildrenNew["+kk.toString()+"]=",aChildrenNew[kk]);
			trees[ii].appendChild(aChildrenNew[kk]);
//console.log("trees["+ii.toString()+"]=",trees[ii],"aChildrenNew["+kk.toString()+"]=",aChildrenNew[kk]);
		};
	};




	//tree内のPlateの位置をPlateの独自propertyとして計算しておく。
	var trees=body.getElementsByClassName(ClassTree);
	for(var ii=0,len=trees.length;ii<len;ii++){
		TreeDrag.setPosPlates(trees[ii]);
	};


	NumZindex.reset(maxZindex()+1);//このあとに使用するNumZindexを現在使用されているもののうちで最大+1にする

};


var storeElementTreeToCookie=function(eleRoot){
	//eleRoot...document.createElementで作られるelement

	//elementの木構造からoElementsを作る
	var oElements={ };
	var body=document.getElementsByTagName('body')[0];
	var me;
	var createOElement=function(node){
		Object.defineProperty(oElements,node.id,{value:{ },writable:true,enumerable:true});
		me=new MetaElement(node);
		for(var ii=0,len=aProps.length-1;ii<len;ii++){
			Object.defineProperty(oElements[node.id],aProps[ii].prop,{value:aProps[ii].func.call(me),writable:true,enumerable:true});//.func.call(me)はMetaElementクラスのprototype関数としてfunc()が動くことを示している
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
			console.error("cookieStrage(メモリ容量)が足りませんのでいらないアイテムを削除してください");
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