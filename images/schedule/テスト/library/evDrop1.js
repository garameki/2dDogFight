/*
	�}�E�X�A�b�v�܂��̓}�E�X�_�E�����ꂽ�Ƃ��ɂ��̏��ɂ���element���d�Ȃ菇�ɏE���グ��
		//���_�͉F���ɂ����āA�n�\��window�B�����ʒu�̕���z-index���傫���C���[�W
		//gUpperElementsOnmouseup��gUpperElementsOnmousedown��z-index�̏��Ԃɓ���
*/


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


	//�擾���to do�������ɓ���Ă������ł��B

};
window.addEventListener('mouseup',getUpperElements,true);
window.addEventListener('mousedown',getUpperElements,true);
