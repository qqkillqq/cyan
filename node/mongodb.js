var mongo = require("mongodb");
module.exports=new class{
	constructor(){
		this.db=null;
		this.collection=null;
	}
	open(databaseName,collectionName,callBack) {
		var promise = new Promise((resolve, reject) => {
			var server = new mongo.Server('localhost', 27017, {
				auto_reconnect: true
			});
			this.db = new mongo.Db(databaseName, server, {
				safe: true
			});
			this.db.open((err, db)=>{
				if (err) {
					console.log('打开数据库失败');
					reject(err);
				} else {
					console.log('打开数据库成功');
					db.collection(collectionName,{safe:true},(errcollection,collection)=>{
					    if(!errcollection){
					        console.log('连接数据集合成功');
					        this.collection=collection;
					        if(typeof callBack==='function'){
					        	callBack(collection)
					        }
					        resolve(collection);
					    }else{
					        console.log('连接数集合失败');
					        console.log(errcollection)
					        reject(errcollection);
					    }
					});
				}
			});
		})
		return promise;
	}
	close(){
		this.db.close();
	}
	add(obj){
		if(typeof obj=='object'){
			this.collection.insert(obj,{safe: true },(err,rs)=>{
				if(err){
					console.log('插入数据失败:'+err)
				}else{
					console.log('添加数据成功：'+rs);
				}
			})
		}
		return this;
	}
	remove(obj){
		this.collection.remove(obj,{safe:true});
	    return this;
	}
}
