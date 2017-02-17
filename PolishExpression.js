/*
����һ������������ʽ���ַ���������ñ��ʽ�������������ʽ����ô���ַ���Ҫ��������������
1�� �ñ��ʽ����һ�������ַ���һ�������ַ���
2����ӵ�и�����ʽ���硱A, B, ����������A,B�����������ʽ����š���ʾ���������������+,-,*,/������֮һ��
�����ַ�����3,4,*,1,2,+,+�����������������ʽ���ñ��ʽ��ֵΪ��3 * 4 + (1+2) = 15.
����һ�����������ʽ��Ҫ�����ñ��ʽ��ֵ��
*/
//��ջ�ṹ
var Stack=function(){
	this.elements=[];
	//ѹ��
	this.push=function(element){
		this.elements.unshift(element);
	}
	//����
	this.pop=function(){
		return this.elements.shift();
	}
}
//���㲨�����ʽ
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
//����
console.log(calcPolishExpression("3,4,*,1,2,+,+"));
//���15