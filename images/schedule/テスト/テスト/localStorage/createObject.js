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

console.log(aa);//�N���X�I�u�W�F�N�g//aa=AA
console.log(a);//�֐��I�u�W�F�N�g
console.log(b);//�֐��I�u�W�F�N�g
console.log(aaa);



</script></head><body><div></div></body></html>
