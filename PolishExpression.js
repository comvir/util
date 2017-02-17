/*
给定一个四则运算表达式的字符串，如果该表达式满足逆向波兰表达式，那么该字符串要满足以下条件：
1： 该表达式含有一个数字字符或一串数字字符。
2：它拥有给定格式，如”A, B, 。“，其中A,B是逆向波兰表达式，句号。表示的是四种运算符”+,-,*,/”其中之一。
例如字符串“3,4,*,1,2,+,+”就满足逆向波兰表达式，该表达式的值为：3 * 4 + (1+2) = 15.
给定一个逆向波兰表达式，要求计算该表达式的值。
*/
//堆栈结构
var Stack=function(){
	this.elements=[];
	//压入
	this.push=function(element){
		this.elements.unshift(element);
	}
	//弹出
	this.pop=function(){
		return this.elements.shift();
	}
}
//计算波兰表达式
var calcPolishExpression=function(expression){
	var stack=new Stack();
	var numbersample="0123456789";
	var operatorsample="+-*/";
	var chs=expression.split(',');
	for(var i=0;i<chs.length;i++){
		var ch=chs[i];
		if(numbersample.indexOf(ch)!==-1){
			stack.push(Number(ch));
		}else if(operatorsample.indexOf(ch)!==-1){
			var num1=stack.pop();
			var num2=stack.pop();
			switch(ch){
				case "+":
					stack.push(num1+num2);
					break;
				case "-":
					stack.push(num1-num2);
					break;
				case "*":
					stack.push(num1*num2);
					break;
				case "/":
					stack.push(num1/num2);
					break;
			}
		}
	}
	return stack.pop();
}
//测试
console.log(calcPolishExpression("3,4,*,1,2,+,+"));
//输出15