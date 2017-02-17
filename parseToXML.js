/*
����������ת��json����Ϊxml
���������������⣺
1.��֪js����û�������������ת��ʱҪ�ֶ�ָ�������ڵ�����
2.���������ڵ�Ԫ������Ƕ������ͣ���Ҫ���ô�����Ԫ�صĽڵ�����
ʹ������:����������ֶ��������ظ�
*/
var XmlHelper=function(){
	var _arrayTypes={}
	var _self=this;
	/*
	*ת������Ϊxml
	*@obj Ŀ�����
	*@rootname �ڵ�����
	*@arraytypes ���������ֶ���Ԫ�صĽڵ�����
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
//===========����==========
var xmlhelper=new XmlHelper();
//ʾ��1
var testobj={
		field1:"1",
		field2:true,
		field3:[{a:1},{a:2}]
	}
console.log(xmlhelper.parseToXML(testobj,"testobj",{field3:"ArrayItem"}));
//�����<testobj><field1>1</field1><field2>true</field2><field3><ArrayItem><a>1</a></ArrayItem><ArrayItem><a>2</a></ArrayItem></field3></testobj>
console.log("================================================");
//ʾ��2
var testobj2=[1,2,3];
console.log(xmlhelper.parseToXML(testobj2,"testobj2"));
//���:<testobj2><number>1</number><number>2</number><number>3</number></testobj2>
console.log("================================================");
//ʾ��3
var testobj3=[{a:1},{a:2}];
console.log(xmlhelper.parseToXML(testobj3,"Array",{Array:"ArrayItem"}));
//�����<Array><ArrayItem><a>1</a></ArrayItem><ArrayItem><a>2</a></ArrayItem></Array>