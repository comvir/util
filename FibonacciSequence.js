/*现有斐波那契数列
例如:1 1 2 3 5 8 13 21 34 55
写出算法计算第n个数的值
*/
var FibonacciSequenceByRecur=function(n){
	if(n===1||n===2){
		return 1;
	}else{
		return FibonacciSequenceByRecur(n-1)+FibonacciSequenceByRecur(n-2);
	}
}
console.log("#递归方式输出数列第5个数");
console.log(FibonacciSequenceByRecur(5));
var FibonacciSequenceByItera=function(n){
	if(n===1||n===2){
		return 1;
	}else{
		var queue=[1,1];
		for(var i=2;i<n;i++){
			queue[i]=queue[i-1]+queue[i-2];
		}
		return queue[queue.length-1];
	}
}
console.log("#迭代方式输出数列第5个数");
console.log(FibonacciSequenceByItera(5));

console.log("#速度比较");
console.log("#输出第10个数的两种方式耗时");

var starttime=new Date().getTime(),endtime;
console.log(FibonacciSequenceByRecur(10));
endtime=new Date().getTime();
console.log("#递归方式耗时(毫秒):"+(endtime-starttime));

starttime=new Date().getTime();
console.log(FibonacciSequenceByItera(10));
endtime=new Date().getTime();
console.log("#迭代方式耗时(毫秒):"+(endtime-starttime));

console.log("#输出第30个数的两种方式耗时");

starttime=new Date().getTime();
console.log(FibonacciSequenceByRecur(30));
endtime=new Date().getTime();
console.log("#递归方式耗时(毫秒):"+(endtime-starttime));

starttime=new Date().getTime();
console.log(FibonacciSequenceByItera(30));
endtime=new Date().getTime();
console.log("#迭代方式耗时(毫秒):"+(endtime-starttime));