

//���Ǔ_
//weight.txt�̏ꏊ��action.htm��onload�Ɉڂ�





	//��AI3�̃O���[�o���ϐ�

//�������action.htm�Ɉڂ�
//kkkkk	const FilenameWeight = 'C:\\Users\\usaku\\Documents\\games\\2dDogFight\\AI\\Ver4\\ai4weight.txt';





//�����ł́A�o���̗ݐςł���weight�݂̂������܂�
		//�e�ʂ̗ʎq����̏�Ԃ̐�
Nqtheta=8;
Nqlambda=8;
Nqsp=4;
Nqdis=7;

	//�\�i���ϊ��̂��߂̐������߂�
Ldis = 1
Lsp = Ldis * Nqdis;
Llambda = Lsp * Nqsp;
Ltheta = Llambda * Nqlambda;

	//�ʎq����̏�Ԃ����̍��W�ŕ\�����Ƃɂ���
	//(qtheta,qlambda,qsp,qdis)��4����
	//����������������theta�����̈�ԑ傫�����̂Ƃ��āA���ԂɁAqdis�����̈�ԏ��������̂Ƃ���ƁA���ꂼ�ꂪN*�i���̈�̐��Ƒ����邱�Ƃ��o����	

	//��������̎���10�i����p���������i�ꎟ��)�ɒu�������邱�Ƃɂ���
	//qtheta*Ltheta+qlambda*Llambda+qsp*Lsp+qdis*Ldis
	//������L*�͂P�O�i���ɂ�����A�����������B
	//L*�͎��̂悤�ɋ��߂邱�Ƃ��ł���B�܂��͏�����������͂��߂āA�Ō�ɑ傫���������Ԃɋ��߂Ă���
	//Ldis = 1;�����͕K��1�ł���
	//Lsp = Ldis * Nqdis = 1 * 7 = 7;
	//Llambda = Lsp * Nqsp = 7 * 3 = 21;
	//Ltheta = Llambda * Nqlambda = 21 *  8 = 168;
	//�@���@N*��Npre*�͏�Ԑ��Ȃ̂œ������B

	//�ȏ����������ƁA4�����z��͎��̂悤��1�����z��ɕϊ��ł���
	//input[qtheta][qlambda][qsp][qdis]
	//=input[qtheta*Ltheta+qlambda*Llambda+qsp*Lsp+qdis*Ldis]

	//�����ݒ�͎��̂悤�ɍs��
	//input = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);

	//for���[�v�Ȃǂ̌J��Ԃ��̑��d����q��Ԃ�����ł��A���̂����A��Ԃ��ӎ������s������ɂ����Ă�(���ԑw�ւ̓]�ʁA�������Ȃ�)
	//���̑���͊ȕւɍs����B


	//��ꒆ�ԑw���̏o�͂����邽�߂ɓ���
	//��ꒆ�ԑw��1�Ԗڂ�2�Ԗڂ̃m�[�h�̐�
Nm11 = 30;
Nm12 = 30;
Nm13 = 30;

	//���͑w�Ƒ�ꒆ�ԑw���Ȃ�weight�����
	//weight[im11][qtheta][qlambda][qsp][qdis]
	//�����ɍl���A���̂悤�ɕϊ�����
	//weight[qtheta*Ltheta+qlambda*Ltheta+qsp*Lsp+qdis*Ldis][Nm11]
	//�������邱�ƂŁA���ԑw�̂ǂ̃m�[�h�̏d�݂Ȃ̂����킩��₷���B�����x�����킩��₷�����d������

weight11 = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
for(var ii=0;ii<weight11.length;ii++){
	weight11[ii]=new Array(Nm11);
	for(var kk=0;kk<weight11[ii].length;kk++)weight11[ii][kk]=2*Math.random()-1;
};
weight12 = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
for(var ii=0;ii<weight12.length;ii++){
	weight12[ii]=new Array(Nm12);
	for(var kk=0;kk<weight12[ii].length;kk++)weight12[ii][kk]=2*Math.random()-1;
};
weight13 = new Array(Nqtheta*Nqlambda*Nqsp*Nqdis);
for(var ii=0;ii<weight13.length;ii++){
	weight13[ii]=new Array(Nm13);
	for(var kk=0;kk<weight13[ii].length;kk++)weight13[ii][kk]=2*Math.random()-1;
};

	//��ꒆ�ԑw�Əo�̓m�[�h���q��weight�����


weight21 = new Array(Nm11);
weight22 =new Array(Nm12);
weight23 =new Array(Nm13);

for(var ii=0;ii<weight21.length;ii++)weight21[ii]=2*Math.random()-1; 
for(var ii=0;ii<weight22.length;ii++)weight22[ii]=2*Math.random()-1; 
for(var ii=0;ii<weight23.length;ii++)weight23[ii]=2*Math.random()-1; 

	//���v���V�[�W��

