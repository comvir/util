module.exports.testRuntime=function(func){
	var t1=new Date();
	func();
	var t2=new Date();
	console.log("Runtime:"+(t2.getTime()-t1.getTime()));
}