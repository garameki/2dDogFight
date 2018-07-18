

var Weight30_prototype_printContent = function(num){

	var script = (function(){/*

		var num;

		info.text('');
		info.text('');
		info.text('');
		info.text(this.filename);
		var count=0;
		var accum=(count++).toString()+" ";
		for(var ii=0;ii<ww1.weight1__NUM__.length;ii++){
			for(var kk=0;kk<ww1.weight1__NUM__[ii].length;kk++){
				num=ww1.weight1__NUM__[ii][kk];
				accum+=(Math.round(num*100)/100).toString()+"  ";
				if(num==parseFloat("-1.#IND"))info.text(this.decode(ii)+" ~ "+kk.toString());
			};
			info.text(accum);accum=(count++).toString()+" ";
		};
		info.text('');
//		info.text(ww1.weight2__NUM__);
//		info.text(ww1.weight2__NUM__[0]);
		for(var ii=0;ii<ww1.weight2__NUM__.length;ii++){
			num=ww1.weight2__NUM__[ii];
			accum+=(Math.round(num*100)/100).toString()+"  ";
		};
		info.text(accum);accum="";
//		info.text(isNaN(ww1.weight2__NUM__[ii-1]));
//		info.text(ww1.weight2__NUM__[ii-1]+1000);

	*/});//EOF

	script=script.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];//.replace(/\n/g,BR).replace(/\r/g,"");
	script=script.replace(/__NUM__/g,num);
	eval(script);
};
