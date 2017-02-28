/*快速排序
*/
var util=require('./util');
var quickSort=function(arr){
	if(arr.length<=1){
		return arr;
	}
	var midIndex=Math.floor(arr.length/2);
	var mid=arr[midIndex];
	var left=[];
	var right=[];
	for(var i=0;i<arr.length;i++){
		if(i===midIndex){
			continue;
		}
		var cur=arr[i];
		if(mid>cur){
			left.push(cur);
		}else{
			right.push(cur);
		}
	}
	return quickSort(left).concat(mid,quickSort(right));
}
var arr=[];
for(var i=0;i<10000;i++){
	arr.push(Math.round(Math.random()*10000));
}
util.testRuntime(function(){
	console.log("#快速排序\n"+quickSort(arr));
});