//weight�̏�Ԃ͍ŏ��͕\�����Ȃ�
var flagPrintWeight=false;
var flagPrintWeightDifference=false;

var flagPSOWStop=false;
var hogePSOW = setInterval(function(){
	if('PrintStateOfWeight' in window && 'PrintStateOfWeightDifference' in window){

		var canvasNew = document.createElement('canvas');
		canvasNew.setAttribute('id','weight');
		canvasNew.setAttribute('width',CanvasWidth.toString());
		canvasNew.setAttribute('height',CanvasHeight.toString());
		canvasNew.setAttribute('style','position: absolute; left: 0px; top: 0px;z-index:15;');
		DivTop.appendChild(canvasNew);
		var ctx=canvasNew.getContext('2d');
		ctx.globalAlpha = 0.8;




		var pw = new PrintStateOfWeight(ctx,500,1,1);
		var pwd = new PrintStateOfWeightDifference(ctx,500,1,1);

		var hogePW = setInterval(function(){

			if(gW){
				gW=false;//�A�������������Ȃ��悤�ɂ���
				if(flagPrintWeight){
					flagPrintWeight=false;
					flagPrintWeightDifference=true;
				}else if(flagPrintWeightDifference){
					flagPrintWeightDifference=false;
				}else{
					flagPrintWeight=true;
				};
			};

//			ctx.clearRect(0,0,boxWidth*cellWidth,(accum.length/boxWidth+1)*cellHeight);
			ctx.clearRect(0,0,500,500);

			if(flagPrintWeight){
					pw();
			}else if(flagPrintWeightDifference){
				pwd();
			};

			if(flagStop)clearInterval(hogePW);		

		},3000);
		flagPSOWStop=true;
	};
	if(flagPSOWStop || flagStop)clearInterval(hogePSOW);
},100);


var ai4_readWeight = function(){
	//�t�@�C����weight��ǂݍ���
	var fs = new ActiveXObject("Scripting.FileSystemObject");

	var ForReading = 1;
	var ForWriting = 2;
	var ForAppending = 8;
	var file = fs.OpenTextFile(FilenameWeight,ForReading.toString(16),false);
	var accum=new Array();
	while(!file.AtEndOfStream) {
		var str = file.ReadLine();
		accum.push(parseFloat(str));
	};
	file.close();
	var count=0;
	for(var ii=0;ii<weight11.length;ii++){
		for(var kk=0;kk<weight11[ii].length;kk++){
			weight11[ii][kk]=accum[count];
			count++;
		};
	};
	for(var ii=0;ii<weight21.length;ii++){
		weight21[ii]=accum[count];
		count++;
	};
	for(var ii=0;ii<weight12.length;ii++){
		for(var kk=0;kk<weight12[ii].length;kk++){
			weight12[ii][kk]=accum[count];
			count++;
		};
	};
	for(var ii=0;ii<weight22.length;ii++){
		weight22[ii]=accum[count];
		count++;
	};
	for(var ii=0;ii<weight13.length;ii++){
		for(var kk=0;kk<weight13[ii].length;kk++){
			weight13[ii][kk]=accum[count];
			count++;
		};
	};
	for(var ii=0;ii<weight23.length;ii++){
		weight23[ii]=accum[count];
		count++;
	};

	info.text("read weight from file !");
};


var ai4_writeWeight = function(){
	//�t�@�C����weight����������
if(true){
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var ForReading = 1;
	const ForWriting = 2;
	var ForAppending = 8;
	var file = fs.OpenTextFile(FilenameWeight,ForWriting.toString(16),true);//true�Ńt�@�C�����Ȃ��Ƃ��V�K�쐬
	for(var ii=0;ii<weight11.length;ii++){
		for(var kk=0;kk<weight11[ii].length;kk++){
			file.WriteLine(weight11[ii][kk]);
	}};
	for(var ii=0;ii<weight21.length;ii++){
		file.WriteLine(weight21[ii]);
	};
	for(var ii=0;ii<weight12.length;ii++){
		for(var kk=0;kk<weight12[ii].length;kk++){
			file.WriteLine(weight12[ii][kk]);
	}};
	for(var ii=0;ii<weight22.length;ii++){
		file.WriteLine(weight22[ii]);
	};
	for(var ii=0;ii<weight13.length;ii++){
		for(var kk=0;kk<weight13[ii].length;kk++){
			file.WriteLine(weight13[ii][kk]);
	}};
	for(var ii=0;ii<weight23.length;ii++){
		file.WriteLine(weight23[ii]);
	};
	file.close();

	info.text("wrote weight into file !");
}else{
	info.caution("weight haven't writen into file ");
};//true/false

};

