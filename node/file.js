'use strict';
var fsModule=require('fs');
var pathModule=require('path');
module.exports=new class{
	getFilesByFolder(...path){
		var rs=[];
		var includeInnerFiles=false;
		if(typeof path[path.length-1]==='boolean'){
			includeInnerFiles=path[path.length-1];
			path.length=path.length-1;
		}
		path.forEach(filePath=>{
			var fileNames = fsModule.readdirSync(filePath);
			fileNames.forEach(fileName=>{
				var fileStat=fsModule.statSync(pathModule.join(filePath,fileName));
				if(fileName.indexOf('.')!==0){
					if(fileStat.isDirectory()){
						if(includeInnerFiles){
							rs=rs.concat(this.getFilesByFolder(pathModule.join(filePath,fileName),true));
						}
					}else{
						// fileStat.fileName=fileName;
						// fileStat.filePath=filePath;
						rs.push(pathModule.join(filePath,fileName))
					}
				}
			})
		})
		return rs;
	}
	getInfoByFile(path){
		var stat= fsModule.statSync(path);
		stat.fileName=pathModule.basename(path);
		stat.filePath=pathModule.dirname(path);
		return stat;
	}
}