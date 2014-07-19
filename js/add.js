function add (a,b) {
	var s = 0,
		len = arguments.length;
	if(len ==2) {
		return a+b;
	}
	
	for(var i = 0; i < len; i ++) {
		if (arguments[i] === Number) {
			s += arguments[i];
		}
	}
	/*
	each(arguments, function(param) {
		s = s+param;
	});
	return s;
	*/
}

function multiply (a,b) {
	var s = 1,
		len = arguments.length;
	if(len ==2) {
		return a*b;
	}
	
	for(var i = 0; i < len; i ++) {
		if (arguments[i] === Number) {
			s *= arguments[i];
		}
	}
	/*
	each(arguments, function(param) {
		s = s+param;
	});
	return s;
	*/
}


