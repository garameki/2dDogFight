storageJS=null;

/*
�J������
3	escape(),unescape()��encodeURIComponent(),decodeURIComponent()�ɕύX

	setItem��expire���g���A30���Ԃ�cookie��ۑ�����悤�ɂ����B
*/

//test
var nDate=Date.now()+30*24*60*60*1000;
console.log("date=",nDate,typeof nDate);
var sDate=new Date(nDate);
console.log("date=",sDate.toGMTString(),typeof sDate);


if (!window.localStorage) {

	/*
		�I�u�W�F�N�g�Ƃ� { } �̂��Ƃł��B


		Object.defineProperty(obj,sVariable,setting)
			obj:�v���p�e�B�[��ǉ��������I�u�W�F�N�g
			sVariable:�v���p�e�B�[�̖��O	
			setting:{ }�̒���value:,writable:,configurable:,enumerable:���g�����f�B�X�N�v���^�Ƃ��Ă̐ݒ�ƁAthis.get=function(){ return hoge; },this.set=function(value){ hoge=value; }��p�����Q�b�^�[�A�Z�b�^�[�Ƃ��Ă̐ݒ��2��ނ̂ǂ��炩��ݒ肷��
				���Ȃ݂�value��get�����݂�����ƃG���[�ɂȂ�
				get��obj.sVariable�ŌĂяo����A
				set��obj.sVariable=hoge�ŌĂяo����Ahoge�������Ƃ���set�ɓn�����
	*/




	console.log("cookie strage");

	Object.defineProperty(window, "localStorage", new (function () {
    		var aKeys = [];//�L�[�̈ꗗ
		var oStorage = {};//��̃n�b�V��
    		Object.defineProperty(oStorage, "getItem", {
      			value: function (sKey) {//storage.getItem.value(�L�[)�Ǝg�p����̂͊ԈႢ�Bstorage.getItem(�L�[)�Ƃ���B
				return sKey ? this[sKey] : null;//sKey���w�肳��Ă��Ȃ���null��Ԃ��BsKey���L�[�Ƃ��đ��݂��Ȃ��ꍇ��undefined��Ԃ�
			},
      			writable: false,
      			configurable: false,
      			enumerable: false
    		});
    		Object.defineProperty(oStorage, "key", {
			value: function (nKeyId) {
				return aKeys[nKeyId];
			},
      			writable: false,
      			configurable: false,
      			enumerable: false
		});
    		Object.defineProperty(oStorage, "setItem", {//�L�[=�l;���N�b�L�[�ɒǉ�����
     			value: function (sKey, sValue) {
				if(!sKey) {
					return;
				};

				var daysKigen=30;
				var nDate=Date.now()+daysKigen*24*60*60*1000;
//console.log("date=",nDate,typeof nDate);
				var sDate=(new Date(nDate)).toGMTString();
//console.log("date=",sDate);

        				document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + ";expires="+sDate+"; path=/";//�N�b�L�[�̒ǉ�!!
console.log("storageJS addition  document.cookie=",document.cookie.length);
console.log(localStorage.length);
 			},
      			writable: false,
      			configurable: false,
      			enumerable: false
    		});
    		Object.defineProperty(oStorage, "length", {
			get: function () {
				return aKeys.length;
			},
      			configurable: false,
      			enumerable: false
		});
    		Object.defineProperty(oStorage, "removeItem", {
      			value: function (sKey) {
				if(!sKey) { return; }
        				var sExpDate = new Date();
        				sExpDate.setDate(sExpDate.getDate() - 1);//1���O�̓��t�𐶐�
        				document.cookie = encodeURIComponent(sKey) + "=; expires=" + sExpDate.toGMTString() + "; path=/";//expires���L�[�ɕt���ĉߋ��̃f�[�^(�g�p�����؂�)�Ƃ���
			},
      			writable: false,
      			configurable: false,
      			enumerable: false
		});
//console.log("storageJS this=",this);
    		this.get = function () {//�A�N�Z�T�f�B�X�N�v���^�̓I�v�V�����Ƃ��Ď��̃L�[�������Ƃ��ł��܂��B->�ǂ��������ƁH
			var iThisIndx;
      			for (var sKey in oStorage) {//oStorage�I�u�W�F�N�g�̊eproperty�����s����sKey�ɑ�������
        				iThisIndx = aKeys.indexOf(sKey);//aKeys�̒���sKey�����ꂽ�ԍ���Ԃ��B�Ȃ��ꍇ��-1��Ԃ�
        				if (iThisIndx === -1) { oStorage.setItem(sKey, oStorage[sKey]); }//����aKeys�̒���sKey���Ȃ��ꍇ�A�n�b�V���̃L�[�ƃn�b�V���̒l��oStorage��setItem����
        				else { aKeys.splice(iThisIndx, 1); }//����aKeys�̒���sKey������ꍇ�AaKey��iThisIndx�Ԗڂ̗v�f����菜���B�܂�AaKeys����sKey����菜��
        				delete oStorage[sKey];//�n�b�V��oStorage����sKey�̎w���v�f���폜����i�̂����A�z��̒����͕ێ��BsKey�͎Q�ƕs�ɂȂ�j
      			}
			for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {//�z��aKeys�̗v�f������폜���A�v�f���Ȃ��Ȃ�܂ŌJ��Ԃ�
				oStorage.removeItem(aKeys[0]);//���ɔz�񂩂�폜�����v�faKeys[0]���A�폜�����O�ɎQ�Ƃ���cookie�̃y�A��L�������؂�ɂ���i�폜�ł͂Ȃ��j
			};
			for (var iCouple, iKey, iCouplId = 0, aCouples = document.cookie.split(/\s*;\s*/); iCouplId < aCouples.length; iCouplId++) {//split(�Z�p���[�^)�ŁA";"�ŋ�؂�ꂽ�����񂪔z��ƂȂ���aCouples�ɑ�������
 				iCouple = aCouples[iCouplId].split(/\s*=\s*/);//���x��"="���Z�p���[�^�Ƃ��ėv�f���Q�̔z��𐶐�
				if (iCouple.length > 1) {//"="�Ō��΂�Ă���������΂��������������
//console.log("iCouple[0]=",iCouple[0],"1=",iCouple[1]);
        					oStorage[iKey = decodeURIComponent(iCouple[0])] = decodeURIComponent(iCouple[1]);//"="�̍����L�[�ɁA�E����l�ɂ��āA�n�b�V��oStorage�ɂ��܂�
          					aKeys.push(iKey);//���ׂẴL�[���ꌳ�I�ɊǗ����邽�߂�aKeys�ɕۑ�
        				}
      			}
//console.log("storageJS aKeys=",aKeys);
      			return oStorage;
    		};

 		this.configurable = false;
    		this.enumerable = true;
	})());
}
