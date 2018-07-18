libraryJS=null;

//prototype chain���g�����߂̊֐�
var inherits = function(childCtor, parentCtor) {
  /** @constructor */
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  /** @override */
  childCtor.prototype.constructor = childCtor;
};


var createContext = function(){

	/*
		position:absolute;
		z-index:(��Ԍ�);
	*/

	var variables=new Array();//<-return function()�̈���
	variables.push("zIndex");
	variables.push("ww");
	variables.push("hh");


	//defaults
	var zIndex='2';
	var ww=window.innerWidth;
	var hh=window.innerHeight;
	if(arguments.length>variables.length){
		console.error("library.js createContext() �����̐����������܂� ",arguments);
	}else{
		for(var ii=0,len=arguments.length;ii<len;ii++){

			eval(variables[ii]+"="+arguments[ii]);
//			eval(variables[ii]+"='"+arguments[ii]+"'");

		};
	};

	canv = document.createElement('canvas');
	canv.setAttribute('width',ww);
	canv.setAttribute('height',hh);
	canv.setAttribute('style','position: absolute;z-index:'+zIndex.toString()+';');
	ctx = canv.getContext('2d');

		return ctx;
};


var Counter = function(nStart){

	var n=nStart;

	return function(){
		return n++;
	};
};



var paintKadomaru = function(ctx,xx,yy,ww,hh,rr,bgcolor,fgcolor){

////��//bgcolor�g���Ă܂���

//	ctx.clearRect(0,0,ww,hh);


	//�n�̎l�p��`��
	ctx.fillStyle=fgcolor;
	ctx.fillRect(xx+rr,yy+rr,ww-2*rr,hh-2*rr);
	ctx.fillRect(xx+rr,yy,ww-2*rr,rr);
	ctx.fillRect(xx,yy+rr,rr,hh-2*rr);
	ctx.fillRect(xx+ww-rr,yy+rr,rr,hh-2*rr);
	ctx.fillRect(xx+rr,yy+hh-rr,ww-2*rr,rr);


//	ctx.fillRect(xx,yy,rr,rr);
//	ctx.fillRect(xx+ww-rr,yy,rr,rr);
//	ctx.fillRect(xx,yy+hh-rr,rr,rr);
//	ctx.fillRect(xx+ww-rr,yy+hh-rr,rr,rr);


	//�l���ɉ~��`��
	ctx.fillStyle=fgcolor;
	ctx.beginPath();
	ctx.arc(xx+rr,yy+rr,rr,0,6.28);ctx.fill();
	ctx.beginPath();
	ctx.arc(xx+ww-rr,yy+rr,rr,0,6.28);ctx.fill();
	ctx.beginPath();
	ctx.arc(xx+ww-rr,yy+hh-rr,rr,0,6.28);ctx.fill();
	ctx.beginPath();
	ctx.arc(xx+rr,yy+hh-rr,rr,0,6.28);ctx.fill();

/*�����ɉ�����Ă��Ӗ����Ȃ�
	//���̒l��ۑ�
	var tempGlobalAlpha = ctx.globalAlpha;
	var tempGlobalCompositeOperation = ctx.globalCompositeOperation;

		//�����//�l�����l�p�ɓ�����
		ctx.globalCompositeOperation='destination-out';
		ctx.globalAlpha=1;
		ctx.lineWidth=1;
		ctx.strokeStyle=bgcolor;
		ctx.beginPath();
		ctx.arc(xx+rr,yy+rr,rr,3.14159,-3.14159/2);//ctx.stroke();
		ctx.arc(xx+ww-rr,yy+rr,rr,-3.14159/2,0);//ctx.stroke();
		ctx.arc(xx+ww-rr,yy+hh-rr,rr,0,3.14159/2);//ctx.stroke();
		ctx.arc(xx+rr,yy+hh-rr,rr,3.14159/2,3.14159);ctx.stroke();

	//���̒l����
	ctx.globalAlpha=tempGlobalAlpha;
	ctx.globalCompositeOperation=tempGlobalCompositeOperation;
*/

	//���ŉ����
	ctx.lineWidth=1;
	ctx.strokeStyle=bgcolor;
	ctx.beginPath();
	var pi=Math.PI;
	ctx.arc(xx+rr,yy+rr+1,rr,pi,-pi/2);//ctx.stroke();
	ctx.arc(xx+ww-rr,yy+rr+1,rr,-pi/2,0);//ctx.stroke();
	ctx.arc(xx+ww-rr,yy+hh-rr,rr,0,pi/2);//ctx.stroke();
	ctx.arc(xx+rr,yy+hh-rr,rr,pi/2,pi);ctx.stroke();
	ctx.lineTo(xx,yy+rr+1);
	ctx.stroke();

};



//DOM�c���[�̍ŏ��z-index�l�𒲂ׂ�(�[���D��T��)
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