//�v���V�[�W��
var PrintStateOfWeightDifference = function (context,bww,ww,hh) {
	var ctx=context;
	var cellWidth=ww;
	var cellHeight=hh;
	var boxWidth=bww;

	const N = weight11.length*weight11[0].length+weight12.length*weight12[0].length+weight21.length+weight22.length;
	var preaccum=new Array(N);
	for(ii=0;ii<N;ii++)preaccum[ii]=0;


	var accum=new Array(2);
	accum[0]=new Array(N);
	accum[1]=new Array(N);
	var numKako=1;
	var numIma=0;


	var count=0;
	return function(){

		count=0;
		for(var ii=0;ii<weight11.length;ii++){
			for(var kk=0;kk<weight11[ii].length;kk++){
				accum[numIma][count]=weight11[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight21.length;ii++){
			accum[numIma][count]=weight21[ii];
			count++;
		};
		for(var ii=0;ii<weight12.length;ii++){
			for(var kk=0;kk<weight12[ii].length;kk++){
				accum[numIma][count]=weight12[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight22.length;ii++){
			accum[numIma][count]=weight22[ii];
			count++;
		};
		for(var ii=0;ii<weight13.length;ii++){
			for(var kk=0;kk<weight13[ii].length;kk++){
				accum[numIma][count]=weight13[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight23.length;ii++){
			accum[numIma][count]=weight23[ii];
			count++;
		};

		var x=0;
		var y=0;
		count=0;
		for(var ii=0;ii<accum[numIma].length;ii++){
			y=Math.floor(count/boxWidth)*cellHeight;
			x=(count % boxWidth)*cellWidth;
			if(accum[numIma][ii]>accum[numKako][ii]){
				ctx.fillStyle="rgb(200,0,0)";
			}else if(accum[numIma][ii]<accum[numKako][ii]){
				ctx.fillStyle="rgb(0,0,200)";
			}else{
				ctx.fillStyle="rgb(0,200,0)";
			};

			ctx.fillRect(x,y,cellWidth,cellHeight);
			count++;
		};


		if(numIma==0){
			numIma=1;
			numKako=0;
		}else{
			numIma=0;
			numKako=1;
		};


//console.log("write",accum.length,boxWidth,cellWidth,cellHeight);

	};//return
};

//�v���V�[�W��
var PrintStateOfWeight = function (context,bw,ww,hh) {
	var ctx=context;
	var cellWidth=ww;
	var cellHeight=hh;
	var boxWidth=bw;

	const N = weight11.length*weight11[0].length+weight12.length*weight12[0].length+weight21.length+weight22.length;
	var accum=new Array(N);


	var count=0;
	return function(){

		count=0;
		for(var ii=0;ii<weight11.length;ii++){
			for(var kk=0;kk<weight11[ii].length;kk++){
				accum[count]=weight11[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight21.length;ii++){
			accum[count]=weight21[ii];
			count++;
		};
		for(var ii=0;ii<weight12.length;ii++){
			for(var kk=0;kk<weight12[ii].length;kk++){
				accum[count]=weight12[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight22.length;ii++){
			accum[count]=weight22[ii];
			count++;
		};
		for(var ii=0;ii<weight13.length;ii++){
			for(var kk=0;kk<weight13[ii].length;kk++){
				accum[count]=weight13[ii][kk];
				count++;
			};
		};
		for(var ii=0;ii<weight23.length;ii++){
			accum[count]=weight23[ii];
			count++;
		};
		var x=0;
		var y=0;
		count=0;
		for(var ii=0;ii<accum.length;ii++){
			y=Math.floor(count/boxWidth)*cellHeight;
			x=(count % boxWidth)*cellWidth;

			if(accum[ii]>0){
				ctx.fillStyle="rgb(200,0,0)";
			}else if(accum[ii]<0){
				ctx.fillStyle="rgb(0,0,200)";
			}else{
				ctx.fillStyle="rgb(0,200,0)";
			};

			ctx.fillRect(x,y,cellWidth,cellHeight);
			count++;
		};



//console.log("write",accum.length,boxWidth,cellWidth,cellHeight);

	};//return
};


console.log("aiGlobalVariables4_0.js   ready");



//�ȉ��T���v��
//var file = fs.OpenTextFile("C:\\users\\usaku\\Documents\\games\\2dDogFight\\ai2weight.txt",ForWriting,true);//true�t�@�C�����Ȃ����ɐV�K�쐬����
//	file.WriteLine("set RUBY_CGI_username="+eName.value+"\n");
//	file.WriteLine("set RUBY_CGI_password="+ePassword.value+"\n");
//	file.WriteLine("\n");
//	file.WriteLine("ruby -C"+pathCGI_Entity+" "+filenameCGI_Entity+"||pause\n");
//	file.WriteLine("\n");
//var file = fs.OpenTextFile("C:\\users\\usaku\\Documents\\games\\2dDogFight\\ai2\\ai2weight.txt",ForReading);
//	console.error("ai2_globalVariables.js     ai2�̃t�@�C����������܂���");
//	var hogeBB = setInterval(function(){
///		clearInterval(hogeBB);
//		stopSprites();
//	},1000);
//if(file!=false && file!=-1 && file!=null)file.close();
//};


