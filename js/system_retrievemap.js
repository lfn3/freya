var dbName = 'freyaTest';
var dbVerison = '1.0';

function retrieveMap(){
	
    var db = connDB();
 
}

function storeMap(){

	var db = connDB();
}

private function connDB(){

	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;

	var request = indexedDB.open(dbName);

	request.onsuccess = function(event) {
		return this.result;
	}
	request.onerror = function(event) {
	    print("Couldn't retrieve map. (DB Connection failed)")
	};
}+