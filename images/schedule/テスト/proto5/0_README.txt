from
proto3フォルダの開発のつづき

開発履歴

html要素に独自プロパティーを採用した。
element.__*がそれにあたる

classNameをcanvasとdivに採用した

keyのドラッグ＆ドロップの実装

treeの実装

document.getElementsByClassName(ClassPlate)をplatesに入れて最寄りのものを検索

目的Plateの下に結合できる
目的のTreeの上に結合できる

treeの分割・再結合

proto5

	treeは下及び右方向に画面をはみ出して移動できるようにした。

	スクロールバーが出ている時にcanvasMenuSensorをつかんでドラッグするのを防いだ(makeElement()内)

	「はみ出して移動」がくせもので、スクロール時にTreeの位置がずれる。を修正->document.addEventListener('scroll'をwindow.addEventListener('scroll'に変えた

	menuをtreeのところにdropするとmenuをtreeと取り違える->menuのdragを始める前に最前面化

	menuが再表示されたときにはz-indexをmaxにする。->gMenuSensorの'click'時にNumZindex()を用いた

課題

Plateの右クリックでcopy or deleteの選択
Keyの右クリックでcopy or deleteの選択





