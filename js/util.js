function $(selector) {
	var nodes = document.querySelectorAll(selector);
	if(nodes && nodes.length > 1) {
		return [].slice.call(selector);
	}
	return nodes[0];
}

function each(ary, func) {
	if(ary){
		var i;
		for(i = 0; i < len; i++) {
			if(ary[i] && func(ary[i], i ,ary))
				break;
		}
	}
}
