/**
³Ë·¨±í
*/
var MultiplicationTable=function(level){
	level=level||9;
	for(var i=1;i<=9;i++){
		var line=""
		for(var j=1;j<=i;j++){
			line+=i+"x"+j+"="+(i*j)+"\t";
		}
		console.log(line);
	}
}
MultiplicationTable();