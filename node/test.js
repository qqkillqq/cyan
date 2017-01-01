var File=require('./file.js');
var Mongo=require('./mongodb.js');
var files=File.getFilesByFolder('/Volumes/新加卷/AD/类',true);
files.forEach(item=>{console.log(item)})
// var infolist=files.map(path=>{
// 	let rs={}; 
// 	rs[path]=File.getInfoByFile(path);
// 	return rs;
// })
// Mongo.open('tests','sss',()=>{
// 	infolist.forEach(item=>{
// 		console.log(item)
// 		// Mongo.add(item);
// 	})
// 	Mongo.close();
// })