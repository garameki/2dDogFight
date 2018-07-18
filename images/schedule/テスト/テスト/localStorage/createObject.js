<!DOCTYPE html><html><head><script type='text/javascript'>



var A=function(){
	this.a=5;
};

?????????????



AA=new A;
console.log(AA);



var aa=Object.create(AA);
var a=Object.create(A);
var b=Object.create(A,{b:{value:10}});
var aaa=Object.create(AA);
aaa.prototype=Object.create(AA.prototype);

console.log(aa);//クラスオブジェクト//aa=AA
console.log(a);//関数オブジェクト
console.log(b);//関数オブジェクト
console.log(aaa);



</script></head><body><div></div></body></html>
