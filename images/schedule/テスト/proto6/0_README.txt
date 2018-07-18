●課題


	Tree内のPlateの順番を変えないようにする

	localStrageを使った...
	sessionStrageを使った...
	ストレージにMenuの内容を保存しておく。

	削除の取り消し->削除したものをとっておく
		

	拡大ボタンで拡大すると、onresizeの対象にならない？Menuがon offしない。
		->onscrollでonresizeは検知していないのが原因

	//○Plateの右クリックでcopy or deleteの選択
	//○Keyの右クリックでcopy or deleteの選択

●コーディング規則

proto6
	・zindexはdocumentにくっつくものだけにしましょう
	・zindexをid番号のようには使えません。別のIDを用意する必要がある
	・zindexの重なりがスタックの文脈に則って、divのzindexが優先されるという問題(zindexの値が大きくても、後ろに回ってしまうことがある)
		->重なるものは前面のものにNumZindex()で番号を更新する
		->スタック文脈(ルート)に従うもののzindexが前後を決める
		->https://developer.mozilla.org/ja/docs/Web/Guide/CSS/Understanding_z_index/Stacking_context_example_3->zindexを上から降順に番号づけすれば問題は解決する


●開発履歴

proto6
	削除の取り消しを１回分可能にした。->gElementsDeleted

	moveAndBrightAndDelete()内でclear(hoge)の後にgBrighten.plate=gBrightenNoneとして初期化することによって解消
		('mouseup'でmergeの相手をcurrentTargetから拾うと、ずれて、別のelementをmergeしてしまう。
			->'mousedown'したときに変数に入れておく?
				->別の変数に入れたが、バグが出る)の解決

	classModalWindow2.jsに移行
		modal window のzindexがない問題を解決

	結合部分の検知にMenuも含めた。
		(あるtree1のtopの上にMenuが載っている時に、別のtree2をtree1のtopに結合すると、tree1もtree2も削除される問題
			->ClassBrightを出さずにMenuが光るようにする
				->nearestでMenuに重なっているかを検知する)を解決

	PlateをMenuの上にdropすると消える

	libraryにsortZindexを追加

	libraryに'mousedown''mouseup'のときの、マウスの位置にいるelementをz-indexの降順にgetする関数を追加

proto5
	treeは下及び右方向に画面をはみ出して移動できるようにした。

	スクロールバーが出ている時にcanvasMenuSensorをつかんでドラッグするのを防いだ(makeElement()内)

	「はみ出して移動」がくせもので、スクロール時にTreeの位置がずれる。を修正->document.addEventListener('scroll'をwindow.addEventListener('scroll'に変えた

	menuをtreeのところにdropするとmenuをtreeと取り違える->menuのdragを始める前に最前面化

	menuが再表示されたときにはz-indexをmaxにする。->gMenuSensorの'click'時にNumZindex()旧を用いた

proto3以下

	html要素に独自プロパティーを採用した。
	element.__*がそれにあたる

	classNameをcanvasとdivに採用した

	keyのドラッグ＆ドロップの実装

	treeの実装

	document.getElementsByClassName(ClassPlate)をplatesに入れて最寄りのものを検索

	目的Plateの下に結合できる
	目的のTreeの上に結合できる

	treeの分割・再結合








