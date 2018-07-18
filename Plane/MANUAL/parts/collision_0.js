var PlaneMANUALCollisionVer0 = function(myself){
	var myself=myself;
	var myBeam=myself.beam;
	var target=myself.target;
	var yanBeam=target.beam;

//console.log("myself=",myself," myBeam=",myBeam," target=",target," yanBeam=",yanBeam);





	var dis;//‹——£
	return function(){
		//“–‚½‚è”»’è‚Æ•]‰¿

		dist = calcDistance(myBeam.x,myBeam.y,target.x,target.y);//©•ª‚Ìƒr[ƒ€‚Æ‘Šè‚ÌÕ“Ë
		if(dis<35 && myBeam.state==1 && target.state==1){
//			myself.explore();”š”­‚Í‘Šè‚É”C‚¹‚é
		};
		dist=calcDistance(target.x,target.y,myself.x,myself.y);//©•ª‚Æ‘Šè‚ÌÕ“Ë
		if(dist<35 && target.state==1 && myself.state==1){
			myself.explore();
		};
		//‚â‚ç‚ê‚½‚ç‰½‚É‚à‚È‚ç‚È‚¢‚Ì‚ÅAelse if‚É‚¹‚¸‚É‚Â‚Ã‚¯‚Ä•]‰¿
		dist = calcDistance(myself.x,myself.y,yanBeam.x,yanBeam.y);//©•ª‚Æ‘Šè‚Ìƒr[ƒ€‚ÌÕ“Ë
		if(dist<20 && yanBeam.state==1 && myself.state==1){
			myself.explore();
		};
	};//return
};
