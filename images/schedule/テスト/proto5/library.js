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



//��arr�ɓ����Ă���element��z-index���ɍ~���ɂ��ĕԂ�
var sortByZindex = function(arr){
	//���ӁFbody�ȊO��element�ɂ͂��ׂ�NumZindex()�ŘA�Ԃ�U��Ȃ��ƁA�\�[�g�ł��Ȃ���


	//�����l�����߂č��E�ɕ����悤�B
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
			else console.error("z-index����`����Ă��܂���",arr[ii]);
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
//		return small.concat(larges);//����
		return large.concat(small);//�~��
	};

	var res = order(arr);
	return res;
};



/*
	�}�E�X�A�b�v�܂��̓}�E�X�_�E�����ꂽ�Ƃ��ɂ��̏��ɂ���element���d�Ȃ菇�ɏE���グ��
		//���_�͉F���ɂ����āA�n�\��window�B�����ʒu�̕���z-index���傫���C���[�W
		//gUpperElementsOnmouseup��gUpperElementsOnmousedown��z-index�̏��Ԃɓ���
*/

var gUpperElementsOnmouseup=[];
var gUpperElementsOnmousedown=[];
var getUpperElements=function(event){
	//���ӁFdiv��child��position:relative�łȂ��ƁAdiv��offsetWidth��offsetHeight���t���Ȃ���N���b�N���ɔ������Ȃ���
	//���ӁFbody�ȊO��element.style.zIndex�ɂ͂��ׂ�NumZindex()�ŘA�Ԃ�U���Ă�������

	var test=false;

	var cx=event.clientX;
	var cy=event.clientY;

	//DOM�c���[��H��܂�
	var bod=document.getElementsByTagName('body')[0];
	var eles=new Array();//�N���b�N���ɏ��ɂ���elements
	var search=function(ele){
		//eles�ɏ����ɍ��������̂����Ă����܂�
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
	search(bod);//eles�ɓ���

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
