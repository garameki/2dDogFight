���ۑ�


	Tree����Plate�̏��Ԃ�ς��Ȃ��悤�ɂ���

	localStrage���g����...
	sessionStrage���g����...
	�X�g���[�W��Menu�̓��e��ۑ����Ă����B

	�폜�̎�����->�폜�������̂��Ƃ��Ă���
		

	�g��{�^���Ŋg�傷��ƁAonresize�̑ΏۂɂȂ�Ȃ��HMenu��on off���Ȃ��B
		->onscroll��onresize�͌��m���Ă��Ȃ��̂�����

	//��Plate�̉E�N���b�N��copy or delete�̑I��
	//��Key�̉E�N���b�N��copy or delete�̑I��

���R�[�f�B���O�K��

proto6
	�Ezindex��document�ɂ��������̂����ɂ��܂��傤
	�Ezindex��id�ԍ��̂悤�ɂ͎g���܂���B�ʂ�ID��p�ӂ���K�v������
	�Ezindex�̏d�Ȃ肪�X�^�b�N�̕����ɑ����āAdiv��zindex���D�悳���Ƃ������(zindex�̒l���傫���Ă��A���ɉ���Ă��܂����Ƃ�����)
		->�d�Ȃ���̂͑O�ʂ̂��̂�NumZindex()�Ŕԍ����X�V����
		->�X�^�b�N����(���[�g)�ɏ]�����̂�zindex���O������߂�
		->https://developer.mozilla.org/ja/docs/Web/Guide/CSS/Understanding_z_index/Stacking_context_example_3->zindex���ォ��~���ɔԍ��Â�����Ζ��͉�������


���J������

proto6
	�폜�̎��������P�񕪉\�ɂ����B->gElementsDeleted

	moveAndBrightAndDelete()����clear(hoge)�̌��gBrighten.plate=gBrightenNone�Ƃ��ď��������邱�Ƃɂ���ĉ���
		('mouseup'��merge�̑����currentTarget����E���ƁA����āA�ʂ�element��merge���Ă��܂��B
			->'mousedown'�����Ƃ��ɕϐ��ɓ���Ă���?
				->�ʂ̕ϐ��ɓ��ꂽ���A�o�O���o��)�̉���

	classModalWindow2.js�Ɉڍs
		modal window ��zindex���Ȃ���������

	���������̌��m��Menu���܂߂��B
		(����tree1��top�̏��Menu���ڂ��Ă��鎞�ɁA�ʂ�tree2��tree1��top�Ɍ�������ƁAtree1��tree2���폜�������
			->ClassBright���o������Menu������悤�ɂ���
				->nearest��Menu�ɏd�Ȃ��Ă��邩�����m����)������

	Plate��Menu�̏��drop����Ə�����

	library��sortZindex��ǉ�

	library��'mousedown''mouseup'�̂Ƃ��́A�}�E�X�̈ʒu�ɂ���element��z-index�̍~����get����֐���ǉ�

proto5
	tree�͉��y�щE�����ɉ�ʂ��͂ݏo���Ĉړ��ł���悤�ɂ����B

	�X�N���[���o�[���o�Ă��鎞��canvasMenuSensor������Ńh���b�O����̂�h����(makeElement()��)

	�u�͂ݏo���Ĉړ��v���������̂ŁA�X�N���[������Tree�̈ʒu�������B���C��->document.addEventListener('scroll'��window.addEventListener('scroll'�ɕς���

	menu��tree�̂Ƃ����drop�����menu��tree�Ǝ��Ⴆ��->menu��drag���n�߂�O�ɍőO�ʉ�

	menu���ĕ\�����ꂽ�Ƃ��ɂ�z-index��max�ɂ���B->gMenuSensor��'click'����NumZindex()����p����

proto3�ȉ�

	html�v�f�ɓƎ��v���p�e�B�[���̗p�����B
	element.__*������ɂ�����

	className��canvas��div�ɍ̗p����

	key�̃h���b�O���h���b�v�̎���

	tree�̎���

	document.getElementsByClassName(ClassPlate)��plates�ɓ���čŊ��̂��̂�����

	�ړIPlate�̉��Ɍ����ł���
	�ړI��Tree�̏�Ɍ����ł���

	tree�̕����E�Č���








