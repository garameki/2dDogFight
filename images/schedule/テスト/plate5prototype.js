//�t�@�C���̊֌W���֘A
plate5JS=null;
FR.push(new FileRelative("libraryJS","plate5JS"));
FR.push(new FileRelative("modalWindowInput3JS","plate5JS"));
FR.push(new FileRelative("modalWindowYesNo2JS","plate5JS"));
FR.push(new FileRelative("ita2JS","plate5JS"));




//Plate�N���X�֐�

var Plate_plates = new Array();//�쐬����plate�����܂��z��
var Plate_numIdCanvas=new Counter(0);

var Plate_zIndexOrder = function(arr){


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
			sum+=arr[ii];
		};
		med=sum/len;

		for(var ii=0;ii<len;ii++){
			if(arr[ii]>med){
				larges.push(arr[ii]);
			}else{
				smalls.push(arr[ii]);
			};
		};
		small=order(smalls);
		large=order(larges);
		small.splice(small.length,0,large);
		return small;
	};

	var res = order(arr);
	return res;
};


var arr=[5,4,6,8,9,3,7,2,1];
console.log("arr=",Plate_zIndexOrder(arr));




//�����ɁAtree��bottom��any tree��top�̋������ł��Z�����̂�������X�N���v�g��������
//��̌��ʂƔ�ׂāA�����̒Z�����̂�D�悳����

//�߂�l�́A�߂��ғ��m��node��(top or bottom)�����ꂼ��P�g�ÂԂ�












var Plate = function(name){

	Ita.call(this,name);





	Plate_plates.push(myself);//�N���X�ϐ�

};
inherits(Plate,Ita);
