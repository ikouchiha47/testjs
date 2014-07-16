var lSql = (function() {

	/* private parts */

	var self = this;

	/*

	 * get the type of obj, [object Array], slice from 8th to 2nd last.

	 * isFinite to check for array like, {0: 'a', 1: 'b', length : 2}, however you are miserable doing this , meh, but works on nodeList.

	 * check if the retrived item is an object, it can then posiibly be object or array.

	 * return the type of the parsed item along with the name of constructor, which can be Object, Array or String, maybe Number or Date, Function if you suck
	 * 
	 */

	function classOf(obj) {
		return Object.prototype.toString.call(obj).slice(8,-1);
	}

	function isFinite(obj) {
		if(obj.length &&
				obj.length > 0 &&
				obj.length === Math.floor(obj.length) &&
				obj.length < 4294967296)
		{
			return true;
		} else {
			return false;
		}
	}

	function isParsable(item) {
		var res = '';
		try {
			res = JSON.parse(item);
		} catch(e){
			return false;
		}

		return res;
	}


	function typeofData(item) {
		var res;
		res = isParsable(item);
		

		if(!res) {
			return false;
		}
		return {
			parsed : typeof res,
			data : res.constructor.name
		};
	}

	/* public API 

	 * check if an item is in storage

	 * create a blank localStorage, sometimes u nid to do insane stuff localStorage.setItem("foo", "");.

	 * get an item from the localStorage if the item exists, generally one should do this before the insert, if you bother trampling others data or sometimes stepping on your own shit.

	 * make a real localStorage, if trying to pass an Array or Array-Like object, we stringize it, else pass whatever u put.

	 * update the datable, use it for Array or Array Like, if Array, push it, if Array-Like, take the label and do a item[label] = value, if no label, report error 

*/
	return {
		createStorage : function(name) {
			if(!localStorage.getItem(name)) {
				localStorage.setItem(name, "");
				return self;
			} else {
				
				return this.getItemFromStorage(name);
			}
		},

		checkItemExists : function(name) {
			if(localStorage.getItem(name)) {
				return true;
			} else {
				return false;
			}
		},

		getItemFromStorage : function (name) {
			var res, type;

			if(localStorage.getItem(name)) {
				res = localStorage.getItem(name);
				type = typeofData(res);
				
				if(type.parsed && type.parsed == "object") {
					return JSON.parse(res);
				} else {
					return res;
				}
			}
			return false;
		},


		insertIntoStorage : function(name, values) {
			var cl = classOf(values);
			switch(cl) {
				case "Array" :
				case "Object" :
					/* check for array-like, but who cares because there is for..in
					if(cl.length && cl.length > 0 && isFinite(cl)) {
						localStorage.setItem(name, JSON.stringify(values));
					} else {
						localStorage.setItem(name, values);
					}*/
					//console.log("array/object");
					localStorage.setItem(name,JSON.stringify(values));
					break;
				default :
					//console.log("string");
					localStorage.setItem(name, values);
					break;
			}
			return this;
		},

		updateStorage : function(name, values) {
			var cl = classOf(values),
			res,
			type,
			temp,
                        len;
			if(localStorage.getItem(name)) {
				res = localStorage.getItem(name);
				type = typeofData(res);
				if(type.parsed && type.parsed == "object") {
					temp = JSON.parse(res);
				}
				if(type.data && type.data == "Array") {
                                        length = values.length;
					if(length && length > 0 && values.constructor.name != "String") {
						for(var i = 0; i < len;  i +=1) {
							temp.push(values[i]);
						}
					} else {
						temp.push(values);
					}
				}  else if(type.data && type.data == "Object") {
					if(data.constructor.name == "Object") {
						for(var l in values) {
							temp[l] = values[l];
						}
					} else {
						return false;
					}	
				} else {
					temp = values;
				}
				this.insertIntoStorage(name, temp);
				return this;
			} else {
				return false;
			}
		},
		removeFromStorage : function(name) {
			if(localStorage.getItem(name)) {
				localStorage.removeItem(name);
				return this;
			} else {
				return false;
			}
		},


	};
})();

//incase you donot like camels try lower case
(function(){
	lSql.checkitemexists = lSql.checkItemExists;
	lSql.createstorage = lSql.createStorage;
	lSql.getitemfromstorage = lSql.getItemFromStorage;
	lSql.insertintostorage = lSql.insertIntoStorage;
	lSql.updatestorage = lSql.updateStorage;
	lSql.removefromstorage = lSql.removeFromStorage;
	
})();
