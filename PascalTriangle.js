/**
Ñî»ÔÈý½Ç
*/
var PascalTriangle=function(level){
	var prev=[1];
	for(var i=1;i<=level;i++){
		console.log(prev.join(' '));
		var next=[];
		for(var j=0;j<prev.length+1;j++){
			var left=prev[j-1]||0;
			var right=prev[j]||0;
			next.push(left+right);
		}
		prev=next;
	}
}
console.log(PascalTriangle(10));