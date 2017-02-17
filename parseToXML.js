/*
本代码用于转换json对象为xml
本代码解决两个问题：
1.已知js对象没有类名概念，所以转换时要手动指定顶级节点名称
2.还有数组内的元素如果是对象类型，需要配置此数组元素的节点名称
使用限制:含有数组的字段名不能重复
*/
var XmlHelper=function(){
	var _arrayTypes={}
	var _self=this;
	/*
	*转换对象为xml
	*@obj 目标对象
	*@rootname 节点名称
	*@arraytypes 配置数组字段子元素的节点名称
	*/
	this.parseToXML=function(obj,rootname,arraytypes){
		if(arraytypes){
			_arrayTypes=arraytypes;
		}
		var xml="";
		if(typeof obj!=="undefined"){
			if(Array.isArray(obj)){
				xml+=parseArrayToXML(obj,rootname);
			}else if(typeof obj==="object"){
				xml+=parseObjectToXML(obj,rootname);
			}else{
				xml+=parseGeneralTypeToXML(obj,rootname);
			}
		}
		return xml;
	}
	var parseObjectToXML=function(obj,rootname){
		if(typeof rootname==="undefined"||!isNaN(Number(rootname))){
			rootname="Object";
		}
		var xml="<"+rootname+">";
		if(obj){
			for(var field in obj){
				var value=obj[field];
				if(typeof value!=="undefined"){
					if(Array.isArray(value)){
						xml+=parseArrayToXML(value,field);
					}else if(typeof value==="object"){
						xml+=_self.parseToXML(value,field);
					}else{
						xml+=parseGeneralTypeToXML(value,field);
					}
				}
			}
		}
		xml+="</"+rootname+">";
		return xml;
	}
	var parseArrayToXML=function(array,rootname){
		if(typeof rootname==="undefined"||!isNaN(Number(rootname))){
			rootname="Array";
		}
		var xml="<"+rootname+">";
		if(array){
			var itemrootname=_arrayTypes[rootname];
			array.forEach(function(item){
				xml+=_self.parseToXML(item,itemrootname);
			});
		}
		xml+="</"+rootname+">";
		return xml;
	}
	var parseGeneralTypeToXML=function(value,rootname){
		if(typeof rootname==="undefined"||!isNaN(Number(rootname))){
			rootname=typeof value;
		}
		var xml="<"+rootname+">"+value+"</"+rootname+">";
		return xml;
	}
}
//===========测试==========
var xmlhelper=new XmlHelper();
//示例1
var testobj={
		field1:"1",
		field2:true,
		field3:[{a:1},{a:2}]
	}
console.log(xmlhelper.parseToXML(testobj,"testobj",{field3:"ArrayItem"}));
//输出：<testobj><field1>1</field1><field2>true</field2><field3><ArrayItem><a>1</a></ArrayItem><ArrayItem><a>2</a></ArrayItem></field3></testobj>
console.log("================================================");
//示例2
var testobj2=[1,2,3];
console.log(xmlhelper.parseToXML(testobj2,"testobj2"));
//输出:<testobj2><number>1</number><number>2</number><number>3</number></testobj2>
console.log("================================================");
//示例3
var testobj3=[{a:1},{a:2}];
console.log(xmlhelper.parseToXML(testobj3,"Array",{Array:"ArrayItem"}));
//输出：<Array><ArrayItem><a>1</a></ArrayItem><ArrayItem><a>2</a></ArrayItem></Array>