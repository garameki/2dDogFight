

//â¸ó«ì_

//0_1 AI.prototype.changeWeightAngle;Çï\é¶Ç≈Ç´ÇÈÇÊÇ§Ç…ÇµÇΩÅB



var PrintStatus6_0 = function(plane){
	console.info("PlaneAIPrintStatus0_0 was instanced");
	var screen =new PrintProperty(15,'white',70);
	var plane=plane;
	return function(){
		screen.reset();
		screen.print('name',plane._name,100);
		screen.print('Plane',plane.namePlane,100);
		screen.print('AI',plane.ai.nameAI,100);
		//screen.print('x',plane.x,100);
		//screen.print('y',plane.y,100);
		screen.print('weight',plane.ai.ww.name,100);
		screen.print('calc span',plane.ai.NSpan-1,100);
		screen.print(plane.ai.nameAIConstructor,plane.ai.progressAIConstructor,100);
		screen.print(plane.ai.nameAngleDecide,plane.ai.progressAngleDecide,100);
		screen.print(plane.ai.nameAngleLearn,plane.ai.progressAngleLearn,100);
		screen.print(plane.ai.nameShootDecide,plane.ai.progressShootDecide,100);
		screen.print(plane.ai.nameShootLearn,plane.ai.progressShootLearn,100);
		screen.print(plane.ai.nameSpeedDecide,plane.ai.progressSpeedDecide,100);
		screen.print(plane.ai.nameSpeedLearn,plane.ai.progressSpeedLearn,100);
		screen.print(plane.ai.nameInputClear,plane.ai.progressInputClear,100);
		screen.print(plane.ai.nameInputStore,plane.ai.progressInputStore,100);
		screen.print('AlphaAngle',plane.ai.alphaAngle,100);
		screen.print('AlphaShoot',plane.ai.alphaShoot,100);
		screen.print('AlphaSpeed',plane.ai.alphaSpeed,100);
		screen.print('thresholdAngle',plane.ai.thresholdAngle,100);
		screen.print('thresholdAngle',plane.ai.thresholdAngle,100);
		screen.print('thresholdAngle',plane.ai.thresholdAngle,100);
//this.?		screen.print('weight change',this.ai.changeWeightAngle);
	};
};

console.log("procPrintStatus6_0.js");
